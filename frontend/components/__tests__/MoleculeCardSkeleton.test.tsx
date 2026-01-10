import { render, screen } from '@testing-library/react'
import { MoleculeCardSkeleton } from '../MoleculeCardSkeleton'

describe('MoleculeCardSkeleton', () => {
  it('renders skeleton card', () => {
    const { container } = render(<MoleculeCardSkeleton />)
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument()
  })

  it('renders loading state elements', () => {
    const { container } = render(<MoleculeCardSkeleton />)
    const skeletons = container.querySelectorAll('[class*="bg-"]')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('matches card structure', () => {
    const { container } = render(<MoleculeCardSkeleton />)
    // Should have similar structure to MoleculeCard
    expect(container.querySelector('[class*="rounded"]')).toBeInTheDocument()
  })
})
