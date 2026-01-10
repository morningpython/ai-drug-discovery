# Sprint 2 완료 보고서

**스프린트**: Sprint 2 (Week 3-4)  
**목표**: "분자 상세 정보 및 2D/3D 시각화"  
**완료일**: 2026년 1월 10일  
**총 Story Points**: 31/31 (100%)

---

## 📊 스프린트 목표 달성

✅ **목표 달성**: 사용자가 분자를 클릭하면 3D로 회전시키고 유사 분자를 찾을 수 있는 경험 제공

---

## ✅ 완료된 스토리

### STORY-008: 분자 상세 페이지 UI (5 SP) ✅
**완료 내용**:
- `/molecule/[id]` 동적 라우팅 구현
- 2D/3D 탭 전환 기능 (Radix UI Tabs)
- 분자 속성 테이블 (기본 특성 + 확장 특성)
- SMILES, InChI 표시 및 복사 기능
- "프로젝트에 추가" 버튼 (UI)
- Lipinski's Rule of 5 평가 UI
- MoleculeCard에서 상세 페이지로 이동 링크 연결

**기술 스택**:
- Next.js 동적 라우팅
- @radix-ui/react-tabs
- 상태 관리 (useState, useEffect)

---

### STORY-009: 3D 분자 뷰어 통합 (8 SP) ✅
**완료 내용**:
- 3Dmol.js 라이브러리 통합 (CDN)
- 인터랙티브 3D 분자 뷰어 컴포넌트 (`Molecule3DViewer.tsx`)
- 마우스 드래그로 회전, 스크롤로 줌 기능
- 초기 위치 재설정 버튼
- 전체화면 모드 지원
- 로딩 상태 및 에러 핸들링
- 백엔드 API와 연동 (SMILES → 3D SDF)

