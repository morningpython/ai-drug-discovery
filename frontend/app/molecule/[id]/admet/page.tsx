"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, RefreshCcw, Download } from "lucide-react";
import Link from "next/link";
import { ADMETRadarChart } from "@/components/ADMETRadarChart";

interface ADMETResult {
  smiles: string;
  absorption: number;
  distribution: number;
  metabolism: number;
  excretion: number;
  toxicity: number;
  overall_score: number;
  details: {
    caco2_permeability: number;
    bioavailability: number;
    bbb_penetration: number;
    pgp_substrate: boolean;
    cyp_inhibition: string[];
    half_life: number;
    clearance: number;
    ld50: number;
    herg_inhibition: boolean;
    hepatotoxicity: boolean;
    skin_sensitization: boolean;
  };
  timestamp: string;
}

export default function ADMETPage() {
  const params = useParams();
  const [result, setResult] = useState<ADMETResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchADMETResult();
  }, [params.id]);

  const fetchADMETResult = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch from actual API
      const smiles = "CC(=O)Oc1ccccc1C(=O)O"; // TODO: Get from molecule data
      const response = await fetch(
        `http://localhost:8000/api/v1/admet/predict?smiles=${encodeURIComponent(smiles)}`,
        { method: "POST" }
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch ADMET prediction");
      }
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("ADMET prediction error:", err);
      setError("ADMET 예측 결과를 불러올 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleRepredict = () => {
    fetchADMETResult();
  };

  const handleDownload = () => {
    if (!result) return;
    
    const dataStr = JSON.stringify(result, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `admet_result_${params.id}_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 font-semibold">ADMET 예측 중...</p>
          <p className="text-sm text-gray-500 mt-2">분자의 약물동태학 특성을 분석하고 있습니다</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">오류 발생</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{error}</p>
            <div className="flex gap-2">
              <Link href={`/molecule/${params.id}`}>
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  돌아가기
                </Button>
              </Link>
              <Button onClick={fetchADMETResult}>
                <RefreshCcw className="mr-2 h-4 w-4" />
                다시 시도
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!result) return null;

  const radarData = [
    { category: "흡수 (Absorption)", value: result.absorption * 100, fullMark: 100 },
    { category: "분포 (Distribution)", value: result.distribution * 100, fullMark: 100 },
    { category: "대사 (Metabolism)", value: result.metabolism * 100, fullMark: 100 },
    { category: "배설 (Excretion)", value: result.excretion * 100, fullMark: 100 },
    { category: "독성 (Toxicity)", value: result.toxicity * 100, fullMark: 100 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/molecule/${params.id}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                분자 상세
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ADMET 예측 결과</h1>
              <p className="text-sm text-gray-500 mt-1">
                약물동태학 및 독성 평가 | Molecule ID: {params.id}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleRepredict}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              재예측
            </Button>
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              결과 다운로드
            </Button>
          </div>
        </div>

        {/* Overall Score Card */}
        <Card className="mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-semibold opacity-90 mb-2">종합 점수</p>
              <p className="text-6xl font-bold mb-2">{(result.overall_score * 100).toFixed(1)}</p>
              <p className="text-sm opacity-75">100점 만점</p>
              <div className="mt-4 flex justify-center gap-4">
                <div>
                  <p className="text-xs opacity-75">예측 시간</p>
                  <p className="text-sm font-semibold">
                    {new Date(result.timestamp).toLocaleString('ko-KR')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>ADMET 프로파일</CardTitle>
            </CardHeader>
            <CardContent>
              <ADMETRadarChart data={radarData} />
              <div className="mt-4 text-sm text-gray-600">
                <p className="font-semibold mb-2">카테고리 설명:</p>
                <ul className="space-y-1 text-xs">
                  <li>• <strong>흡수</strong>: 장에서의 약물 흡수율</li>
                  <li>• <strong>분포</strong>: 체내 조직으로의 분포도</li>
                  <li>• <strong>대사</strong>: 간에서의 대사 안정성</li>
                  <li>• <strong>배설</strong>: 신장을 통한 배출 효율</li>
                  <li>• <strong>독성</strong>: 독성 부작용 안전성 (높을수록 안전)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Category Scores */}
          <Card>
            <CardHeader>
              <CardTitle>카테고리별 점수</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ScoreBar label="흡수 (Absorption)" value={result.absorption} color="blue" />
                <ScoreBar label="분포 (Distribution)" value={result.distribution} color="green" />
                <ScoreBar label="대사 (Metabolism)" value={result.metabolism} color="yellow" />
                <ScoreBar label="배설 (Excretion)" value={result.excretion} color="orange" />
                <ScoreBar label="독성 (Toxicity)" value={result.toxicity} color="red" />
              </div>
            </CardContent>
          </Card>

          {/* Absorption Details */}
          <Card>
            <CardHeader>
              <CardTitle>흡수 (Absorption)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <DetailItem
                  label="Caco-2 투과성"
                  value={`${result.details.caco2_permeability.toFixed(2)} × 10⁻⁶ cm/s`}
                  status={result.details.caco2_permeability > 5 ? "good" : "warning"}
                />
                <DetailItem
                  label="생체이용률"
                  value={`${(result.details.bioavailability * 100).toFixed(1)}%`}
                  status={result.details.bioavailability > 0.3 ? "good" : "warning"}
                />
                <DetailItem
                  label="P-gp 기질"
                  value={result.details.pgp_substrate ? "예" : "아니오"}
                  status={!result.details.pgp_substrate ? "good" : "warning"}
                />
              </div>
            </CardContent>
          </Card>

          {/* Distribution Details */}
          <Card>
            <CardHeader>
              <CardTitle>분포 (Distribution)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <DetailItem
                  label="BBB 투과성"
                  value={`${(result.details.bbb_penetration * 100).toFixed(1)}%`}
                  status={result.details.bbb_penetration < 0.3 ? "good" : "warning"}
                  info="혈액-뇌 장벽 통과율 (낮을수록 안전)"
                />
              </div>
            </CardContent>
          </Card>

          {/* Metabolism Details */}
          <Card>
            <CardHeader>
              <CardTitle>대사 (Metabolism)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">CYP 억제</p>
                  <div className="flex flex-wrap gap-2">
                    {result.details.cyp_inhibition.length > 0 ? (
                      result.details.cyp_inhibition.map((cyp) => (
                        <span
                          key={cyp}
                          className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full"
                        >
                          {cyp}
                        </span>
                      ))
                    ) : (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        억제 없음
                      </span>
                    )}
                  </div>
                </div>
                <DetailItem
                  label="반감기"
                  value={`${result.details.half_life.toFixed(1)} 시간`}
                  status="neutral"
                />
                <DetailItem
                  label="제거율"
                  value={`${result.details.clearance.toFixed(1)} mL/min/kg`}
                  status="neutral"
                />
              </div>
            </CardContent>
          </Card>

          {/* Toxicity Details */}
          <Card>
            <CardHeader>
              <CardTitle>독성 (Toxicity)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <DetailItem
                  label="LD50 (급성 독성)"
                  value={`${result.details.ld50} mg/kg`}
                  status={result.details.ld50 > 500 ? "good" : "bad"}
                  info="반수치사량 (높을수록 안전)"
                />
                <DetailItem
                  label="hERG 억제"
                  value={result.details.herg_inhibition ? "위험" : "안전"}
                  status={!result.details.herg_inhibition ? "good" : "bad"}
                  info="심장 독성 위험"
                />
                <DetailItem
                  label="간독성"
                  value={result.details.hepatotoxicity ? "위험" : "안전"}
                  status={!result.details.hepatotoxicity ? "good" : "bad"}
                />
                <DetailItem
                  label="피부 감작"
                  value={result.details.skin_sensitization ? "위험" : "안전"}
                  status={!result.details.skin_sensitization ? "good" : "bad"}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Disclaimer */}
        <Card className="mt-6 bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <p className="text-sm text-yellow-800">
              ⚠️ <strong>주의사항</strong>: 이 예측 결과는 AI 모델 기반 예측치이며, 실제 실험 결과와 다를 수 있습니다.
              약물 개발 시 반드시 실험적 검증이 필요합니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper Components
function ScoreBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "blue" | "green" | "yellow" | "orange" | "red";
}) {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    orange: "bg-orange-500",
    red: "bg-red-500",
  };

  const percentage = value * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        <span className="text-sm font-bold text-gray-900">{percentage.toFixed(1)}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full ${colorClasses[color]} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function DetailItem({
  label,
  value,
  status,
  info,
}: {
  label: string;
  value: string;
  status: "good" | "bad" | "warning" | "neutral";
  info?: string;
}) {
  const statusIcons = {
    good: "✓",
    bad: "✗",
    warning: "⚠",
    neutral: "—",
  };

  const statusColors = {
    good: "text-green-600",
    bad: "text-red-600",
    warning: "text-yellow-600",
    neutral: "text-gray-600",
  };

  return (
    <div className="flex items-start justify-between py-2 border-b border-gray-100 last:border-0">
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        {info && <p className="text-xs text-gray-500 mt-1">{info}</p>}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-900 font-medium">{value}</span>
        <span className={`text-lg ${statusColors[status]}`}>{statusIcons[status]}</span>
      </div>
    </div>
  );
}
