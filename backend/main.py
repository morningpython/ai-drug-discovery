"""
AI Drug Discovery Platform - FastAPI Backend
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routers import api_router

# 환경변수 로드
load_dotenv()

# FastAPI 앱 초기화
app = FastAPI(
    title="AI Drug Discovery API",
    description="AI를 활용한 신약 개발 플랫폼 백엔드 API",
    version="0.1.0",
)

# CORS 설정
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 통합
app.include_router(api_router)


# 기본 라우트
@app.get("/", tags=["Health"])
async def root():
    """API 상태 확인"""
    return {
        "status": "ok",
        "message": "AI Drug Discovery API v0.1.0",
        "service": "drug-discovery-backend",
    }


@app.get("/health", tags=["Health"])
async def health_check():
    """헬스체크 엔드포인트"""
    return {"status": "healthy", "service": "drug-discovery-backend"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )
