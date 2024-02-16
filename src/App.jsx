import { useEffect } from 'react';
import bg_cool from './assets/bg_cool.png';
import { useState } from 'react';
import Swal from 'sweetalert2'
import Calculator from './components/Calculator';
const base_url = 'http://localhost:4444'
// const base_url = 'http://localhost:4444'



function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState()
  const [totalPayment, setTotalPayment] = useState();

  const fetchData = async () => {
    const res = await fetch(`${base_url}/item?status=available`)
    const { data } = await res.json();
    setProducts(data);
  }

  useEffect(() => {
    let newTotal = 0;
    cart.forEach((item) => {
      newTotal += item.price * item.quantity;
    });
    setTotal(newTotal.toLocaleString('id-ID'));
    setTotalPayment(newTotal)
  }, [cart]);

  const addProduct = (data) => {
    const existingItem = cart.find((item) => item.id === data.id);

    if (existingItem) {
      if (existingItem.quantity >= data.stock) {
        Swal.fire({
          title: "Cannot add more product",
          text: `The quantity of this product has reached its limit`,
          icon: "warning",
          background: "#262626",
          color: "#fff"
        });
      } else {
        const updatedCart = cart.map((item) =>
          item.id === data.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
      }
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

  const completePayment = async () => {
    try {
      if (cart.length > 0) {

        let data = []

        cart.map((item) => {
          const { id, quantity } = item
          data.push({ itemId: id, quantity })
        })

        const res = await fetch(`${base_url}/transaction/bulk`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            prices: totalPayment,
            items: data
          })
        })
        const { status } = await res.json();

        if (status === 'Success') {
          data = []
          Swal.fire({
            title: "Payment Success",
            text: `Your total payment is Rp. ${total}`,
            icon: "success",
            background: "#262626",
            color: "#fff"
          });
          setCart([])
          setTotal(0)
          fetchData();
        } else {
          Swal.fire({
            title: "Payment Failed",
            text: `Something went wrong`,
            icon: "error",
            background: "#262626",
            color: "#fff"
          });
        }
      } else {
        Swal.fire({
          title: "No Payment",
          text: `There is no item in your cart`,
          icon: "error",
          background: "#262626",
          color: "#fff"
        })
      }
    } catch (error) {
      Swal.fire({
        title: "Payment Failed",
        text: `Something went wrong`,
        icon: "error",
        background: "#262626",
        color: "#fff"
      });
    }
  }


  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='grid grid-cols-10 h-screen bg-cover text-white overflow-hidden' style={{ backgroundImage: `url(${bg_cool})` }}>
      <div className=' w-full col-span-7 p-8 overflow-hidden '>
        <div className='p-3 bg-[#262626] rounded-xl relative flex justify-between mb-5'>
          <div className='flex font-semibold'>
            <div className='bg-[#8C004D] p-3 rounded-xl text-3xl'>Rp.</div>
            <p className='text-3xl p-3 font-normal'>{total}</p>
          </div>
          <button onClick={() => completePayment()} className='py-3 bg-[#177BE5] active:bg-blue-900 px-5 rounded-xl text-3xl font-semibold'>
            complete payment
          </button>
        </div>
        <div className='grid grid-cols-4 gap-7 2xl:gap-8 max-h-full overflow-auto pb-20'>
          {products.map(product => (
            <div onClick={() => addProduct(product)} className="card col-span-1 card-compact w-64 2xl:h-96 h-96 2xl:w-full bg-base-100 shadow-xl cursor-pointer" key={product.id}>
              <figure><img src={product.image} alt="Shoes" /></figure>
              <div className="card-body">
                <h2 className="card-title select-none">{product.name}</h2>
                <p className='select-none'>{product.description}</p>
                <div className="card-actions flex justify-between">
                  <div className='text-lime-400'>Rp.{product.price}</div>
                  <div>x{product.stock}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='px-5 py-8 col-span-3 flex flex-col gap-y-10 2xl:px-24'>
        <div className='bg-[#262626] w-full rounded-xl'>
          <div className='p-4 bg-[#363636] text-xl rounded-t-xl'>Keranjang</div>
          <div className='h-72 overflow-auto px-2 py-2'>
            {cart.map((data, idx) => (
              <div className='flex justify-between py-1' key={idx}>
                <p>{data.name}</p>
                <div className='flex gap-3'>
                  <p>x{data.quantity}</p>
                  <button onClick={() => subtractItemFromCart(data.id)} className='bg-red-400 rounded-full w-5 h-5 leading-5'>-</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='bg-[#262626] w-full rounded-xl'>
          <Calculator />
        </div>
      </div>
    </div>
  )
}

export default App
