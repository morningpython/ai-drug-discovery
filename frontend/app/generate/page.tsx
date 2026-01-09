"use client";

import { GenerationForm } from "@/components/GenerationForm";
import { MoleculeCard } from "@/components/MoleculeCard";
import { MoleculeCardSkeleton } from "@/components/MoleculeCardSkeleton";
import { useGenerationStore } from "@/lib/store/generation";
import { generateMockMolecules } from "@/lib/data/mockMolecules";
import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function GeneratePage() {
  const { formData, isGenerating, generatedMolecules, setGeneratedMolecules, setIsGenerating } =
    useGenerationStore();
  const [isClient, setIsClient] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (formData.targetDisease && isGenerating) {
      setError(null);
      setShowSuccess(false);

      // 2초 후 mock 데이터로 분자 생성 시뮬레이션
      const timer = setTimeout(() => {
        try {
          const molecules = generateMockMolecules(
            formData.targetDisease!,
            formData.numMolecules
          );
          setGeneratedMolecules(molecules);
          setShowSuccess(true);
          // 3초 후 성공 메시지 숨기기
          setTimeout(() => setShowSuccess(false), 3000);
        } catch (err) {
          setError("분자 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
          console.error(err);
        }
        setIsGenerating(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [formData, isGenerating, setGeneratedMolecules, setIsGenerating]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-[400px_1fr] gap-6 h-[calc(100vh-8rem)]">
        {/* 좌측: 조건 입력 패널 */}
        <div className="bg-white border rounded-lg p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6">분자 생성</h2>
          <GenerationForm />
        </div>

        {/* 우측: 결과 표시 영역 */}
        <div className="bg-gray-50 border rounded-lg p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">생성된 분자</h2>
            <div className="text-sm text-gray-500">{generatedMolecules.length}개</div>
          </div>

          {/* 성공 메시지 */}
          {showSuccess && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-green-900">성공!</p>
                <p className="text-sm text-green-800">
                  {generatedMolecules.length}개의 분자가 생성되었습니다.
                </p>
              </div>
            </div>
          )}

          {/* 에러 메시지 */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-900">오류 발생</p>
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {Array.from({ length: formData.numMolecules || 20 }).map((_, i) => (
                <MoleculeCardSkeleton key={i} />
              ))}
            </div>
          )}

          {!isGenerating && generatedMolecules.length === 0 && !error && (
            <div className="text-center text-gray-400 col-span-full py-20">
              <p className="text-lg mb-2">🔬</p>
              <p>왼쪽에서 조건을 입력하고 "분자 생성하기"를 클릭하세요</p>
            </div>
          )}

          {!isGenerating && generatedMolecules.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {generatedMolecules.map((molecule) => (
                <MoleculeCard key={molecule.id} molecule={molecule} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
