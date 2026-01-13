# React 베스트 프랙티스

## 개요
React 개발 시 따라야 할 모범 사례와 권장 패턴을 정리한 가이드입니다.
코드 품질, 성능, 유지보수성을 향상시키는 방법을 제시합니다.

## 1. 컴포넌트 구조

### 컴포넌트 분리 원칙
```jsx
// ❌ Bad: 너무 큰 컴포넌트
function UserDashboard() {
  return (
    <div>
      {/* 프로필, 설정, 통계 등 모든 것이 하나의 컴포넌트에... */}
    </div>
  );
}

// ✅ Good: 작고 재사용 가능한 컴포넌트로 분리
function UserDashboard() {
  return (
    <div>
      <UserProfile />
      <UserSettings />
      <UserStatistics />
    </div>
  );
}
```

### 단일 책임 원칙
각 컴포넌트는 하나의 명확한 목적만 가져야 합니다.

```jsx
// ✅ Good: 각 컴포넌트가 하나의 역할만 수행
function ProductCard({ product }) {
  return (
    <Card>
      <ProductImage src={product.image} />
      <ProductInfo product={product} />
      <ProductActions productId={product.id} />
    </Card>
  );
}
```

## 2. State 관리

### State 최소화
```jsx
// ❌ Bad: 불필요한 state
function ProductList({ products }) {
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    setProductCount(products.length);
  }, [products]);

  return <div>상품 개수: {productCount}</div>;
}

// ✅ Good: 계산 가능한 값은 state로 관리하지 않음
function ProductList({ products }) {
  const productCount = products.length;

  return <div>상품 개수: {productCount}</div>;
}
```

### State 위치 선택
```jsx
// ✅ Good: State는 필요한 가장 가까운 공통 부모에 배치
function SearchableList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <ItemList items={filteredItems} />
    </div>
  );
}
```

## 3. Props 다루기

### Props 구조 분해
```jsx
// ❌ Bad
function UserCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.email}</p>
    </div>
  );
}

// ✅ Good
function UserCard({ name, email, avatar }) {
  return (
    <div>
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}
```

### Props 기본값
```jsx
// ✅ Good: 기본값 설정
function Button({ variant = 'primary', size = 'medium', children }) {
  return (
    <button className={`btn-${variant} btn-${size}`}>
      {children}
    </button>
  );
}
```

### Props Spreading (제한적 사용)
```jsx
// ✅ Good: 명시적으로 필요한 props만 전달
function CustomInput({ label, error, ...inputProps }) {
  return (
    <div>
      <label>{label}</label>
      <input {...inputProps} />
      {error && <span>{error}</span>}
    </div>
  );
}
```

## 4. Hooks 사용

### Custom Hooks로 로직 재사용
```jsx
// ✅ Good: 재사용 가능한 로직을 Custom Hook으로 추출
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// 사용 예시
function UserPreferences() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      테마 전환: {theme}
    </button>
  );
}
```

### useEffect 의존성 배열
```jsx
// ❌ Bad: 빈 배열이지만 외부 변수 사용
function ProductPrice({ productId }) {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetchPrice(productId).then(setPrice);
  }, []); // productId가 변경되어도 갱신 안 됨!

  return <div>{price}원</div>;
}

// ✅ Good: 모든 의존성 포함
function ProductPrice({ productId }) {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetchPrice(productId).then(setPrice);
  }, [productId]); // productId 변경 시 다시 실행

  return <div>{price}원</div>;
}
```

### useCallback과 useMemo 적절히 사용
```jsx
// ✅ Good: 비용이 큰 연산이나 자식 컴포넌트 최적화에 사용
function ProductList({ products }) {
  // 복잡한 계산 결과 메모이제이션
  const sortedProducts = useMemo(() => {
    return products.sort((a, b) => b.price - a.price);
  }, [products]);

  // 자식 컴포넌트에 전달할 콜백 메모이제이션
  const handleAddToCart = useCallback((productId) => {
    // 장바구니 추가 로직
  }, []);

  return (
    <div>
      {sortedProducts.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}
```

## 5. 성능 최적화

### React.memo로 불필요한 리렌더링 방지
```jsx
// ✅ Good: 자주 변경되지 않는 컴포넌트 메모이제이션
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  // 복잡한 렌더링 로직
  return <div>{/* ... */}</div>;
});
```

### Key Prop 올바르게 사용
```jsx
// ❌ Bad: 인덱스를 key로 사용 (항목 순서가 변경될 수 있는 경우)
{items.map((item, index) => (
  <ListItem key={index} item={item} />
))}

// ✅ Good: 고유한 ID를 key로 사용
{items.map(item => (
  <ListItem key={item.id} item={item} />
))}
```

