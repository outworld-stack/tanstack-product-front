import { Link } from '@tanstack/react-router'


export default function NotFound() {
  return (
    <>
    <div className='text-2xl text-center rounded-md flex-col items-center justify-between py-20 *:backdrop-blur mx-auto max-w-4xl'>
      <span className='text-4xl backdrop-opacity-50 font-semibold text-gray-800 mb-10 max-w-20 mx-auto inline-block before:absolute before:-inset-2 before:block before:-skew-y-3 before:bg-yellow-400'>
        <span className='relative text-stone-900 dark:text-gray-950'>404</span>
      </span>
      <p className='text-7xl mb-20 font-VazirBold text-stone-900 backdrop-opacity-50'>
        چنین صفحه ای وجود ندارد
      </p>
      <Link className='font-VazirMedium px-6 py-4 bg-stone-900 text-yellow-400 rounded-md transition' to='/'>بازگشت به صفحه اصلی</Link>
    </div>
    </>
  )
}