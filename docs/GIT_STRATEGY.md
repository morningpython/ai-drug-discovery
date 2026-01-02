# Git 브랜치 전략 및 워크플로우

**프로젝트**: AI-Driven Drug Discovery Platform  
**전략**: Sprint-based Progressive Integration  
**작성일**: 2026년 1월 3일

---

## 🌳 브랜치 전략 개요

### 핵심 원칙
1. **스프린트 단위 머지**: 각 스프린트가 완료되면 main으로 머지
2. **스토리별 점진적 커밋**: 스토리가 완료될 때마다 스프린트 브랜치에 커밋
3. **지속적 PR**: 스프린트 시작 시 PR을 열고 스프린트 내내 유지
4. **리뷰 가능한 단위**: 각 커밋은 하나의 완결된 스토리

---

## 📊 브랜치 구조

```
main (protected)
  │
  ├─── sprint/sprint-01-molecule-generation
  │      ├─ commit: STORY-001 분자 생성 UI 레이아웃
  │      ├─ commit: STORY-002 조건 입력 폼 구현
  │      ├─ commit: STORY-003 분자 카드 컴포넌트
  │      ├─ commit: STORY-004 Mock 데이터 UI 검증
  │      ├─ commit: STORY-005 FastAPI 기본 구조
  │      ├─ commit: STORY-006 분자 생성 API Mock
  │      └─ commit: STORY-007 프론트-백엔드 통합
  │      [PR #1 유지 → 스프린트 종료 시 머지]
  │
  ├─── sprint/sprint-02-visualization
  │      ├─ commit: STORY-008 분자 상세 페이지 UI
  │      ├─ commit: STORY-009 3D 분자 뷰어
  │      ├─ commit: STORY-010 분자 속성 계산 API
  │      └─ ...
  │      [PR #2 유지]
  │
  └─── sprint/sprint-03-admet-prediction
         └─ ...
         [PR #3 유지]
```

### 브랜치 네이밍 규칙

| 브랜치 타입 | 네이밍 패턴 | 예시 |
|------------|------------|------|
| **메인 브랜치** | `main` | `main` |
| **스프린트 브랜치** | `sprint/sprint-{번호}-{주제}` | `sprint/sprint-01-molecule-generation` |
| **핫픽스** | `hotfix/{이슈번호}-{설명}` | `hotfix/123-fix-admet-crash` |
| **실험적 기능** | `experiment/{기능명}` | `experiment/rl-optimization-v2` |

---

## 🔄 워크플로우

### Phase 1: 스프린트 시작

#### 1️⃣ 스프린트 브랜치 생성 (스프린트 시작일)

```bash
# main에서 최신 코드 가져오기
git checkout main
git pull origin main

# 스프린트 브랜치 생성
git checkout -b sprint/sprint-01-molecule-generation

# 원격에 푸시
git push -u origin sprint/sprint-01-molecule-generation
```

#### 2️⃣ Pull Request 즉시 생성 (Draft PR)

**GitHub에서**:
- Base: `main` ← Compare: `sprint/sprint-01-molecule-generation`
- 제목: `[Sprint 1] 첫 분자 생성 데모`
- **Draft PR로 생성** ✅
- 설명 템플릿:

```markdown
## 🎯 Sprint 1 목표
사용자가 웹에서 조건을 입력하고 AI 생성 분자를 보는 첫 번째 End-to-End 경험

## 📋 Story 목록
- [ ] STORY-001: 분자 생성 UI 레이아웃 (5 SP)
- [ ] STORY-002: 조건 입력 폼 구현 (3 SP)
- [ ] STORY-003: 분자 카드 컴포넌트 (5 SP)
- [ ] STORY-004: Mock 데이터로 UI 동작 검증 (2 SP)
- [ ] STORY-005: FastAPI 기본 구조 및 Health Check (3 SP)
- [ ] STORY-006: 간단한 분자 생성 API Mock (5 SP)
- [ ] STORY-007: 프론트-백엔드 통합 (3 SP)

**총 Story Points**: 26

## 📅 일정
- 시작: 2026-01-06
- 종료: 2026-01-17
- 리뷰: 2026-01-17 오후
- 머지 예정: 2026-01-20

## 🔗 관련 링크
- [Sprint Plan](./SPRINT_PLAN.md#sprint-1)
- [Jira Epic](https://jira.example.com/EPIC-001)
```

