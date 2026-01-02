'use client'

interface MoleculeGridProps {
  molecules: any[]
  isLoading: boolean
}

export function MoleculeGrid({ molecules, isLoading }: MoleculeGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4 animate-pulse">
            <div className="bg-muted h-48 rounded mb-4" />
            <div className="h-4 bg-muted rounded w-3/4 mb-2" />
            <div className="h-3 bg-muted rounded w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (molecules.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <div className="text-6xl mb-4">🧪</div>
        <p className="text-lg font-medium">No molecules yet</p>
        <p className="text-sm">Configure conditions and generate molecules to get started</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {molecules.map((molecule) => (
        <div
          key={molecule.id}
          className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
        >
          {/* Placeholder for molecule structure */}
          <div className="bg-muted h-48 rounded mb-4 flex items-center justify-center">
            <span className="text-muted-foreground font-mono text-sm">{molecule.smiles}</span>
          </div>
          
          <div className="space-y-1">
            <h3 className="font-medium">{molecule.name || 'Unnamed'}</h3>
            <p className="text-sm text-muted-foreground font-mono">{molecule.smiles}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
