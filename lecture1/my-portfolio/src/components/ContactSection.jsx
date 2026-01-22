import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Grid,
  Chip,
  CircularProgress,
  Snackbar,
  Alert,
  Divider,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
import { supabase } from '../lib/supabase';

const EMOJIS = ['😊', '🙏', '💖', '🌟', '👍', '🎉', '✨', '🤝'];

function ContactSection() {
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [formData, setFormData] = useState({
    name: '',
    message: '',
    affiliation: '',
    email: '',
    emoji: '😊',
    isEmailPublic: false,
  });

  useEffect(() => {
    fetchGuestbookEntries();
  }, []);

  const fetchGuestbookEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setGuestbookEntries(data || []);
    } catch (error) {
      console.error('Error fetching guestbook:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEmojiSelect = (emoji) => {
    setFormData((prev) => ({ ...prev, emoji }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.message.trim()) {
      setSnackbar({ open: true, message: '메시지를 입력해주세요.', severity: 'error' });
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.from('guestbook').insert({
        name: formData.name.trim() || '익명',
        message: formData.message.trim(),
        affiliation: formData.affiliation.trim() || null,
        email: formData.email.trim() || null,
        emoji: formData.emoji,
        is_email_public: formData.isEmailPublic,
      });

      if (error) throw error;

      setSnackbar({ open: true, message: '방명록이 등록되었습니다!', severity: 'success' });
      setFormData({
        name: '',
        message: '',
        affiliation: '',
        email: '',
        emoji: '😊',
        isEmailPublic: false,
      });
      fetchGuestbookEntries();
    } catch (error) {
      console.error('Error submitting guestbook:', error);
      setSnackbar({ open: true, message: '등록에 실패했습니다. 다시 시도해주세요.', severity: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        py: 8,
        background: 'var(--color-bg-secondary)',
      }}
    >
      <Container maxWidth="md">
        {/* Contact Info Section */}
        <Card
          sx={{
            backgroundColor: 'var(--color-bg-tertiary)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-secondary)',
            mb: 4,
          }}
        >
          <CardContent sx={{ py: 5, px: 4 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                mb: 3,
                color: 'var(--color-primary)',
                fontWeight: 700,
              }}
            >
              Contact
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'var(--color-text-secondary)',
                fontSize: '1.1rem',
                mb: 3,
              }}
            >
              언제든 연락주세요!
            </Typography>

            {/* Email */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                mb: 3,
              }}
            >
              <EmailIcon sx={{ color: 'var(--color-primary)' }} />
              <Typography
                component="a"
                href="mailto:eunsol229@gmail.com"
                sx={{
                  color: 'var(--color-text-primary)',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  '&:hover': {
                    color: 'var(--color-primary)',
                  },
                }}
              >
                eunsol229@gmail.com
              </Typography>
            </Box>

            {/* SNS Icons */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <IconButton
                component="a"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  backgroundColor: 'rgba(232, 90, 113, 0.15)',
                  color: 'var(--color-primary)',
                  width: 48,
                  height: 48,
                  '&:hover': {
                    backgroundColor: 'rgba(232, 90, 113, 0.3)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  backgroundColor: 'rgba(78, 234, 219, 0.15)',
                  color: 'var(--color-info)',
                  width: 48,
                  height: 48,
                  '&:hover': {
                    backgroundColor: 'rgba(78, 234, 219, 0.3)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  backgroundColor: 'rgba(67, 97, 238, 0.15)',
                  color: 'var(--color-secondary)',
                  width: 48,
                  height: 48,
                  '&:hover': {
                    backgroundColor: 'rgba(67, 97, 238, 0.3)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>

        {/* Guestbook Section */}
        <Card
          sx={{
            backgroundColor: 'var(--color-bg-tertiary)',
            boxShadow: 'var(--shadow-secondary)',
          }}
        >
          <CardContent sx={{ py: 5, px: 4 }}>
            <Typography
              variant="h4"
              component="h3"
              sx={{
                mb: 4,
                color: 'var(--color-primary)',
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              방명록
            </Typography>

            {/* Guestbook Form */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                mb: 4,
                p: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 2,
                border: '1px solid rgba(78, 234, 219, 0.2)',
              }}
            >
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    name="name"
                    label="이름"
                    placeholder="비워두면 익명으로 표시됩니다"
                    value={formData.name}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    name="affiliation"
                    label="소속/직업 (선택)"
                    value={formData.affiliation}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box>
                    <TextField
                      fullWidth
                      name="email"
                      label="이메일 (선택)"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        },
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="isEmailPublic"
                          checked={formData.isEmailPublic}
                          onChange={handleInputChange}
                          size="small"
                          sx={{
                            color: 'var(--color-text-secondary)',
                            '&.Mui-checked': {
                              color: 'var(--color-primary)',
                            },
                          }}
                        />
                      }
                      label={
                        <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)' }}>
                          이메일 공개하기
                        </Typography>
                      }
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: 'var(--color-text-secondary)', mb: 0.5, display: 'block' }}
                    >
                      이모지 선택
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {EMOJIS.map((emoji) => (
                        <Chip
                          key={emoji}
                          label={emoji}
                          onClick={() => handleEmojiSelect(emoji)}
                          sx={{
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            backgroundColor:
                              formData.emoji === emoji
                                ? 'rgba(232, 90, 113, 0.3)'
                                : 'rgba(255, 255, 255, 0.05)',
                            border:
                              formData.emoji === emoji
                                ? '2px solid var(--color-primary)'
                                : '1px solid transparent',
                            '&:hover': {
                              backgroundColor: 'rgba(232, 90, 113, 0.2)',
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    name="message"
                    label="메시지"
                    placeholder="따뜻한 한마디를 남겨주세요!"
                    value={formData.message}
                    onChange={handleInputChange}
                    variant="outlined"
                    multiline
                    rows={3}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={submitting}
                    endIcon={submitting ? <CircularProgress size={20} /> : <SendIcon />}
                    sx={{
                      backgroundColor: 'var(--color-button-secondary)',
                      color: 'var(--color-text-primary)',
                      py: 1.5,
                      fontSize: '1rem',
                      '&:hover': {
                        backgroundColor: 'var(--color-secondary-light)',
                      },
                    }}
                  >
                    {submitting ? '등록 중...' : '방명록 남기기'}
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 3, borderColor: 'rgba(78, 234, 219, 0.2)' }} />

            {/* Guestbook Entries */}
            <Typography
              variant="h6"
              sx={{ mb: 2, color: 'var(--color-text-secondary)' }}
            >
              남겨진 메시지들
            </Typography>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress sx={{ color: 'var(--color-primary)' }} />
              </Box>
            ) : guestbookEntries.length === 0 ? (
              <Typography
                sx={{
                  textAlign: 'center',
                  color: 'var(--color-text-secondary)',
                  py: 4,
                }}
              >
                아직 방명록이 없습니다. 첫 번째로 메시지를 남겨주세요!
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {guestbookEntries.map((entry) => (
                  <Card
                    key={entry.id}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(78, 234, 219, 0.15)',
                      boxShadow: 'none',
                    }}
                  >
                    <CardContent sx={{ py: 2, px: 3, '&:last-child': { pb: 2 } }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          mb: 1,
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography sx={{ fontSize: '1.5rem' }}>{entry.emoji}</Typography>
                          <Box>
                            <Typography
                              sx={{
                                fontWeight: 600,
                                color: 'var(--color-text-primary)',
                              }}
                            >
                              {entry.name}
                            </Typography>
                            {entry.affiliation && (
                              <Typography
                                variant="caption"
                                sx={{ color: 'var(--color-text-secondary)' }}
                              >
                                {entry.affiliation}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                        <Typography
                          variant="caption"
                          sx={{ color: 'var(--color-text-secondary)' }}
                        >
                          {formatDate(entry.created_at)}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          color: 'var(--color-text-secondary)',
                          lineHeight: 1.6,
                          pl: 4.5,
                        }}
                      >
                        {entry.message}
                      </Typography>
                      {entry.is_email_public && entry.email && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'var(--color-primary)',
                            pl: 4.5,
                            display: 'block',
                            mt: 0.5,
                          }}
                        >
                          {entry.email}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ContactSection;