---

### Phase 2: 스프린트 진행 (스토리별 커밋)

#### 3️⃣ 스토리 개발 및 커밋

**각 스토리 완료 시**:

```bash
# 작업 중인 스프린트 브랜치에서
git checkout sprint/sprint-01-molecule-generation

# 변경사항 스테이징
git add frontend/src/components/MoleculeGenerator.tsx
git add frontend/src/pages/generate.tsx
git add frontend/src/styles/

# 커밋 (스토리 ID 포함)
git commit -m "feat(STORY-001): 분자 생성 UI 레이아웃 구현

- Next.js 프로젝트 초기화
- 헤더 네비게이션 컴포넌트
- 좌측 조건 입력 패널, 우측 결과 영역
- TailwindCSS + shadcn/ui 통합
- 반응형 레이아웃 (데스크톱 우선)

Story Points: 5
Acceptance Criteria: ✅ 모두 충족"

# 원격에 푸시
git push origin sprint/sprint-01-molecule-generation
```

#### 커밋 메시지 규칙

**포맷**:
```
<type>(STORY-ID): <제목>

<본문>
- 주요 변경사항 1
- 주요 변경사항 2

Story Points: <점수>
Acceptance Criteria: ✅/⚠️/❌
```

**Type 종류**:
- `feat`: 새 기능 (STORY 구현)
- `fix`: 버그 수정
- `refactor`: 리팩토링
- `test`: 테스트 추가
- `docs`: 문서 변경
- `style`: 코드 포맷팅
- `chore`: 빌드/설정 변경

**예시**:
```bash
# ✅ 좋은 예
git commit -m "feat(STORY-003): 분자 카드 컴포넌트 구현

- MoleculeCard 컴포넌트 생성
- RDKit 서버 API 연동하여 2D 구조 렌더링
- SMILES 복사 기능 (Clipboard API)
- 기본 특성 표시 (MW, LogP, TPSA)
- 그리드 레이아웃 (3열, 반응형)

Story Points: 5
Acceptance Criteria: ✅ 모두 충족
Co-authored-by: Frontend Dev <dev@example.com>"

# ❌ 나쁜 예
git commit -m "update molecule stuff"
git commit -m "fix bug"
git commit -m "WIP"
```

#### 4️⃣ PR 업데이트 및 체크리스트

**각 스토리 커밋 후 PR에서**:
- 체크박스 업데이트: `- [x] STORY-001: 완료 ✅`
- 코멘트 추가: "STORY-001 완료. 스크린샷 첨부."
- 리뷰어에게 알림

---

### Phase 3: 스프린트 중간 리뷰

#### 5️⃣ 일일 스탠드업 후 푸시

```bash
# 매일 작업 종료 시
git status
git add .
git commit -m "feat(STORY-XXX): 진행 중 체크포인트

- 현재까지 작업 내용
- TODO: 남은 작업

Status: 🚧 In Progress (60%)"

git push origin sprint/sprint-01-molecule-generation
```

#### 6️⃣ 중간 리뷰 (선택적)

**Week 1 종료 시점**:
- PR에 "Mid-Sprint Review" 코멘트
- 완료된 스토리 시연
- 피드백 수집 및 우선순위 조정

---

### Phase 4: 스프린트 종료

#### 7️⃣ 스프린트 리뷰 준비

**스프린트 마지막 날**:

```bash
# 모든 스토리 완료 확인
git log --oneline --grep="STORY-"

# 테스트 실행
npm test
pytest

# 린트 체크
npm run lint
ruff check .

# 최종 푸시
git push origin sprint/sprint-01-molecule-generation
```

#### 8️⃣ PR을 Ready for Review로 전환

**GitHub에서**:
- Draft PR → **Ready for Review** 전환
- 리뷰어 할당 (최소 2명)
- 라벨 추가: `sprint-1`, `ready-for-review`

