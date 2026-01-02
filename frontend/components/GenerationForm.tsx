'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

interface GenerationFormProps {
  onGenerate: (conditions: any) => void
  isGenerating: boolean
}

export function GenerationForm({ onGenerate, isGenerating }: GenerationFormProps) {
  const [targetDisease, setTargetDisease] = useState('hepatitis_b')
  const [numMolecules, setNumMolecules] = useState([50])
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerate({
      targetDisease,
      numMolecules: numMolecules[0],
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Target Disease */}
      <div className="space-y-2">
        <Label htmlFor="target-disease">Target Disease</Label>
        <Select value={targetDisease} onValueChange={setTargetDisease}>
          <SelectTrigger id="target-disease">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hepatitis_b">Hepatitis B (HBV)</SelectItem>
            <SelectItem value="glp1">GLP-1 Obesity</SelectItem>
            <SelectItem value="alzheimers">Alzheimer's Disease</SelectItem>
            <SelectItem value="hair_loss">Hair Loss (Alopecia)</SelectItem>
            <SelectItem value="longevity">Longevity</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Number of Molecules */}
      <div className="space-y-2">
        <Label htmlFor="num-molecules">
          Number of Molecules: <span className="font-bold text-primary">{numMolecules[0]}</span>
        </Label>
        <Slider
          id="num-molecules"
          min={10}
          max={100}
          step={10}
          value={numMolecules}
          onValueChange={setNumMolecules}
          className="py-4"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>10</span>
          <span>100</span>
        </div>
      </div>

      {/* Advanced Options Toggle */}
      <div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full"
        >
          {showAdvanced ? '− Hide' : '+ Show'} Advanced Options
        </Button>
      </div>

      {/* Advanced Options */}
      {showAdvanced && (
        <div className="space-y-4 pt-2 border-t">
          <div className="space-y-2">
            <Label htmlFor="min-mw">Min Molecular Weight (Da)</Label>
            <Input
              id="min-mw"
              type="number"
              placeholder="200"
              defaultValue="200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-mw">Max Molecular Weight (Da)</Label>
            <Input
              id="max-mw"
              type="number"
              placeholder="500"
              defaultValue="500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logp">LogP Range</Label>
            <Input
              id="logp"
              type="text"
              placeholder="0-5"
              defaultValue="0-5"
            />
          </div>
        </div>
      )}

      {/* Generate Button */}
      <Button type="submit" className="w-full" size="lg" disabled={isGenerating}>
        {isGenerating ? (
          <>
            <span className="animate-spin mr-2">⏳</span>
            Generating...
          </>
        ) : (
          'Generate Molecules'
        )}
      </Button>
    </form>
  )
}
