"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { generationFormSchema, diseaseOptions, GenerationFormValues } from "@/lib/schemas/generation";
import { useGenerationStore } from "@/lib/store/generation";
import { generateMolecules } from "@/lib/api/client";
import { ChevronDown, ChevronUp, Sparkles, AlertCircle } from "lucide-react";

export function GenerationForm() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { setFormData, setIsGenerating, setGeneratedMolecules } = useGenerationStore();

  const form = useForm<GenerationFormValues>({
    resolver: zodResolver(generationFormSchema),
    defaultValues: {
      targetDisease: undefined,
      numMolecules: 20,
      advancedOptions: {
        enabled: false,
        molecularWeightMin: 200,
        molecularWeightMax: 500,
        logPMin: -1,
        logPMax: 5,
      },
    },
  });

  const numMolecules = form.watch("numMolecules");
  const advancedEnabled = form.watch("advancedOptions.enabled");

  async function onSubmit(data: GenerationFormValues) {
    try {
      setApiError(null);
      setFormData(data);
      setIsGenerating(true);

      // 백엔드 API 호출
      const response = await generateMolecules({
        target_disease: data.targetDisease!,
        num_molecules: data.numMolecules,
        constraints: data.advancedOptions.enabled
          ? {
              molecular_weight_min: data.advancedOptions.molecularWeightMin,
              molecular_weight_max: data.advancedOptions.molecularWeightMax,
              logp_min: data.advancedOptions.logPMin,
              logp_max: data.advancedOptions.logPMax,
            }
          : undefined,
      });

      // 응답의 분자 데이터를 store에 저장
      setGeneratedMolecules(
        response.molecules.map((mol) => ({
          id: `${mol.name}-${Math.random().toString(36).substr(2, 9)}`,
          name: mol.name,
          smiles: mol.smiles,
          molecularWeight: mol.molecular_weight,
          logP: mol.logp,
          tpsa: mol.tpsa,
          targetDisease: data.targetDisease!,
          bindingAffinity: mol.binding_affinity,
          synthesisScore: mol.synthesis_score,
        }))
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "분자 생성 중 오류가 발생했습니다";
      setApiError(errorMessage);
      console.error("API Error:", error);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* API Error Message */}
        {apiError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900">오류 발생</p>
              <p className="text-sm text-red-800">{apiError}</p>
            </div>
          </div>
        )}

        {/* Target Disease */}
        <FormField
          control={form.control}
          name="targetDisease"
          render={({ field }) => (
            <FormItem>
              <FormLabel>타겟 질환</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="질환을 선택하세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {diseaseOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                분자를 생성할 타겟 질환을 선택하세요
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Number of Molecules */}
        <FormField
          control={form.control}
          name="numMolecules"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                생성할 분자 개수: <span className="font-bold text-primary">{numMolecules}</span>
              </FormLabel>
              <FormControl>
                <Slider
                  min={10}
                  max={100}
                  step={10}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  className="py-4"
                />
              </FormControl>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>10개</span>
                <span>100개</span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Advanced Options Toggle */}
        <div className="border-t pt-4">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-full"
          >
            {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            고급 옵션 {showAdvanced ? "숨기기" : "보기"}
          </button>
        </div>

        {/* Advanced Options */}
        {showAdvanced && (
          <div className="space-y-4 pt-2 border-t">
            {/* Enable Advanced Filtering */}
            <FormField
              control={form.control}
              name="advancedOptions.enabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">고급 필터링 활성화</FormLabel>
                    <FormDescription>
                      분자량 및 LogP 범위를 지정합니다
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Molecular Weight Range */}
            {advancedEnabled && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="advancedOptions.molecularWeightMin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>최소 분자량 (Da)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="200"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="advancedOptions.molecularWeightMax"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>최대 분자량 (Da)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="500"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* LogP Range */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="advancedOptions.logPMin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>최소 LogP</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="-1"
                            step="0.1"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          -5 ~ 10 범위
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="advancedOptions.logPMax"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>최대 LogP</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="5"
                            step="0.1"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          -5 ~ 10 범위
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* Generate Button */}
        <Button type="submit" className="w-full" size="lg">
          <Sparkles className="mr-2 h-5 w-5" />
          분자 생성하기
        </Button>
      </form>
    </Form>
  );
}
