import ShippingAddressForm from "@/components/ShippingAddressForm";
import { useSelector } from "react-redux";
import CartItem from "@/components/CartItem";
import { Navigate } from "react-router";

function CheckoutPage() {
  const cart = useSelector((state) => state.cart.value);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  if (cart.length === 0) {
    return <Navigate to="/" />;
  }

  return (
    <main className="px-8 py-6 min-h-screen bg-gray-50">
      <h2 className="text-4xl font-bold mb-8">Checkout</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section - Address Form and Order Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Address Form Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold mb-6">Shipping Address</h3>
            <ShippingAddressForm cart={cart} />
          </div>

          {/* Order Details Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold mb-6">Order Details</h3>
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 py-4 border-b last:border-b-0">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{item.product.name}</h4>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-800 font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h3 className="text-2xl font-semibold mb-6">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Total Items:</span>
                <span className="font-semibold text-lg">{totalQuantity}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold text-lg">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-semibold text-lg">$0.00</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-xl font-bold text-blue-600">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CheckoutPage;
