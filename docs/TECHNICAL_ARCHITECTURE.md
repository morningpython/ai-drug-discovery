# AI 신약 개발 프로젝트 - 기술 아키텍처 및 개발 계획

## 🏗️ 시스템 아키텍처 개요

```
┌─────────────────────────────────────────────────────────────────┐
│                        사용자 인터페이스                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  웹 앱       │  │  REST API    │  │  CLI 도구    │          │
│  │  (React)     │  │  (FastAPI)   │  │  (Python)    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────────┐
│                      AI/ML 코어 엔진                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ 분자 생성    │  │ ADMET 예측   │  │ 도킹 시뮬레이션│         │
│  │ (Transformer)│  │ (Multi-task) │  │ (AutoDock)   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ 분자 최적화  │  │ 단백질 예측  │  │ 유사성 검색  │          │
│  │ (RL/PPO)     │  │ (AlphaFold)  │  │ (Vector DB)  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────────┐
│                      데이터 레이어 (Azure)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Cosmos DB    │  │ Blob Storage │  │ Vector Search│          │
│  │ (분자 데이터)│  │ (모델/결과)  │  │ (임베딩)     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────────┐
│                   외부 데이터 소스                               │
│  ChEMBL │ PubChem │ DrugBank │ PDB │ AlphaFold DB │ PubMed     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 💻 기술 스택 상세

### 1. 프론트엔드 (웹 애플리케이션)

#### 핵심 프레임워크
```typescript
// Package.json
{
  "dependencies": {
    "react": "^18.2.0",
    "typescript": "^5.3.0",
    "next.js": "^14.0.0",          // SSR 및 라우팅
    "tailwindcss": "^3.4.0",       // 스타일링
    "shadcn-ui": "latest",         // UI 컴포넌트
    "@tanstack/react-query": "^5.0.0",  // 데이터 페칭
    "zustand": "^4.4.0",           // 상태 관리
  }
}
```

#### 분자 시각화 라이브러리
- **Ketcher**: 2D 분자 그리기 (React 컴포넌트)
- **3Dmol.js**: 3D 분자 및 단백질 렌더링
- **NGL Viewer**: 고성능 단백질-리간드 시각화
- **Plotly.js**: ADMET 특성 그래프, 최적화 경로 시각화

#### 주요 페이지/기능
1. **대시보드**: 프로젝트 개요, 최근 생성 분자
2. **분자 생성**: 조건 입력 → AI 생성 → 결과 탐색
3. **가상 스크리닝**: 라이브러리 업로드 → 도킹 실행 → 히트 분석
4. **Lead 최적화**: 초기 분자 → RL 최적화 → 개선 경로
5. **프로젝트 관리**: 팀 협업, 버전 관리, 내보내기

---

### 2. 백엔드 (API 서버)

#### 프레임워크
```python
# pyproject.toml
[tool.poetry.dependencies]
python = "^3.11"
fastapi = "^0.109.0"
uvicorn = "^0.27.0"
pydantic = "^2.5.0"
celery = "^5.3.0"           # 비동기 작업 큐
redis = "^5.0.0"            # Celery 브로커
azure-cosmos = "^4.5.0"     # Cosmos DB 클라이언트
azure-storage-blob = "^12.19.0"
azure-identity = "^1.15.0"
```

#### API 엔드포인트 구조
```python
# app/main.py
from fastapi import FastAPI

app = FastAPI(title="AI Drug Discovery API")

# 분자 생성
@app.post("/api/v1/generate")
async def generate_molecules(conditions: GenerationRequest):
    """조건 기반 분자 생성"""
    pass

# ADMET 예측
@app.post("/api/v1/predict/admet")
async def predict_admet(molecules: List[str]):
    """SMILES 리스트 → ADMET 특성 예측"""
    pass

# 분자 도킹
@app.post("/api/v1/docking")
async def run_docking(target_id: str, ligands: List[str]):
    """단백질-리간드 도킹 시뮬레이션"""
    pass

# 분자 최적화
@app.post("/api/v1/optimize")
async def optimize_molecule(initial: str, objectives: Dict):
    """강화학습 기반 분자 최적화"""
    pass

# 프로젝트 관리
@app.get("/api/v1/projects/{project_id}")
async def get_project(project_id: str):
    """프로젝트 정보 조회"""
    pass
