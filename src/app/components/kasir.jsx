// ./src/app/components/Kasir.js
import React, { useState } from 'react';
import Image from 'next/image';
import Cart from './Cart';

const items = [
  { id: 1, name: 'Item 1', image: 'cilor.jpg', price: 10 },
  { id: 2, name: 'Item 2', image: 'kebab.jpg', price: 15 },
  { id: 3, name: 'Item 3', image: 'burger.jpg', price: 20 },
];

const Kasir = () => {
  const imageSize = { width: 600, height: 400 };

  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCartVisible, setIsCartVisible] = useState(true);

  const addToCart = (quantity) => {
    const existingItem = cart.find((cartItem) => cartItem.id === selectedItem.id);

    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === selectedItem.id
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      );

      setCart(updatedCart);
    } else {
      setCart([...cart, { ...selectedItem, quantity }]);
    }

    setSelectedItem(null);
  };

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
      {items.map((item) => (
        <div key={item.id} className="relative bg-white p-4 rounded-lg shadow-md group transition transform hover:scale-105">
          <div className="relative overflow-hidden rounded-md mb-4 group-hover:opacity-75 transition-opacity duration-300">
            <Image
              src={`/image/${item.image}`}
              alt={item.name}
              width={imageSize.width}
              height={imageSize.height}
              layout="responsive"
              onClick={() => openModal(item)}
            />
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold mb-2">{item.name}</p>
            <p className="text-gray-700">Harga: ${item.price}</p>
          </div>
          <div className="flex justify-center items-center mt-10">
            <button
              className="bg-green-500 text-white rounded-full p-2 hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => openModal(item)}
            >
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      ))}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">{selectedItem.name}</h2>
            <p className="text-gray-700 mb-4">Harga: ${selectedItem.price}</p>
            <label className="block mb-2">Jumlah:</label>
            <input
              type="number"
              min="1"
              defaultValue="1"
              className="w-full border p-2 rounded-md mb-4"
              ref={(input) => input && input.focus()}
            />
            <div className="flex justify-center mb-4">
              <button
                className="bg-green-500 text-white rounded-full p-2 hover:bg-green-600 mr-4 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => addToCart(1)}
              >
                Tambah ke Keranjang
              </button>
              <button
                className="text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={closeModal}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
      {isCartVisible && (
        <Cart cartItems={cart} onCancel={() => setCart([])} onToggle={toggleCart} />
      )}
      {!isCartVisible && (
        <div className="fixed bottom-4 right-4">
          <button
            className="bg-green-500 text-white rounded-full p-2 hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={toggleCart}
          >
            Buka Keranjang
          </button>
        </div>
      )}
    </div>
  );
};

export default Kasir;