**최종 PR 설명 업데이트**:
```markdown
## ✅ 완료 현황
- [x] STORY-001: 분자 생성 UI 레이아웃 (5 SP) ✅
- [x] STORY-002: 조건 입력 폼 구현 (3 SP) ✅
- [x] STORY-003: 분자 카드 컴포넌트 (5 SP) ✅
- [x] STORY-004: Mock 데이터 UI 검증 (2 SP) ✅
- [x] STORY-005: FastAPI 기본 구조 (3 SP) ✅
- [x] STORY-006: 분자 생성 API Mock (5 SP) ✅
- [x] STORY-007: 프론트-백엔드 통합 (3 SP) ✅

**달성 Story Points**: 26/26 (100%)

## 📸 스크린샷
[분자 생성 페이지 스크린샷]
[생성된 분자 목록]

## 🎥 데모 영상
[Loom 링크]

## ✅ 테스트 결과
- Unit Tests: 45/45 passed
- Integration Tests: 12/12 passed
- E2E Tests: 5/5 passed
- Coverage: 87%

## 🐛 알려진 이슈
- 없음

## 📝 리뷰 요청 사항
- [ ] UI/UX 검토 (@designer)
- [ ] API 설계 검토 (@backend-lead)
- [ ] 보안 검토 (@security)
```

#### 9️⃣ 코드 리뷰

**리뷰어**:
- 각 커밋 단위로 리뷰 (스토리별)
- 코멘트, Approve, Request Changes
- 최소 2명 Approve 필요

**작성자**:
- 피드백 반영
- 추가 커밋 (리뷰 피드백 반영)

```bash
git commit -m "refactor(STORY-003): 리뷰 피드백 반영

- PropTypes 타입 개선
- 에러 핸들링 추가
- 접근성 개선 (aria-label)

Reviewer: @backend-lead"
git push origin sprint/sprint-01-molecule-generation
```

#### 🔟 스프린트 리뷰 미팅 후 머지

**조건**:
- ✅ 모든 스토리 완료
- ✅ 2명 이상 Approve
- ✅ CI/CD 통과
- ✅ 충돌 없음
- ✅ 스프린트 리뷰 완료

**머지 방법**: **Squash and Merge** (권장)

```bash
# GitHub UI에서 "Squash and Merge" 클릭

# 머지 커밋 메시지:
Sprint 1: 첫 분자 생성 데모 (#1)

## 구현된 기능
- 분자 생성 UI (조건 입력, 결과 표시)
- 분자 카드 컴포넌트 (2D 구조, 기본 특성)
- FastAPI 백엔드 기본 구조
- Mock 분자 생성 API
- 프론트-백엔드 통합

## Story 목록
- STORY-001: UI 레이아웃 (5 SP)
- STORY-002: 조건 입력 폼 (3 SP)
- STORY-003: 분자 카드 (5 SP)
- STORY-004: Mock 데이터 검증 (2 SP)
- STORY-005: FastAPI 구조 (3 SP)
- STORY-006: API Mock (5 SP)
- STORY-007: 통합 (3 SP)

Story Points: 26/26
Sprint: 2026-01-06 ~ 2026-01-17
```

**머지 후**:
```bash
# 로컬에서 main 업데이트
git checkout main
git pull origin main

# 스프린트 브랜치 삭제 (선택)
git branch -d sprint/sprint-01-molecule-generation
git push origin --delete sprint/sprint-01-molecule-generation
```

---

## 🚨 특수 상황 처리

### 핫픽스 (긴급 버그 수정)

```bash
# main에서 핫픽스 브랜치 생성
git checkout main
git pull origin main
git checkout -b hotfix/urgent-admet-crash

# 수정 작업
git add .
git commit -m "fix: ADMET 예측 시 null pointer 크래시 수정

- null 체크 추가
- 에러 메시지 개선

Issue: #245
Severity: Critical"

git push origin hotfix/urgent-admet-crash

# PR 생성 (즉시 리뷰 요청)
# 승인 후 main에 직접 머지
```

### 스프린트 중 우선순위 변경

**시나리오**: STORY-005를 STORY-003보다 먼저 해야 함

