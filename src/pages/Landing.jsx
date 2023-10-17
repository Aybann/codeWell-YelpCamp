import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.svg'
import checkmark from '../assets/Checkmark.svg'
import homeImage from '../assets/Hero Image.jpg'
import plumLogo from '../assets/Plum Guide.svg'
import bookingLogo from '../assets/Booking.svg'
import airbnbLogo from '../assets/Airbnb.svg'

const Landing = () => {
  const navigate = useNavigate()

  const handleNavigateToHome = () => {
    navigate('/home')
  }

  return ( 
    <main  >
      <div className='md:flex flex-row-reverse md:overflow-x-hidden'>
        <div className='bg-image p-[12em] bg-center bg-cover md:p-[20em] mt-16 md:mt-0 md:basis-[40%]'></div>
        <section className='px-4 md:basis-[60%]'>
          <div className='flex justify-between py-4 px-4 md:px-16 absolute top-0'>
            <a href="#">
              <img src={logo} alt="Yelp" />
            </a>
          </div>
          <header className='my-6 font-semibold text-gray-500 md:flex justify-center items-center md:h-screen '>
            <div className='md:w-[60ch]'>
              <h1 className='text-4xl font-bold text-black md:text-6xl'>Explore the best<br /> camps on Earth.</h1>
              <p className=' my-4 md:w-[46ch]' >YelpCamp is a curated list of the best camping spots on Earth. Unfiltered and unbiased reviews</p>
              <ul>
                <li className='flex items-center gap-2 my-2'>
                  <img src={checkmark} alt="" />
                  Add your own camp suggestion
                </li>
                <li className='flex items-center gap-2 my-2'>
                  <img src={checkmark} alt="" />
                  Leave reviews and experience
                </li>
                <li className='flex items-center gap-2 my-2'>
                  <img src={checkmark} alt="" />
                  See locations for all camps
                </li>
              </ul>
              <button onClick={handleNavigateToHome} className='primary-button mt-4 mb-8'>
                View Campgrounds
              </button>
              <div>
                <p className='text-xl'>Partnered with:</p>
                <ul className='flex gap-2'>
                  <li>
                    <img src={airbnbLogo} alt="" />
                  </li>
                  <li>
                    <img src={bookingLogo} alt="" />
                  </li>
                  <li>
                    <img src={plumLogo} alt="" />
                  </li>
                </ul>
              </div>
            </div>
          </header>
        </section>
      </div>
    </main>
  );
}
 
export default Landing;