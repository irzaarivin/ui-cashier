// ./src/app/components/Cart.js
import React, { useState, useRef, useEffect } from 'react';

const Cart = ({ cartItems, onCancel, onToggle }) => {
  const [cartVisible, setCartVisible] = useState(true);
  const cartRef = useRef(null);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleBuy = () => {
    alert('Terima kasih telah berbelanja!');
  };

  const toggleCart = () => {
    setCartVisible(!cartVisible);
    onToggle(); // Notify Kasir component about cart visibility change
  };

  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setCartVisible(false);
      onToggle(); // Notify Kasir component about cart visibility change
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={cartRef} className={`fixed inset-y-0 right-0 bg-black text-white p-4 w-1/3 ${cartVisible ? 'visible' : 'invisible'}`}>
      <h2 className="text-xl font-semibold mb-4">Keranjang Belanja</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between items-center mb-2">
            <p>{item.name} x {item.quantity}</p>
            <p>${item.price * item.quantity}</p>
          </li>
        ))}
      </ul>
      <hr className="my-4" />
      <p className="text-xl font-semibold">Total: ${total}</p>
      <div className="flex justify-between mt-4">
        <button
          className="text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={onCancel}
        >
          Batal
        </button>
        <button
          className="bg-green-500 text-white rounded-full p-2 hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleBuy}
        >
          Beli
        </button>
      </div>
      <div className="fixed bottom-4 right-4">
        <button
          className="bg-green-500 text-white rounded-full p-2 hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={toggleCart}
        >
          Tutup Keranjang
        </button>
      </div>
    </div>
  );
};

export default Cart;
