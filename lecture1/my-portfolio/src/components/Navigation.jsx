import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Me', path: '/about' },
    { label: 'Projects', path: '/projects' },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'rgba(13, 13, 26, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--color-border-secondary)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'center', gap: 2 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                color: location.pathname === item.path
                  ? 'var(--color-primary)'
                  : 'var(--color-text-secondary)',
                fontWeight: location.pathname === item.path ? 600 : 400,
                fontSize: '1rem',
                px: 3,
                py: 1,
                borderBottom: location.pathname === item.path
                  ? '2px solid var(--color-primary)'
                  : '2px solid transparent',
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: 'var(--color-primary-light)',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navigation;