### Code Splitting (코드 분할)
```jsx
import { lazy, Suspense } from 'react';

// ✅ Good: 큰 컴포넌트는 lazy loading
const HeavyChart = lazy(() => import('./components/HeavyChart'));

function Dashboard() {
  return (
    <div>
      <Header />
      <Suspense fallback={<div>차트 로딩 중...</div>}>
        <HeavyChart />
      </Suspense>
    </div>
  );
}
```

## 6. 이벤트 핸들러

### 인라인 함수 지양
```jsx
// ❌ Bad: 매 렌더링마다 새 함수 생성
function ProductList({ products }) {
  return (
    <div>
      {products.map(product => (
        <button
          key={product.id}
          onClick={() => handleClick(product.id)}
        >
          구매
        </button>
      ))}
    </div>
  );
}

// ✅ Good: 함수를 미리 정의하거나 useCallback 사용
function ProductList({ products }) {
  const handleClick = useCallback((productId) => {
    // 처리 로직
  }, []);

  return (
    <div>
      {products.map(product => (
        <button
          key={product.id}
          onClick={() => handleClick(product.id)}
        >
          구매
        </button>
      ))}
    </div>
  );
}
```

## 7. 조건부 렌더링

### 명확한 조건부 렌더링
```jsx
// ✅ Good: 여러 조건부 렌더링 패턴
function UserStatus({ user, isLoading, error }) {
  // Early return 패턴
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return <EmptyState />;

  // 단축 평가
  return (
    <div>
      <h1>{user.name}</h1>
      {user.isPremium && <PremiumBadge />}

      {/* 삼항 연산자 */}
      {user.age >= 18 ? <AdultContent /> : <KidsContent />}
    </div>
  );
}
```

## 8. 폴더 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── common/         # 공통 컴포넌트 (Button, Input 등)
│   ├── layout/         # 레이아웃 컴포넌트
│   └── features/       # 기능별 컴포넌트
├── pages/              # 페이지 컴포넌트
├── hooks/              # Custom Hooks
├── utils/              # 유틸리티 함수
├── services/           # API 호출 등 서비스
├── contexts/           # Context API
└── assets/             # 이미지, 폰트 등
```

## 9. 네이밍 컨벤션

```jsx
// ✅ Good: 명확한 네이밍
// 컴포넌트: PascalCase
function UserProfile() {}

// 함수/변수: camelCase
const getUserData = () => {};
const isLoggedIn = true;

// 상수: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';

// 이벤트 핸들러: handle + 동사
const handleClick = () => {};
const handleSubmit = () => {};

// Boolean: is/has + 명사/형용사
const isLoading = false;
const hasError = true;
```

## 10. 에러 처리

### Error Boundary
```jsx
// ✅ Good: Error Boundary로 에러 처리
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('에러 발생:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

// 사용
function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

## 11. TypeScript 활용 (선택사항)

```tsx
// ✅ Good: Props 타입 정의
interface UserCardProps {
  user: {
    id: number;
    name: string;
    email: string;
  };
  onEdit?: (userId: number) => void;
}

function UserCard({ user, onEdit }: UserCardProps) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      {onEdit && <button onClick={() => onEdit(user.id)}>수정</button>}
    </div>
  );
}
```

## 12. 접근성 (Accessibility)

```jsx
// ✅ Good: 접근성 고려
function SearchForm() {
  return (
    <form role="search" aria-label="사이트 검색">
      <label htmlFor="search-input">검색어 입력</label>
      <input
        id="search-input"
        type="search"
        placeholder="검색..."
        aria-describedby="search-hint"
      />
      <span id="search-hint">상품명이나 카테고리를 입력하세요</span>
      <button type="submit" aria-label="검색 실행">
        🔍
      </button>
    </form>
  );
}
```

## 핵심 요약

1. **컴포넌트는 작고 재사용 가능하게**
2. **State는 최소화하고 적절한 위치에 배치**
3. **useEffect 의존성 배열 정확히 관리**
4. **성능 최적화는 필요할 때만**
5. **명확한 네이밍과 폴더 구조**
6. **에러 처리와 접근성 고려**
7. **코드 리뷰와 린팅 도구 활용**

## 참고 자료
- React 공식 문서: https://react.dev/
- React 베타 문서: https://react.dev/learn
- Airbnb React Style Guide: https://github.com/airbnb/javascript/tree/master/react
