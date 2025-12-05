import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { createProduct } from '@/api/products';



export const Route = createFileRoute('/products/new/')({
  component: NewProductPage,
})

function NewProductPage() {
  const navigate = useNavigate();


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState('');

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      navigate({
        to: '/products'
      });
    }
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    if (!title.trim() || !description.trim() || !summary.trim() || !tags) {
      alert('همه ورودی ها را پر کنید...');
      return;
    }

    const tagsList = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    if (tagsList.length > 3) {
      alert('شما نمی توانید بیش از 3 تگ وارد کنید...');
      return;
    }
    try {
      await mutateAsync({
        title,
        description,
        summary,
        tags: tags
          .split(',')
          .map((tag) => tag.trim().replace(/\s+/g, '_'))
          .filter((tag) => tag !== '')
      });
      alert('محصول شما با موفقیت ثبت شد ^_^');
    } catch (error) {
      console.error(error);
      alert('خطایی رخ داده است');
    }
  }


  return (
    <div className='backdrop-blur bg-stone-900 text-white p-8 rounded-xl shadow-2xl md:max-w-xl  mx-auto mt-8 border border-stone-700'>

      <h1 className="text-3xl font-LalezarRegular text-center mb-7 text-cyan-300">ایده ی جدید</h1>



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
            placeholder="خلاصه ای از محصول خود بنویسید..."
          />
        </div>
        <div className="mb-6">
          <label htmlFor="tags" className="block text-sm font-medium mb-2 text-cyan-200">تگ ها</label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-stone-800 border border-stone-600 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 transition-all duration-200"
            placeholder="تگ ها را وارد کنید ، تگ ها با , جدا کنید"
          />
        </div>
        <button type="submit"
          disabled={isPending}
          className="w-full py-3 px-4 mt-5 bg-stone-800 hover:bg-stone-700 text-amber-400 font-VazirMedium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 shadow-lg">
          {isPending ? 'در حال ارسال...' : 'ذخیره'}
        </button>
      </form>
    </div>
  )
}
