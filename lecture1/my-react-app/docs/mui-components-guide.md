# MUI (Material-UI) 컴포넌트 가이드

## 개요
Material-UI는 React를 위한 가장 인기 있는 UI 컴포넌트 라이브러리입니다.
Google의 Material Design을 기반으로 한 아름답고 반응형인 컴포넌트를 제공합니다.

## 설치
```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
```

## 기본 사용법

### 1. 버튼 컴포넌트
```jsx
import Button from '@mui/material/Button';

function MyComponent() {
  return (
    <div>
      <Button variant="contained">기본 버튼</Button>
      <Button variant="outlined">아웃라인 버튼</Button>
      <Button variant="text">텍스트 버튼</Button>
      <Button variant="contained" color="primary">Primary</Button>
      <Button variant="contained" color="secondary">Secondary</Button>
    </div>
  );
}
```

### 2. 카드 컴포넌트
```jsx
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function ProductCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          제품 이름
        </Typography>
        <Typography variant="body2" color="text.secondary">
          제품 설명이 여기에 들어갑니다.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">더 보기</Button>
        <Button size="small">구매하기</Button>
      </CardActions>
    </Card>
  );
}
```

### 3. 그리드 레이아웃
```jsx
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function GridLayout() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ p: 2 }}>Item 1</Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ p: 2 }}>Item 2</Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ p: 2 }}>Item 3</Paper>
      </Grid>
    </Grid>
  );
}
```

### 4. 텍스트 필드 (입력 폼)
```jsx
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function LoginForm() {
  return (
    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}>
      <TextField
        label="이메일"
        variant="outlined"
        type="email"
        required
      />
      <TextField
        label="비밀번호"
        variant="outlined"
        type="password"
        required
      />
    </Box>
  );
}
```

### 5. 아이콘 사용
```jsx
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

function IconButtons() {
  return (
    <div>
      <Button variant="contained" startIcon={<SendIcon />}>
        보내기
      </Button>
      <Button variant="outlined" endIcon={<DeleteIcon />}>
        삭제
      </Button>
    </div>
  );
}
```

## SX Prop 스타일링

MUI는 `sx` prop을 사용한 인라인 스타일링을 권장합니다.

```jsx
import Box from '@mui/material/Box';

function StyledComponent() {
  return (
    <Box
      sx={{
        width: 300,
        height: 200,
        backgroundColor: 'primary.main',
        color: 'white',
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
        '&:hover': {
          backgroundColor: 'primary.dark',
        }
      }}
    >
      스타일이 적용된 박스
    </Box>
  );
}
```

## 반응형 디자인

```jsx
import Box from '@mui/material/Box';

function ResponsiveBox() {
  return (
    <Box
      sx={{
        width: { xs: '100%', sm: '80%', md: '60%', lg: '50%' },
        padding: { xs: 1, sm: 2, md: 3 },
        fontSize: { xs: '12px', sm: '14px', md: '16px' }
      }}
    >
      반응형 콘텐츠
    </Box>
  );
}
```

## 테마 커스터마이징

```jsx
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

## 유용한 컴포넌트 목록

- **Layout**: Box, Container, Grid, Stack
- **Inputs**: Button, TextField, Select, Checkbox, Radio
- **Navigation**: AppBar, Drawer, Menu, Tabs
- **Surfaces**: Card, Paper, Accordion
- **Feedback**: Alert, Dialog, Snackbar, Progress
- **Data Display**: Table, List, Avatar, Chip, Typography

## 베스트 프랙티스

1. **컴포넌트 임포트 최적화**: 개별 컴포넌트를 직접 임포트
   ```jsx
   import Button from '@mui/material/Button';  // Good
   import { Button } from '@mui/material';     // Also Good
   ```

2. **sx prop 활용**: 인라인 스타일링에는 sx prop 사용

3. **반응형 디자인**: 브레이크포인트(xs, sm, md, lg, xl) 활용

4. **접근성**: aria 속성과 적절한 시맨틱 HTML 사용

5. **테마 활용**: 일관된 디자인을 위해 테마 설정

## 참고 자료
- 공식 문서: https://mui.com/
- 컴포넌트 예시: https://mui.com/material-ui/getting-started/
