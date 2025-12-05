import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "./button";
import { useAuth } from "@/context/AuthContext";
import { logoutUser } from "@/api/auth";


export default function Header() {
    const navigate = useNavigate();
    const { user, setUser, setAccessToken } = useAuth();


    const handlelogout = async () => {
        try {
            await logoutUser();
            setAccessToken(null);
            setUser(null);
            navigate({ to: '/' });
        } catch (error: any) {
            console.error('log out failed', error);
        }
    }


    return (
        <header className="bg-stone-950 text-white p-4 backdrop-blur">
            <nav className="flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gold" className="size-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                    </svg>
                    <h1 className="text-3xl mt-1 font-VazirBold">فروشگاه</h1>

                </Link>
                <ul className="flex items-center space-x-4">
                    <li>
                        <Link to="/products" className="text-white font-VazirMedium hover:text-gray-300">
                            محصولات
                        </Link>
                    </li>
                    {user &&
                        <li>
                            <Button className="bg-white hover:bg-slate-100  text-black font-VazirMedium " asChild noFocusStyle>

                                <Link to="/products/new" className=" gap-x-1 ">

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                        <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                                    </svg>

                                    <span>
                                        محصول جدید
                                    </span>

                                </Link>
                            </Button>
                        </li>
                    }
                </ul>

                {/* auth part  */}
                <div className="flex items-center space-x-2">
                    {
                        !user ? (
                            <>
                                <Link to="/login" className="text-white hover:text-white/75 font-VazirBold transition-all px-3 py-2 leading-none">ورود</Link>
                                <Link to="/register" className="text-white bg-stone-900  hover:text-white/75 font-VazirBold transition-all px-4 py-3 rounded-md leading-none">ثبت‌نام</Link>
                            </>
                        ) : (
                            <button onClick={handlelogout}  className="text-red-500 font-VazirBold rounded-sm hover:cursor-pointer">
                                خروج
                            </button>
                        )
                    }

                </div>
            </nav>
        </header>
    )
}