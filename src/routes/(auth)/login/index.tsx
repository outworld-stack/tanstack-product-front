import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { loginUSer } from '@/api/auth';

export const Route = createFileRoute('/(auth)/login/')({
    component: LoginPage,
})

function LoginPage() {
    const navigate = useNavigate();
    const { setAccessToken, setUser } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: loginUSer,
        onSuccess: (data) => {
            setAccessToken(data.accessToken);
            setUser(data.user);
            navigate({ to: '/products' });
        },
        onError: (error: any) => {
            // Handle the error
            setError(error.message);
        }

    });

    const handleSubmit = async() =>{
        setError('');
        await mutateAsync({
            email,
            password
        })
    };



    return (
        <div className='max-w-md mx-auto'>
            <h1 className='text-3xl text-center md:text-right font-VazirBold mb-10 backdrop-blur backdrop-opacity-50'>ورود</h1>
            <section className='space-y-4'>


                <input type="email" className="w-full bg-stone-900 text-white border border-gray rounded-md p-2" placeholder='ایمیل' value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='off' />

                <input type="text" className="w-full bg-stone-900 text-white border border-gray rounded-md p-2 mb-10" placeholder='گذرواژه' value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='off' />

                <button onClick={handleSubmit} className='w-full text-lg bg-stone-950 text-amber-400 hover:text-amber-300 rounded-md p-2 hover:cursor-pointer font-VazirBold disabled:opacity-50 transition' disabled={isPending}>
                    {isPending ? 'در حال ورود...' : 'ورود'}
                </button>

                <p className='text-center mt-4 select-none font-LalezarRegular'>
                    اکانت ندارید؟
                    <Link to='/register' className='text-amber-400 hover:underline mr-3'>
                        ثبت‌نام
                    </Link>
                </p>
                {
                    error && (
                        <p className='text-red-100 bg-red-400 px-4 py-2 rounded-md mb-5 text-center'>{error}</p>
                    )
                }
            </section>
        </div>
    )
}
