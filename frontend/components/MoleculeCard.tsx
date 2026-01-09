"use client";

import { Molecule } from "@/lib/data/mockMolecules";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
import { useState } from "react";

interface MoleculeCardProps {
  molecule: Molecule;
}

export function MoleculeCard({ molecule }: MoleculeCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopySMILES = () => {
    navigator.clipboard.writeText(molecule.smiles);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const bindingAffinityPercent = molecule.bindingAffinity
    ? ((1 - molecule.bindingAffinity) * 100).toFixed(1)
    : "N/A";

  const synthesisPercent = molecule.synthesisScore
    ? (molecule.synthesisScore * 100).toFixed(0)
    : "N/A";

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      {/* 분자 2D 구조 (Placeholder) */}
      <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-t-lg border-b flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-indigo-300 mb-2">💊</div>
          <p className="text-xs text-gray-400">2D Structure</p>
          <p className="text-xs text-gray-400">(RDKit 렌더링)</p>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-base line-clamp-2">{molecule.name}</CardTitle>
        <CardDescription className="text-xs">ID: {molecule.id}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        {/* SMILES */}
        <div>
          <p className="text-xs font-semibold text-gray-700 mb-1">SMILES</p>
          <div className="flex items-start gap-2">
            <code className="text-xs bg-gray-100 p-2 rounded flex-1 break-all font-mono">
              {molecule.smiles}
            </code>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopySMILES}
              className="px-2 h-auto py-1"
              title="복사"
            >
              <Copy className={`h-4 w-4 ${copied ? "text-green-600" : ""}`} />
            </Button>
          </div>
        </div>

        {/* 기본 특성 */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-blue-50 p-2 rounded">
            <p className="text-xs text-gray-600">MW</p>
            <p className="text-sm font-bold text-blue-700">
              {molecule.molecularWeight.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">Da</p>
          </div>
          <div className="bg-green-50 p-2 rounded">
            <p className="text-xs text-gray-600">LogP</p>
            <p className="text-sm font-bold text-green-700">
              {molecule.logP.toFixed(2)}
            </p>
          </div>
          <div className="bg-purple-50 p-2 rounded">
            <p className="text-xs text-gray-600">TPSA</p>
            <p className="text-sm font-bold text-purple-700">
              {molecule.tpsa.toFixed(1)}
            </p>
            <p className="text-xs text-gray-500">Å²</p>
          </div>
        </div>

        {/* 예측 점수 */}
        <div className="border-t pt-2">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-gray-600 mb-1">Binding Affinity</p>
              <div className="bg-gray-200 rounded-full h-2 w-full overflow-hidden">
                <div
                  className="h-full bg-red-500"
                  style={{
                    width:
                      molecule.bindingAffinity
                        ? `${(1 - molecule.bindingAffinity) * 100}%`
                        : "0%",
                  }}
                />
              </div>
              <p className="text-gray-600 mt-1">{bindingAffinityPercent}%</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Synthesis Score</p>
              <div className="bg-gray-200 rounded-full h-2 w-full overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{
                    width: molecule.synthesisScore
                      ? `${molecule.synthesisScore * 100}%`
                      : "0%",
                  }}
                />
              </div>
              <p className="text-gray-600 mt-1">{synthesisPercent}%</p>
            </div>
          </div>
        </div>
      </CardContent>

      {/* 액션 버튼 */}
      <div className="border-t p-3 pt-3">
        <Button className="w-full" size="sm" variant="outline">
          <ExternalLink className="mr-2 h-4 w-4" />
          상세보기
        </Button>
      </div>
    </Card>
  );
}
