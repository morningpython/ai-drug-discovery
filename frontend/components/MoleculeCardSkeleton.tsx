"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function MoleculeCardSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden">
      {/* 이미지 placeholder */}
      <Skeleton className="h-48 w-full" />
      
      {/* 헤더 */}
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>

      {/* 컨텐츠 */}
      <div className="px-4 pb-4 space-y-3">
        {/* SMILES */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-16 w-full" />
        </div>

        {/* 특성 */}
        <div className="grid grid-cols-3 gap-2">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>

        {/* 점수 */}
        <div className="border-t pt-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-3 w-12" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="border-t p-3">
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  );
}
