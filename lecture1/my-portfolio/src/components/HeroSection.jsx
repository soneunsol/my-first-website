import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Button, Avatar } from '@mui/material';
import { keyframes } from '@mui/system';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// 애니메이션 정의
const gradientFlow = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  40% {
    transform: translateY(-15px) translateX(-50%);
  }
  60% {
    transform: translateY(-7px) translateX(-50%);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 오로라 배경 컴포넌트
function AuroraBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const starsRef = useRef([]);
  const auroraPointsRef = useRef([]);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initStars();
      initAuroraPoints();
    };

    // 별 초기화
    const initStars = () => {
      starsRef.current = [];
      const starCount = Math.floor((width * height) / 8000);
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.3 + 0.1,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    // 오로라 포인트 초기화
    const initAuroraPoints = () => {
      auroraPointsRef.current = [];
      const pointCount = 6;
      for (let i = 0; i < pointCount; i++) {
        auroraPointsRef.current.push({
          x: (width / (pointCount - 1)) * i,
          y: height * 0.4,
          baseY: height * 0.4,
          phase: (i / pointCount) * Math.PI * 2,
          amplitude: 50 + Math.random() * 30,
          speed: 0.01 + Math.random() * 0.01,
        });
      }
    };

    // 마우스 이벤트
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    // 오로라 그리기
    const drawAurora = (time) => {
      const mouse = mouseRef.current;
      const points = auroraPointsRef.current;

      // 포인트 업데이트
      points.forEach((point, i) => {
        point.phase += point.speed;

        // 기본 웨이브
        let targetY = point.baseY + Math.sin(point.phase) * point.amplitude;

        // 마우스 인터랙션
        const dx = mouse.x - point.x;
        const dy = mouse.y - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 300;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 80;
          targetY += (mouse.y < point.y ? -force : force * 0.5);
        }

        point.y += (targetY - point.y) * 0.05;
      });

      // 여러 레이어의 오로라
      const layers = [
        { color: 'rgba(200, 180, 255, 0.15)', offsetY: 0, blur: 60 },
        { color: 'rgba(180, 160, 255, 0.12)', offsetY: 30, blur: 80 },
        { color: 'rgba(160, 140, 255, 0.1)', offsetY: 60, blur: 100 },
        { color: 'rgba(220, 200, 255, 0.08)', offsetY: -30, blur: 120 },
      ];

      layers.forEach((layer) => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        // 시작점
        ctx.lineTo(0, points[0].y + layer.offsetY);

        // 부드러운 곡선
        for (let i = 0; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2 + layer.offsetY;
          ctx.quadraticCurveTo(points[i].x, points[i].y + layer.offsetY, xc, yc);
        }

        // 마지막 포인트
        ctx.lineTo(width, points[points.length - 1].y + layer.offsetY);
        ctx.lineTo(width, height);
        ctx.closePath();

        // 그라디언트
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, layer.color);
        gradient.addColorStop(0.5, layer.color.replace(')', ', 0.5)').replace('rgba', 'rgba'));
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.filter = `blur(${layer.blur}px)`;
        ctx.fill();
        ctx.filter = 'none';
      });

      // 빛나는 효과 추가
      const glowGradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 200
      );
      glowGradient.addColorStop(0, 'rgba(200, 180, 255, 0.15)');
      glowGradient.addColorStop(0.5, 'rgba(180, 160, 255, 0.05)');
      glowGradient.addColorStop(1, 'transparent');

      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, width, height);
    };

    // 별 그리기
    const drawStars = (time) => {
      starsRef.current.forEach((star) => {
        // 별 이동
        star.x -= star.speed;
        if (star.x < -10) {
          star.x = width + 10;
          star.y = Math.random() * height;
        }

        // 반짝임 효과
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.5 + 0.5;
        const currentOpacity = star.opacity * (0.5 + twinkle * 0.5);

        // 마우스 근처 별은 더 밝게
        const dx = mouseRef.current.x - star.x;
        const dy = mouseRef.current.y - star.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseInfluence = dist < 150 ? (1 - dist / 150) * 0.5 : 0;

        // 별 그리기
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(currentOpacity + mouseInfluence, 1)})`;
        ctx.fill();

        // 큰 별은 빛나는 효과
        if (star.size > 1.5) {
          const glowSize = star.size * (2 + twinkle);
          const glow = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, glowSize * 2
          );
          glow.addColorStop(0, `rgba(200, 180, 255, ${currentOpacity * 0.5})`);
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.fillRect(star.x - glowSize * 2, star.y - glowSize * 2, glowSize * 4, glowSize * 4);
        }
      });
    };

    // 애니메이션 루프
    const animate = (time) => {
      ctx.clearRect(0, 0, width, height);

      // 배경
      ctx.fillStyle = '#0D0D1A';
      ctx.fillRect(0, 0, width, height);

      drawAurora(time);
      drawStars(time);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}

function HeroSection() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      component="section"
      id="hero"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        py: 8,
      }}
    >
      {/* 오로라 + 별 배경 */}
      <AuroraBackground />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* 프로필 이미지 */}
          <Box
            sx={{
              animation: `${fadeInUp} 0.8s ease-out`,
              mb: 4,
            }}
          >
            <Avatar
              alt="손은솔"
              src="/profile.jpg"
              sx={{
                width: { xs: 140, md: 180 },
                height: { xs: 140, md: 180 },
                border: '4px solid',
                borderColor: 'var(--color-accent)',
                boxShadow: 'var(--shadow-accent)',
                transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'rotate(5deg) scale(1.05)',
                  boxShadow: '0 8px 40px rgba(78, 234, 219, 0.5)',
                },
              }}
            >
              {/* 이미지가 없을 경우 이니셜 표시 */}
              <Typography variant="h2" sx={{ fontWeight: 700 }}>
                ES
              </Typography>
            </Avatar>
          </Box>

          {/* 인사말 */}
          <Box
            sx={{
              animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: 'var(--color-text-secondary)',
                fontWeight: 400,
                mb: 1,
                fontSize: { xs: '1.1rem', md: '1.4rem' },
              }}
            >
              안녕하세요, 저는
            </Typography>
          </Box>

          {/* 이름 - 그라디언트 애니메이션 */}
          <Box
            sx={{
              animation: `${fadeInUp} 0.8s ease-out 0.4s both`,
              mb: 1,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.8rem', md: '4rem' },
                fontWeight: 800,
                background: 'linear-gradient(135deg, #E85A71 0%, #FF6B8A 25%, #7B3FA0 50%, #4361EE 75%, #4EEADB 100%)',
                backgroundSize: '200% 200%',
                animation: `${gradientFlow} 4s ease infinite`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.05em',
                py: 1,
              }}
            >
              손은솔
            </Typography>
          </Box>

          {/* "입니다" */}
          <Box
            sx={{
              animation: `${fadeInUp} 0.8s ease-out 0.6s both`,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: 'var(--color-text-secondary)',
                fontWeight: 400,
                mb: 3,
                fontSize: { xs: '1.1rem', md: '1.4rem' },
              }}
            >
              입니다
            </Typography>
          </Box>

          {/* 한 줄 소개 */}
          <Box
            sx={{
              animation: `${fadeInUp} 0.8s ease-out 0.8s both`,
              mb: 5,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: 'var(--color-text-primary)',
                fontWeight: 500,
                fontSize: { xs: '1rem', md: '1.25rem' },
                fontStyle: 'italic',
                letterSpacing: '0.02em',
                '& span': {
                  color: 'var(--color-accent)',
                  fontWeight: 600,
                },
              }}
            >
              사용자 경험을 <span>요리</span>하는 프론트엔드 개발자
            </Typography>
          </Box>

          {/* 버튼들 */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              justifyContent: 'center',
              animation: `${fadeInUp} 0.8s ease-out 1s both`,
            }}
          >
            <Button
              variant="contained"
              onClick={() => window.location.href = '/projects'}
              sx={{
                background: 'var(--color-bg-gradient)',
                backgroundSize: '200% 200%',
                animation: `${gradientFlow} 4s ease infinite`,
                color: 'var(--color-text-primary)',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '30px',
                boxShadow: 'var(--shadow-primary)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 30px rgba(232, 90, 113, 0.5)',
                },
                '&:active': {
                  transform: 'translateY(-1px)',
                },
              }}
            >
              메뉴 보기
            </Button>

            <Button
              variant="outlined"
              onClick={scrollToContact}
              sx={{
                borderColor: 'var(--color-accent)',
                borderWidth: 2,
                color: 'var(--color-accent)',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '30px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: 'var(--color-accent)',
                  borderWidth: 2,
                  backgroundColor: 'rgba(78, 234, 219, 0.1)',
                  transform: 'translateY(-3px)',
                  boxShadow: 'var(--shadow-accent)',
                },
                '&:active': {
                  transform: 'translateY(-1px)',
                },
              }}
            >
              연락하기
            </Button>
          </Box>
        </Box>
      </Container>

      {/* 스크롤 유도 화살표 */}
      <Box
        onClick={scrollToAbout}
        sx={{
          position: 'absolute',
          bottom: { xs: 30, md: 50 },
          left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer',
          animation: `${bounce} 2s ease infinite`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 2,
          transition: 'opacity 0.3s ease',
          '&:hover': {
            opacity: 0.7,
          },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'var(--color-text-muted)',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            mb: 0.5,
          }}
        >
          스크롤하여 더 알아보기
        </Typography>
        <KeyboardArrowDownIcon
          sx={{
            color: 'var(--color-accent)',
            fontSize: '2rem',
          }}
        />
      </Box>
    </Box>
  );
}

export default HeroSection;
