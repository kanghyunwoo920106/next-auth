## 프로젝트 소개
이 프로젝트는 Next.js와 NextAuth를 활용하여 사용자 인증 기능을 구현한 웹 애플리케이션입니다.
NextAuth의 Credentials Provider를 사용하여 이메일과 비밀번호 기반 로그인을 지원하며, 사용자 역할(role) 정보도 관리합니다.

## 서버 구동 방법
1. 프로젝트 클론
git clone https://github.com/kanghyunwoo920106/next-auth.git
2. 프로젝트 폴더로 이동
cd next-auth
3. 패키지 설치
pnpm install
4. 서버 구동
pnpm dev

## 주요 기능
- NextAuth를 활용한 사용자 인증
- Credentials Provider로 로그인 구현
- 사용자 역할(role) 관리 (JWT 및 세션에 role 저장)
- JWT 기반 상태 관리
- 사용자 인증 정보를 JWT에 저장하고 필요한 데이터만 클라이언트로 전달
- 클라이언트와 서버 간 무상태 인증 관리

## 프로젝트 구조
- app/api/auth: NextAuth 설정 파일
- app/main: 메인 페이지 컴포넌트
- app/login: 로그인 페이지 컴포넌트
- app/middleware.ts: 미들웨어 파일
- app/page.tsx: 루트 페이지 컴포넌트
- app/providers.tsx: 프로바이더 컴포넌트
- app/utils: 유틸리티 함수 파일
- components: 공통 컴포넌트 폴더
- lib: 라이브러리 폴더
- types: 타입 파일 폴더
- .env: 환경 변수 파일
- .gitignore: 깃 무시 파일
- README.md: 프로젝트 설명 파일
- tsconfig.json: 타입스크립트 설정 파일
- next.config.js: Next.js 설정 파일
- package.json: 패키지 설정 파일

