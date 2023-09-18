import herobg from '../assets/images/herobg.jpeg'

const Hero = () => {
  return (
    <section className='min-h-screen lg:min-h-screen 2xl:min-h-[800px] relative flex items-center justify-end -top-10'>
      <div className=' absolute top-0 bottom-0'>
        <img
          className='h-full object-cover'
          src={herobg}
          alt=''
          width={'100%'}
          height={'100%'}
        />
      </div>
      <div className=' px-5 lg:pr-20 lg:w-1/2 z-10'>
        <h1 className='text-4xl font-semibold lg:text-[4rem] lg:font-bold mb-8 lg:leading-[68px]'>
          Welcome To My Online Portfolio!
        </h1>
        <p className='text-2xl lg:pr-20'>
          Capturing your most precious moments. Wealth of experience in
          photography
        </p>
      </div>
    </section>
  )
}

export default Hero