```

#### 비동기 작업 처리
```python
# tasks/celery_app.py
from celery import Celery

celery_app = Celery(
    "drug_discovery",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/1"
)

@celery_app.task(bind=True)
def generate_molecules_task(self, conditions):
    """긴 시간 소요 작업을 백그라운드에서 실행"""
    # 진행 상황 업데이트
    self.update_state(state='PROGRESS', meta={'current': 10, 'total': 100})
    # ... 생성 로직
    return results
```

---

### 3. AI/ML 코어 엔진

#### 분자 생성 모델

**Transformer 기반 생성**
```python
# models/generator.py
import torch
import torch.nn as nn
from transformers import GPT2LMHeadModel, GPT2Tokenizer

class MoleculeGenerator:
    def __init__(self, model_path: str):
        """ChemGPT 스타일 분자 생성기"""
        self.tokenizer = GPT2Tokenizer.from_pretrained(model_path)
        self.model = GPT2LMHeadModel.from_pretrained(model_path)
        
    def generate(
        self, 
        prompt: str = "", 
        num_samples: int = 100,
        max_length: int = 100
    ) -> List[str]:
        """SMILES 분자 생성"""
        inputs = self.tokenizer(prompt, return_tensors="pt")
        
        outputs = self.model.generate(
            **inputs,
            max_length=max_length,
            num_return_sequences=num_samples,
            do_sample=True,
            top_k=50,
            top_p=0.95,
            temperature=1.0
        )
        
        molecules = [
            self.tokenizer.decode(output, skip_special_tokens=True)
            for output in outputs
        ]
        
        # 유효성 검증
        valid_molecules = [
            mol for mol in molecules 
            if self.is_valid_smiles(mol)
        ]
        
        return valid_molecules
    
    def is_valid_smiles(self, smiles: str) -> bool:
        """SMILES 문법 검증"""
        from rdkit import Chem
        mol = Chem.MolFromSmiles(smiles)
        return mol is not None
```

**VAE 기반 생성**
```python
# models/vae.py
class MolecularVAE(nn.Module):
    def __init__(self, vocab_size, latent_dim=256):
        super().__init__()
        
        # Encoder
        self.encoder = nn.Sequential(
            nn.Embedding(vocab_size, 128),
            nn.GRU(128, 256, bidirectional=True, batch_first=True),
        )
        
        self.fc_mu = nn.Linear(512, latent_dim)
        self.fc_logvar = nn.Linear(512, latent_dim)
        
        # Decoder
        self.decoder = nn.Sequential(
            nn.Linear(latent_dim, 512),
            nn.GRU(512, 256, batch_first=True),
            nn.Linear(256, vocab_size)
        )
    
    def encode(self, x):
        h = self.encoder(x)
        mu = self.fc_mu(h[:, -1, :])
        logvar = self.fc_logvar(h[:, -1, :])
        return mu, logvar
    
    def reparameterize(self, mu, logvar):
        std = torch.exp(0.5 * logvar)
        eps = torch.randn_like(std)
        return mu + eps * std
    
    def decode(self, z):
        return self.decoder(z)
    
    def sample(self, num_samples: int) -> List[str]:
        """Latent space에서 샘플링"""
        z = torch.randn(num_samples, self.latent_dim)
        outputs = self.decode(z)
        # SMILES로 변환
        return self.outputs_to_smiles(outputs)
```

---

#### ADMET 예측 모델

```python
# models/admet_predictor.py
import torch
import torch.nn as nn
from torch_geometric.nn import GCNConv, global_mean_pool

