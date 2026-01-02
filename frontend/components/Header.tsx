import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold">Drug Discovery</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/generate" className="text-sm font-medium hover:text-primary transition-colors">
                Generate
              </Link>
              <Link href="/projects" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Projects
              </Link>
              <Link href="/library" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Library
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Help
            </Button>
            <Button size="sm">
              New Project
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
