"""
라우터 모듈
"""

from fastapi import APIRouter
from .molecules import router as molecules_router
from .admet import router as admet_router

# 메인 라우터
api_router = APIRouter(prefix="/api", tags=["API"])

# 라우터 통합
api_router.include_router(molecules_router)
api_router.include_router(admet_router)

__all__ = ["api_router"]
