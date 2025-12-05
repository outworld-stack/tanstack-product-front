import type { Product } from "@/types";
import{Link} from "@tanstack/react-router";

const ProductCard = ({ product, button = true }: { product: Product, button?: boolean }) => {
    return (

        <div className='rounded-md shadow-sm p-4'>
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
    )
}

export default ProductCard