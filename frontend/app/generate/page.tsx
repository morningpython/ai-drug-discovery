import { GenerationForm } from "@/components/GenerationForm";

export default function GeneratePage() {
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
            <div className="text-sm text-gray-500">0개</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div className="text-center text-gray-400 col-span-full py-20">
              분자 카드가 여기에 표시됩니다 (STORY-003)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
