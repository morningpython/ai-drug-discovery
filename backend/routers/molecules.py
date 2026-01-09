"""
분자 생성 관련 라우터
"""

import random
from fastapi import APIRouter, HTTPException
from schemas import MoleculeGenerationRequest, MoleculeGenerationResponse, MoleculeProperty

router = APIRouter(
    prefix="/api/v1/molecules",
    tags=["Molecules"],
)

# Mock 분자 데이터 (실제로는 데이터베이스에서 로드)
MOCK_MOLECULES_BY_DISEASE = {
    "hepatitis_b": [
        {
            "name": "HBV-Lead-01",
            "smiles": "CC(=O)Nc1ccc(O)cc1",
            "molecular_weight": 151.16,
            "logp": 1.19,
            "tpsa": 49.33,
            "hbd": 2,
            "hba": 2,
        },
        {
            "name": "HBV-Lead-02",
            "smiles": "Cc1ccc(cc1)C(=O)O",
            "molecular_weight": 136.15,
            "logp": 1.96,
            "tpsa": 37.30,
            "hbd": 1,
            "hba": 2,
        },
    ],
    "glp1": [
        {
            "name": "GLP1-Lead-01",
            "smiles": "CC(C)Cc1ccc(cc1)C(C)C(=O)O",
            "molecular_weight": 206.28,
            "logp": 3.97,
            "tpsa": 37.30,
            "hbd": 1,
            "hba": 2,
        },
        {
            "name": "GLP1-Lead-02",
            "smiles": "COc1ccc2nc(sc2c1)S(=O)(=O)N",
            "molecular_weight": 214.27,
            "logp": 1.98,
            "tpsa": 90.13,
            "hbd": 2,
            "hba": 3,
        },
    ],
    "alzheimers": [
        {
            "name": "AD-Lead-01",
            "smiles": "CC(C)(C)c1ccc(O)c(CC(=O)O)c1",
            "molecular_weight": 224.26,
            "logp": 2.75,
            "tpsa": 63.60,
            "hbd": 2,
            "hba": 3,
        },
        {
            "name": "AD-Lead-02",
            "smiles": "Cc1cc(C)cc(C)c1",
            "molecular_weight": 120.19,
            "logp": 3.97,
            "tpsa": 0.00,
            "hbd": 0,
            "hba": 0,
        },
    ],
    "hair_loss": [
        {
            "name": "Hair-Loss-01",
            "smiles": "CC(C)Cc1ccc(cc1)C(C)C(=O)O",
            "molecular_weight": 206.28,
            "logp": 3.97,
            "tpsa": 37.30,
            "hbd": 1,
            "hba": 2,
        },
        {
            "name": "Hair-Loss-02",
            "smiles": "CC(C)c1ccc(cc1)C(=O)N",
            "molecular_weight": 163.22,
            "logp": 2.18,
            "tpsa": 26.02,
            "hbd": 1,
            "hba": 1,
        },
    ],
    "longevity": [
        {
            "name": "Longevity-01",
            "smiles": "CC(C)(C)c1ccc(O)c(CC(=O)O)c1",
            "molecular_weight": 224.26,
            "logp": 2.75,
            "tpsa": 63.60,
            "hbd": 2,
            "hba": 3,
        },
        {
            "name": "Longevity-02",
            "smiles": "O=C(O)c1ccccc1",
            "molecular_weight": 122.12,
            "logp": 1.19,
            "tpsa": 37.30,
            "hbd": 1,
            "hba": 2,
        },
    ],
}


@router.post("/generate", response_model=MoleculeGenerationResponse)
async def generate_molecules(request: MoleculeGenerationRequest):
    """
    분자 생성 엔드포인트
    
    Args:
        request: 분자 생성 요청
    
    Returns:
        생성된 분자 리스트
    """
    # 질환 검증
    if request.target_disease not in MOCK_MOLECULES_BY_DISEASE:
        raise HTTPException(
            status_code=400,
            detail=f"지원하지 않는 질환: {request.target_disease}"
        )
    
    # Mock 데이터에서 랜덤 선택
    available_molecules = MOCK_MOLECULES_BY_DISEASE[request.target_disease]
    
    molecules = []
    for i in range(request.num_molecules):
        base_mol = random.choice(available_molecules)
        # 약간의 변동을 추가해서 unique하게 생성
        molecule = MoleculeProperty(
            name=f"{base_mol['name']}-{i+1}",
            smiles=base_mol["smiles"],
            molecular_weight=base_mol["molecular_weight"] + random.uniform(-5, 5),
            logp=base_mol["logp"] + random.uniform(-0.3, 0.3),
            tpsa=base_mol["tpsa"] + random.uniform(-2, 2),
            hbd=base_mol.get("hbd", 0),
            hba=base_mol.get("hba", 0),
            binding_affinity=random.uniform(0.1, 1.0),
            synthesis_score=random.uniform(0.6, 1.0),
        )
        molecules.append(molecule)
    
    return MoleculeGenerationResponse(
        status="success",
        target_disease=request.target_disease,
        num_generated=len(molecules),
        molecules=molecules,
    )


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
