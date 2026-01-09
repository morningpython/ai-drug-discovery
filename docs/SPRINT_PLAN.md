# AI 신약 개발 플랫폼 - 스프린트 플랜

**프로젝트**: AI-Driven Drug Discovery Platform  
**방법론**: Agile Scrum (UI-First Approach)  
**스프린트 기간**: 2주  
**작성일**: 2026년 1월 3일

---

## 📋 EPIC 개요

| EPIC ID | EPIC 명 | 목표 | 총 Story Points |
|---------|---------|------|----------------|
| EPIC-001 | 분자 생성 및 시각화 | 사용자가 조건을 입력하고 AI가 생성한 분자를 시각화 | 55 |
| EPIC-002 | ADMET 예측 시스템 | 분자의 약물성 특성을 예측하고 분석 | 34 |
| EPIC-003 | 가상 스크리닝 플랫폼 | 대량 분자 라이브러리 도킹 및 히트 발굴 | 42 |
| EPIC-004 | 분자 최적화 워크플로우 | Lead 화합물을 다목적 최적화 | 47 |
| EPIC-005 | 프로젝트 관리 시스템 | 질환별 프로젝트 생성/관리/협업 | 29 |

**총 Story Points**: 207

---

## 🚀 Sprint 1 (Week 1-2): "첫 분자 생성 데모"

**목표**: 사용자가 웹에서 조건을 입력하고 AI 생성 분자를 보는 첫 번째 End-to-End 경험

### EPIC-001: 분자 생성 및 시각화

#### 📌 STORY-001: 분자 생성 UI 레이아웃
- **Story ID**: STORY-001
- **Story Points**: 5
- **Description**: 분자 생성을 위한 기본 웹 페이지 레이아웃 구축
- **User Story**:
  ```
  AS a drug discovery researcher
  I WANT to see a clean interface for molecule generation
  SO THAT I can easily input conditions and view results
  ```
- **Acceptance Criteria**:
  - [ ] 헤더 네비게이션 (로고, 메뉴)
  - [ ] 좌측: 조건 입력 패널 (폼 UI)
  - [ ] 우측: 결과 표시 영역 (그리드)
  - [ ] 반응형 디자인 (데스크톱 우선)
  - [ ] TailwindCSS + shadcn/ui 컴포넌트
- **Tasks**:
  - Next.js 프로젝트 초기화
  - 레이아웃 컴포넌트 생성
  - 라우팅 설정 (/generate 페이지)

---

#### 📌 STORY-002: 조건 입력 폼 구현
- **Story ID**: STORY-002
- **Story Points**: 3
- **Description**: 분자 생성 조건을 입력하는 폼 UI
- **User Story**:
  ```
  AS a researcher
  I WANT to input generation conditions (target disease, molecular properties)
  SO THAT I can specify what kind of molecules I need
  ```
