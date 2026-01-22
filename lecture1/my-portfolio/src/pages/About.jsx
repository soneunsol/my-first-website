import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { keyframes } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import TimelineIcon from '@mui/icons-material/Timeline';
import PsychologyIcon from '@mui/icons-material/Psychology';
import InterestsIcon from '@mui/icons-material/Interests';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

// 애니메이션 정의
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 스킬 레벨 색상
const skillLevelColors = {
  upper: '#D4AF37',   // Gold
  middle: '#C0C0C0',  // Silver
  lower: '#CD7F32',   // Bronze
};

// 스킬 데이터
const skillsData = [
  {
    category: 'Main Course',
    skills: [
      { name: 'React', level: 'upper', description: '컴포넌트 기반 UI 개발, 상태 관리' },
      { name: 'JavaScript', level: 'upper', description: 'ES6+, 비동기 처리, DOM 조작' },
      { name: 'TypeScript', level: 'middle', description: '타입 안정성, 인터페이스 설계' },
    ],
  },
  {
    category: 'Side Dishes',
    skills: [
      { name: 'CSS3', level: 'upper', description: 'Flexbox, Grid, 애니메이션' },
      { name: 'Supabase', level: 'middle', description: '실시간 DB, 인증, Storage' },
      { name: 'Git', level: 'middle', description: '브랜치 전략, 협업 워크플로우' },
    ],
  },
];

