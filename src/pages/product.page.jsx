import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import { Button } from "@/components/ui/button";
import { useGetProductQuery } from "@/lib/api";

function ProductPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { data: product, isLoading, error } = useGetProductQuery(productId);

  if (isLoading) {
    return <main className="px-8">Loading...</main>;
  }

  if (error) {
    return <main className="px-8">Error loading product</main>;
  }

  return (
    <main className="px-8">
      <div className="max-w-6xl mx-auto mt-8 grid grid-cols-2 gap-8">
        <div className="aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold">${product.price}</p>
          <p className="text-gray-600">{product.description}</p>
          <div className="space-y-2">
            <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </p>
            <Button 
              className="w-full"
              onClick={() => dispatch(addToCart(product))}
              disabled={product.stock === 0}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductPage;