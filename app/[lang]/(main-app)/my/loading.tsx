export default function MyPageLoading() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mx-auto max-w-4xl'>
        {/* 제목 스켈레톤 */}
        <div className='mb-8'>
          <div className='h-9 w-48 animate-pulse rounded bg-gray-200'></div>
        </div>

        <div className='rounded-lg bg-white p-6 shadow-md'>
          {/* 사용자 정보 섹션 스켈레톤 */}
          <div className='mb-8'>
            <div className='mb-4 h-6 w-32 animate-pulse rounded bg-gray-200'></div>
            <div className='space-y-3'>
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className='flex items-center justify-between border-b border-gray-200 pb-2'
                >
                  <div className='h-4 w-20 animate-pulse rounded bg-gray-200'></div>
                  <div className='h-4 w-32 animate-pulse rounded bg-gray-200'></div>
                </div>
              ))}
            </div>
          </div>

          {/* 계정 관리 섹션 스켈레톤 */}
          <div className='mb-8'>
            <div className='mb-4 h-6 w-32 animate-pulse rounded bg-gray-200'></div>
            <div className='space-y-3'>
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className='flex items-center justify-between border-b border-gray-200 pb-2'
                >
                  <div className='h-4 w-24 animate-pulse rounded bg-gray-200'></div>
                  <div className='h-4 w-28 animate-pulse rounded bg-gray-200'></div>
                </div>
              ))}
            </div>
          </div>

          {/* 로그아웃 버튼 스켈레톤 */}
          <div className='border-t pt-6'>
            <div className='h-10 w-full animate-pulse rounded bg-gray-200'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
