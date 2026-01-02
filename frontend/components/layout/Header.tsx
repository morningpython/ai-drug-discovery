import Link from "next/link";
import { Flask } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Flask className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">AI Drug Discovery</span>
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link 
              href="/generate" 
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              분자 생성
            </Link>
            <Link 
              href="/projects" 
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              프로젝트
            </Link>
            <Link 
              href="/library" 
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              분자 라이브러리
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
