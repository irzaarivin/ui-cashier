import React from 'react'

export default function Cart({ cart, setCart }) {

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

  return (
    <>
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
    </>
  )
}
