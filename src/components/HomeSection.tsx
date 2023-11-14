export default function HomeSection() {
  return (
    <section className='flex' id="Home">
      <div className='w-full flex flex-col justify-center items-center'>
        <div>
          <p className="text-3xl">Hello there...</p>
          <h1 className="text-7xl py-2">{`I'M MO`}</h1>
          <p className="text-3xl">A Passionate Developer</p>
        </div>
      </div>
      <div className='w-full flex justify-center items-center'>
        <div className='w-[90%] h-[90%] bg-slate-400 rounded'></div>
      </div>
    </section>
  );
}