class ADMETPredictor(nn.Module):
    """그래프 신경망 기반 ADMET 예측"""
    
    def __init__(self, num_features, hidden_dim=128):
        super().__init__()
        
        # Graph Convolutional Layers
        self.conv1 = GCNConv(num_features, hidden_dim)
        self.conv2 = GCNConv(hidden_dim, hidden_dim)
        self.conv3 = GCNConv(hidden_dim, hidden_dim)
        
        # Multi-task heads
        self.absorption_head = nn.Linear(hidden_dim, 1)  # Caco-2 투과성
        self.distribution_head = nn.Linear(hidden_dim, 1)  # VDss
        self.metabolism_head = nn.Linear(hidden_dim, 7)  # CYP450 (7종)
        self.excretion_head = nn.Linear(hidden_dim, 1)  # 반감기
        self.toxicity_head = nn.Linear(hidden_dim, 5)  # hERG, 간독성 등
        
    def forward(self, data):
        x, edge_index, batch = data.x, data.edge_index, data.batch
        
        # Graph convolutions
        x = torch.relu(self.conv1(x, edge_index))
        x = torch.relu(self.conv2(x, edge_index))
        x = torch.relu(self.conv3(x, edge_index))
        
        # Global pooling
        x = global_mean_pool(x, batch)
        
        # Multi-task predictions
        return {
            'absorption': self.absorption_head(x),
            'distribution': self.distribution_head(x),
            'metabolism': self.metabolism_head(x),
            'excretion': self.excretion_head(x),
            'toxicity': self.toxicity_head(x)
        }

# 사용 예시
predictor = ADMETPredictor(num_features=9)  # 원자 특성 9개

def predict_admet(smiles: str) -> Dict:
    """SMILES → ADMET 특성"""
    from rdkit import Chem
    from torch_geometric.data import Data
    
    mol = Chem.MolFromSmiles(smiles)
    
    # 분자를 그래프로 변환
    graph = mol_to_graph(mol)
    
    # 예측
    with torch.no_grad():
        predictions = predictor(graph)
    
    return {
        'absorption_caco2': predictions['absorption'].item(),
        'volume_distribution': predictions['distribution'].item(),
        'cyp450_inhibition': predictions['metabolism'].tolist(),
        'half_life': predictions['excretion'].item(),
        'toxicity_scores': predictions['toxicity'].tolist()
    }
```

---

#### 강화학습 기반 최적화

```python
# models/rl_optimizer.py
import torch
from torch import nn
from stable_baselines3 import PPO
from stable_baselines3.common.env_util import make_vec_env
import gym
from gym import spaces

class MoleculeOptimizationEnv(gym.Env):
    """분자 최적화 환경"""
    
    def __init__(self, initial_smiles: str, target_props: Dict):
        super().__init__()
        
        self.initial_smiles = initial_smiles
        self.current_smiles = initial_smiles
        self.target_props = target_props
        
        # Action: 분자 수정 작업 (추가/제거/치환)
        self.action_space = spaces.Discrete(100)  # 100가지 수정 액션
        
        # State: 분자 임베딩 (256차원)
        self.observation_space = spaces.Box(
            low=-np.inf, high=np.inf, shape=(256,), dtype=np.float32
        )
        
        # 모델 로드
        self.admet_model = ADMETPredictor.load_pretrained()
        
    def step(self, action):
        """액션 실행 후 보상 계산"""
        # 분자 수정
        new_smiles = self.apply_action(self.current_smiles, action)
        
        # 유효성 검증
        if not is_valid_smiles(new_smiles):
            return self._get_state(), -10, False, {}
        
        # ADMET 예측
        props = self.admet_model.predict(new_smiles)
        
        # 보상 계산
        reward = self.calculate_reward(props)
        
        # 상태 업데이트
        self.current_smiles = new_smiles
        done = (self.steps > 100) or (reward > 0.9)
        
        return self._get_state(), reward, done, {}
    
    def calculate_reward(self, props: Dict) -> float:
        """멀티 목적 보상 함수"""
        reward = 0
        
        # ADMET 점수 (40%)
        admet_score = (
            props['absorption'] * 0.25 +
            (1 - props['toxicity']) * 0.25 +
            props['metabolism_stability'] * 0.25 +
            props['half_life_score'] * 0.25
        )
        reward += admet_score * 0.4
        
        # 타겟 친화도 (30%)
        affinity = predict_binding_affinity(self.current_smiles)
        reward += affinity * 0.3
        
        # 합성 가능성 (20%)
        sa_score = calculate_sa_score(self.current_smiles)
        reward += sa_score * 0.2
        
        # 신규성 (10%)
        novelty = calculate_novelty(self.current_smiles)
        reward += novelty * 0.1
        
        return reward
    
    def apply_action(self, smiles: str, action: int) -> str:
        """분자 수정 액션 적용"""
        from rdkit import Chem
        from rdkit.Chem import AllChem
        
        mol = Chem.MolFromSmiles(smiles)
        
        # 액션 타입 결정
        action_type = action // 20
        action_param = action % 20
        
        if action_type == 0:  # 원자 추가
            new_mol = add_atom(mol, action_param)
        elif action_type == 1:  # 결합 추가
            new_mol = add_bond(mol, action_param)
        elif action_type == 2:  # 원자 제거
            new_mol = remove_atom(mol, action_param)
        elif action_type == 3:  # 원자 치환
            new_mol = substitute_atom(mol, action_param)
        else:  # 고리 추가
            new_mol = add_ring(mol, action_param)
        
        return Chem.MolToSmiles(new_mol)

