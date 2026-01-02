# AI-Driven Drug Discovery Platform

AI를 활용하여 신약 개발 기간을 혁신적으로 단축하는 플랫폼

## 🎯 프로젝트 개요

- **비전**: 신약 개발 기간을 30년에서 3-5년으로 단축
- **타겟 질환**: B형 간염, GLP-1 비만 치료, 알츠하이머, 탈모, 장수

## 📚 문서

- [Executive Summary](./docs/EXECUTIVE_SUMMARY.md)
- [Product Roadmap](./docs/PRODUCT_ROADMAP.md)
- [Technical Architecture](./docs/TECHNICAL_ARCHITECTURE.md)
- [Sprint Plan](./docs/SPRINT_PLAN.md)
- [Git Strategy](./docs/GIT_STRATEGY.md)

## 🚀 현재 진행 상황

**Sprint 1**: 첫 분자 생성 데모 (2026-01-06 ~ 2026-01-17)

## 🛠️ 기술 스택

### Frontend
- Next.js 14
- React 18
- TypeScript
- TailwindCSS
- shadcn/ui

### Backend
- FastAPI
- Python 3.11+
- PyTorch
- RDKit

### Cloud
- Azure Cosmos DB
- Azure Container Apps
- Azure Blob Storage

## 📦 프로젝트 구조

```
ai-drug-discovery/
├── docs/                    # 문서
├── frontend/               # Next.js 웹 애플리케이션
├── backend/                # FastAPI 서버
├── ml/                     # ML 모델 및 파이프라인
├── infrastructure/         # IaC (Bicep/Terraform)
├── tests/                  # 테스트
└── scripts/                # 유틸리티 스크립트
```

## 🚀 빠른 시작

### Prerequisites
- Node.js 18+
- Python 3.11+
- Docker Desktop
- Azure CLI (선택)

### 설치

```bash
# 저장소 클론
git clone <repository-url>
cd ai-drug-discovery

# Frontend 설정
cd frontend
npm install

# Backend 설정
cd ../backend
pip install poetry
poetry install

# 로컬 서비스 시작
docker-compose up -d
```

## 👥 팀

- Product Owner
- Scrum Master
- Frontend 개발자 (2명)
- Backend 개발자 (2명)
- ML 엔지니어 (2명)
- QA 엔지니어
- DevOps

## 📄 라이선스

MIT License

## 📞 연락처

[프로젝트 연락처 정보]

---

**Last Updated**: 2026년 1월 3일