- **Acceptance Criteria**:
  - [x] 타겟 질환 선택 (드롭다운: HBV, GLP-1, Alzheimer's, Hair Loss)
  - [x] 분자 개수 슬라이더 (10-100)
  - [x] 고급 옵션 (토글): MW 범위, LogP 범위
  - [x] "생성하기" 버튼
  - [x] 폼 밸리데이션 (react-hook-form)
- **Tasks**:
  - 폼 컴포넌트 개발
  - Zod 스키마 정의
  - 상태 관리 (Zustand)
- **Status**: ✅ COMPLETED (2026-01-09)

---

#### 📌 STORY-003: 분자 카드 컴포넌트
- **Story ID**: STORY-003
- **Story Points**: 5
- **Description**: 생성된 분자를 표시하는 카드 UI
- **User Story**:
  ```
  AS a researcher
  I WANT to see each generated molecule in a card with 2D structure
  SO THAT I can quickly browse results
  ```
- **Acceptance Criteria**:
  - [x] 분자 2D 구조 이미지 (RDKit 서버 렌더링)
  - [x] SMILES 문자열 표시 (복사 가능)
  - [x] 기본 특성 표시 (MW, LogP, TPSA)
  - [x] "상세보기" 버튼
  - [x] 그리드 레이아웃 (3열)
- **Tasks**:
  - MoleculeCard 컴포넌트
  - 이미지 렌더링 API 연동
  - 클립보드 복사 기능
- **Status**: ✅ COMPLETED (2026-01-09)

---

#### 📌 STORY-004: Mock 데이터로 UI 동작 검증
- **Story ID**: STORY-004
- **Story Points**: 2
- **Description**: 백엔드 없이 Mock 데이터로 UI 플로우 검증
- **User Story**:
  ```
  AS a frontend developer
  I WANT to test the UI with mock molecule data
  SO THAT I can verify the user experience before backend integration
  ```
- **Acceptance Criteria**:
  - [x] Mock 분자 데이터 (JSON 파일)
  - [x] 로딩 상태 UI (Skeleton)
  - [x] 에러 상태 UI (Toast)
  - [x] 성공 플로우 시뮬레이션
- **Tasks**:
  - Mock 데이터 생성
  - 로딩/에러 핸들링
  - 상태 전환 테스트
- **Status**: ✅ COMPLETED (2026-01-09)

---

#### 📌 STORY-005: FastAPI 기본 구조 및 Health Check
- **Story ID**: STORY-005
- **Story Points**: 3
- **Description**: 백엔드 API 서버 기본 구조 설정
- **User Story**:
  ```
  AS a backend developer
  I WANT to set up a FastAPI server with basic endpoints
  SO THAT I can provide APIs for the frontend
  ```
- **Acceptance Criteria**:
  - [ ] FastAPI 프로젝트 구조 (app/, models/, routes/)
  - [ ] `/health` 엔드포인트 (200 OK)
  - [ ] CORS 설정 (프론트엔드 허용)
  - [ ] Pydantic 스키마 정의
  - [ ] Docker 컨테이너 설정
- **Tasks**:
  - Poetry 의존성 설정
  - main.py 작성
  - Dockerfile 작성

---

#### 📌 STORY-006: 간단한 분자 생성 API (Mock)
- **Story ID**: STORY-006
- **Story Points**: 5
- **Description**: 랜덤 SMILES 생성 API (실제 AI 없이 ChEMBL 샘플링)
- **User Story**:
  ```
  AS a frontend developer
  I WANT to call a /generate endpoint and get molecule data
  SO THAT I can integrate the UI with real HTTP calls
  ```
- **Acceptance Criteria**:
  - [ ] `POST /api/v1/generate` 엔드포인트
  - [ ] Request: `{ target_disease, num_samples, constraints }`
  - [ ] Response: `{ molecules: [{ smiles, properties }] }`
  - [ ] ChEMBL에서 랜덤 샘플링 (조건 필터링)
  - [ ] RDKit로 기본 특성 계산
- **Tasks**:
  - 엔드포인트 구현
  - ChEMBL 데이터 로드
  - RDKit 통합

---

#### 📌 STORY-007: 프론트-백엔드 통합
- **Story ID**: STORY-007
- **Story Points**: 3
- **Description**: UI에서 실제 API 호출로 전환
- **User Story**:
  ```
  AS a user
  I WANT to click "생성하기" and see real molecules from the backend
  SO THAT I can experience the first working demo
  ```
- **Acceptance Criteria**:
  - [ ] React Query로 API 호출
  - [ ] 로딩 스피너 표시
  - [ ] 성공 시 결과 렌더링
  - [ ] 에러 핸들링 (Toast 메시지)
  - [ ] 재시도 로직
- **Tasks**:
  - API 클라이언트 작성
  - Query hook 작성
  - 에러 바운더리

---

**Sprint 1 총 Story Points**: 26  
**Sprint 1 Goal**: "사용자가 웹에서 버튼을 누르면 분자 10개가 생성되어 화면에 표시되는 첫 데모 완성"

---

## 🚀 Sprint 2 (Week 3-4): "분자 상세 정보 및 2D/3D 시각화"

**목표**: 생성된 분자의 상세 정보를 보고 3D로 회전시킬 수 있는 기능

### EPIC-001: 분자 생성 및 시각화 (계속)

#### 📌 STORY-008: 분자 상세 페이지 UI
- **Story ID**: STORY-008
- **Story Points**: 5
- **Description**: 개별 분자의 상세 정보를 보여주는 페이지
- **User Story**:
  ```
  AS a researcher
  I WANT to click on a molecule card and see detailed information
  SO THAT I can analyze specific compounds in depth
  ```
- **Acceptance Criteria**:
  - [ ] `/molecule/[id]` 동적 라우팅
  - [ ] 좌측: 분자 구조 (2D/3D 탭 전환)
  - [ ] 우측: 속성 테이블 (MW, LogP, HBD, HBA 등)
  - [ ] SMILES, InChI 표시
  - [ ] "프로젝트에 추가" 버튼
- **Tasks**:
  - 상세 페이지 레이아웃
  - 탭 컴포넌트 (2D/3D)
  - 속성 테이블

---

#### 📌 STORY-009: 3D 분자 뷰어 통합
- **Story ID**: STORY-009
- **Story Points**: 8
- **Description**: 3Dmol.js를 사용한 인터랙티브 3D 시각화
- **User Story**:
  ```
  AS a researcher
  I WANT to rotate and zoom a molecule in 3D
  SO THAT I can understand its spatial structure
  ```
- **Acceptance Criteria**:
  - [ ] 3Dmol.js React 컴포넌트
  - [ ] SMILES → 3D 좌표 변환 (RDKit API)
  - [ ] 마우스 드래그로 회전
  - [ ] 스타일 옵션 (stick, sphere, cartoon)
  - [ ] 전체화면 모드
- **Tasks**:
  - 3Dmol 라이브러리 통합
  - 3D 좌표 생성 API
  - 인터랙션 핸들러

---

#### 📌 STORY-010: 분자 속성 계산 API 확장
- **Story ID**: STORY-010
- **Story Points**: 5
- **Description**: RDKit로 상세 분자 특성 계산
- **User Story**:
  ```
  AS a backend developer
  I WANT to calculate comprehensive molecular properties
  SO THAT users can see detailed drug-like characteristics
  ```
- **Acceptance Criteria**:
  - [ ] `GET /api/v1/molecules/{smiles}/properties` 엔드포인트
  - [ ] 계산 항목: MW, LogP, TPSA, HBD, HBA, Rotatable Bonds
  - [ ] Lipinski's Rule of 5 평가
  - [ ] QED (정량적 약물성) 점수
  - [ ] 캐싱 (Redis)
- **Tasks**:
  - RDKit Descriptors 활용
  - 엔드포인트 구현
  - Redis 캐싱

---

#### 📌 STORY-011: 분자 유사성 검색 UI
- **Story ID**: STORY-011
- **Story Points**: 5
- **Description**: 선택한 분자와 유사한 분자 찾기
- **User Story**:
  ```
  AS a researcher
  I WANT to find molecules similar to a selected compound
  SO THAT I can explore chemical space around interesting hits
  ```
- **Acceptance Criteria**:
  - [ ] 상세 페이지에 "유사 분자 찾기" 버튼
  - [ ] 유사도 임계값 슬라이더 (Tanimoto > 0.7)
  - [ ] 결과: 유사 분자 목록 (카드 그리드)
  - [ ] 유사도 점수 표시
- **Tasks**:
  - 유사성 검색 UI
  - API 호출 통합
  - 결과 렌더링

---

#### 📌 STORY-012: 분자 유사성 검색 API
- **Story ID**: STORY-012
- **Story Points**: 8
- **Description**: Fingerprint 기반 유사성 검색
- **User Story**:
  ```
  AS a backend developer
  I WANT to implement Tanimoto similarity search
  SO THAT users can find chemically similar molecules
  ```
- **Acceptance Criteria**:
  - [ ] `POST /api/v1/search/similar` 엔드포인트
  - [ ] Morgan Fingerprint 생성
  - [ ] Tanimoto 계수 계산
  - [ ] 상위 N개 유사 분자 반환
  - [ ] 인덱싱 최적화 (벡터 DB 준비)
- **Tasks**:
  - Fingerprint 생성
  - 유사도 계산 알고리즘
  - 성능 최적화

---

**Sprint 2 총 Story Points**: 31  
**Sprint 2 Goal**: "사용자가 분자를 클릭하면 3D로 회전시키고 유사 분자를 찾을 수 있는 경험"

---

## 🚀 Sprint 3 (Week 5-6): "ADMET 예측 시스템"

**목표**: 분자의 약물성 특성을 AI로 예측하고 시각화

### EPIC-002: ADMET 예측 시스템

#### 📌 STORY-013: ADMET 예측 결과 UI
- **Story ID**: STORY-013
- **Story Points**: 5
- **Description**: ADMET 예측 결과를 보여주는 대시보드
- **User Story**:
  ```
  AS a researcher
  I WANT to see ADMET predictions for a molecule
  SO THAT I can assess its drug-likeness
  ```
- **Acceptance Criteria**:
  - [ ] 5개 카테고리 (A/D/M/E/T) 섹션
  - [ ] 각 항목: 예측값, 신뢰도, 통과/실패 표시
  - [ ] Radar Chart (5개 지표 시각화)
  - [ ] 상세 설명 툴팁
  - [ ] 전체 ADMET 점수 (0-100)
- **Tasks**:
  - ADMET 대시보드 컴포넌트
  - Chart.js/Recharts 통합
  - 점수 계산 로직

---

#### 📌 STORY-014: ADMET 예측 트리거 버튼
- **Story ID**: STORY-014
- **Story Points**: 2
- **Description**: 분자 상세 페이지에서 ADMET 예측 실행
- **User Story**:
  ```
  AS a researcher
  I WANT to click "ADMET 예측" button
  SO THAT I can get drug-likeness predictions on demand
  ```
- **Acceptance Criteria**:
  - [ ] "ADMET 예측" 버튼
  - [ ] 로딩 상태 (스피너, 진행률)
  - [ ] 결과 캐싱 (이미 예측된 경우 즉시 표시)
  - [ ] 에러 핸들링
- **Tasks**:
  - 버튼 컴포넌트
  - API 호출 로직
  - 상태 관리

---

#### 📌 STORY-015: 사전학습 ADMET 모델 준비
- **Story ID**: STORY-015
- **Story Points**: 8
- **Description**: 공개 데이터로 훈련된 ADMET 모델 로드
- **User Story**:
  ```
  AS a ML engineer
  I WANT to load a pre-trained ADMET prediction model
  SO THAT I can provide predictions without training from scratch
  ```
- **Acceptance Criteria**:
  - [ ] Chemprop 또는 공개 모델 다운로드
  - [ ] 모델 서빙 구조 (FastAPI + PyTorch)
  - [ ] 5가지 ADMET 예측 (Absorption, Distribution, Metabolism, Excretion, Toxicity)
  - [ ] 배치 추론 지원
- **Tasks**:
  - 모델 다운로드 스크립트
  - 추론 파이프라인
  - 모델 파일 저장 (Azure Blob)

---

#### 📌 STORY-016: ADMET 예측 API 구현
- **Story ID**: STORY-016
- **Story Points**: 8
- **Description**: ADMET 예측 엔드포인트
- **User Story**:
  ```
  AS a backend developer
  I WANT to expose an ADMET prediction API
  SO THAT the frontend can get predictions
  ```
- **Acceptance Criteria**:
  - [ ] `POST /api/v1/predict/admet` 엔드포인트
  - [ ] Request: `{ smiles: string }`
  - [ ] Response: `{ absorption: float, distribution: float, ... }`
  - [ ] 추론 시간 < 2초
  - [ ] 결과 Cosmos DB 저장
- **Tasks**:
  - 엔드포인트 구현
  - 모델 추론 호출
  - DB 저장

---

#### 📌 STORY-017: Batch ADMET 예측
- **Story ID**: STORY-017
- **Story Points**: 5
- **Description**: 여러 분자를 한 번에 예측
- **User Story**:
  ```
  AS a researcher
  I WANT to select multiple molecules and predict ADMET in batch
  SO THAT I can save time
  ```
- **Acceptance Criteria**:
  - [ ] 분자 목록에서 체크박스 선택
  - [ ] "선택 항목 ADMET 예측" 버튼
  - [ ] 진행률 표시 (5/20 완료)
  - [ ] 결과 테이블 (정렬/필터 가능)
  - [ ] CSV 내보내기
- **Tasks**:
  - Batch UI 구현
  - 진행률 트래킹
  - 결과 테이블

---

#### 📌 STORY-018: Cosmos DB 스키마 및 연결
- **Story ID**: STORY-018
- **Story Points**: 5
- **Description**: Azure Cosmos DB 설정 및 연결
- **User Story**:
  ```
  AS a backend developer
  I WANT to store molecules and predictions in Cosmos DB
  SO THAT data persists across sessions
  ```
- **Acceptance Criteria**:
  - [ ] Cosmos DB 계정 생성 (Serverless)
  - [ ] `molecules` 컨테이너 (파티션 키: project_id)
  - [ ] `predictions` 컨테이너
  - [ ] Python SDK 연결
  - [ ] CRUD 헬퍼 함수
- **Tasks**:
  - Azure 리소스 생성
  - SDK 설정
  - 데이터 모델 정의

---

**Sprint 3 총 Story Points**: 33  
**Sprint 3 Goal**: "사용자가 분자의 ADMET 특성을 AI로 예측하고 Radar Chart로 시각화"

---

## 🚀 Sprint 4 (Week 7-8): "프로젝트 관리 시스템"

**목표**: 질환별 프로젝트를 생성하고 분자를 관리하는 워크스페이스

### EPIC-005: 프로젝트 관리 시스템

#### 📌 STORY-019: 프로젝트 대시보드 UI
- **Story ID**: STORY-019
- **Story Points**: 5
- **Description**: 모든 프로젝트를 보여주는 메인 대시보드
- **User Story**:
  ```
  AS a researcher
  I WANT to see all my drug discovery projects in one place
  SO THAT I can organize work by disease target
  ```
- **Acceptance Criteria**:
  - [ ] 프로젝트 카드 그리드
  - [ ] 각 카드: 프로젝트명, 타겟 질환, 진행률, 분자 개수
  - [ ] "새 프로젝트" 버튼
  - [ ] 필터: 질환별, 날짜별
  - [ ] 검색 기능
- **Tasks**:
  - 대시보드 레이아웃
  - 프로젝트 카드 컴포넌트
  - 필터/검색 UI

---

#### 📌 STORY-020: 프로젝트 생성 모달
- **Story ID**: STORY-020
- **Story Points**: 3
- **Description**: 새 프로젝트 생성 폼
- **User Story**:
  ```
  AS a researcher
  I WANT to create a new project with target disease and parameters
  SO THAT I can organize molecules by research goal
  ```
- **Acceptance Criteria**:
  - [ ] 모달 다이얼로그
  - [ ] 입력 필드: 프로젝트명, 설명, 타겟 질환, 타겟 단백질
  - [ ] 드롭다운: HBV, GLP-1, Alzheimer's, Hair Loss
  - [ ] "생성" 버튼
  - [ ] 생성 후 프로젝트 페이지로 이동
- **Tasks**:
  - 모달 컴포넌트
  - 폼 밸리데이션
  - API 호출

---

#### 📌 STORY-021: 프로젝트 상세 페이지
- **Story ID**: STORY-021
- **Story Points**: 5
- **Description**: 개별 프로젝트의 분자 목록 및 통계
- **User Story**:
  ```
  AS a researcher
  I WANT to see all molecules in a project
  SO THAT I can track candidates for a specific disease
  ```
- **Acceptance Criteria**:
  - [ ] 프로젝트 헤더 (이름, 타겟, 생성일)
  - [ ] 통계 카드 (총 분자, 히트, 테스트 중)
  - [ ] 분자 테이블 (정렬, 필터)
  - [ ] "분자 생성" 버튼 (프로젝트 컨텍스트)
  - [ ] "분자 추가" (기존 분자 임포트)
- **Tasks**:
  - 프로젝트 페이지 레이아웃
  - 통계 대시보드
  - 분자 테이블

---

#### 📌 STORY-022: 프로젝트 CRUD API
- **Story ID**: STORY-022
- **Story Points**: 5
- **Description**: 프로젝트 생성/조회/수정/삭제 API
- **User Story**:
  ```
  AS a backend developer
  I WANT to implement project management APIs
  SO THAT users can organize their work
  ```
- **Acceptance Criteria**:
  - [ ] `POST /api/v1/projects` - 생성
  - [ ] `GET /api/v1/projects` - 목록 조회
  - [ ] `GET /api/v1/projects/{id}` - 상세 조회
  - [ ] `PUT /api/v1/projects/{id}` - 수정
  - [ ] `DELETE /api/v1/projects/{id}` - 삭제
  - [ ] Cosmos DB 저장
- **Tasks**:
  - 엔드포인트 구현
  - Pydantic 모델
  - DB 연동

---

#### 📌 STORY-023: 프로젝트-분자 연결
- **Story ID**: STORY-023
- **Story Points**: 3
- **Description**: 분자를 프로젝트에 할당
- **User Story**:
  ```
  AS a researcher
  I WANT to add molecules to a project
  SO THAT I can organize candidates by target
  ```
- **Acceptance Criteria**:
  - [ ] 분자 생성 시 프로젝트 선택
  - [ ] 기존 분자를 프로젝트에 추가
  - [ ] 분자에 `project_id` 필드
  - [ ] 프로젝트별 분자 필터링
- **Tasks**:
  - 프로젝트 선택 UI
  - API 파라미터 추가
  - DB 쿼리

---

#### 📌 STORY-024: 프로젝트 통계 API
- **Story ID**: STORY-024
- **Story Points**: 3
- **Description**: 프로젝트 통계 계산
- **User Story**:
  ```
  AS a researcher
  I WANT to see project statistics (total molecules, hits, etc.)
  SO THAT I can track progress
  ```
- **Acceptance Criteria**:
  - [ ] `GET /api/v1/projects/{id}/stats` 엔드포인트
  - [ ] 통계: total_molecules, validated_hits, avg_admet_score
  - [ ] 그래프 데이터 (시간별 분자 생성 추이)
  - [ ] 캐싱 (1분)
- **Tasks**:
  - 통계 계산 로직
  - Aggregation 쿼리
  - 엔드포인트 구현

---

**Sprint 4 총 Story Points**: 24  
**Sprint 4 Goal**: "사용자가 질환별 프로젝트를 만들고 분자를 조직화할 수 있는 워크스페이스"

---

## 🚀 Sprint 5 (Week 9-10): "AI 분자 생성 엔진 (실제 모델)"

**목표**: Mock에서 실제 Transformer 기반 분자 생성 AI로 전환

### EPIC-001: 분자 생성 및 시각화 (AI 통합)

#### 📌 STORY-025: Transformer 분자 생성 모델 로드
- **Story ID**: STORY-025
- **Story Points**: 13
- **Description**: MolGPT/ChemGPT 사전학습 모델 통합
- **User Story**:
  ```
  AS a ML engineer
  I WANT to load a pre-trained molecular generation model
  SO THAT I can generate novel molecules with AI
  ```
- **Acceptance Criteria**:
  - [ ] HuggingFace Transformers 모델 다운로드
  - [ ] SMILES 토크나이저 로드
  - [ ] 생성 파이프라인 (temperature, top-k, top-p)
  - [ ] GPU 추론 (CUDA)
  - [ ] 배치 생성 지원
- **Tasks**:
  - 모델 선정 (MolGPT, ChemBERTa)
  - 추론 코드 작성
  - GPU 설정

---

#### 📌 STORY-026: 조건부 생성 (Conditional Generation)
- **Story ID**: STORY-026
- **Story Points**: 8
- **Description**: 타겟 질환에 따른 조건부 생성
- **User Story**:
  ```
  AS a researcher
  I WANT to generate molecules optimized for a specific disease
  SO THAT candidates are relevant to my research goal
  ```
- **Acceptance Criteria**:
  - [ ] 질환별 프롬프트 엔지니어링
  - [ ] 예: "Generate a JAK inhibitor for hair loss: [START]"
  - [ ] 제약조건 필터링 (MW, LogP 범위)
  - [ ] 유효 SMILES만 반환
  - [ ] 중복 제거
- **Tasks**:
  - 프롬프트 템플릿
  - 조건부 생성 로직
  - 후처리 필터

---

#### 📌 STORY-027: 생성 모델 API로 교체
- **Story ID**: STORY-027
- **Story Points**: 5
- **Description**: Mock API를 실제 AI 모델로 교체
- **User Story**:
  ```
  AS a user
  I WANT to generate truly novel molecules with AI
  SO THAT I can discover new drug candidates
  ```
- **Acceptance Criteria**:
  - [ ] `/api/v1/generate` 엔드포인트 로직 변경
  - [ ] Celery 비동기 작업으로 전환
  - [ ] 작업 상태 폴링 (`/api/v1/jobs/{id}`)
  - [ ] 생성 시간 2-5분
  - [ ] 결과 Cosmos DB 저장
- **Tasks**:
  - Celery task 작성
  - 작업 큐 설정
  - 상태 API

---

#### 📌 STORY-028: 작업 진행률 UI
- **Story ID**: STORY-028
- **Story Points**: 5
- **Description**: 분자 생성 진행률 표시
- **User Story**:
  ```
  AS a researcher
  I WANT to see generation progress in real-time
  SO THAT I know the job is running
  ```
- **Acceptance Criteria**:
  - [ ] 진행률 바 (0-100%)
  - [ ] 상태 메시지 ("분자 생성 중... 45/100")
  - [ ] 완료 시 자동 새로고침
  - [ ] "취소" 버튼
  - [ ] WebSocket 또는 폴링 (1초마다)
- **Tasks**:
  - 진행률 컴포넌트
  - 폴링 로직
  - WebSocket (선택)

---

#### 📌 STORY-029: 생성 히스토리
- **Story ID**: STORY-029
- **Story Points**: 3
- **Description**: 과거 생성 작업 목록
- **User Story**:
  ```
  AS a researcher
  I WANT to see my past generation jobs
  SO THAT I can revisit previous results
  ```
- **Acceptance Criteria**:
  - [ ] 프로젝트 페이지에 "생성 히스토리" 탭
  - [ ] 테이블: 날짜, 조건, 상태, 결과 개수
  - [ ] "결과 보기" 링크
  - [ ] 필터: 성공/실패
- **Tasks**:
  - 히스토리 테이블
  - API 연동
  - 상태 표시

---

**Sprint 5 총 Story Points**: 34  
**Sprint 5 Goal**: "실제 Transformer AI로 새로운 분자를 생성하고 진행률을 실시간으로 확인"

---

## 🚀 Sprint 6 (Week 11-12): "가상 스크리닝 - 도킹 시뮬레이션"

**목표**: 단백질 타겟에 대한 분자 도킹 및 히트 발굴

### EPIC-003: 가상 스크리닝 플랫폼

#### 📌 STORY-030: 도킹 실행 UI
- **Story ID**: STORY-030
- **Story Points**: 5
- **Description**: 도킹 시뮬레이션 실행 인터페이스
- **User Story**:
  ```
  AS a researcher
  I WANT to dock molecules against a protein target
  SO THAT I can identify binding candidates
  ```
- **Acceptance Criteria**:
  - [ ] 타겟 단백질 선택 (드롭다운: GLP-1R, JAK1, HBsAg)
  - [ ] 분자 선택 (체크박스 또는 전체)
  - [ ] "도킹 시작" 버튼
  - [ ] 설정: 도킹 박스 좌표 (옵션)
  - [ ] 결과 예상 시간 표시
- **Tasks**:
  - 도킹 UI 페이지
  - 단백질 선택 로직
  - 분자 선택

---

#### 📌 STORY-031: 도킹 결과 시각화
- **Story ID**: STORY-031
- **Story Points**: 8
- **Description**: 단백질-리간드 복합체 3D 시각화
- **User Story**:
  ```
  AS a researcher
  I WANT to see how a molecule binds to a protein in 3D
  SO THAT I can understand binding interactions
  ```
- **Acceptance Criteria**:
  - [ ] NGL Viewer 통합
  - [ ] 단백질 (cartoon) + 리간드 (stick)
  - [ ] 수소결합 표시 (점선)
  - [ ] 바인딩 포켓 하이라이트
  - [ ] Affinity 점수 표시
- **Tasks**:
  - NGL Viewer 컴포넌트
  - 도킹 결과 파일 로드
  - 인터랙션 렌더링

---

#### 📌 STORY-032: AutoDock Vina 통합
- **Story ID**: STORY-032
- **Story Points**: 13
- **Description**: AutoDock Vina 도킹 엔진 통합
- **User Story**:
  ```
  AS a backend developer
  I WANT to run molecular docking simulations
  SO THAT I can predict binding affinity
  ```
- **Acceptance Criteria**:
  - [ ] AutoDock Vina 설치 (Docker)
  - [ ] SMILES → 3D 구조 생성 (RDKit)
  - [ ] PDBQT 파일 생성
  - [ ] Vina 실행 (subprocess)
  - [ ] 결과 파싱 (affinity, RMSD)
- **Tasks**:
  - Vina 설치 스크립트
  - 도킹 파이프라인
  - 결과 파서

---

#### 📌 STORY-033: 도킹 작업 큐
- **Story ID**: STORY-033
- **Story Points**: 5
- **Description**: 도킹을 비동기 작업으로 처리
- **User Story**:
  ```
  AS a backend developer
  I WANT to queue docking jobs
  SO THAT multiple requests don't block the server
  ```
- **Acceptance Criteria**:
  - [ ] Celery task for docking
  - [ ] 작업 상태: queued, running, completed, failed
  - [ ] 진행률 업데이트 (5/20 완료)
  - [ ] 결과 Blob Storage 저장
  - [ ] Cosmos DB에 메타데이터
- **Tasks**:
  - Celery task 작성
  - 상태 관리
  - 스토리지 통합

---

#### 📌 STORY-034: 히트 화합물 필터링
- **Story ID**: STORY-034
- **Story Points**: 3
- **Description**: 도킹 결과에서 히트 화합물 필터
- **User Story**:
  ```
  AS a researcher
  I WANT to see only molecules with good binding affinity
  SO THAT I can focus on promising candidates
  ```
- **Acceptance Criteria**:
  - [ ] 필터: Affinity < -8 kcal/mol
  - [ ] 정렬: Affinity 오름차순
  - [ ] "히트로 표시" 태그
  - [ ] 히트 목록 별도 탭
  - [ ] CSV 내보내기
- **Tasks**:
  - 필터 UI
  - 정렬 로직
  - 내보내기 기능

---

**Sprint 6 총 Story Points**: 34  
**Sprint 6 Goal**: "사용자가 분자를 단백질에 도킹하고 바인딩 포즈를 3D로 확인"

---

## 🚀 Sprint 7 (Week 13-14): "분자 최적화 (강화학습)"

**목표**: Lead 화합물을 다목적 최적화하는 AI 워크플로우

### EPIC-004: 분자 최적화 워크플로우

#### 📌 STORY-035: 최적화 시작 UI
- **Story ID**: STORY-035
- **Story Points**: 5
- **Description**: 분자 최적화 시작 인터페이스
- **User Story**:
  ```
  AS a researcher
  I WANT to select a lead molecule and start optimization
  SO THAT I can improve its drug-like properties
  ```
- **Acceptance Criteria**:
  - [ ] "최적화" 버튼 (분자 상세 페이지)
  - [ ] 목표 설정 폼 (ADMET 개선, 친화도 향상)
  - [ ] 가중치 슬라이더 (각 목표별 중요도)
  - [ ] "최적화 시작" 버튼
  - [ ] 예상 소요 시간 (10-30분)
- **Tasks**:
  - 최적화 폼 UI
  - 목표 설정 로직
  - API 호출

---

#### 📌 STORY-036: 최적화 진행 경로 시각화
- **Story ID**: STORY-036
- **Story Points**: 8
- **Description**: 최적화 과정의 분자 변화 시각화
- **User Story**:
  ```
  AS a researcher
  I WANT to see how the molecule evolves during optimization
  SO THAT I can understand the improvement process
  ```
- **Acceptance Criteria**:
  - [ ] 타임라인 뷰 (초기 → 중간 → 최종)
  - [ ] 각 단계 분자 구조 표시
  - [ ] 특성 변화 그래프 (ADMET 점수, 친화도)
  - [ ] "이 단계 채택" 버튼
  - [ ] 애니메이션 (옵션)
- **Tasks**:
  - 타임라인 컴포넌트
  - 그래프 시각화
  - 단계별 렌더링

---

#### 📌 STORY-037: 강화학습 최적화 엔진
- **Story ID**: STORY-037
- **Story Points**: 13
- **Description**: PPO 기반 분자 최적화
- **User Story**:
  ```
  AS a ML engineer
  I WANT to implement RL-based molecule optimization
  SO THAT I can improve multiple objectives simultaneously
  ```
- **Acceptance Criteria**:
  - [ ] Gym Environment (분자 수정 액션)
  - [ ] Reward 함수 (ADMET + 친화도 + 합성성)
  - [ ] PPO 에이전트 (Stable-Baselines3)
  - [ ] 100-500 스텝 최적화
  - [ ] 최적 경로 저장
- **Tasks**:
  - RL 환경 구현
  - Reward 함수 설계
  - 학습/추론 파이프라인

---

#### 📌 STORY-038: 최적화 API
- **Story ID**: STORY-038
- **Story Points**: 5
- **Description**: 최적화 실행 엔드포인트
- **User Story**:
  ```
  AS a backend developer
  I WANT to expose an optimization API
  SO THAT the frontend can trigger optimization jobs
  ```
- **Acceptance Criteria**:
  - [ ] `POST /api/v1/optimize` 엔드포인트
  - [ ] Request: `{ initial_smiles, objectives, weights }`
  - [ ] Celery 비동기 작업
  - [ ] 진행률 업데이트
  - [ ] 결과: 최적화된 분자 + 경로
- **Tasks**:
  - 엔드포인트 구현
  - Celery task
  - 결과 저장

---

#### 📌 STORY-039: 최적화 결과 비교
- **Story ID**: STORY-039
- **Story Points**: 5
- **Description**: 초기 vs 최적화 분자 비교
- **User Story**:
  ```
  AS a researcher
  I WANT to compare the original and optimized molecules side-by-side
  SO THAT I can evaluate the improvement
  ```
- **Acceptance Criteria**:
  - [ ] 좌우 분할 뷰 (Before | After)
  - [ ] 구조 비교 (2D/3D)
  - [ ] 특성 테이블 비교
  - [ ] 개선율 표시 (ADMET +15%, Affinity -1.2)
  - [ ] "최적화 분자 저장" 버튼
- **Tasks**:
  - 비교 UI
  - 차이 계산
  - 저장 기능

---

**Sprint 7 총 Story Points**: 36  
**Sprint 7 Goal**: "사용자가 Lead 분자를 선택하고 AI로 최적화하여 개선된 후보를 얻음"

---

## 🚀 Sprint 8 (Week 15-16): "데이터 분석 및 리포트"

**목표**: 프로젝트 전체 데이터 분석 및 리포트 생성

### EPIC-005: 프로젝트 관리 시스템 (고급 기능)

#### 📌 STORY-040: 분자 라이브러리 분석 대시보드
- **Story ID**: STORY-040
- **Story Points**: 8
- **Description**: 프로젝트 분자들의 화학공간 분석
- **User Story**:
  ```
  AS a researcher
  I WANT to visualize the chemical space of my molecule library
  SO THAT I can understand diversity and coverage
  ```
- **Acceptance Criteria**:
  - [ ] t-SNE/PCA 2D 플롯 (분자 클러스터링)
  - [ ] 특성 분포 히스토그램 (MW, LogP)
  - [ ] Lipinski's Rule 통과율 파이 차트
  - [ ] ADMET 점수 분포
  - [ ] 인터랙티브 (클릭 → 분자 상세)
- **Tasks**:
  - 차원 축소 (scikit-learn)
  - 플롯 시각화 (Plotly)
  - 인터랙션 핸들러

---

#### 📌 STORY-041: 프로젝트 리포트 생성
- **Story ID**: STORY-041
- **Story Points**: 8
- **Description**: PDF 리포트 자동 생성
- **User Story**:
  ```
  AS a researcher
  I WANT to generate a project report
  SO THAT I can share results with my team
  ```
- **Acceptance Criteria**:
  - [ ] "리포트 생성" 버튼
  - [ ] 내용: 프로젝트 개요, 통계, 상위 히트 분자
  - [ ] 차트/그래프 포함
  - [ ] PDF 다운로드
  - [ ] 템플릿 커스터마이징
- **Tasks**:
  - PDF 생성 라이브러리 (ReportLab/WeasyPrint)
  - 리포트 템플릿
  - 다운로드 API

---

#### 📌 STORY-042: 실험 결과 추적
- **Story ID**: STORY-042
- **Story Points**: 5
- **Description**: 실험 데이터 기록 및 추적
- **User Story**:
  ```
  AS a researcher
  I WANT to record in-vitro/in-vivo experiment results
  SO THAT I can track validation progress
  ```
- **Acceptance Criteria**:
  - [ ] 분자 상세 페이지에 "실험 추가" 버튼
  - [ ] 폼: 실험 타입, 결과, 메모
  - [ ] 실험 히스토리 타임라인
  - [ ] 상태 업데이트 (Candidate → In Testing → Validated)
  - [ ] 필터: 실험 상태별
- **Tasks**:
  - 실험 폼 UI
  - API 구현
  - 타임라인 컴포넌트

---

#### 📌 STORY-043: 협업 기능 - 코멘트
- **Story ID**: STORY-043
- **Story Points**: 5
- **Description**: 분자에 코멘트 및 토론
- **User Story**:
  ```
  AS a team member
  I WANT to leave comments on molecules
  SO THAT I can discuss with colleagues
  ```
- **Acceptance Criteria**:
  - [ ] 코멘트 섹션 (분자 상세 페이지 하단)
  - [ ] 텍스트 입력 + "게시" 버튼
  - [ ] 코멘트 목록 (작성자, 날짜)
  - [ ] 멘션 기능 (@username)
  - [ ] 알림 (선택)
- **Tasks**:
  - 코멘트 UI
  - API 구현
  - 멘션 파싱

---

#### 📌 STORY-044: 즐겨찾기 및 태그
- **Story ID**: STORY-044
- **Story Points**: 3
- **Description**: 분자 즐겨찾기 및 커스텀 태그
- **User Story**:
  ```
  AS a researcher
  I WANT to bookmark and tag molecules
  SO THAT I can organize my favorites
  ```
- **Acceptance Criteria**:
  - [ ] ⭐ 즐겨찾기 버튼
  - [ ] 태그 추가 (커스텀 라벨)
  - [ ] 필터: 즐겨찾기만, 태그별
  - [ ] 즐겨찾기 목록 페이지
- **Tasks**:
  - 즐겨찾기 UI
  - 태그 입력
  - 필터 로직

---

**Sprint 8 총 Story Points**: 29  
**Sprint 8 Goal**: "프로젝트 데이터를 분석하고 PDF 리포트를 생성하며 팀 협업 기능 추가"

---

## 📊 전체 스프린트 요약

| Sprint | 주제 | Story Points | 핵심 Deliverable |
|--------|------|--------------|------------------|
| **Sprint 1** | 첫 분자 생성 데모 | 26 | 웹에서 분자 10개 생성 및 표시 |
| **Sprint 2** | 분자 상세 및 3D | 31 | 3D 회전, 유사성 검색 |
| **Sprint 3** | ADMET 예측 | 33 | AI ADMET 예측 및 Radar Chart |
| **Sprint 4** | 프로젝트 관리 | 24 | 질환별 프로젝트 워크스페이스 |
| **Sprint 5** | AI 생성 엔진 | 34 | 실제 Transformer 모델 통합 |
| **Sprint 6** | 가상 스크리닝 | 34 | 도킹 시뮬레이션 및 3D 시각화 |
| **Sprint 7** | 분자 최적화 | 36 | 강화학습 기반 최적화 |
| **Sprint 8** | 분석 및 협업 | 29 | 리포트 생성, 팀 협업 |
| **총합** | - | **247** | **MVP 완성** |

---

## 🎯 릴리즈 계획

### Alpha Release (Sprint 4 완료 시점 - Week 8)
- **기능**:
  - 분자 생성 (Mock + UI)
  - ADMET 예측
  - 프로젝트 관리
- **사용자**: 내부 팀 (5명)
- **목적**: 초기 피드백 수집

### Beta Release (Sprint 6 완료 시점 - Week 12)
- **기능**:
  - 실제 AI 분자 생성
  - 도킹 시뮬레이션
  - 3D 시각화
- **사용자**: 파트너 연구소 (20명)
- **목적**: 실사용 검증

### MVP Release (Sprint 8 완료 시점 - Week 16)
- **기능**:
  - 전체 워크플로우 (생성 → 예측 → 도킹 → 최적화)
  - 협업 기능
  - 리포트 생성
- **사용자**: 퍼블릭 베타 (100명)
- **목적**: 첫 번째 유료 고객 확보

---

## 🔧 기술 부채 관리

각 스프린트마다 **20% 시간**을 기술 부채 해결에 할당:

- **리팩토링**: 중복 코드 제거, 컴포넌트 재사용
- **테스트**: 단위 테스트 커버리지 80%+
- **문서화**: API 문서, 컴포넌트 Storybook
- **성능**: 로딩 시간 최적화, 캐싱
- **보안**: 인증/인가, 입력 검증

---

## 📈 성공 지표 (Sprint별)

| Sprint | 메트릭 | 목표 |
|--------|--------|------|
| Sprint 1 | UI 구현 완료율 | 100% |
| Sprint 2 | 3D 렌더링 FPS | >30 |
| Sprint 3 | ADMET 예측 정확도 | >85% |
| Sprint 4 | 프로젝트 생성 시간 | <2초 |
| Sprint 5 | 분자 생성 시간 | <5분 |
| Sprint 6 | 도킹 처리량 | >50 molecules/hr |
| Sprint 7 | 최적화 개선율 | >20% |
| Sprint 8 | 리포트 생성 시간 | <10초 |

---

## 👥 팀 구성 (권장)

- **Product Owner** (1명): 우선순위 결정, 백로그 관리
- **Scrum Master** (1명): 스프린트 진행, 장애물 제거
- **Frontend 개발자** (2명): React/Next.js, UI/UX
- **Backend 개발자** (2명): FastAPI, Cosmos DB, Azure
- **ML 엔지니어** (2명): AI 모델, 추론 파이프라인
- **QA 엔지니어** (1명): 테스트, 품질 보증
- **DevOps** (1명): CI/CD, 인프라

**총 10명**

---

## 📝 스프린트 체크리스트

각 스프린트 시작 시:
- [ ] 스프린트 플래닝 미팅 (2시간)
- [ ] Story Point 재평가
- [ ] Task 세분화
- [ ] 테스트 계획 작성

각 스프린트 중:
- [ ] 일일 스탠드업 (15분)
- [ ] 진행률 업데이트 (Jira/Azure DevOps)
- [ ] 코드 리뷰 (PR 기반)

각 스프린트 종료 시:
- [ ] 스프린트 리뷰 (데모)
- [ ] 회고 (Retrospective)
- [ ] 다음 스프린트 준비

---

**Last Updated**: 2026년 1월 3일  
**Version**: 1.0  
**Next Review**: Sprint 1 시작 전
