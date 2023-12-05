// Kasir.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cart from './Cart';
import { motion } from 'framer-motion';

export const formatCurrency = (amount) => {
  const numericAmount = parseFloat(amount);

  if (isNaN(numericAmount) || typeof numericAmount === 'undefined') {
    return 'Rp0';
  }

  const formattedAmount = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(numericAmount);

  const trimmedAmount = formattedAmount.replace(/\.?0+$/, '');

  return trimmedAmount;
};

const Kasir = () => {
  const [items, setItems] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCartVisible, setIsCartVisible] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3001/barang')
      .then((response) => {
        const itemsWithNamaBarang = response.data.map(item => ({ ...item, nama_barang: item.nama_barang }));
        setItems(itemsWithNamaBarang);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
        setIsLoading(false);
      });

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const addToCart = () => {
    const existingItem = cart.find((cartItem) => cartItem.nama_barang === selectedItem.nama_barang);
    const updatedQuantity = parseInt(quantity, 10);
  
    let updatedCart;
  
    if (existingItem) {
      updatedCart = cart.map((cartItem) =>
        cartItem.nama_barang === selectedItem.nama_barang
          ? { ...cartItem, quantity: cartItem.quantity + updatedQuantity }
          : cartItem
      );
    } else {
      updatedCart = [...cart, { ...selectedItem, quantity: updatedQuantity }];
    }
  
    console.log('updatedCart:', updatedCart);
  
    setCart(updatedCart);
    setSelectedItem(null);
    setQuantity(1);
  };
  // const addToCart = () => {
  //   const existingItem = cart.find((cartItem) => cartItem.id === selectedItem.id);
  //   const updatedQuantity = parseInt(quantity, 10);
  
  //   let updatedCart;
  
  //   if (existingItem) {
  //     updatedCart = cart.map((cartItem) =>
  //       cartItem.id === selectedItem.id
  //         ? { ...cartItem, quantity: cartItem.quantity + updatedQuantity }
  //         : cartItem
  //     );
  //   } else {
  //     updatedCart = [...cart, { ...selectedItem, quantity: updatedQuantity }];
  //   }
  
  //   const updatedStok = selectedItem.stok - updatedQuantity;
  //   const newStok = Math.max(updatedStok, 0);
  //   const updatedItems = items.map((item) =>
  //     item.id === selectedItem.id ? { ...item, stok: newStok } : item
  //   );
  
  //   setCart(updatedCart);
  //   setSelectedItem(null);
  //   setQuantity(1);
  //   setItems(updatedItems);
  // };

  const handleBuy = () => {
    setConfirmationModal(true);
  };

  const confirmTransaction = () => {
    console.log('Transaction completed:', cart);

    const newTransaction = { id: transactions.length + 1, items: cart };
    setTransactions([...transactions, newTransaction]);

    setCart([]);
    setConfirmationModal(false);
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
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4"
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        items.map((item) => (
          <motion.div
            key={item.id}
            className="mb-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={item.gambar_barang}
              alt={item.nama_barang}
              className="object-cover rounded-md mb-4"
              width={300}
              height={300}
              onClick={() => openModal(item)}
            />

            <div className="text-center">
              <p className="text-xl font-semibold mb-2">{item.nama_barang}</p>
              <p className="text-gray-700">Harga: {formatCurrency(item.harga_barang)}</p>
              <p className='text-white'>{item.stok}</p>
            </div>
          </motion.div>
        ))
      )}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">{selectedItem.nama_barang}</h2>
            <p className="text-gray-700 mb-4">Harga: {formatCurrency(selectedItem.harga_barang)}</p>
            <label className="block mb-2">Jumlah:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
              className="w-full border p-2 rounded-md mb-4"
            />
            <div className="flex justify-center mb-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-green-500 text-white rounded-full p-2 hover:bg-green-600 mr-4 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={addToCart}
              >
                Tambah ke Keranjang
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={closeModal}
              >
                Batal
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
      {isCartVisible && (
        <Cart cartItems={cart} onCancel={() => setCart([])} onToggle={toggleCart} formatCurrency={formatCurrency} />
      )}
      {!isCartVisible && (
        <div className="fixed bottom-4 right-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-green-500 text-white rounded-full p-2 hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={toggleCart}
          >
            Buka Keranjang
          </motion.button>
        </div>
      )}
      {confirmationModal && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">Konfirmasi Transaksi</h2>
            <p className="text-gray-700 mb-4">Apakah Anda yakin ingin menyelesaikan transaksi?</p>
            <div className="flex justify-center mb-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={confirmTransaction}
              >
                Ya
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => setConfirmationModal(false)}
              >
                Tidak
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
      {transactions.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Data Transaksi</h2>
          <table className="table-auto">
            <thead>
              <tr>
                <th>ID Transaksi</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>
                    <ul>
                      {transaction.items.map((item) => (
                        <li key={item.id}>
                          {item.nama_barang} x {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default Kasir;
