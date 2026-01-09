"""
분자 생성 요청/응답 스키마
"""

from pydantic import BaseModel, Field
from typing import Optional, List


class MoleculeGenerationRequest(BaseModel):
    """분자 생성 요청"""
    target_disease: str = Field(..., description="타겟 질환")
    num_molecules: int = Field(default=20, ge=1, le=100, description="생성할 분자 개수")
    constraints: Optional[dict] = Field(default=None, description="분자 특성 제약조건")

    class Config:
        json_schema_extra = {
            "example": {
                "target_disease": "hepatitis_b",
                "num_molecules": 20,
                "constraints": {
                    "molecular_weight_min": 200,
                    "molecular_weight_max": 500,
                    "logp_min": -1,
                    "logp_max": 5,
                }
            }
        }


class MoleculeProperty(BaseModel):
    """분자 특성"""
    name: str
    smiles: str
    molecular_weight: float
    logp: float
    tpsa: float
    hbd: int = Field(default=0, description="Hydrogen Bond Donor")
    hba: int = Field(default=0, description="Hydrogen Bond Acceptor")
    binding_affinity: Optional[float] = Field(default=None, description="예측된 결합친화도")
    synthesis_score: Optional[float] = Field(default=None, description="합성 점수 (0-1)")


class MoleculeGenerationResponse(BaseModel):
    """분자 생성 응답"""
    status: str
    target_disease: str
    num_generated: int
    molecules: List[MoleculeProperty]

    class Config:
        json_schema_extra = {
            "example": {
                "status": "success",
                "target_disease": "hepatitis_b",
                "num_generated": 3,
                "molecules": [
                    {
                        "name": "HBV-Lead-01",
                        "smiles": "CC(=O)Nc1ccc(O)cc1",
                        "molecular_weight": 151.16,
                        "logp": 1.19,
                        "tpsa": 49.33,
                        "binding_affinity": 0.45,
                        "synthesis_score": 0.78,
                    }
                ]
            }
        }
