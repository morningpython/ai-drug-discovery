import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Beaker, Brain, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">
            AI로 신약 개발을 <span className="text-blue-600">혁신</span>합니다
          </h1>
          <p className="text-xl text-gray-600">
            신약 개발 기간을 30년에서 3-5년으로 단축하는 AI 기반 플랫폼
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Link href="/generate">
            <Button size="lg" className="gap-2">
              분자 생성 시작하기 <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button size="lg" variant="outline">
            데모 보기
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card>
            <CardHeader>
              <Brain className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>AI 분자 생성</CardTitle>
              <CardDescription>
                Transformer 기반 AI로 새로운 약물 후보 물질을 생성합니다
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>ADMET 예측</CardTitle>
              <CardDescription>
                약물의 흡수, 분포, 대사, 배설, 독성을 AI로 예측합니다
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Beaker className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>가상 스크리닝</CardTitle>
              <CardDescription>
                단백질 도킹 시뮬레이션으로 바인딩 친화도를 평가합니다
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-16 p-8 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">타겟 질환</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-white rounded-full text-sm font-medium border">
              B형 간염 완치제
            </span>
            <span className="px-4 py-2 bg-white rounded-full text-sm font-medium border">
              GLP-1 비만 치료
            </span>
            <span className="px-4 py-2 bg-white rounded-full text-sm font-medium border">
              알츠하이머
            </span>
            <span className="px-4 py-2 bg-white rounded-full text-sm font-medium border">
              탈모 치료
            </span>
            <span className="px-4 py-2 bg-white rounded-full text-sm font-medium border">
              장수 화합물
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

