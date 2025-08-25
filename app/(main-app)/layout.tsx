import { Header } from 'app/components/Header';
import { Footer } from 'app/components/Footer';
import { TabNavigation } from 'app/components/TabNavigation';

export default function MainAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 모바일 최대 너비 제한 */}
      <div className="mx-auto max-w-[480px] bg-white shadow-sm min-h-screen flex flex-col">
        {/* 헤더 */}
        <Header />
        
        {/* 메인 컨텐츠 */}
        <main className="flex-1 px-4 py-6">
          {children}
        </main>
        
        {/* 탭 네비게이션 */}
        <TabNavigation />
        
        {/* 푸터 */}
        <Footer />
      </div>
    </div>
  );
}