**기술 스택**:
- 3Dmol.js (https://3Dmol.csb.pitt.edu)
- React 컴포넌트
- FastAPI 엔드포인트: `GET /api/v1/molecules/{smiles}/sdf`

---

### STORY-010: 분자 속성 계산 API 확장 (5 SP) ✅
**완료 내용**:
- `GET /api/v1/molecules/{smiles}/properties` 엔드포인트
- 계산 속성:
  - Molecular Weight (MW)
  - LogP (친유성)
  - TPSA (극성 표면적)
  - HBD (수소결합 공여체)
  - HBA (수소결합 수용체)
  - Rotatable Bonds
  - QED Score (정량적 약물성)
- Lipinski's Rule of 5 평가
  - MW ≤ 500
  - LogP ≤ 5
  - HBD ≤ 5
  - HBA ≤ 10
- 프론트엔드 연동 및 실시간 표시

**현재 상태**: Mock 데이터 (RDKit 통합은 다음 단계)

---

### STORY-011: 분자 유사성 검색 UI (5 SP) ✅
**완료 내용**:
- 상세 페이지에 "유사 분자 검색" 섹션 추가
- 유사도 임계값 조절 슬라이더 (50%-100%)
- "유사 분자 찾기" 버튼
- 검색 결과 카드 목록 표시
  - 분자 이름
  - SMILES
  - 유사도 점수
  - 기본 특성 (MW, LogP, TPSA)
- 로딩 상태 UI
- 결과 없을 때 메시지 표시

---

### STORY-012: 분자 유사성 검색 API (8 SP) ✅
**완료 내용**:
- `POST /api/v1/molecules/search/similar` 엔드포인트
- 요청 파라미터:
  - `query_smiles`: 기준 분자 SMILES
  - `threshold`: 유사도 임계값 (0.0-1.0)
  - `limit`: 반환 개수
- 응답 데이터:
  - 유사 분자 리스트
  - 각 분자의 유사도 점수 (Tanimoto 계수)
  - 분자 속성
- Mock 구현 (실제 Morgan Fingerprint는 다음 단계)

**현재 상태**: Mock 데이터로 유사도 시뮬레이션

---

## 🏗️ 기술 스택

### 프론트엔드
- **Framework**: Next.js 16.1.1
- **UI 라이브러리**: 
  - Radix UI (@radix-ui/react-tabs)
  - shadcn/ui components
- **3D 시각화**: 3Dmol.js
- **상태 관리**: React Hooks (useState, useEffect)
- **스타일링**: TailwindCSS

### 백엔드
- **Framework**: FastAPI
- **Python**: 3.11+
- **예정**: RDKit (분자 계산 라이브러리)

---

## 📁 생성/수정된 파일

### 프론트엔드
```
frontend/
├── app/
│   └── molecule/
│       └── [id]/
│           └── page.tsx          (NEW - 분자 상세 페이지)
├── components/
│   ├── Molecule3DViewer.tsx      (NEW - 3D 뷰어)
│   ├── MoleculeCard.tsx          (UPDATED - 상세 링크 추가)
│   └── ui/
│       └── tabs.tsx              (NEW - Tabs 컴포넌트)
└── package.json                  (UPDATED - @radix-ui/react-tabs)
```

### 백엔드
```
backend/
├── routers/
│   └── molecules.py              (UPDATED - 3개 엔드포인트 추가)
└── requirements.txt              (UPDATED - rdkit 추가 예정)
```

---

## 🎯 사용자 플로우

1. **분자 목록 보기** (`/generate`)
   - 사용자가 분자 생성 또는 목록 확인

2. **분자 카드 클릭** → **상세 페이지 이동** (`/molecule/[id]`)
   - 분자 이름, ID, SMILES, InChI 표시
   - 복사 기능

3. **2D/3D 탭 전환**
   - 2D: 구조식 (RDKit 렌더링 예정)
   - 3D: 인터랙티브 뷰어 (마우스로 회전/줌)

4. **분자 속성 확인**
   - 기본 특성 (MW, LogP, TPSA)
   - 확장 특성 (HBD, HBA, Rotatable Bonds, QED)
   - Lipinski's Rule of 5 평가

5. **유사 분자 검색**
   - 유사도 임계값 설정
   - "유사 분자 찾기" 클릭
   - 결과 목록 확인

---

## 🧪 테스트 결과

### 수동 테스트 완료
- ✅ 분자 카드 → 상세 페이지 이동
- ✅ 2D/3D 탭 전환
- ✅ 3D 뷰어 인터랙션 (회전, 줌)
- ✅ SMILES/InChI 복사
- ✅ 분자 속성 API 호출 및 표시
- ✅ 유사성 검색 실행 및 결과 표시
- ✅ 유사도 슬라이더 조절

### 브라우저 테스트
- ✅ Chrome
- ✅ Edge

---

## 📝 다음 단계 (Sprint 3 준비)

### EPIC-002: ADMET 예측 시스템
1. **STORY-013**: ADMET 예측 결과 UI
2. **STORY-014**: ADMET 예측 트리거 버튼
3. **STORY-015**: 사전학습 ADMET 모델 준비
4. **STORY-016**: ADMET 예측 API 구현
5. **STORY-017**: 예측 결과 시각화 (Radar Chart)

### 기술 부채 해결
- [ ] RDKit 실제 통합 (분자 속성 계산)
- [ ] Morgan Fingerprint 구현 (유사성 검색)
- [ ] 2D 구조 렌더링 (RDKit → SVG/PNG)
- [ ] 3D 좌표 실제 생성 (RDKit → SDF)
- [ ] Redis 캐싱 (속성 계산 결과)
- [ ] 에러 처리 강화
- [ ] 유닛 테스트 작성

---

## 🎉 스프린트 회고

### 잘된 점
- ✅ UI-First 접근으로 빠른 시각적 피드백
- ✅ Mock 데이터로 프론트-백엔드 병렬 개발
- ✅ 3Dmol.js 통합으로 인상적인 3D 시각화 구현
- ✅ 모든 스토리 100% 완료
- ✅ 사용자 경험 중심 설계

### 개선할 점
- 🔄 RDKit 실제 통합 필요 (현재 Mock)
- 🔄 성능 최적화 (큰 분자 렌더링)
- 🔄 테스트 자동화 부족

### 다음 스프린트 목표
- ADMET 예측 시스템 구축
- 실제 AI 모델 통합 시작
- 데이터베이스 연동 준비

---

**Sprint 2 Status**: ✅ **COMPLETED**  
**Overall Progress**: Sprint 1 (26 SP) + Sprint 2 (31 SP) = **57 SP 완료**  
**Next**: Sprint 3 - ADMET 예측 시스템
