# AI Drug Discovery - 개발 시작 가이드

## 🎉 Sprint 1 시작!

**Sprint 1**: 첫 분자 생성 데모  
**기간**: 2026-01-06 ~ 2026-01-17  
**목표**: 사용자가 웹에서 조건을 입력하고 AI 생성 분자를 보는 첫 번째 End-to-End 경험

## 📋 Story 목록

- [ ] STORY-001: 분자 생성 UI 레이아웃 (5 SP)
- [ ] STORY-002: 조건 입력 폼 구현 (3 SP)
- [ ] STORY-003: 분자 카드 컴포넌트 (5 SP)
- [ ] STORY-004: Mock 데이터로 UI 동작 검증 (2 SP)
- [ ] STORY-005: FastAPI 기본 구조 및 Health Check (3 SP)
- [ ] STORY-006: 간단한 분자 생성 API Mock (5 SP)
- [ ] STORY-007: 프론트-백엔드 통합 (3 SP)

**총 Story Points**: 26

---

## 🚀 다음 단계

### 1️⃣ Git 설정 완료

```bash
# Git 초기화 완료 ✅
# .gitignore 생성 완료 ✅
# README.md 생성 완료 ✅
# PR 템플릿 생성 완료 ✅
```

### 2️⃣ main 브랜치에 초기 커밋

```bash
# 현재 작업 디렉토리에서
git add .
git commit -m "chore: 프로젝트 초기 설정

- Git 저장소 초기화
- 프로젝트 구조 생성 (frontend, backend, ml, infrastructure)
- 문서 정리 (Executive Summary, Roadmap, Architecture, Sprint Plan, Git Strategy)
- .gitignore 설정
- README.md 작성
- PR 템플릿 추가

프로젝트 기본 구조 완성"

# GitHub에 원격 저장소 추가 (저장소 생성 후)
git remote add origin https://github.com/[YOUR-USERNAME]/ai-drug-discovery.git
git branch -M main
git push -u origin main
```

### 3️⃣ Sprint 1 브랜치 생성

```bash
# main에서 Sprint 1 브랜치 생성
git checkout -b sprint/sprint-01-molecule-generation
git push -u origin sprint/sprint-01-molecule-generation
```

### 4️⃣ GitHub에서 Draft PR 생성

1. GitHub 저장소로 이동
2. Pull Requests → New Pull Request
3. Base: `main` ← Compare: `sprint/sprint-01-molecule-generation`
4. **"Create draft pull request"** 선택
5. 제목: `[Sprint 1] 첫 분자 생성 데모`
6. 템플릿에 따라 내용 작성:

```markdown
## 📌 Sprint 정보
- **Sprint**: Sprint 1 - 첫 분자 생성 데모
- **기간**: 2026-01-06 ~ 2026-01-17
- **Story Points**: 26/26

## 🎯 Sprint 목표
사용자가 웹에서 조건을 입력하고 AI 생성 분자를 보는 첫 번째 End-to-End 경험

## 📋 Story 체크리스트
- [ ] STORY-001: 분자 생성 UI 레이아웃 (5 SP)
- [ ] STORY-002: 조건 입력 폼 구현 (3 SP)
- [ ] STORY-003: 분자 카드 컴포넌트 (5 SP)
- [ ] STORY-004: Mock 데이터로 UI 동작 검증 (2 SP)
- [ ] STORY-005: FastAPI 기본 구조 및 Health Check (3 SP)
- [ ] STORY-006: 간단한 분자 생성 API Mock (5 SP)
- [ ] STORY-007: 프론트-백엔드 통합 (3 SP)

## 📅 일정
- 시작: 2026-01-06
- 종료: 2026-01-17
- 리뷰: 2026-01-17 오후
- 머지 예정: 2026-01-20

## 🔗 관련 링크
- [Sprint Plan](./docs/SPRINT_PLAN.md#sprint-1)
- [Git Strategy](./docs/GIT_STRATEGY.md)
```

### 5️⃣ STORY-001 시작: Frontend 프로젝트 초기화

```bash
# frontend 디렉토리에서 Next.js 프로젝트 생성
cd frontend
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir

# 질문에 답변:
# ✓ Would you like to use TypeScript? Yes
# ✓ Would you like to use ESLint? Yes
# ✓ Would you like to use Tailwind CSS? Yes
# ✓ Would you like to use `src/` directory? No
# ✓ Would you like to use App Router? Yes
# ✓ Would you like to customize the default import alias? No

# shadcn/ui 설치
npx shadcn-ui@latest init

# 필요한 컴포넌트 설치
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add select
npx shadcn-ui@latest add slider
```

### 6️⃣ 첫 번째 커밋

```bash
# frontend 설정 완료 후
cd ..
git add .
git commit -m "feat(STORY-001): Next.js 프로젝트 초기화

- Next.js 14 + TypeScript + TailwindCSS 설정
- App Router 구조
- shadcn/ui 설치 및 설정
- 기본 컴포넌트 추가 (Button, Card, Input, Select, Slider)

Story Points: 5 (진행 중)
Progress: 20%"

git push origin sprint/sprint-01-molecule-generation
```

---

## 📂 현재 프로젝트 구조

```
ai-drug-discovery/
├── .github/
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/
│   ├── 대화_기록_2026-01-02.txt
│   ├── EXECUTIVE_SUMMARY.md
│   ├── PRODUCT_ROADMAP.md
│   ├── TECHNICAL_ARCHITECTURE.md
│   ├── SPRINT_PLAN.md
│   └── GIT_STRATEGY.md
├── frontend/              # ← 여기서 작업 시작
├── backend/
├── ml/
├── infrastructure/
├── tests/
├── scripts/
├── .gitignore
└── README.md
```

---

## 🎯 오늘 할 일 (Day 1)

1. ✅ Git 저장소 초기화
2. ✅ 프로젝트 구조 생성
3. ⏳ GitHub 저장소 생성
4. ⏳ main 브랜치 초기 커밋
5. ⏳ Sprint 1 브랜치 생성
6. ⏳ Draft PR 생성
7. ⏳ STORY-001 시작 (Next.js 설정)

---

## 💡 팁

### VS Code 확장 프로그램 추천
- **필수**:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - Python
  - Pylance
  
- **유용**:
  - GitHub Copilot
  - GitLens
  - Error Lens
  - REST Client

### 개발 워크플로우
1. 매일 작업 시작 시: `git pull origin sprint/sprint-01-molecule-generation`
2. Story 개발
3. 커밋: `git commit -m "feat(STORY-XXX): ..."`
4. 푸시: `git push origin sprint/sprint-01-molecule-generation`
5. PR 체크리스트 업데이트

---

## 📞 도움이 필요하면?

- [Sprint Plan](./SPRINT_PLAN.md) - 전체 스프린트 계획
- [Git Strategy](./GIT_STRATEGY.md) - Git 워크플로우 상세
- [Technical Architecture](./TECHNICAL_ARCHITECTURE.md) - 기술 스택 및 구조

---

**작성일**: 2026년 1월 3일  
**Sprint 1 시작 예정**: 2026년 1월 6일 (월)

🚀 **Let's build something amazing!**
