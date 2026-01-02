# 🎯 Sprint 1: 첫 분자 생성 데모

## 현재 상태

✅ **완료됨**:
- Git 저장소 초기화
- 프로젝트 구조 생성
- main 브랜치 초기 커밋
- Sprint 1 브랜치 생성 (`sprint/sprint-01-molecule-generation`)

## 📋 다음 단계

### 1️⃣ GitHub 저장소 설정 (수동)

GitHub에서 새 저장소를 생성하고 연결:

```bash
# GitHub에서 저장소 생성 후
git remote add origin https://github.com/[YOUR-USERNAME]/ai-drug-discovery.git

# main 브랜치 푸시
git checkout main
git push -u origin main

# Sprint 1 브랜치 푸시
git checkout sprint/sprint-01-molecule-generation
git push -u origin sprint/sprint-01-molecule-generation
```

### 2️⃣ GitHub에서 Draft PR 생성

1. GitHub → Pull Requests → New Pull Request
2. Base: `main` ← Compare: `sprint/sprint-01-molecule-generation`
3. **Create draft pull request**
4. 제목: `[Sprint 1] 첫 분자 생성 데모`
5. [PR 템플릿](./.github/PULL_REQUEST_TEMPLATE.md) 사용

### 3️⃣ STORY-001 시작: Frontend 초기화

```bash
cd frontend

# Next.js 프로젝트 생성
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir

# 질문 답변:
# ✓ TypeScript? Yes
# ✓ ESLint? Yes
# ✓ Tailwind CSS? Yes
# ✓ src/ directory? No
# ✓ App Router? Yes
# ✓ Import alias? No

# shadcn/ui 초기화
npx shadcn-ui@latest init

# 기본 컴포넌트 설치
npx shadcn-ui@latest add button card input select slider label form
```

### 4️⃣ 첫 커밋

```bash
cd ..
git add .
git commit -m "feat(STORY-001): Next.js 프로젝트 초기화 및 기본 설정

- Next.js 14 + TypeScript + TailwindCSS 프로젝트 생성
- App Router 구조 적용
- shadcn/ui 설치 및 초기 설정
- 기본 UI 컴포넌트 추가 (Button, Card, Input, Select, Slider, Form)

Story Points: 5 (진행 중 - 20%)
Acceptance Criteria: 
- [x] Next.js 프로젝트 초기화
- [ ] 헤더 네비게이션 컴포넌트
- [ ] 레이아웃 구조 (좌측 입력, 우측 결과)
- [ ] 반응형 디자인"

git push origin sprint/sprint-01-molecule-generation
```

## 📊 Story 진행 현황

### STORY-001: 분자 생성 UI 레이아웃 (5 SP)
- Status: 🚧 **시작 준비**
- Progress: 0%
- Tasks:
  - [ ] Next.js 프로젝트 초기화
  - [ ] 헤더 네비게이션 컴포넌트 생성
  - [ ] 레이아웃 컴포넌트 생성 (좌우 분할)
  - [ ] 라우팅 설정 (/generate 페이지)
  - [ ] 반응형 디자인 적용

### STORY-002 ~ STORY-007
- Status: ⏸️ **대기 중**

## 🎯 오늘의 목표

1. ✅ Git 초기 설정
2. ⏳ GitHub 저장소 연결
3. ⏳ Draft PR 생성
4. ⏳ Frontend 프로젝트 초기화
5. ⏳ STORY-001 첫 커밋

---

**브랜치**: `sprint/sprint-01-molecule-generation`  
**다음 작업**: Frontend Next.js 프로젝트 초기화
