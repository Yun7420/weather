# Weather Atlas

날씨 대시보드 웹 앱입니다. 위치 검색·지오코딩과 예보 데이터를 바탕으로 한 화면을 제공합니다.

---

## 기술 스택

| 구분 | 사용 |
|------|------|
| 프레임워크 | [Next.js](https://nextjs.org) 16 (App Router) |
| UI | [React](https://react.dev) 19, [Tailwind CSS](https://tailwindcss.com) 4 |
| 데이터·상태 | [TanStack Query](https://tanstack.com/query), [Zustand](https://zustand-demo.pmnd.rs/) |
| 언어 | [TypeScript](https://www.typescriptlang.org/) |
| 패키지 매니저 | [pnpm](https://pnpm.io) 10 |

날씨·지오코딩 API는 `src/features` 아래 모듈에서 다룹니다.

---

## 시작하기

### 필요 환경

- **Node.js** 20 이상 권장  
- **pnpm**: 전역 설치 없이도 `npx` 또는 아래 배치 파일로 실행 가능

### 의존성 설치

```bash
pnpm install
```

전역에 `pnpm`이 없다면:

```bash
npx --yes pnpm@10.33.0 install
```

**Windows**에서는 프로젝트 루트의 `install.bat`을 실행해도 됩니다 (`npx`로 pnpm을 호출).

> 자동화 환경(CI 등)에서 `pnpm install`이 TTY 관련으로 멈출 때는 `CI=true`를 설정한 뒤 다시 실행하세요.

### 개발 서버

```bash
pnpm dev
```

또는:

```bash
npx --yes pnpm@10.33.0 dev
```

**Windows**: `dev.bat` 실행.

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열면 됩니다.

### 기타 스크립트

| 명령 | 설명 |
|------|------|
| `pnpm dev` | 개발 서버 (`next dev`) |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm start` | 빌드 결과 실행 (`next start`) |
| `pnpm lint` | ESLint |

---

## 프로젝트 구조 (요약)

```
src/
├── app/                 # 라우트·레이아웃
├── features/
│   ├── weather/         # 예보 UI·API·훅
│   ├── location/        # 위치 검색·스토어
│   └── shell/           # 페이지 조합
└── shared/              # 공용 프로바이더·유틸
```

---

## pnpm을 쉘에서 쓰고 싶다면

```bash
corepack enable
corepack prepare pnpm@10.33.0 --activate
```

이후 일반적으로 `pnpm install`, `pnpm dev` 를 사용할 수 있습니다.

---

## 더 알아보기

- [Next.js 문서](https://nextjs.org/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/app/building-your-application/deploying)
