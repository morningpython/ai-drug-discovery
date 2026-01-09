"use client";

import { GenerationForm } from "@/components/GenerationForm";
import { MoleculeCard } from "@/components/MoleculeCard";
import { useGenerationStore } from "@/lib/store/generation";
import { generateMockMolecules } from "@/lib/data/mockMolecules";
import { useEffect, useState } from "react";

export default function GeneratePage() {
  const { formData, isGenerating, generatedMolecules, setGeneratedMolecules, setIsGenerating } =
    useGenerationStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (formData.targetDisease && isGenerating) {
      // 2초 후 mock 데이터로 분자 생성 시뮬레이션
      const timer = setTimeout(() => {
        const molecules = generateMockMolecules(
          formData.targetDisease!,
          formData.numMolecules
        );
        setGeneratedMolecules(molecules);
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

          {isGenerating && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin mb-4">
                  <div className="h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto" />
                </div>
                <p className="text-gray-600 font-medium">분자 생성 중...</p>
                <p className="text-sm text-gray-500 mt-2">
                  {formData.numMolecules}개의 분자를 생성하고 있습니다
                </p>
              </div>
            </div>
          )}

          {!isGenerating && generatedMolecules.length === 0 && (
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
