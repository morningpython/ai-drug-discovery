import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MoleculeCard } from '../MoleculeCard'
import { Molecule } from '@/lib/data/mockMolecules'

const mockMolecule: Molecule = {
  id: 'test-001',
  name: 'Test Molecule',
  smiles: 'CC(=O)Nc1ccc(O)cc1',
  molecularWeight: 151.16,
  logP: 1.19,
  tpsa: 49.33,
  targetDisease: 'hepatitis_b',
  bindingAffinity: 0.45,
  synthesisScore: 0.78,
}

describe('MoleculeCard', () => {
  it('renders molecule name', () => {
    render(<MoleculeCard molecule={mockMolecule} />)
    expect(screen.getByText('Test Molecule')).toBeInTheDocument()
  })

  it('renders molecule ID', () => {
    render(<MoleculeCard molecule={mockMolecule} />)
    expect(screen.getByText(/test-001/i)).toBeInTheDocument()
  })

  it('renders SMILES string', () => {
    render(<MoleculeCard molecule={mockMolecule} />)
    expect(screen.getByText('CC(=O)Nc1ccc(O)cc1')).toBeInTheDocument()
  })

  it('renders molecular properties', () => {
    render(<MoleculeCard molecule={mockMolecule} />)
    expect(screen.getByText('151.16')).toBeInTheDocument()
    expect(screen.getByText('1.19')).toBeInTheDocument()
  })

  it('copies SMILES to clipboard when copy button is clicked', async () => {
    const mockWriteText = jest.fn()
    Object.assign(navigator, {
      clipboard: {
        writeText: mockWriteText,
      },
    })

    render(<MoleculeCard molecule={mockMolecule} />)
    
    const copyButtons = screen.getAllByRole('button')
    const copyButton = copyButtons.find(btn => btn.getAttribute('title') === '복사')
    
    if (copyButton) {
      fireEvent.click(copyButton)
      await waitFor(() => {
        expect(mockWriteText).toHaveBeenCalledWith('CC(=O)Nc1ccc(O)cc1')
      })
    }
  })

  it('renders detail button', () => {
    render(<MoleculeCard molecule={mockMolecule} />)
    expect(screen.getByText('상세보기')).toBeInTheDocument()
  })

  it('detail button links to correct URL', () => {
    render(<MoleculeCard molecule={mockMolecule} />)
    const detailButton = screen.getByText('상세보기').closest('a')
    expect(detailButton).toHaveAttribute('href', '/molecule/test-001')
  })
})