# 학습 및 최적화
def optimize_molecule(initial_smiles: str, target_props: Dict, steps: int = 1000):
    """강화학습으로 분자 최적화"""
    
    # 환경 생성
    env = MoleculeOptimizationEnv(initial_smiles, target_props)
    
    # PPO 에이전트
    model = PPO(
        "MlpPolicy",
        env,
        verbose=1,
        learning_rate=3e-4,
        n_steps=2048,
        batch_size=64,
        n_epochs=10,
    )
    
    # 학습
    model.learn(total_timesteps=steps)
    
    # 최적 분자 반환
    obs = env.reset()
    done = False
    best_smiles = initial_smiles
    best_reward = -float('inf')
    
    while not done:
        action, _ = model.predict(obs, deterministic=True)
        obs, reward, done, _ = env.step(action)
        
        if reward > best_reward:
            best_reward = reward
            best_smiles = env.current_smiles
    
    return best_smiles, best_reward
```

---

#### 분자 도킹 시뮬레이션

```python
# models/docking.py
import subprocess
from pathlib import Path
from rdkit import Chem
from rdkit.Chem import AllChem

class MolecularDocking:
    """AutoDock Vina 래퍼"""
    
    def __init__(self, protein_pdbqt: str, box_center: List[float], box_size: List[float]):
        self.protein_pdbqt = protein_pdbqt
        self.box_center = box_center  # [x, y, z]
        self.box_size = box_size  # [size_x, size_y, size_z]
    
    def dock_molecule(self, smiles: str, output_dir: str) -> Dict:
        """단일 분자 도킹"""
        # SMILES → 3D 구조 생성
        mol = Chem.MolFromSmiles(smiles)
        mol = Chem.AddHs(mol)
        AllChem.EmbedMolecule(mol, randomSeed=42)
        AllChem.MMFFOptimizeMolecule(mol)
        
        # PDB 저장
        ligand_pdb = f"{output_dir}/ligand.pdb"
        Chem.MolToPDBFile(mol, ligand_pdb)
        
        # PDB → PDBQT 변환 (AutoDockTools)
        ligand_pdbqt = f"{output_dir}/ligand.pdbqt"
        subprocess.run([
            "obabel", ligand_pdb, "-O", ligand_pdbqt
        ])
        
        # Vina 실행
        output_pdbqt = f"{output_dir}/output.pdbqt"
        config = self._create_vina_config(ligand_pdbqt, output_pdbqt)
        
        subprocess.run([
            "vina",
            "--config", config,
            "--out", output_pdbqt,
            "--log", f"{output_dir}/log.txt"
        ])
        
        # 결과 파싱
        results = self._parse_vina_output(output_pdbqt)
        
        return {
            'smiles': smiles,
            'binding_affinity': results['affinity'],  # kcal/mol
            'poses': results['poses'],
            'interactions': self._analyze_interactions(output_pdbqt)
        }
    
    def screen_library(self, smiles_list: List[str], top_n: int = 100) -> List[Dict]:
        """화합물 라이브러리 일괄 스크리닝"""
        results = []
        
        for smiles in smiles_list:
            try:
                result = self.dock_molecule(smiles, f"temp/{hash(smiles)}")
                results.append(result)
            except Exception as e:
                print(f"Docking failed for {smiles}: {e}")
        
        # 친화도 기준 정렬
        results.sort(key=lambda x: x['binding_affinity'])
        
        return results[:top_n]
```

---

### 4. 데이터 관리 (Azure Cosmos DB)

#### 스키마 설계

```python
# database/schemas.py
from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from datetime import datetime