```bash
# 현재 작업 임시 저장
git stash save "STORY-003 진행 중"

# 우선순위 높은 스토리 작업
# ... (STORY-005 완료)
git commit -m "feat(STORY-005): ..."
git push origin sprint/sprint-01-molecule-generation

# 이전 작업 복구
git stash pop
# ... (STORY-003 계속)
```

### 스프린트 간 의존성

**시나리오**: Sprint 2가 Sprint 1 브랜치에 의존

```bash
# Sprint 1이 아직 머지 안 됨
# Sprint 2를 Sprint 1 브랜치에서 시작

git checkout sprint/sprint-01-molecule-generation
git pull origin sprint/sprint-01-molecule-generation
git checkout -b sprint/sprint-02-visualization

# Sprint 1이 머지되면 rebase
git checkout sprint/sprint-02-visualization
git rebase main
git push --force-with-lease origin sprint/sprint-02-visualization
```

---

## 📏 브랜치 정책 (GitHub Settings)

### main 브랜치 보호 규칙

**Settings → Branches → Branch protection rules**:

```yaml
Branch: main

Protection Rules:
  ✅ Require a pull request before merging
    - Require approvals: 2
    - Dismiss stale approvals
    
  ✅ Require status checks to pass
    - CI/CD Pipeline
    - Unit Tests
    - Lint Check
    - Security Scan
    
  ✅ Require conversation resolution
  
  ✅ Require linear history (Squash merge only)
  
  ✅ Do not allow bypassing (관리자도 규칙 준수)
  
  ❌ Allow force pushes (금지)
  ❌ Allow deletions (금지)
```

---

## 🔍 PR 템플릿

**`.github/PULL_REQUEST_TEMPLATE.md`**:

```markdown
## 📌 Sprint 정보
- **Sprint**: Sprint X - [주제]
- **기간**: YYYY-MM-DD ~ YYYY-MM-DD
- **Story Points**: X/X

## 🎯 Sprint 목표
[스프린트 목표 설명]

## 📋 Story 체크리스트
- [ ] STORY-XXX: [제목] (X SP)
- [ ] STORY-XXX: [제목] (X SP)
- [ ] STORY-XXX: [제목] (X SP)

## 🔄 변경 사항
### Frontend
- [변경사항]

### Backend
- [변경사항]

### Database
- [스키마 변경]

## ✅ 테스트
- [ ] Unit Tests (Coverage: X%)
- [ ] Integration Tests
- [ ] E2E Tests
- [ ] Manual Testing

## 📸 스크린샷 / 데모
[이미지 또는 GIF]

## 🐛 알려진 이슈
- 없음 / [이슈 설명]

## 📝 리뷰어 체크리스트
- [ ] 코드 품질
- [ ] 테스트 커버리지
- [ ] 문서화
- [ ] 보안
- [ ] 성능

## 🔗 관련 링크
- Sprint Plan: [링크]
- Design: [Figma 링크]
- API Docs: [Swagger 링크]
```

---

## 📊 Git 로그 시각화

### 스프린트 진행 상황 확인

```bash
# 스프린트 브랜치의 모든 스토리 커밋 보기
git log --oneline --grep="STORY-" sprint/sprint-01-molecule-generation

# 출력 예시:
# a1b2c3d feat(STORY-007): 프론트-백엔드 통합
# e4f5g6h feat(STORY-006): 분자 생성 API Mock
# i7j8k9l feat(STORY-005): FastAPI 기본 구조
# ...

# 그래프로 보기
git log --graph --oneline --all --decorate

# 특정 스토리의 변경사항
git show <commit-hash>
```

### 릴리즈 노트 자동 생성

```bash
# 스프린트 별 변경사항 추출
git log main..sprint/sprint-01-molecule-generation --pretty=format:"- %s" --grep="feat(STORY"

# 출력을 RELEASE_NOTES.md에 추가
```

---

## 🎬 실제 워크플로우 예시

### Day 1 (Sprint 시작)

