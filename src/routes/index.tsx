import { createFileRoute, Link } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/api/products';
import { Button } from "@/components/ui/button.tsx";


const productsQueryOptions = queryOptions({
  queryKey: ['products', { limit: 3 }],
  queryFn: () => fetchProducts(3),
});


export const Route = createFileRoute('/')({
  component: HomePage,
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQueryOptions)
});

function HomePage() {

  const { data: products } = useSuspenseQuery(productsQueryOptions);



  return (
    <div className='flex flex-col lg:flex-row items-center lg:items-start justify-center p-10 gap-5 lg:gap-x-20'>
      <div className='*:backdrop-blur *:backdrop-opacity-50 flex flex-col items-center lg:items-start gap-5'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gold" className="size-25">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
        <h1 className='text-4xl font-LalezarRegular'>
          به فروشگاه خوش آمدید
        </h1>
        <p className='text-sm font-VazirMedium'>
          فروشگاه سروش ، جایی برای پیدا کردن محصولاتی با کیفیت ....
        </p>
      </div>

      <div className='md:w-120 xl:w-150 mt-10 lg:mt-0'>

        <h2 className='text-2xl mx-auto lg:mx-0 font-VazirBold text-cyan-400 backdrop-blur backdrop-opacity-50 max-w-50 text-center lg:text-right'>
          آخرین محصولات
        </h2>

        <section className="space-y-6">
          {products?.map((product) => (



            <div key={product._id} className='mt-[4vh] bg-stone-900 shadow-sm rounded-md hover:shadow-lg transition-shadow backdrop-blur p-4'>
              <h3 className='text-lg font-VazirBold text-cyan-400 mb-1'>
                {product.title}
              </h3>
              <p className='text-white mb-5'>
                {product.summary}..
              </p>
              <Link to="/products/$productId" params={{ productId: product._id.toString() }} className='hover:underline hover:bg-stone-900 text-amber-400 font-VazirBold'>
                جزییات بیشتر
              </Link>
            </div>


          ))}
        </section>

        <Button asChild variant="outline" className="w-full backdrop-blur text-center inline-block py-2 px-5 bg-stone-950 hover:bg-stone-900 text-amber-400 font-VazirBold mt-[10vh] transition" noFocusStyle>
          <Link to="/products">
            نمایش تمام محصولات
          </Link>
        </Button>

      </div>
    </div>
  )
}
