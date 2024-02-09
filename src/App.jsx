import bg_dark from './assets/bg_dark.jpg';

function App() {

  return (
    <div className="w-full grid grid-cols-5 gap-10 h-screen text-white p-10" style={{ backgroundImage: `url(${bg_dark})`, backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
      <div className="col-span-4">
        <div className='bg-[#262626] drop-shadow-2xl h-20 py-5 px-24 w-full relative rounded-2xl'>
          <div className='bg-[#8C004D] w-16 absolute drop-shadow-xl top-2 rounded-md left-2'>
            <p className='px-2 py-3 text-3xl font-semibold'>Rp.</p>
          </div>
          <span className='text-4xl'>35.000.000.000</span>
          <button className='bg-[#177BE5] px-16 w-auto absolute drop-shadow-xl top-2 rounded-md right-2'>
            <p className='px-2 py-3 text-3xl font-semibold'>Complete Payment</p>
          </button>
        </div>
      </div>
      <div className='absolute right-4 w-[22rem]'>
        <div className='bg-[#363636] text-xl font-semibold px-3 h-14 rounded-t-xl pt-1'>Keranjang</div>
        <div className='bg-[#262626] h-72 rounded-b-xl'></div>
      </div>
    </div>
  )
}

export default App