class Molecule(BaseModel):
    """분자 문서"""
    id: str = Field(alias="_id")  # SMILES 해시
    smiles: str
    inchi: Optional[str]
    molecular_formula: str
    molecular_weight: float
    
    # 계산된 특성
    properties: Dict[str, float] = {
        "logP": 0.0,
        "tpsa": 0.0,
        "num_h_donors": 0,
        "num_h_acceptors": 0,
        "num_rotatable_bonds": 0,
    }
    
    # ADMET 예측
    admet: Optional[Dict] = None
    
    # 도킹 결과
    docking_results: List[Dict] = []
    
    # 메타데이터
    source: str  # "generated", "chembl", "pubchem"
    created_at: datetime
    project_id: Optional[str]
    
    # 파티션 키
    partition_key: str  # project_id

class Project(BaseModel):
    """프로젝트 문서"""
    id: str
    name: str
    description: str
    
    # 타겟 정보
    target_disease: str  # "hepatitis_b", "glp1", "alzheimers", "hair_loss"
    target_protein: str
    
    # 생성 설정
    generation_config: Dict
    
    # 통계
    stats: Dict = {
        "total_molecules": 0,
        "validated_hits": 0,
        "in_vitro_tested": 0,
    }
    
    # 팀
    team_members: List[str]
    created_at: datetime
    updated_at: datetime

# 탈모 치료제 프로젝트 예시
"""
{
  "id": "proj_hair_001",
  "name": "JAK Inhibitor for Androgenetic Alopecia",
  "description": "JAK1/2 선택적 억제제를 통한 탈모 치료제 개발",
  "target_disease": "hair_loss",
  "target_protein": "JAK1/JAK2",
  "generation_config": {
    "objectives": {
      "jak1_affinity": -9.0,
      "jak2_affinity": -8.5,
      "scalp_penetration": 0.7,
      "low_systemic_exposure": 0.8
    },
    "constraints": {
      "molecular_weight": [150, 400],
      "logP": [1, 4],
      "tpsa": [40, 100]
    }
  },
  "stats": {
    "total_molecules": 245,
    "validated_hits": 18,
    "in_vitro_tested": 5
  },
  "team_members": ["researcher1", "researcher2"],
  "created_at": "2026-01-02T00:00:00Z",
  "updated_at": "2026-01-02T12:00:00Z"
}
"""

class Experiment(BaseModel):
    """실험 결과 문서"""
    id: str
    project_id: str
    molecule_id: str
    
    experiment_type: str  # "in_vitro", "in_vivo", "docking"
    
    # 실험 데이터
    assay: str
    result: Dict
    
    # 메타
    performed_by: str
    performed_at: datetime
```

#### Cosmos DB 클라이언트

```python
# database/cosmos_client.py
from azure.cosmos import CosmosClient, PartitionKey
from azure.identity import DefaultAzureCredential
import os

class DrugDiscoveryDB:
    def __init__(self):
        # Azure 인증
        credential = DefaultAzureCredential()
        endpoint = os.getenv("COSMOS_ENDPOINT")
        
        self.client = CosmosClient(endpoint, credential)
        self.database = self.client.get_database_client("drug_discovery")
        
        # 컨테이너
        self.molecules = self.database.get_container_client("molecules")
        self.projects = self.database.get_container_client("projects")
        self.experiments = self.database.get_container_client("experiments")
    
    async def create_molecule(self, molecule: Molecule) -> Molecule:
        """분자 저장"""
        item = molecule.dict()
        created = self.molecules.create_item(body=item)
        return Molecule(**created)
    
    async def query_molecules(
        self, 
        project_id: str, 
        min_affinity: float = -8.0
    ) -> List[Molecule]:
        """프로젝트의 분자 조회 (도킹 스코어 필터)"""
        query = """
            SELECT * FROM molecules m
            WHERE m.project_id = @project_id
            AND ARRAY_LENGTH(m.docking_results) > 0
            AND m.docking_results[0].affinity <= @min_affinity
            ORDER BY m.docking_results[0].affinity ASC
        """
        
        items = self.molecules.query_items(
            query=query,
            parameters=[
                {"name": "@project_id", "value": project_id},
                {"name": "@min_affinity", "value": min_affinity}
            ],
            partition_key=project_id
        )
        
        return [Molecule(**item) for item in items]
    
    async def vector_search_similar_molecules(
        self, 
        query_smiles: str, 
        top_k: int = 10
    ) -> List[Molecule]:
        """벡터 유사도 검색 (Cosmos DB Vector Search)"""
        # 분자 임베딩 생성
        embedding = self.get_molecule_embedding(query_smiles)
        
        # 벡터 검색 쿼리
        query = """
            SELECT TOP @top_k m.*, 
                   VectorDistance(m.embedding, @query_embedding) AS similarity
            FROM molecules m
            ORDER BY VectorDistance(m.embedding, @query_embedding)
        """
        
        items = self.molecules.query_items(
            query=query,
            parameters=[
                {"name": "@top_k", "value": top_k},
                {"name": "@query_embedding", "value": embedding}
            ]
        )
        
        return [Molecule(**item) for item in items]
