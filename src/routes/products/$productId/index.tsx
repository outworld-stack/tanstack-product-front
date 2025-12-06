import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery, useMutation } from '@tanstack/react-query';
import { fetchProduct, deleteProduct } from '@/api/products';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from "@/components/ui/button.tsx";
import NotFound from '@/components/ui/NotFound';
import { useAuth } from '@/context/AuthContext';



const productQueryOptions = (productId: string) => queryOptions({
  queryKey: ['product', productId],
  queryFn: () => fetchProduct(productId),
});

export const Route = createFileRoute('/products/$productId/')({
    head: () => ({
    meta: [
      {
        name: 'description',
        content: 'محصول ها',
      },
      {
        title: 'محصول',
      },
    ],
  }),
  component: ProductDetailsPage,
  errorComponent: NotFound,
  loader: async ({ params, context: { queryClient } }) => {
    return await queryClient.ensureQueryData(productQueryOptions(params.productId));
  }
});

function ProductDetailsPage() {
  const { productId } = Route.useParams();
  const { data: product } = useSuspenseQuery(productQueryOptions(productId));
  const navigate = useNavigate();

  const { user } = useAuth();

  const { mutateAsync: deleteMutate, isPending } = useMutation({
    mutationFn: () => deleteProduct(productId),
    onSuccess: () => navigate({ to: '/products' })
  });

  const handleDelete = async () => {
    // eslint-disable-next-line no-alert
    if (window.confirm('از حذف این ایده مطمئن هستی؟')) {
      await deleteMutate();
    }
  }


  return <div className='max-w-3xl mx-auto *:backdrop-blur'>
    <Button variant="outline" className='bg-stone-900 text-amber-400 hover:bg-stone-800' noFocusStyle>
      <Link to="/products">برگشت به محصولات</Link>
    </Button>

    <Card className='mt-[4vh] bg-stone-900 text-white'>
      <CardHeader>
        <CardTitle className='flex items-start justify-between'>
          <span className='text-cyan-400 font-VazirBold'>{product.title}</span>
          <span className='text-xs font-VazirMedium'>{new Date(product.createdAt ?? Date.now()).toLocaleDateString("fa-IR")}</span>
        </CardTitle>
        <Badge variant="secondary" className="w-fit mt-[2vh] font-LalezarRegular">{product.summary}</Badge>
      </CardHeader>
      <CardContent className='mt-2'>
        <div className='prose dark:prose-invert max-w-none font-VazirMedium'>
          <p>{product.description}</p>
        </div>

        <Separator />

        <div className='flex justify-between gap-2'>
          {Array.isArray(product.tags) && product.tags.length > 0 ? (
            <div className='flex flex-wrap gap-2'>
              {product.tags.map((tag) => (
                <Badge key={tag} variant='secondary'>#{tag}</Badge>
              ))}
            </div>
          ) : null}

          {user && user.id === product.user && (
            <>
              <div className='flex gap-x-5'>
                <Button
                  variant="outline" className='bg-stone-900 text-fuchsia-400 hover:bg-stone-800 cursor-pointer disabled:opacity-50' noFocusStyle asChild>
                  <Link to='/products/$productId/edit' params={{ productId }}>
                    ویرایش
                  </Link>
                </Button>

                <Button
                  onClick={handleDelete}
                  disabled={isPending}
                  variant="outline" className='bg-stone-900 text-red-400 hover:bg-stone-800 cursor-pointer disabled:opacity-50' noFocusStyle>
                  {isPending ? 'در حال حذف' : 'حذف'}
                </Button>
              </div>
            </>
          )}


        </div>

        {/* {product.user ? (
          <div className='mt-4 text-sm text-gray-500'>
            Submitted by <span className='font-medium text-gray-700 dark:text-gray-300'>{product.user}</span>
          </div>
        ) : null} */}
      </CardContent>
    </Card>
  </div>

};
