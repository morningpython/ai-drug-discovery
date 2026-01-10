"""
분자 생성 관련 라우터
"""

import random
from typing import Optional
from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
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


@router.get("/{smiles}/properties")
async def get_molecule_properties(smiles: str):
    """
    분자 속성 계산 엔드포인트 (상세 특성)
    
    Args:
        smiles: SMILES 문자열 (URL 인코딩 필요)
    
    Returns:
        분자의 상세 특성
    """
    try:
        # TODO: RDKit로 실제 계산 구현
        # from rdkit import Chem
        # from rdkit.Chem import Descriptors, Lipinski
        
        # Mock 데이터 반환 (실제로는 RDKit 계산)
        return {
            "smiles": smiles,
            "molecular_weight": round(random.uniform(150, 500), 2),
            "logp": round(random.uniform(-1, 5), 2),
            "tpsa": round(random.uniform(20, 140), 2),
            "hbd": random.randint(0, 5),
            "hba": random.randint(0, 10),
            "rotatable_bonds": random.randint(0, 10),
            "qed": round(random.uniform(0.3, 0.95), 3),
            "lipinski_violations": random.randint(0, 2),
            "lipinski_rules": {
                "mw_under_500": True,
                "logp_under_5": True,
                "hbd_under_5": True,
                "hba_under_10": True,
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"속성 계산 오류: {str(e)}")


@router.get("/{smiles}/sdf")
async def get_molecule_3d(smiles: str):
    """
    SMILES를 3D SDF 포맷으로 변환
    
    Args:
        smiles: SMILES 문자열
    
    Returns:
        SDF 포맷 데이터 (Content-Type: chemical/x-mdl-sdfile)
    """
    try:
        # TODO: RDKit로 실제 3D 좌표 생성
        # from rdkit import Chem
        # from rdkit.Chem import AllChem
        # mol = Chem.MolFromSmiles(smiles)
        # AllChem.EmbedMolecule(mol, AllChem.ETKDG())
        # sdf = Chem.MolToMolBlock(mol)
        
        # Placeholder SDF
        sdf_data = f"""
  Molecule from {smiles}
  3DMol.js    

  6  5  0  0  0  0  0  0  0  0999 V2000
    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    1.2000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    1.8000    1.0392    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    1.2000    2.0784    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    0.0000    2.0784    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   -0.6000    1.0392    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
  1  2  1  0  0  0  0
  2  3  2  0  0  0  0
  3  4  1  0  0  0  0
  4  5  2  0  0  0  0
  5  6  1  0  0  0  0
M  END
$$$$
"""
        return Response(content=sdf_data, media_type="chemical/x-mdl-sdfile")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"3D 변환 오류: {str(e)}")


@router.post("/search/similar")
async def search_similar_molecules(
    query_smiles: str,
    threshold: float = 0.7,
    limit: int = 10
):
    """
    분자 유사성 검색 엔드포인트
    
    Args:
        query_smiles: 검색할 기준 분자의 SMILES
        threshold: Tanimoto 유사도 임계값 (0.0-1.0)
        limit: 반환할 최대 개수
    
    Returns:
        유사한 분자 리스트 (유사도 점수 포함)
    """
    try:
        # TODO: RDKit로 실제 fingerprint 계산 및 유사도 검색
        # from rdkit import Chem
        # from rdkit.Chem import AllChem, DataStructs
        # query_mol = Chem.MolFromSmiles(query_smiles)
        # query_fp = AllChem.GetMorganFingerprintAsBitVect(query_mol, 2, 2048)
        
        # Mock 유사 분자 생성
        similar_molecules = []
        all_molecules = []
        
        # 모든 질환의 분자 수집
        for disease_mols in MOCK_MOLECULES_BY_DISEASE.values():
            all_molecules.extend(disease_mols)
        
        # 랜덤하게 유사 분자 선택 (실제로는 fingerprint 유사도 계산)
        import random
        selected = random.sample(all_molecules, min(limit, len(all_molecules)))
        
        for mol in selected:
            similarity = random.uniform(threshold, 1.0)  # Mock similarity
            similar_molecules.append({
                "smiles": mol["smiles"],
                "name": mol["name"],
                "similarity": round(similarity, 3),
                "molecular_weight": mol["molecular_weight"],
                "logp": mol["logp"],
                "tpsa": mol["tpsa"],
            })
        
        # 유사도 순으로 정렬
        similar_molecules.sort(key=lambda x: x["similarity"], reverse=True)
        
        return {
            "status": "success",
            "query_smiles": query_smiles,
            "threshold": threshold,
            "num_found": len(similar_molecules),
            "molecules": similar_molecules,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"유사성 검색 오류: {str(e)}")

