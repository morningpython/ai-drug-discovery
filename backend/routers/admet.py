"""
ADMET 예측 관련 라우터
"""

from fastapi import APIRouter

router = APIRouter(
    prefix="/api/v1/admet",
    tags=["ADMET"],
)


@router.post("/predict")
async def predict_admet(smiles: str):
    """
    분자의 ADMET 특성 예측
    
    Args:
        smiles: 분자의 SMILES 문자열
    
    Returns:
        ADMET 예측 결과
    """
    return {
        "status": "ok",
        "smiles": smiles,
        "properties": {
            "molecular_weight": 0,
            "logp": 0,
            "tpsa": 0,
            "hbd": 0,
            "hba": 0,
        },
    }
