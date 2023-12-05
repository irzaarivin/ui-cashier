import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const formatCurrency = (amount) => {
  const numericAmount = parseFloat(amount);

  if (isNaN(numericAmount) || typeof numericAmount === 'undefined') {
    return 'Rp0';
  }

  const formattedAmount = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(numericAmount);

  const trimmedAmount = formattedAmount.replace(/\.?0+$/, '');

  return trimmedAmount;
};

const generatePDF = (cartItems, total) => {
  const doc = new jsPDF();
  doc.text('Invoice', 10, 10);
  doc.autoTable({
    head: [['Nama Barang', 'Jumlah', 'Harga', 'Total']],
    body: cartItems.map(item => [item.nama_barang, item.quantity, formatCurrency(item.harga_barang), formatCurrency(item.harga_barang * item.quantity)])
  });
  doc.text(`Total: ${formatCurrency(total)}`, 10, doc.autoTable.previous.finalY + 10);
  doc.save('invoice.pdf');
};

const Cart = ({ cartItems, onCancel, onToggle }) => {
  const [cartVisible, setCartVisible] = useState(true);
  const cartRef = useRef(null);

  const total = cartItems.reduce((acc, item) => acc + item.harga_barang * item.quantity, 0);

  const handleBuy = () => {
    console.log('Cart Items:', cartItems); // Log the cart items for debugging
    generatePDF(cartItems, total);
    toast.success('Terima kasih telah berbelanja!');
  };

  const toggleCart = () => {
    setCartVisible(!cartVisible);
    onToggle();
  };

  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setCartVisible(false);
      onToggle();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={cartRef} className={`fixed inset-y-0 right-0 bg-black text-white p-4 w-1/3 ${cartVisible ? '' : 'hidden'}`}>
      <h2 className="text-xl font-semibold mb-4">Keranjang Belanja</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between items-center mb-2">
            <p>
              {item.nama_barang} x {item.quantity}
            </p>
            <p>{formatCurrency(item.harga_barang * item.quantity)}</p>
          </li>
        ))}
      </ul>
      <hr className="my-4" />
      <p className="text-xl font-semibold">total beli: {formatCurrency(total)}</p>
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
          <ToastContainer />
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
