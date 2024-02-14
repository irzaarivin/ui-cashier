import { useEffect } from 'react';
import bg_cool from './assets/bg_cool.png';
import { useState } from 'react';
import Swal from 'sweetalert2'
import Calculator from './components/Calculator';
import Cart from './components/Cart';
import TotalPayment from './components/TotalPayment';
import { base_url } from './global/Constant';

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [lock, setLock] = useState(true);
  const [login, setLogin] = useState({})
  const [loginStatus, setLoginStatus] = useState(false);
  const [count, setCount] = useState(0);
  const [startCount, setStartCount] = useState(false);
  const [total, setTotal] = useState()
  const [totalPayment, setTotalPayment] = useState();

  const fetchData = async () => {
    const res = await fetch(`${base_url}/item?status=available`)
    const { data } = await res.json();
    setProducts(data);
  }

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

  useEffect(() => {
    fetchData();
  }, [])

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
            totalPrice: totalPayment,
            data
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
    let newTotal = 0;
    cart.forEach((item) => {
      newTotal += item.price * item.quantity;
    });
    setTotal(newTotal.toLocaleString('id-ID'));
    setTotalPayment(newTotal)
  }, [cart]);


  useEffect(() => {
    if (startCount) {
      const intervalId = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [startCount]);

  useEffect(() => {
    if (count > 15) {
      setLoginStatus(!loginStatus)
      setCount(0)
      setStartCount(false)
    }
  }, [count])

  useEffect(() => {
    setLock(!lock)
  }, [loginStatus])

  const loginValue = ({ target }) => {
    setLogin({ ...login, [target.name]: target.value })
  }

  const loginSubmit = (e) => {
    e.preventDefault();
    if (login.username === "admin" && login.password === "admin") {
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
      setLogin({})
      setLoginStatus(!loginStatus)
      setStartCount(true)
    } else {
      Swal.fire({
        title: "Login Failed",
        text: `wrong username or password`,
        icon: "error",
        background: "#262626",
        color: "#fff"
      })
    }
  }

  useEffect(() => {
    const handleContextmenu = e => {
      e.preventDefault()
    }
    document.addEventListener('contextmenu', handleContextmenu)
    return function cleanup() {
      document.removeEventListener('contextmenu', handleContextmenu)
    }
  }, [])

  document.oncontextmenu = function () {
    return false;
  }

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState !== 'visible') {
      setLoginStatus(false)
      setCount(0)
      setStartCount(false)
    }
  });

  window.addEventListener('beforeunload', function () {
    setLoginStatus(false)
    setCount(0)
    setStartCount(false)
  });

  document.onkeydown = function (e) {
    setCount(0);
    if (e.ctrlKey && e.shiftKey && (e.key == 'I' || e.key == 'C' || e.key == 'J')) {
      return false;
    }
    if (e.ctrlKey && e.key == 'U') {
      return false;
    }
    if (e.key == 123) {
      return false;
    }
  }

  document.onmousemove = (e) => {
    setCount(0)
  }

  return (
    <div className='overflow-hidden'>
      <div className={`w-screen h-screen flex justify-center items-center bg-white absolute ${loginStatus ? "top-[-10000px]" : "top-0"} z-50 transition-move`}>
        <div className='border p-5 w-auto text-black'>
          <p className='text-black text-center font-semibold text-xl'>CASHIER APP</p>
          <form onSubmit={loginSubmit}>
            <div className='my-3'>
              <input onChange={loginValue} type="text" name='username' id='username' className='p-1 bg-white border-b-2 focus:outline-none w-80 text-lg' placeholder='your username' />
            </div>
            <div className='my-3'>
              <input onChange={loginValue} type="password" name='password' id='password' className='p-1 bg-white border-b-2 focus:outline-none w-80 text-lg' placeholder='your password'/>
            </div>
            <div>
              <button type='submit' className='bg-blue-400 text-white p-2 rounded-lg'>Login</button>
            </div>
          </form>
        </div>
      </div>
      <div className='grid grid-cols-10 h-screen bg-cover text-white overflow-hidden' style={{ backgroundImage: `url(${bg_cool})` }}>
        <div className=' w-full col-span-7 p-8 overflow-hidden '>
          <TotalPayment total={total} completePayment={completePayment} />
          <div className='grid grid-cols-4 gap-7 2xl:gap-8 max-h-full overflow-auto pb-20'>
            {products.map(product => (
              <div onClick={() => addProduct(product)} className="card col-span-1 card-compact w-64 2xl:h-96 h-96 2xl:w-full bg-base-100 shadow-xl cursor-pointer" key={product.id}>
                <figure><img src={product.image} alt="Shoes" /></figure>
                <div className="card-body">
                  <h2 className="card-title select-none">{product.name}</h2>
                  <p className='select-none'>{product.description}</p>
                  <div className="card-actions flex justify-between">
                    <div className='text-lime-400'>Rp.{product.price}</div>
                    <div>x {product.stock}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='px-5 py-8 col-span-3 flex flex-col gap-y-10 2xl:px-24'>
          <div className='bg-[#262626] w-full rounded-xl'>
            <Cart cart={cart} setCart={setCart} />
          </div>
          <div className='bg-[#262626] w-full rounded-xl'>
            <Calculator />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
