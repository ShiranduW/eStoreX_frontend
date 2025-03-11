import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import { toast } from "sonner";

function ProductCard({ _id, name, price, image, description, stock }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (stock <= 0) {
      toast.error("Product is out of stock");
      return;
    }
    dispatch(addToCart({ _id, name, price, image, description, stock }));
    toast.success("Added to cart");
  };

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="p-0 overflow-hidden aspect-square">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" 
        />
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
        <p className="text-gray-600 font-medium">{formattedPrice}</p>
        <p className={'text-sm ' + (stock > 0 ? 'text-green-600' : 'text-red-600')}>
          {stock > 0 ? [stock, 'in stock'].join(' ') : 'Out of stock'}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full"
          onClick={handleAddToCart}
          disabled={stock <= 0}
          variant={stock <= 0 ? "secondary" : "default"}
        >
          {stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
