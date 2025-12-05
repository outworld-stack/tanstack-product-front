import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react';
import { useMutation, useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import { fetchProduct, updateProduct } from '@/api/products';


const productQueryOptions = (id: string) => queryOptions({
  queryKey: ['product', id],
  queryFn: () => fetchProduct(id)
})

export const Route = createFileRoute('/products/$productId/edit')({
  component: ProductEditPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(productQueryOptions(params.productId))
  }
})

function ProductEditPage() {
  const { productId } = Route.useParams();
  const navigate = useNavigate();
  const { data: product } = useSuspenseQuery(productQueryOptions(productId));

  const [title, setTitle] = useState(product?.title);
  const [description, setDescription] = useState(product?.description);
  const [summary, setSummary] = useState(product?.summary);
  const [tagsInput, setTagsInput] = useState(product?.tags.join(', '));

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => updateProduct(productId, {
      title,
      description,
      summary,
      tags: tagsInput
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean)
  }),
    onSuccess: () => {
      navigate( {to: '/products/$productId',params:{productId}})
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutateAsync();
  }



  return (
    <div className='backdrop-blur bg-stone-900 text-white p-8 rounded-xl shadow-2xl md:max-w-xl mx-auto mt-8 border border-stone-700'>
      <div className='flex justify-between items-start'>
        <h1 className="text-3xl font-LalezarRegular text-center mb-7 text-cyan-300">ویرایش محصول</h1>
        <Link to="/products/$productId" params={{ productId }} className="text-center text-lg px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 font-LalezarRegular text-amber-300  ">بازگشت به محصول </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="title" className="block text-sm font-VazirMedium mb-2 text-cyan-200">عنوان</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-stone-800 border border-stone-600 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 transition-all duration-200"
            placeholder="یک عنوان وارد کنید...."
          />
        </div>
        <div className="mb-5">
          <label htmlFor="description" className="block text-sm font-VazirMedium mb-2 text-cyan-200">توضیحات</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-stone-800 border border-stone-600 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 transition-all duration-200 h-32 resize-none"
            placeholder="توضیحاتی در مورد محصول خود بنویسید..."
          />
        </div>
        <div className="mb-5">
          <label htmlFor="summary" className="block text-sm font-VazirMedium mb-2 text-cyan-200">خلاصه</label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-stone-800 border border-stone-600 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 transition-all duration-200 h-20 resize-none"
            placeholder="خلاصه ای از آن چه در ذهن دارید..."
          />
        </div>
        <div className="mb-6">
          <label htmlFor="tags" className="block text-sm font-medium mb-2 text-cyan-200">تگ ها</label>
          <input
            id="tags"
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="w-full mb-3 px-4 py-2 rounded-lg bg-stone-800 border border-stone-600 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 transition-all duration-200"
            placeholder="تگ ها را وارد کنید ، تگ ها با (,) جدا کنید"
          />
          <span className='text-xs font-bold text-rose-300'>
            تگ ها را وارد کنید ، تگ ها با , جدا کنید
          </span>
        </div>
        <button type="submit" disabled={isPending}
          className="w-full cursor-pointer py-3 px-4 mt-5 bg-stone-800 hover:bg-stone-700 text-amber-400 font-VazirMedium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 shadow-lg">
          {isPending ? 'در حال ویرایش...' : 'ویرایش'}
        </button>
      </form>
    </div>
  )
}
