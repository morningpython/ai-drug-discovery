"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Molecule } from "@/lib/data/mockMolecules";
import { mockMolecules } from "@/lib/data/mockMolecules";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Copy, FlaskConical } from "lucide-react";
import Link from "next/link";
import { Molecule3DViewer } from "@/components/Molecule3DViewer";

export default function MoleculeDetailPage() {
  const params = useParams();
  const [molecule, setMolecule] = useState<Molecule | null>(null);
  const [detailedProperties, setDetailedProperties] = useState<any>(null);
  const [similarMolecules, setSimilarMolecules] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"2d" | "3d">("2d");
  const [loadingProperties, setLoadingProperties] = useState(false);
  const [loadingSimilar, setLoadingSimilar] = useState(false);
  const [showSimilar, setShowSimilar] = useState(false);
  const [similarityThreshold, setSimilarityThreshold] = useState(0.7);

  useEffect(() => {
    // TODO: Replace with actual API call
    const found = mockMolecules.find((m) => m.id === params.id);
    if (found) {
      setMolecule(found);
      // Fetch detailed properties from backend
      fetchDetailedProperties(found.smiles);
    }
  }, [params.id]);

  const fetchDetailedProperties = async (smiles: string) => {
    setLoadingProperties(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/molecules/${encodeURIComponent(smiles)}/properties`
      );
      if (response.ok) {
        const data = await response.json();
        setDetailedProperties(data);
      }
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setLoadingProperties(false);
    }
  };

  const findSimilarMolecules = async () => {
    if (!molecule) return;
    
    setLoadingSimilar(true);
    setShowSimilar(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/molecules/search/similar?query_smiles=${encodeURIComponent(
          molecule.smiles
        )}&threshold=${similarityThreshold}&limit=10`,
        { method: "POST" }
      );
      if (response.ok) {
        const data = await response.json();
        setSimilarMolecules(data.molecules || []);
      }
    } catch (error) {
      console.error("Failed to find similar molecules:", error);
    } finally {
      setLoadingSimilar(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!molecule) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">분자를 찾을 수 없습니다.</p>
      </div>
    );
  }

  // Calculate InChI (placeholder - would come from backend)
  const inchi = `InChI=1S/${molecule.smiles.replace(/[^A-Za-z0-9]/g, "")}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/generate">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                목록으로
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{molecule.name}</h1>
              <p className="text-sm text-gray-500 mt-1">ID: {molecule.id}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={`/molecule/${params.id}/admet`}>
              <Button>
                <FlaskConical className="mr-2 h-4 w-4" />
                ADMET 예측
              </Button>
            </Link>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              프로젝트에 추가
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Structure Visualization */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>분자 구조</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "2d" | "3d")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="2d">2D 구조</TabsTrigger>
                    <TabsTrigger value="3d">3D 구조</TabsTrigger>
                  </TabsList>

                  <TabsContent value="2d" className="mt-4">
                    <div className="aspect-square bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">💊</div>
                        <p className="text-sm text-gray-500">2D 구조 렌더링</p>
                        <p className="text-xs text-gray-400 mt-1">(RDKit API 연동 예정)</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="3d" className="mt-4">
                    <Molecule3DViewer smiles={molecule.smiles} height="450px" />
                  </TabsContent>
                </Tabs>

                {/* SMILES & InChI */}
                <div className="mt-6 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-gray-700">SMILES</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(molecule.smiles)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <code className="block bg-gray-100 px-3 py-2 rounded text-xs break-all">
                      {molecule.smiles}
                    </code>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-gray-700">InChI</p>
                      <Button variant="ghost" size="sm" onClick={() => handleCopy(inchi)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <code className="block bg-gray-100 px-3 py-2 rounded text-xs break-all">
                      {inchi}
                    </code>
                  </div>
                </div>

                {copied && (
                  <p className="text-sm text-green-600 mt-2 text-center">✓ 복사되었습니다</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Properties */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>분자 특성</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Basic Properties */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">기본 특성</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <PropertyItem
                        label="분자량 (MW)"
                        value={`${molecule.molecularWeight.toFixed(2)} g/mol`}
                      />
                      <PropertyItem label="LogP" value={molecule.logP.toFixed(2)} />
                      <PropertyItem label="TPSA" value={`${molecule.tpsa.toFixed(2)} Ų`} />
                      <PropertyItem
                        label="타겟 질환"
                        value={
                          molecule.targetDisease === "hepatitis_b"
                            ? "B형 간염"
                            : molecule.targetDisease === "glp1"
                            ? "GLP-1"
                            : molecule.targetDisease
                        }
                      />
                    </div>
                  </div>

                  {/* Extended Properties (Placeholders) */}
                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      확장 특성
                      {loadingProperties && (
                        <span className="ml-2 text-xs text-gray-400">(계산 중...)</span>
                      )}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <PropertyItem
                        label="HBD"
                        value={detailedProperties?.hbd?.toString() ?? "—"}
                        placeholder={!detailedProperties}
                      />
                      <PropertyItem
                        label="HBA"
                        value={detailedProperties?.hba?.toString() ?? "—"}
                        placeholder={!detailedProperties}
                      />
                      <PropertyItem
                        label="Rotatable Bonds"
                        value={detailedProperties?.rotatable_bonds?.toString() ?? "—"}
                        placeholder={!detailedProperties}
                      />
                      <PropertyItem
                        label="QED Score"
                        value={detailedProperties?.qed?.toFixed(3) ?? "—"}
                        placeholder={!detailedProperties}
                      />
                    </div>
                  </div>

                  {/* Lipinski's Rule of 5 */}
                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      Lipinski's Rule of 5
                    </h3>
                    <div className="space-y-2">
                      <RuleItem
                        label="MW ≤ 500"
                        passed={
                          detailedProperties?.molecular_weight
                            ? detailedProperties.molecular_weight <= 500
                            : molecule.molecularWeight <= 500
                        }
                        value={
                          detailedProperties?.molecular_weight?.toFixed(2) ??
                          molecule.molecularWeight.toFixed(2)
                        }
                      />
                      <RuleItem
                        label="LogP ≤ 5"
                        passed={
                          detailedProperties?.logp
                            ? detailedProperties.logp <= 5
                            : molecule.logP <= 5
                        }
                        value={detailedProperties?.logp?.toFixed(2) ?? molecule.logP.toFixed(2)}
                      />
                      <RuleItem
                        label="HBD ≤ 5"
                        passed={detailedProperties?.hbd ? detailedProperties.hbd <= 5 : null}
                        value={detailedProperties?.hbd?.toString() ?? "계산 필요"}
                      />
                      <RuleItem
                        label="HBA ≤ 10"
                        passed={detailedProperties?.hba ? detailedProperties.hba <= 10 : null}
                        value={detailedProperties?.hba?.toString() ?? "계산 필요"}
                      />
                    </div>
                    {detailedProperties?.lipinski_violations !== undefined && (
                      <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                        <span className="font-semibold">Violations:</span>{" "}
                        <span
                          className={
                            detailedProperties.lipinski_violations === 0
                              ? "text-green-600"
                              : "text-orange-600"
                          }
                        >
                          {detailedProperties.lipinski_violations}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Predicted Activity */}
                  {molecule.bindingAffinity && (
                    <div className="pt-4 border-t">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">예측 활성</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <PropertyItem
                          label="결합 친화도"
                          value={`${molecule.bindingAffinity.toFixed(2)} nM`}
                        />
                        {molecule.synthesisScore && (
                          <PropertyItem
                            label="합성 가능성"
                            value={`${(molecule.synthesisScore * 100).toFixed(0)}%`}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Similarity Search Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>유사 분자 검색</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                      유사도 임계값: {(similarityThreshold * 100).toFixed(0)}%
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="1.0"
                      step="0.05"
                      value={similarityThreshold}
                      onChange={(e) => setSimilarityThreshold(parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <Button
                    onClick={findSimilarMolecules}
                    disabled={loadingSimilar}
                    className="w-full"
                  >
                    {loadingSimilar ? "검색 중..." : "유사 분자 찾기"}
                  </Button>

                  {showSimilar && (
                    <div className="mt-4">
                      {loadingSimilar ? (
                        <div className="text-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                          <p className="text-sm text-gray-500 mt-2">검색 중...</p>
                        </div>
                      ) : similarMolecules.length > 0 ? (
                        <div className="space-y-3">
                          <p className="text-sm font-semibold text-gray-700">
                            {similarMolecules.length}개의 유사 분자 발견
                          </p>
                          {similarMolecules.map((mol, idx) => (
                            <div
                              key={idx}
                              className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-sm">{mol.name}</span>
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                  {(mol.similarity * 100).toFixed(1)}% 유사
                                </span>
                              </div>
                              <code className="text-xs bg-gray-100 px-2 py-1 rounded block break-all">
                                {mol.smiles}
                              </code>
                              <div className="flex gap-4 mt-2 text-xs text-gray-600">
                                <span>MW: {mol.molecular_weight?.toFixed(1)}</span>
                                <span>LogP: {mol.logp?.toFixed(2)}</span>
                                <span>TPSA: {mol.tpsa?.toFixed(1)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-4">
                          유사한 분자를 찾을 수 없습니다.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function PropertyItem({
  label,
  value,
  placeholder = false,
}: {
  label: string;
  value: string;
  placeholder?: boolean;
}) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`text-sm font-semibold ${placeholder ? "text-gray-400" : "text-gray-900"}`}>
        {value}
      </p>
    </div>
  );
}

function RuleItem({
  label,
  passed,
  value,
}: {
  label: string;
  passed: boolean | null;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-sm text-gray-700">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">{value}</span>
        {passed === null ? (
          <span className="text-xs text-gray-400">—</span>
        ) : passed ? (
          <span className="text-green-600">✓</span>
        ) : (
          <span className="text-red-600">✗</span>
        )}
      </div>
    </div>
  );
}
