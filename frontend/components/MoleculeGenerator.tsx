'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GenerationForm } from '@/components/GenerationForm'
import { MoleculeGrid } from '@/components/MoleculeGrid'

export function MoleculeGenerator() {
  const [molecules, setMolecules] = useState<any[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async (conditions: any) => {
    setIsGenerating(true)
    // TODO: API 호출 (현재는 Mock)
    setTimeout(() => {
      setMolecules([
        { id: 1, smiles: 'CCO', name: 'Ethanol' },
        { id: 2, smiles: 'CC(C)O', name: 'Isopropanol' },
      ])
      setIsGenerating(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Generation Form */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Generate Molecules</CardTitle>
              <CardDescription>
                Set conditions and generate novel drug candidates with AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GenerationForm onGenerate={handleGenerate} isGenerating={isGenerating} />
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Results */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Generated Molecules</CardTitle>
              <CardDescription>
                {molecules.length > 0 
                  ? `${molecules.length} molecules generated`
                  : 'No molecules generated yet. Set conditions and click Generate.'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MoleculeGrid molecules={molecules} isLoading={isGenerating} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
