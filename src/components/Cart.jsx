import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { updateQuantity } from "@/lib/features/cartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  const handleQuantityChange = (productId, newQuantity, maxStock) => {
    if (newQuantity > 0 && newQuantity <= maxStock) {
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    }
  };

  // Format price with proper decimal places
  const formatPrice = (price) => {
    return Number(price).toFixed(2);
  };

  const totalPrice = cart.reduce((total, item) => {
    return total + (Number(item.product.price) * item.quantity);
  }, 0);

  return (
    <div className="space-y-4">
      {cart.map((item) => (
        <div key={item.product._id} className="flex items-center justify-between p-4 border rounded">
          <div className="flex items-center gap-4">
            <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover" />
            <div>
              <h3 className="font-medium">{item.product.name}</h3>
              <p className="text-sm text-gray-600">Stock: {item.product.stock}</p>
              <div className="flex items-center gap-2 mt-2">
              {/* Quantity Controls */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(item.product._id, item.quantity - 1, item.product.stock)}
                  disabled={item.quantity <= 1}
                >
                  -
                </Button>
                <span>{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(item.product._id, item.quantity + 1, item.product.stock)}
                  disabled={item.quantity >= item.product.stock}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
          {/* Price and Stock Warning */}
          <div className="text-right">
            <p className="font-medium">
              ${formatPrice(item.product.price * item.quantity)}
            </p>
            {item.quantity >= item.product.stock && (
              <p className="text-sm text-red-500">Max stock reached</p>
            )}
          </div>
        </div>
      ))}
      
      {cart.length > 0 && (
        <div className="flex justify-end p-4 border-t">
          <div className="text-right">
            <p className="text-lg font-semibold">Total: ${formatPrice(totalPrice)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;