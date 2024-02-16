import React from 'react'
export default function TotalPayment({ total, completePayment }) {

  return (
    <div className='p-3 bg-[#262626] rounded-xl relative flex justify-between mb-5'>
      <div className='flex font-semibold'>
        <div className='bg-[#8C004D] p-3 rounded-xl text-3xl'>Rp.</div>
        <p className='text-3xl p-3 font-normal'>{total}</p>
      </div>
      <button onClick={() => completePayment()} className='py-3 bg-[#177BE5] active:bg-blue-900 px-5 rounded-xl text-3xl font-semibold'>
        complete payment
      </button>
    </div>
  )
}
