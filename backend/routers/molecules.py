"""
분자 생성 관련 라우터
"""

from fastapi import APIRouter

router = APIRouter(
    prefix="/api/v1/molecules",
    tags=["Molecules"],
)


@router.post("/generate")
async def generate_molecules(
    target_disease: str,
    num_molecules: int = 20,
):
    """
    분자 생성 엔드포인트 (Mock)
    
    Args:
        target_disease: 타겟 질환 (hepatitis_b, glp1, alzheimers, hair_loss, longevity)
        num_molecules: 생성할 분자 개수
    
    Returns:
        생성된 분자 리스트
    """
    return {
        "status": "generating",
        "message": f"{num_molecules}개의 분자를 생성 중...",
        "target_disease": target_disease,
    }


@router.get("/search")
async def search_molecules(
    disease: str,
    skip: int = 0,
    limit: int = 10,
):
    """
    분자 검색 엔드포인트
    
    Args:
        disease: 질환 필터
        skip: 건너뛸 개수
        limit: 반환할 개수
    
    Returns:
        분자 리스트
    """
    return {
        "status": "ok",
        "molecules": [],
        "total": 0,
        "disease": disease,
    }
