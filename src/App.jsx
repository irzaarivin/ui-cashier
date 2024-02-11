import { useEffect } from 'react';
import bg_dark from './assets/bg_dark.jpg';
import { useState } from 'react';

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState()

  const fetchData = async () => {
    const res = await fetch('http://localhost:4444/item')
    const { data } = await res.json();
    setProducts(data);
  }

  useEffect(() => {
    let newTotal = 0;
    cart.forEach((item) => {
      newTotal += item.price * item.quantity;
    });
    setTotal(newTotal);
  }, [cart]);

  const addProduct = (data) => {
    const existingItem = cart.find((item) => item.id === data.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === data.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...data, quantity: 1 }]);
    }
  }

  const subtractItemFromCart = (itemId) => {
    const existingItem = cart.find((item) => item.id === itemId);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === itemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      const filteredCart = updatedCart.filter((item) => item.quantity > 0);
      setCart(filteredCart);
    }
  };

  const completePayment = () => {
    setTotal(0)
    setCart([])
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='grid grid-cols-10 h-screen bg-cover text-white' style={{ backgroundImage: `url(${bg_dark})` }}>
      <div className=' w-full col-span-7 p-8 overflow-hidden '>
        <div className='p-3 bg-[#262626] rounded-xl relative flex justify-between mb-5'>
          <div className='flex font-semibold'>
            <div className='bg-[#8C004D] p-3 rounded-xl text-3xl'>Rp.</div>
            <p className='text-3xl p-3 font-normal'>{total}</p>
          </div>
          <button onClick={() => completePayment()} className='py-3 bg-[#177BE5] px-5 rounded-xl text-3xl font-semibold'>
            Complete Payment
          </button>
        </div>
        <div className='flex flex-wrap gap-5 justify-center h-full overflow-auto pb-20'>
          {products.map(product => (
            <div onClick={() => addProduct(product)} className="card card-compact w-72 bg-base-100 shadow-xl cursor-pointer" key={product.id}>
              <figure><img src={product.image} alt="Shoes" /></figure>
              <div className="card-body">
                <h2 className="card-title select-none">{product.name}</h2>
                <p className='select-none'>{product.description}</p>
                <div className="card-actions justify-start">
                  <p className='text-lime-400'>Rp.{product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='p-5 col-span-3'>
        <div className='bg-[#262626] w-full rounded-xl'>
          <div className='p-4 bg-[#363636] text-xl rounded-t-xl'>Keranjang</div>
          <div className='h-96 overflow-auto px-2 py-2'>
            {cart.map((data, idx) => (
              <div className='flex justify-between py-1' key={idx}>
                <p>{data.name}</p>
                <div className='flex gap-3'>
                  <p>x{data.quantity}</p>
                  <button onClick={() => subtractItemFromCart(data.id)} className='bg-red-400 rounded-full w-5'>-</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