```bash
# 1. 브랜치 생성
git checkout -b sprint/sprint-01-molecule-generation
git push -u origin sprint/sprint-01-molecule-generation

# 2. Draft PR 생성 (GitHub UI)

# 3. 첫 스토리 시작 (STORY-001)
# ... 개발 작업 ...

# 4. 커밋 & 푸시
git add .
git commit -m "feat(STORY-001): 분자 생성 UI 레이아웃 구현..."
git push origin sprint/sprint-01-molecule-generation

# 5. PR 업데이트 (체크박스 체크)
```

### Day 3 (중간)

```bash
# 여러 스토리 진행

git log --oneline
# a1b2c3d feat(STORY-003): 분자 카드 컴포넌트
# e4f5g6h feat(STORY-002): 조건 입력 폼
# i7j8k9l feat(STORY-001): UI 레이아웃

# 진행률: 3/7 스토리 (43%)
```

### Day 10 (스프린트 종료)

```bash
# 모든 스토리 완료
git log --oneline --grep="STORY-"
# 7개 커밋 확인

# PR을 Ready for Review로 전환
# 리뷰 요청 → 피드백 반영 → Approve → Squash Merge

# main에 머지 완료!
```

---

## 🤝 협업 가이드

### 동시 작업 시

**여러 개발자가 같은 스프린트 브랜치 작업**:

```bash
# 작업 전 항상 최신화
git checkout sprint/sprint-01-molecule-generation
git pull origin sprint/sprint-01-molecule-generation

# 작업 후 충돌 방지
git pull --rebase origin sprint/sprint-01-molecule-generation
git push origin sprint/sprint-01-molecule-generation
```

### 코드 리뷰 팁

**리뷰어**:
- 스토리별로 리뷰 (커밋 단위)
- "Files changed" 탭에서 파일별 검토
- 건설적 피드백
- Approve는 신중히

**작성자**:
- 리뷰 요청 시 컨텍스트 제공
- 빠른 응답 및 수정
- 감사 표현

---

## 📈 메트릭 및 KPI

### 추적 지표

| 메트릭 | 목표 | 측정 방법 |
|--------|------|----------|
| PR 리뷰 시간 | < 24시간 | GitHub Insights |
| 커밋 당 변경 줄 수 | < 500 | `git diff --stat` |
| 스프린트 완료율 | 100% | Story Points 달성 |
| 머지 충돌 발생률 | < 5% | PR 머지 기록 |
| CI/CD 통과율 | > 95% | GitHub Actions |

---

## 🛠️ 도구 및 자동화

### GitHub Actions 워크플로우

**`.github/workflows/sprint-check.yml`**:

```yaml
name: Sprint PR Check

on:
  pull_request:
    types: [opened, synchronize, ready_for_review]

jobs:
  sprint-validation:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Check Sprint Branch Name
        run: |
          if [[ ! ${{ github.head_ref }} =~ ^sprint/sprint-[0-9]+-.*$ ]]; then
            echo "❌ 브랜치 이름이 규칙에 맞지 않습니다"
            exit 1
          fi
      
      - name: Count Story Commits
        run: |
          STORY_COUNT=$(git log --oneline --grep="STORY-" | wc -l)
          echo "✅ Story 커밋 수: $STORY_COUNT"
      
      - name: Run Tests
        run: |
          npm test
          pytest
      
      - name: Lint Check
        run: |
          npm run lint
          ruff check .
```

---

## 📚 참고 자료

- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)

---

## ✅ 체크리스트 (팀원용)

### 스프린트 시작 시
- [ ] 스프린트 브랜치 생성
- [ ] Draft PR 생성
- [ ] Jira Epic 링크
- [ ] 팀원에게 공지

### 스토리 개발 중
- [ ] 커밋 메시지 규칙 준수
- [ ] 테스트 작성
- [ ] 문서 업데이트
- [ ] PR 체크리스트 업데이트

### 스프린트 종료 시
- [ ] 모든 스토리 완료 확인
- [ ] Ready for Review 전환
- [ ] 리뷰어 할당
- [ ] 스프린트 리뷰 참석
- [ ] 머지 후 브랜치 정리

---

**Last Updated**: 2026년 1월 3일  
**Version**: 1.0  
**Next Review**: Sprint 1 종료 후
