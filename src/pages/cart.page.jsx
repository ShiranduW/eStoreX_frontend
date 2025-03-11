import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import CartItem from "@/components/CartItem";

function CartPage() {
  const cart = useSelector((state) => state.cart.value);

  const totalAmount = cart.reduce((total, item) => {
    return total + (Number(item.product.price) * item.quantity);
  }, 0);

  return (
    <main className="max-w-[1400px] mx-auto px-8 py-6">
      <h2 className="text-4xl font-bold tracking-tight">My Cart</h2>
      
      {cart.length === 0 ? (
        <div className="mt-8 text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-xl text-gray-600">Your cart is empty</p>
          <Button asChild className="mt-4">
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 gap-6">
            {cart.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center bg-white rounded-xl p-6 shadow-sm">
            <div className="space-y-1">
              <p className="text-gray-600">Total ({cart.length} items)</p>
              <p className="text-3xl font-bold">${totalAmount.toFixed(2)}</p>
            </div>
            <Button asChild size="lg" className="px-8">
              <Link to="/shop/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </>
      )}
    </main>
  );
}

export default CartPage;
