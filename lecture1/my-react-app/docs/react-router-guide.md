# React Router 가이드

## 개요
React Router는 React 애플리케이션에서 라우팅(페이지 이동)을 처리하는 표준 라이브러리입니다.
SPA(Single Page Application)에서 페이지 전환을 매끄럽게 처리할 수 있습니다.

## 설치
```bash
npm install react-router-dom
```

## 기본 설정

### 1. BrowserRouter 설정 (main.jsx 또는 App.jsx)
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

### 2. Routes와 Route 설정
```jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
```

## 네비게이션

### 1. Link 컴포넌트
```jsx
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/">홈</Link>
      <Link to="/about">소개</Link>
      <Link to="/contact">연락처</Link>
    </nav>
  );
}
```

### 2. NavLink (활성 링크 스타일링)
```jsx
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <NavLink
        to="/"
        style={({ isActive }) => ({
          color: isActive ? 'red' : 'blue',
          fontWeight: isActive ? 'bold' : 'normal'
        })}
      >
        홈
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        소개
      </NavLink>
    </nav>
  );
}
```

### 3. useNavigate Hook (프로그래매틱 네비게이션)
```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 로그인 로직...
    navigate('/dashboard'); // 페이지 이동
  };

  const handleBack = () => {
    navigate(-1); // 뒤로 가기
  };

  return (
    <div>
      <button onClick={handleLogin}>로그인</button>
      <button onClick={handleBack}>뒤로</button>
    </div>
  );
}
```

## 동적 라우팅

### 1. URL 파라미터
```jsx
// App.jsx
<Route path="/user/:userId" element={<UserProfile />} />

// UserProfile.jsx
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();

  return <div>사용자 ID: {userId}</div>;
}
```

### 2. 쿼리 파라미터
```jsx
import { useSearchParams } from 'react-router-dom';

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q');
  const page = searchParams.get('page') || 1;

  const updateSearch = (newQuery) => {
    setSearchParams({ q: newQuery, page: 1 });
  };

  return (
    <div>
      <p>검색어: {query}</p>
      <p>페이지: {page}</p>
    </div>
  );
}

// URL 예시: /search?q=react&page=2
```

## 중첩 라우팅

```jsx
// App.jsx
<Route path="/dashboard" element={<Dashboard />}>
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
  <Route index element={<DashboardHome />} />
</Route>

// Dashboard.jsx
import { Outlet, Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1>대시보드</h1>
      <nav>
        <Link to="/dashboard">홈</Link>
        <Link to="/dashboard/profile">프로필</Link>
        <Link to="/dashboard/settings">설정</Link>
      </nav>
      <Outlet /> {/* 중첩된 라우트가 여기에 렌더링됩니다 */}
    </div>
  );
}
```

## 레이아웃 패턴

### 공통 레이아웃 적용
```jsx
// Layout.jsx
import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function Layout() {
  return (
    <div>
      <Navigation />
      <main>
        <Outlet /> {/* 각 페이지 컴포넌트가 여기에 렌더링 */}
      </main>
      <Footer />
    </div>
  );
}

// App.jsx
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
  </Route>
</Routes>
```

## 보호된 라우트 (Protected Routes)

```jsx
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// 사용 예시
<Route
  path="/dashboard"
  element={
    <ProtectedRoute isAuthenticated={isLoggedIn}>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

## Loader와 데이터 로딩

```jsx
// React Router v6.4+ 기능
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

async function userLoader({ params }) {
  const response = await fetch(`/api/users/${params.userId}`);
  return response.json();
}

const router = createBrowserRouter([
  {
    path: '/user/:userId',
    element: <UserProfile />,
    loader: userLoader,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

// UserProfile.jsx
import { useLoaderData } from 'react-router-dom';

function UserProfile() {
  const user = useLoaderData();

  return <div>환영합니다, {user.name}님!</div>;
}
```

## 유용한 Hooks

### useLocation
```jsx
import { useLocation } from 'react-router-dom';

function CurrentPath() {
  const location = useLocation();

  return (
    <div>
      <p>현재 경로: {location.pathname}</p>
      <p>검색: {location.search}</p>
      <p>해시: {location.hash}</p>
    </div>
  );
}
```

### useMatch
```jsx
import { useMatch } from 'react-router-dom';

function MyComponent() {
  const match = useMatch('/products/:productId');

  if (match) {
    console.log('Product ID:', match.params.productId);
  }

  return <div>상품 페이지</div>;
}
```

## 베스트 프랙티스

1. **코드 스플리팅**: React.lazy()로 페이지별 코드 분할
   ```jsx
   import { lazy, Suspense } from 'react';

   const Home = lazy(() => import('./pages/Home'));
   const About = lazy(() => import('./pages/About'));

   <Suspense fallback={<div>로딩 중...</div>}>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/about" element={<About />} />
     </Routes>
   </Suspense>
   ```

2. **상대 경로 활용**: 중첩 라우트에서 상대 경로 사용

3. **404 페이지**: 항상 와일드카드 라우트 추가
   ```jsx
   <Route path="*" element={<NotFound />} />
   ```

4. **네비게이션 가드**: 인증이 필요한 페이지는 ProtectedRoute로 보호

5. **SEO**: React Helmet 등을 사용하여 페이지별 메타 태그 설정

## MUI와 함께 사용하기

```jsx
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

function Navigation() {
  return (
    <div>
      {/* MUI Button과 Router Link 결합 */}
      <Button component={RouterLink} to="/about" variant="contained">
        소개 페이지로
      </Button>

      {/* MUI Link와 Router Link 결합 */}
      <Link component={RouterLink} to="/contact" underline="hover">
        연락처
      </Link>
    </div>
  );
}
```

## 참고 자료
- 공식 문서: https://reactrouter.com/
- 튜토리얼: https://reactrouter.com/en/main/start/tutorial
