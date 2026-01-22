import { Box, Container, Typography, Card, CardContent, Button } from '@mui/material';
import HeroSection from '../components/HeroSection';
import AboutPreview from '../components/AboutPreview';
import ContactSection from '../components/ContactSection';

function Home() {
  const remainingSections = [
    {
      id: 'skills',
      title: "Chef's Menu",
      subtitle: '- Skill Collection -',
      content: '여기는 Skill Tree 섹션입니다. 메뉴판 스타일로 기술 스택을 표현할 예정입니다.',
    },
    {
      id: 'projects',
      title: "Today's Special",
      subtitle: '- Featured Projects -',
      content: '여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 "더 보기" 버튼이 들어갈 예정입니다.',
      hasButton: true,
      buttonText: '전체 메뉴 보기',
      buttonLink: '/projects',
    },
  ];

  return (
    <Box>
      {/* Hero 섹션 */}
      <HeroSection />

      {/* About Me 프리뷰 섹션 */}
      <AboutPreview />

      {/* 나머지 섹션들 (추후 개별 컴포넌트로 분리 예정) */}
      {remainingSections.map((section) => (
        <Box
          key={section.id}
          component="section"
          id={section.id}
          sx={{
            py: { xs: 8, md: 12 },
            background: section.id === 'skills'
              ? 'var(--color-bg-primary)'
              : 'var(--color-bg-secondary)',
          }}
        >
          <Container maxWidth="md">
            <Card
              sx={{
                backgroundColor: 'var(--color-bg-tertiary)',
                textAlign: 'center',
                boxShadow: 'var(--shadow-secondary)',
                border: '1px solid var(--color-border-primary)',
              }}
            >
              <CardContent sx={{ py: 6, px: 4 }}>
                {/* 메뉴판 스타일 타이틀 */}
                <Typography
                  variant="overline"
                  sx={{
                    color: 'var(--color-accent)',
                    letterSpacing: '0.3em',
                    fontSize: '0.75rem',
                    display: 'block',
                    mb: 1,
                  }}
                >
                  ═══════════════════════════
                </Typography>
                <Typography
                  variant="h3"
                  component="h2"
                  sx={{
                    mb: 0.5,
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                    color: 'var(--color-primary)',
                    fontWeight: 600,
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                  }}
                >
                  {section.id === 'skills' && '✦ '}
                  {section.title}
                  {section.id === 'skills' && ' ✦'}
                  {section.id === 'projects' && ' 🍽️'}
                </Typography>
                {section.subtitle && (
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: 'var(--color-text-muted)',
                      fontStyle: 'italic',
                      mb: 2,
                    }}
                  >
                    {section.subtitle}
                  </Typography>
                )}
                <Typography
                  variant="overline"
                  sx={{
                    color: 'var(--color-accent)',
                    letterSpacing: '0.3em',
                    fontSize: '0.75rem',
                    display: 'block',
                    mb: 4,
                  }}
                >
                  ═══════════════════════════
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    mb: section.hasButton ? 4 : 0,
                  }}
                >
                  {section.content}
                </Typography>

                {section.hasButton && (
                  <Button
                    variant="contained"
                    href={section.buttonLink}
                    sx={{
                      backgroundColor: 'var(--color-button-secondary)',
                      color: 'var(--color-text-primary)',
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: '30px',
                      '&:hover': {
                        backgroundColor: 'var(--color-secondary-light)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {section.buttonText}
                  </Button>
                )}
              </CardContent>
            </Card>
          </Container>
        </Box>
      ))}

      {/* Contact 섹션 */}
      <ContactSection />
    </Box>
  );
}

export default Home;
