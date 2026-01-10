"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Maximize2, RotateCcw } from "lucide-react";

interface Molecule3DViewerProps {
  smiles: string;
  height?: string;
}

declare global {
  interface Window {
    $3Dmol: any;
  }
}

export function Molecule3DViewer({ smiles, height = "500px" }: Molecule3DViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [viewer, setViewer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Load 3Dmol.js script
  useEffect(() => {
    if (typeof window !== "undefined" && !window.$3Dmol) {
      const script = document.createElement("script");
      script.src = "https://3Dmol.csb.pitt.edu/build/3Dmol-min.js";
      script.async = true;
      script.onload = () => {
        setScriptLoaded(true);
      };
      script.onerror = () => {
        setError("3Dmol.js 라이브러리를 로드할 수 없습니다.");
        setIsLoading(false);
      };
      document.head.appendChild(script);
    } else if (typeof window !== "undefined" && window.$3Dmol) {
      setScriptLoaded(true);
    }
  }, []);

  // Initialize viewer and render molecule
  useEffect(() => {
    if (!scriptLoaded || !viewerRef.current) return;

    const loadMolecule = async () => {
      try {
        // Fetch 3D coordinates from backend
        const response = await fetch(
          `http://localhost:8000/api/v1/molecules/${encodeURIComponent(smiles)}/sdf`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch 3D coordinates");
        }

        const sdfData = await response.text();

        // Create viewer
        const config = { backgroundColor: "white" };
        const newViewer = window.$3Dmol.createViewer(viewerRef.current, config);

        newViewer.addModel(sdfData, "sdf");
        newViewer.setStyle({}, { stick: { radius: 0.15 }, sphere: { scale: 0.3 } });
        newViewer.zoomTo();
        newViewer.render();

        setViewer(newViewer);
        setIsLoading(false);
      } catch (err) {
        console.error("3D viewer initialization error:", err);
        // Fallback to placeholder if backend fails
        try {
          const config = { backgroundColor: "white" };
          const newViewer = window.$3Dmol.createViewer(viewerRef.current, config);
          const sdfData = generatePlaceholderSDF(smiles);
          newViewer.addModel(sdfData, "sdf");
          newViewer.setStyle({}, { stick: { radius: 0.15 }, sphere: { scale: 0.3 } });
          newViewer.zoomTo();
          newViewer.render();
          setViewer(newViewer);
          setIsLoading(false);
        } catch (fallbackErr) {
          setError("분자를 렌더링할 수 없습니다.");
          setIsLoading(false);
        }
      }
    };

    loadMolecule();
  }, [scriptLoaded, smiles]);

  const handleReset = () => {
    if (viewer) {
      viewer.zoomTo();
      viewer.render();
    }
  };

  const handleFullscreen = () => {
    if (viewerRef.current) {
      if (viewerRef.current.requestFullscreen) {
        viewerRef.current.requestFullscreen();
      }
    }
  };

  if (error) {
    return (
      <div
        className="flex items-center justify-center bg-red-50 border-2 border-red-200 rounded-lg"
        style={{ height }}
      >
        <div className="text-center">
          <p className="text-red-600 font-semibold">오류</p>
          <p className="text-sm text-red-500 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg z-10"
          style={{ height }}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-sm text-gray-600">3D 모델 로딩 중...</p>
          </div>
        </div>
      )}
      
      <div
        ref={viewerRef}
        className="rounded-lg border-2 border-gray-200 relative"
        style={{ height, width: "100%" }}
      />

      {!isLoading && (
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleReset}
            title="초기 위치로 재설정"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleFullscreen}
            title="전체화면"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      )}

      {!isLoading && (
        <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
          💡 마우스로 드래그하여 회전, 스크롤하여 줌
        </div>
      )}
    </div>
  );
}

// Helper function to generate placeholder SDF data
// In production, this would come from a backend API that converts SMILES to 3D
function generatePlaceholderSDF(smiles: string): string {
  // This is a simple placeholder - real implementation would use RDKit or similar
  // to generate proper 3D coordinates from SMILES
  return `
  Molecule from ${smiles}
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
`;
}
