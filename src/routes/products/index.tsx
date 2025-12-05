import { createFileRoute, Link } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/api/products';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from "@/components/ui/button.tsx";



const productsQueryOptions = () => queryOptions({
  queryKey: ['products'],
  queryFn: () => fetchProducts(),
});


export const Route = createFileRoute('/products/')({
  head: () => ({
    meta: [
      {
        name: 'description',
        content: 'محصول ها',
      },
      {
        title: 'محصول ها',
      },
    ],
  }),
  component: ProductPage,
  loader: async ({ context: { queryClient } }) => {
    return await queryClient.ensureQueryData(productsQueryOptions());
  }
});

function ProductPage() {

  const { data: products } = useSuspenseQuery(productsQueryOptions());


  return (
    <div className=" mx-auto h-full">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {products?.map((product) => (

          <Card key={product._id} className='mt-[4vh] bg-stone-900 text-white hover:shadow-lg transition-shadow backdrop-blur'>

            <CardContent className='mt-[3vh]'>

              <CardTitle className='flex items-start justify-between'>
                <span className='text-cyan-400 font-VazirBold'>{product.title}</span>
                <span className='text-xs font-VazirMedium'>{new Date(product.createdAt ?? Date.now()).toLocaleDateString("fa-IR")}</span>
              </CardTitle>
              <Badge variant="secondary" className="w-fit mt-[2vh] font-LalezarRegular">{product.summary}</Badge>


              <Separator className='mt-[5vh]' />

              {Array.isArray(product.tags) && product.tags.length > 0 ? (
                <div className='flex flex-wrap gap-2'>
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant='secondary'>#{tag}</Badge>
                  ))}
                </div>
              ) : null}

              <Button asChild variant="outline" className="w-full hover:bg-stone-900 text-amber-400 sm:w-auto font-VazirBold mt-[3vh]" noFocusStyle>
                <Link to="/products/$productId" params={{ productId: product._id.toString() }}>
                  جزییات بیشتر
                </Link>
              </Button>
            </CardContent>
          </Card>

        ))}
      </div>
    </div>
  )
}
