import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { keyframes } from '@mui/system';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SpaIcon from '@mui/icons-material/Spa';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
`;

function AboutPreview() {
  const highlights = [
    {
      icon: <TrackChangesIcon sx={{ fontSize: '1.5rem' }} />,
      label: '목표',
      text: '사용자 중심의 인터페이스 구현',
      color: '#E85A71',
    },
    {
      icon: <LightbulbIcon sx={{ fontSize: '1.5rem' }} />,
      label: '관심사',
      text: '인터랙티브 웹, 애니메이션',
      color: '#4361EE',
    },
    {
      icon: <SpaIcon sx={{ fontSize: '1.5rem' }} />,
      label: '현재',
      text: 'React 생태계 깊이 파기',
      color: '#4EEADB',
    },
  ];

  return (
    <Box
      component="section"
      id="about"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'var(--color-bg-secondary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 장식 요소 */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(78, 234, 219, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="md">
        {/* 섹션 타이틀 */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 6,
            animation: `${fadeInUp} 0.8s ease-out`,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              color: 'var(--color-text-primary)',
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              fontWeight: 600,
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <span role="img" aria-label="chef">👨‍🍳</span>
            About the Chef
          </Typography>
          <Box
            sx={{
              width: 60,
              height: 3,
              background: 'var(--color-bg-gradient)',
              mx: 'auto',
              borderRadius: 2,
            }}
          />
        </Box>

        {/* 메인 인용구 */}
        <Paper
          elevation={0}
          sx={{
            background: 'var(--color-bg-tertiary)',
            border: '1px solid var(--color-border-primary)',
            borderRadius: 3,
            p: { xs: 3, md: 5 },
            mb: 5,
            textAlign: 'center',
            position: 'relative',
            animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
          }}
        >
          {/* 인용 부호 장식 */}
          <Typography
            sx={{
              position: 'absolute',
              top: -15,
              left: 30,
              fontSize: '4rem',
              color: 'var(--color-primary)',
              opacity: 0.3,
              fontFamily: "'Playfair Display', serif",
              lineHeight: 1,
            }}
          >
            "
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: 'var(--color-text-primary)',
              fontWeight: 400,
              lineHeight: 1.8,
              fontSize: { xs: '1.1rem', md: '1.35rem' },
              fontStyle: 'italic',
              position: 'relative',
              zIndex: 1,
            }}
          >
            코드로 <span style={{ color: '#E85A71', fontWeight: 600 }}>맛있는 경험</span>을 만들어내는
            <br />
            주니어 프론트엔드 개발자입니다
          </Typography>
        </Paper>

        {/* 하이라이트 아이템들 */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            mb: 6,
          }}
        >
          {highlights.map((item, index) => (
            <Box
              key={item.label}
              sx={{
                flex: 1,
                animation: `${fadeInUp} 0.8s ease-out ${0.4 + index * 0.15}s both`,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  background: 'var(--color-bg-tertiary)',
                  border: '1px solid',
                  borderColor: 'var(--color-border-secondary)',
                  borderRadius: 2,
                  p: 3,
                  height: '100%',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  '&:hover': {
                    borderColor: item.color,
                    transform: 'translateY(-5px)',
                    boxShadow: `0 10px 30px ${item.color}20`,
                    '& .icon-wrapper': {
                      animation: `${floatAnimation} 2s ease infinite`,
                    },
                  },
                }}
              >
                <Box
                  className="icon-wrapper"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 45,
                    height: 45,
                    borderRadius: '12px',
                    background: `${item.color}20`,
                    color: item.color,
                    mb: 2,
                  }}
                >
                  {item.icon}
                </Box>
                <Typography
                  variant="overline"
                  sx={{
                    color: item.color,
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    display: 'block',
                    mb: 0.5,
                  }}
                >
                  {item.label}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'var(--color-text-secondary)',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                  }}
                >
                  {item.text}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>

        {/* 더 알아보기 버튼 */}
        <Box
          sx={{
            textAlign: 'center',
            animation: `${fadeInUp} 0.8s ease-out 0.9s both`,
          }}
        >
          <Button
            variant="text"
            href="/about"
            endIcon={<ArrowForwardIcon />}
            sx={{
              color: 'var(--color-accent)',
              fontSize: '1.1rem',
              fontWeight: 600,
              px: 3,
              py: 1,
              borderRadius: '30px',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(78, 234, 219, 0.1)',
                transform: 'translateX(5px)',
                '& .MuiSvgIcon-root': {
                  transform: 'translateX(5px)',
                },
              },
              '& .MuiSvgIcon-root': {
                transition: 'transform 0.3s ease',
              },
            }}
          >
            더 알아보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutPreview;
