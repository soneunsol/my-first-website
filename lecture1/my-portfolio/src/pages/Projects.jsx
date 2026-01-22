import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  Grid,
  CircularProgress,
  Skeleton,
} from '@mui/material';
import {
  Launch as LaunchIcon,
  Code as CodeIcon,
} from '@mui/icons-material';
import { supabase } from '../lib/supabase';

// 기술 스택 색상 매핑
const techColors = {
  'React': '#61DAFB',
  'Vite': '#646CFF',
  'JavaScript': '#F7DF1E',
  'HTML5': '#E34F26',
  'CSS3': '#1572B6',
  'Supabase': '#3ECF8E',
  'PostgreSQL': '#336791',
  'MUI': '#007FFF',
  'Node.js': '#339933',
  'TypeScript': '#3178C6',
};

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState({});

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setProjects(data || []);

      // 이미지 로딩 상태 초기화
      const loadingState = {};
      data?.forEach(project => {
        loadingState[project.id] = true;
      });
      setImageLoading(loadingState);
    } catch (error) {
      console.error('프로젝트 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageLoad = (projectId) => {
    setImageLoading(prev => ({
      ...prev,
      [projectId]: false,
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: 'calc(100vh - 64px)',
          py: 8,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'var(--color-bg-primary)',
        }}
      >
        <CircularProgress sx={{ color: 'var(--color-accent)' }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        py: 8,
        backgroundColor: 'var(--color-bg-primary)',
      }}
    >
      <Container maxWidth="xl">
        {/* 헤더 */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              mb: 2,
              fontWeight: 700,
              background: 'var(--color-bg-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Projects
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'var(--color-text-secondary)',
              fontWeight: 400,
            }}
          >
            제가 작업한 프로젝트들을 소개합니다
          </Typography>
        </Box>

        {/* 프로젝트 그리드 */}
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid
              key={project.id}
              size={{
                xs: 12,
                sm: 6,
                md: 6,
                lg: 3,
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  border: '1px solid var(--color-border-primary)',
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: '0 20px 40px rgba(78, 234, 219, 0.2)',
                    borderColor: 'var(--color-accent)',
                  },
                }}
              >
                {/* 썸네일 이미지 */}
                <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                  {imageLoading[project.id] && (
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        bgcolor: 'var(--color-bg-secondary)',
                      }}
                    />
                  )}
                  <CardMedia
                    component="img"
                    image={project.thumbnail_url}
                    alt={project.title}
                    onLoad={() => handleImageLoad(project.id)}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: imageLoading[project.id] ? 0 : 1,
                      transition: 'opacity 0.3s ease',
                    }}
                  />
                </Box>

                {/* 콘텐츠 */}
                <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                  {/* 제목 */}
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      mb: 1,
                    }}
                  >
                    {project.title}
                  </Typography>

                  {/* 설명 */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'var(--color-text-secondary)',
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: 1.6,
                    }}
                  >
                    {project.description}
                  </Typography>

                  {/* 기술 스택 */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                    {project.tech_stack?.map((tech, index) => (
                      <Chip
                        key={index}
                        icon={<CodeIcon sx={{ fontSize: 14 }} />}
                        label={tech}
                        size="small"
                        sx={{
                          backgroundColor: `${techColors[tech] || '#666'}20`,
                          color: techColors[tech] || 'var(--color-text-secondary)',
                          border: `1px solid ${techColors[tech] || '#666'}40`,
                          fontSize: '0.7rem',
                          height: 24,
                          '& .MuiChip-icon': {
                            color: techColors[tech] || 'var(--color-text-secondary)',
                          },
                        }}
                      />
                    ))}
                  </Box>

                  {/* 날짜 */}
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'var(--color-text-muted)',
                      display: 'block',
                    }}
                  >
                    {formatDate(project.created_at)}
                  </Typography>
                </CardContent>

                {/* 액션 버튼 */}
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    endIcon={<LaunchIcon />}
                    href={project.detail_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-text-primary)',
                      fontWeight: 600,
                      py: 1.2,
                      borderRadius: 2,
                      textTransform: 'none',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'var(--color-primary-light)',
                        transform: 'scale(1.02)',
                      },
                      '&:active': {
                        transform: 'scale(0.98)',
                      },
                    }}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 프로젝트가 없을 때 */}
        {projects.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: 'var(--color-text-secondary)' }}
            >
              아직 등록된 프로젝트가 없습니다.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Projects;