function About() {
  const [expanded, setExpanded] = useState('intro');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const profileInfo = {
    name: '손은솔',
    nameEn: 'Son Eunsol',
    role: 'Frontend Developer',
    education: 'SBS아카데미 컴퓨터 학원',
    major: '웹 개발',
    experience: '신입',
    email: 'eunsol229@gmail.com',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  };

  const timeline = [
    {
      year: '2025',
      title: 'AI 웹 개발 과정 수료',
      description: 'React, Supabase 집중 학습',
      icon: <SchoolIcon />,
    },
    {
      year: '2024',
      title: '프론트엔드 입문',
      description: 'JavaScript, HTML/CSS 기초',
      icon: <CodeIcon />,
    },
  ];

  const philosophies = [
    '사용자 경험이 최우선',
    '읽기 쉬운 코드 = 좋은 코드',
    '끊임없이 배우고 공유하기',
    '디테일이 완성도를 만든다',
  ];

  const interests = [
    { label: 'React', color: '#61DAFB' },
    { label: 'TypeScript', color: '#3178C6' },
    { label: '인터랙티브 웹', color: '#E85A71' },
    { label: 'UI/UX', color: '#4361EE' },
    { label: '애니메이션', color: '#4EEADB' },
    { label: '웹 접근성', color: '#7B3FA0' },
  ];

  const hobbies = [
    '코딩 챌린지',
    '기술 블로그 읽기',
    '새로운 라이브러리 탐험',
    '카페에서 개발하기',
  ];

  const accordionStyle = {
    backgroundColor: 'var(--color-bg-tertiary)',
    color: 'var(--color-text-primary)',
    mb: 1,
    '&:before': { display: 'none' },
    borderRadius: '8px !important',
    overflow: 'hidden',
    '&.Mui-expanded': {
      margin: '0 0 8px 0',
    },
  };

  const accordionSummaryStyle = {
    '& .MuiAccordionSummary-expandIconWrapper': {
      color: 'var(--color-accent)',
    },
    '&:hover': {
      backgroundColor: 'rgba(78, 234, 219, 0.1)',
    },
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        py: 6,
        backgroundColor: 'var(--color-bg-primary)',
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <Typography
          variant="h3"
          component="h1"
          sx={{
            textAlign: 'center',
            mb: 1,
            fontWeight: 700,
            background: 'var(--color-bg-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          About the Chef
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: 'center',
            mb: 4,
            color: 'var(--color-text-muted)',
            fontStyle: 'italic',
          }}
        >
          "사용자의 눈과 손끝에 닿는 모든 순간을 설계합니다"
        </Typography>

        {/* Profile Card */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: 3,
            border: '1px solid var(--color-border-primary)',
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Avatar
                src={profileInfo.profileImage}
                alt={profileInfo.name}
                sx={{
                  width: 180,
                  height: 180,
                  mx: 'auto',
                  border: '4px solid var(--color-primary)',
                  boxShadow: 'var(--shadow-primary)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05) rotate(3deg)',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  mb: 0.5,
                }}
              >
                {profileInfo.name}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: 'var(--color-accent)',
                  mb: 2,
                  fontWeight: 500,
                }}
              >
                {profileInfo.nameEn} | {profileInfo.role}
              </Typography>

              <Divider sx={{ my: 2, borderColor: 'var(--color-border-secondary)' }} />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <SchoolIcon sx={{ color: 'var(--color-primary)', fontSize: 20 }} />
                    <Typography variant="body2" sx={{ color: 'var(--color-text-muted)' }}>
                      학력
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: 'var(--color-text-secondary)' }}>
                    {profileInfo.education}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <CodeIcon sx={{ color: 'var(--color-secondary)', fontSize: 20 }} />
                    <Typography variant="body2" sx={{ color: 'var(--color-text-muted)' }}>
                      전공
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: 'var(--color-text-secondary)' }}>
                    {profileInfo.major}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <WorkIcon sx={{ color: 'var(--color-accent)', fontSize: 20 }} />
                    <Typography variant="body2" sx={{ color: 'var(--color-text-muted)' }}>
                      경력
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: 'var(--color-text-secondary)' }}>
                    {profileInfo.experience}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        {/* Accordion Sections */}
        <Box>
          {/* Intro */}
          <Accordion
            expanded={expanded === 'intro'}
            onChange={handleChange('intro')}
            sx={accordionStyle}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={accordionSummaryStyle}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PersonIcon sx={{ color: 'var(--color-primary)' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  자기소개
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body1"
                sx={{
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.8,
                }}
              >
                안녕하세요! 사용자 경험을 요리하는 주니어 프론트엔드 개발자 손은솔입니다.
                <br /><br />
                코드로 맛있는 경험을 만들어내는 것을 좋아합니다.
                사용자가 웹사이트를 방문했을 때 느끼는 첫인상부터 마지막 클릭까지,
                모든 순간을 정성껏 설계하고 구현하는 것에 열정을 가지고 있습니다.
                <br /><br />
                아직 신입이지만, 끊임없이 배우고 성장하며
                더 나은 개발자가 되기 위해 노력하고 있습니다.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Timeline */}
          <Accordion
            expanded={expanded === 'timeline'}
            onChange={handleChange('timeline')}
            sx={accordionStyle}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={accordionSummaryStyle}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TimelineIcon sx={{ color: 'var(--color-secondary)' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Journey
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ position: 'relative', pl: 3 }}>
                {/* Timeline line */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: '8px',
                    top: 0,
                    bottom: 0,
                    width: '2px',
                    backgroundColor: 'var(--color-border-primary)',
                  }}
                />
                {timeline.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: 'relative',
                      mb: 3,
                      '&:last-child': { mb: 0 },
                    }}
                  >
                    {/* Timeline dot */}
                    <Box
                      sx={{
                        position: 'absolute',
                        left: '-27px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-primary)',
                        border: '3px solid var(--color-bg-tertiary)',
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'var(--color-accent)',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                      }}
                    >
                      {item.year}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'var(--color-text-primary)',
                        fontWeight: 600,
                        fontSize: '1rem',
                        mt: 0.5,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'var(--color-text-muted)',
                        mt: 0.5,
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Philosophy */}
          <Accordion
            expanded={expanded === 'philosophy'}
            onChange={handleChange('philosophy')}
            sx={accordionStyle}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={accordionSummaryStyle}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PsychologyIcon sx={{ color: 'var(--color-accent)' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  개발 철학
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {philosophies.map((item, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <LightbulbIcon sx={{ color: 'var(--color-primary)' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      sx={{
                        '& .MuiListItemText-primary': {
                          color: 'var(--color-text-secondary)',
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>

          {/* Interests */}
          <Accordion
            expanded={expanded === 'interests'}
            onChange={handleChange('interests')}
            sx={accordionStyle}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={accordionSummaryStyle}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <InterestsIcon sx={{ color: 'var(--color-purple)' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  관심 분야
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {interests.map((item, index) => (
                  <Chip
                    key={index}
                    label={item.label}
                    sx={{
                      backgroundColor: `${item.color}20`,
                      color: item.color,
                      border: `1px solid ${item.color}50`,
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: `${item.color}30`,
                      },
                    }}
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Hobbies */}
          <Accordion
            expanded={expanded === 'hobbies'}
            onChange={handleChange('hobbies')}
            sx={accordionStyle}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={accordionSummaryStyle}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <SportsEsportsIcon sx={{ color: 'var(--color-primary-light)' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  취미 & 개성
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {hobbies.map((item, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <FavoriteIcon sx={{ color: 'var(--color-primary)', fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      sx={{
                        '& .MuiListItemText-primary': {
                          color: 'var(--color-text-secondary)',
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* Chef's Menu - Skill Section */}
        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: { xs: 3, md: 5 },
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: 3,
            border: '1px solid var(--color-border-primary)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* 배경 장식 */}
          <Box
            sx={{
              position: 'absolute',
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* 메뉴판 헤더 */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              sx={{
                color: 'var(--color-accent)',
                letterSpacing: '0.3em',
                fontSize: '0.7rem',
              }}
            >
              ════════════════════════════════════
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                color: skillLevelColors.upper,
                fontWeight: 600,
                my: 1.5,
                fontSize: { xs: '1.6rem', md: '2rem' },
              }}
            >
              ✦ CHEF'S MENU ✦
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: 'var(--color-text-muted)',
                fontStyle: 'italic',
                letterSpacing: '0.1em',
              }}
            >
              - Skill Collection -
            </Typography>
            <Typography
              sx={{
                color: 'var(--color-accent)',
                letterSpacing: '0.3em',
                fontSize: '0.7rem',
                mt: 1.5,
              }}
            >
              ════════════════════════════════════
            </Typography>
          </Box>

          {/* 스킬 목록 */}
          {skillsData.map((category, catIndex) => (
            <Box
              key={category.category}
              sx={{
                mb: catIndex < skillsData.length - 1 ? 4 : 0,
                animation: `${fadeInUp} 0.6s ease-out ${0.2 + catIndex * 0.2}s both`,
              }}
            >
              {/* 카테고리 구분선 */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, var(--color-border-primary), transparent)',
                  }}
                />
                <Typography
                  variant="overline"
                  sx={{
                    color: 'var(--color-text-muted)',
                    fontStyle: 'italic',
                    letterSpacing: '0.15em',
                    fontSize: '0.75rem',
                  }}
                >
                  {category.category}
                </Typography>
                <Box
                  sx={{
                    flex: 1,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, var(--color-border-primary), transparent)',
                  }}
                />
              </Box>

              {/* 스킬 항목들 */}
              {category.skills.map((skill, skillIndex) => (
                <Box
                  key={skill.name}
                  sx={{
                    py: 1.5,
                    px: 2,
                    borderRadius: 1,
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                    '&:hover': {
                      backgroundColor: 'rgba(212, 175, 55, 0.05)',
                      '& .skill-dots': {
                        borderBottomStyle: 'solid',
                        borderBottomColor: skillLevelColors[skill.level],
                      },
                    },
                  }}
                >
                  {/* 스킬 이름과 레벨 */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 0.5,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'var(--color-text-primary)',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        fontFamily: "'Pretendard', sans-serif",
                        letterSpacing: '0.02em',
                      }}
                    >
                      {skill.name}
                    </Typography>

                    {/* 점선 연결 */}
                    <Box
                      className="skill-dots"
                      sx={{
                        flex: 1,
                        mx: 2,
                        borderBottom: '2px dotted',
                        borderBottomColor: 'var(--color-border-secondary)',
                        transition: 'all 0.3s ease',
                      }}
                    />

                    {/* 레벨 표시 */}
                    <Typography
                      sx={{
                        color: skillLevelColors[skill.level],
                        fontStyle: 'italic',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        minWidth: '60px',
                        textAlign: 'right',
                      }}
                    >
                      *{skill.level}*
                    </Typography>
                  </Box>

                  {/* 설명 */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'var(--color-text-muted)',
                      fontSize: '0.85rem',
                      pl: 0.5,
                    }}
                  >
                    {skill.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}

          {/* 푸터 */}
          <Box sx={{ textAlign: 'center', mt: 4, pt: 3, borderTop: '1px solid var(--color-border-secondary)' }}>
            <Typography
              variant="body2"
              sx={{
                color: 'var(--color-text-muted)',
                fontStyle: 'italic',
                letterSpacing: '0.05em',
              }}
            >
              "All dishes are prepared with passion"
            </Typography>

            {/* 레벨 범례 */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 3,
                mt: 2,
                flexWrap: 'wrap',
              }}
            >
              {[
                { level: 'upper', label: '실무 투입 가능' },
                { level: 'middle', label: '프로젝트 경험' },
                { level: 'lower', label: '기초 학습 중' },
              ].map((item) => (
                <Box
                  key={item.level}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      backgroundColor: skillLevelColors[item.level],
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: skillLevelColors[item.level],
                      fontStyle: 'italic',
                      fontSize: '0.75rem',
                    }}
                  >
                    *{item.level}* - {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>

        {/* Footer Quote */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            textAlign: 'center',
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: 2,
            border: '1px solid var(--color-border-secondary)',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: 'var(--color-text-muted)',
              fontStyle: 'italic',
            }}
          >
            "함께 맛있는 프로젝트를 만들어보고 싶습니다."
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default About;
