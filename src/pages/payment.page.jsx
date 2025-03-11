import { Button } from "@/components/ui/button";
import { clearCart } from "@/lib/features/cartSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import CartItem from "@/components/CartItem";
import { Navigate } from "react-router";

function PaymentPage() {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  if (cart.length === 0) {
    return <Navigate to="/" />;
  }

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <main className="px-8 py-6 min-h-screen bg-gray-50">
      <h2 className="text-4xl font-bold mb-8">Review Your Order</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cart.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Items:</span>
            <span className="font-semibold">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Price:</span>
            <span className="font-bold text-xl text-blue-600">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
          <Button
            className="w-full mt-4"
            onClick={() => {
              dispatch(clearCart());
              toast.success("Order Placed Successfully");
            }}
          >
            Place Order
          </Button>
        </div>
      </div>
    </main>
  );
}

export default PaymentPage;