```

---

### 5. 배포 및 인프라 (Azure)

#### Docker 컨테이너화

```dockerfile
# Dockerfile
FROM python:3.11-slim

# 시스템 의존성
RUN apt-get update && apt-get install -y \
    build-essential \
    libxrender1 \
    libxext6 \
    openbabel \
    autodock-vina \
    && rm -rf /var/lib/apt/lists/*

# Python 패키지
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 애플리케이션 코드
COPY . .

# 모델 다운로드 (사전학습 모델)
RUN python -m scripts.download_models

# 포트 노출
EXPOSE 8000

# 실행
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Azure Container Apps 배포

```yaml
# azure-deploy.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: drug-discovery-api
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: api
        image: youracr.azurecr.io/drug-discovery:latest
        resources:
          requests:
            memory: "4Gi"
            cpu: "2"
            nvidia.com/gpu: "1"  # GPU 할당
          limits:
            memory: "8Gi"
            cpu: "4"
            nvidia.com/gpu: "1"
        env:
        - name: COSMOS_ENDPOINT
          valueFrom:
            secretKeyRef:
              name: azure-secrets
              key: cosmos-endpoint
        - name: AZURE_OPENAI_ENDPOINT
          valueFrom:
            secretKeyRef:
              name: azure-secrets
              key: openai-endpoint
```

#### Bicep 인프라 코드

```bicep
// main.bicep
param location string = 'koreacentral'
param projectName string = 'drug-discovery'

// Cosmos DB
resource cosmosAccount 'Microsoft.DocumentDB/databaseAccounts@2023-04-15' = {
  name: '${projectName}-cosmos'
  location: location
  properties: {
    databaseAccountOfferType: 'Standard'
    locations: [
      {
        locationName: location
        failoverPriority: 0
      }
    ]
    capabilities: [
      {
        name: 'EnableServerless'  // 서버리스 모드
      }
      {
        name: 'EnableNoSQLVectorSearch'  // 벡터 검색
      }
    ]
  }
}

resource database 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2023-04-15' = {
  parent: cosmosAccount
  name: 'drug_discovery'
  properties: {
    resource: {
      id: 'drug_discovery'
    }
  }
}

resource moleculesContainer 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2023-04-15' = {
  parent: database
  name: 'molecules'
  properties: {
    resource: {
      id: 'molecules'
      partitionKey: {
        paths: ['/project_id']
        kind: 'Hash'
      }
      vectorEmbeddingPolicy: {
        vectorEmbeddings: [
          {
            path: '/embedding'
            dataType: 'float32'
            dimensions: 256
            distanceFunction: 'cosine'
          }
        ]
      }
    }
  }
}

// Container Apps
resource containerApp 'Microsoft.App/containerApps@2023-05-01' = {
  name: '${projectName}-api'
  location: location
  properties: {
    configuration: {
      ingress: {
        external: true
        targetPort: 8000
      }
    }
    template: {
      containers: [
        {
          name: 'api'
          image: 'youracr.azurecr.io/drug-discovery:latest'
          resources: {
            cpu: json('2.0')
            memory: '4Gi'
          }
        }
      ]
      scale: {
        minReplicas: 1
        maxReplicas: 10
      }
    }
  }
}

// Blob Storage (모델 저장)
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: '${projectName}storage'
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
}
```

---

## 📦 프로젝트 구조

```
ai-drug-discovery/
├── docs/
│   ├── EXECUTIVE_SUMMARY.md
│   ├── PRODUCT_ROADMAP.md
│   └── TECHNICAL_ARCHITECTURE.md  (이 파일)
│
├── frontend/                    # React 웹앱
│   ├── src/
│   │   ├── components/
│   │   │   ├── MoleculeViewer.tsx
│   │   │   ├── GenerationPanel.tsx
│   │   │   └── DockingResults.tsx
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── utils/
│   ├── package.json
│   └── next.config.js
│
├── backend/                     # FastAPI 서버
│   ├── app/
│   │   ├── main.py
│   │   ├── api/
│   │   │   ├── generation.py
│   │   │   ├── prediction.py
│   │   │   └── docking.py
│   │   ├── models/              # Pydantic 모델
│   │   └── dependencies.py
│   ├── tasks/                   # Celery 작업
│   │   ├── celery_app.py
│   │   └── generation_tasks.py
│   └── requirements.txt
│
├── ml/                          # AI/ML 코어
│   ├── models/
│   │   ├── generator.py         # 분자 생성
│   │   ├── admet_predictor.py   # ADMET 예측
│   │   ├── rl_optimizer.py      # RL 최적화
│   │   └── docking.py           # 도킹
│   ├── training/
│   │   ├── train_generator.py
│   │   └── train_admet.py
│   ├── data/
│   │   ├── preprocessing.py
│   │   └── augmentation.py
│   └── utils/
│       ├── featurization.py     # 분자 → 그래프 변환
│       └── metrics.py
│
├── database/
│   ├── cosmos_client.py
│   ├── schemas.py
│   └── migrations/
│
├── scripts/
│   ├── download_models.py       # 사전학습 모델 다운로드
│   ├── ingest_chembl.py         # ChEMBL 데이터 수집
│   └── benchmark.py             # 성능 벤치마크
│
├── infrastructure/              # IaC
│   ├── bicep/
│   │   ├── main.bicep
│   │   └── modules/
│   └── terraform/               # (선택적 Terraform)
│
├── tests/
│   ├── test_generation.py
│   ├── test_admet.py
│   └── test_api.py
│
├── docker-compose.yml
├── Dockerfile
├── pyproject.toml
├── README.md
└── .env.example
```

---

## 🔧 개발 환경 설정

### 로컬 개발 환경

```bash
# 1. 저장소 클론
git clone https://github.com/your-org/ai-drug-discovery.git
cd ai-drug-discovery

# 2. Python 환경 (Poetry 사용)
poetry install
poetry shell

# 3. 의존성 설치
# RDKit (분자 처리)
conda install -c conda-forge rdkit

# AutoDock Vina (도킹)
conda install -c conda-forge vina

# 4. 환경 변수
cp .env.example .env
# .env 파일 편집 (Azure 자격증명 추가)

# 5. 로컬 서비스 시작 (Docker Compose)
docker-compose up -d

# 6. 백엔드 실행
cd backend
uvicorn app.main:app --reload

# 7. 프론트엔드 실행 (별도 터미널)
cd frontend
npm install
npm run dev
```

### Docker Compose (로컬 개발용)

```yaml
# docker-compose.yml
version: '3.8'

services:
  # Redis (Celery 브로커)
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
  
  # PostgreSQL (로컬 DB, 개발용)
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: drug_discovery
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  # FastAPI 백엔드
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - REDIS_URL=redis://redis:6379
      - DATABASE_URL=postgresql://dev:dev@postgres:5432/drug_discovery
    depends_on:
      - redis
      - postgres
    volumes:
      - ./backend:/app
      - ./ml:/ml
  
  # Celery Worker (GPU 필요)
  celery_worker:
    build: ./backend
    command: celery -A tasks.celery_app worker -l info
    environment:
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
  
  # Frontend (개발 모드)
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000

volumes:
  postgres_data:
```

---

## 🧪 테스트 전략

### 단위 테스트

```python
# tests/test_generation.py
import pytest
from ml.models.generator import MoleculeGenerator

def test_molecule_generation():
    """분자 생성 테스트"""
    generator = MoleculeGenerator("models/chemgpt")
    
    molecules = generator.generate(num_samples=10)
    
    assert len(molecules) > 0
    assert all(is_valid_smiles(mol) for mol in molecules)

def test_admet_prediction():
    """ADMET 예측 테스트"""
    from ml.models.admet_predictor import predict_admet
    
    result = predict_admet("CCO")  # 에탄올
    
    assert 'absorption' in result
    assert 0 <= result['toxicity_scores'][0] <= 1
```

### 통합 테스트

```python
# tests/test_api.py
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_generate_endpoint():
    """분자 생성 API 테스트"""
    response = client.post("/api/v1/generate", json={
        "target_disease": "hepatitis_b",
        "num_samples": 10,
        "conditions": {
            "min_molecular_weight": 200,
            "max_molecular_weight": 500
        }
    })
    
    assert response.status_code == 200
    data = response.json()
    assert len(data['molecules']) == 10

def test_hair_loss_generation():
    """탈모 치료제 생성 API 테스트"""
    response = client.post("/api/v1/generate", json={
        "target_disease": "hair_loss",
        "num_samples": 20,
        "conditions": {
            "target_pathways": ["JAK1/2_inhibition", "5AR_inhibition", "Wnt_activation"],
            "scalp_penetration": "high",
            "systemic_exposure": "low",  # 두피 국소 작용 선호
            "min_molecular_weight": 150,
            "max_molecular_weight": 400
        }
    })
    
    assert response.status_code == 200
    data = response.json()
    assert len(data['molecules']) == 20
    # JAK 선택성 확인
    assert all(mol['jak_selectivity'] > 0.7 for mol in data['molecules'])
```

---

## 📊 모니터링 및 로깅

### Azure Application Insights

```python
# app/monitoring.py
from opencensus.ext.azure.log_exporter import AzureLogHandler
import logging

logger = logging.getLogger(__name__)
logger.addHandler(AzureLogHandler(
    connection_string='InstrumentationKey=your-key'
))

# 사용
logger.info("Generated 100 molecules", extra={
    'custom_dimensions': {
        'target': 'hepatitis_b',
        'success_rate': 0.85
    }
})
```

### 메트릭 추적

```python
# app/metrics.py
from prometheus_client import Counter, Histogram

generation_counter = Counter(
    'molecules_generated_total',
    'Total molecules generated',
    ['target_disease']
)

generation_latency = Histogram(
    'generation_latency_seconds',
    'Molecule generation latency'
)

# 사용
with generation_latency.time():
    molecules = generator.generate(100)
    generation_counter.labels(target_disease='hepatitis_b').inc(100)
```

---

## 🚀 CI/CD 파이프라인

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Azure

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: |
          pip install poetry
          poetry install
      
      - name: Run tests
        run: poetry run pytest
      
      - name: Lint
        run: poetry run ruff check .
  
  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Login to Azure Container Registry
        uses: azure/docker-login@v1
        with:
          login-server: ${{ secrets.ACR_LOGIN_SERVER }}
          username: ${{ secrets.ACR_USERNAME }}
          password: ${{ secrets.ACR_PASSWORD }}
      
      - name: Build and push
        run: |
          docker build -t ${{ secrets.ACR_LOGIN_SERVER }}/drug-discovery:${{ github.sha }} .
          docker push ${{ secrets.ACR_LOGIN_SERVER }}/drug-discovery:${{ github.sha }}
  
  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - name: Azure Login
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
      
      - name: Deploy to Container Apps
        run: |
          az containerapp update \
            --name drug-discovery-api \
            --resource-group drug-discovery-rg \
            --image ${{ secrets.ACR_LOGIN_SERVER }}/drug-discovery:${{ github.sha }}
```

---

## 📚 다음 단계

1. **즉시 실행**:
   - [ ] 로컬 개발 환경 설정
   - [ ] ChEMBL 데이터 다운로드 및 전처리
   - [ ] 첫 번째 분자 생성 모델 프로토타입

2. **1주일 내**:
   - [ ] Azure 계정 설정 및 Cosmos DB 생성
   - [ ] ADMET 예측 모델 구현
   - [ ] 기본 API 엔드포인트 개발

3. **1개월 내**:
   - [ ] 간염 타겟 첫 번째 후보 물질 10개 생성
   - [ ] 웹 UI 베타 버전
   - [ ] 벤치마크 테스트 완료

---

**Last Updated**: 2026-01-02  
**Version**: 1.0  
**Author**: AI Drug Discovery Team
