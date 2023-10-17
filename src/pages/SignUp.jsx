import logo from '../assets/Logo.svg'
import arrow from '../assets/bx-arrow-back.svg'
import mayAvatar from '../assets/May.png'
import DataContext from '../context/DataProvider';
import { useState, useRef, useContext } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth }  from "../config/firebase";
import { useNavigate, NavLink } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate()
  const { setUser } = useContext(DataContext)
  const emailRef = useRef()
  const passwordRef = useRef()
  const [errorMsg, setErrorMsg] = useState(null)

  const createUserAccount = async (e) => {
    e.preventDefault()

    await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((cred) => {
        setUser(cred.user.email)
        setErrorMsg('')
        navigate(`/home`)
      })
      .catch(err => {
        setErrorMsg(err.message)
      })
  }

  return (
    <main className='md:flex md:h-screen'>
      <div className='px-4 md:px-20 md:basis-[60%]'>
        <div className='flex justify-between py-4 md:px-16'>
          <NavLink to="/">
            <img src={logo} alt="Yelp" />
          </NavLink>
          <NavLink to='/home' className='flex justify-between items-center text-gray-500 gap-2'>
            <img src={arrow} alt="" className="w-4" />
            Back to campgrounds
          </NavLink>
        </div>
        <section className='md:flex justify-center items-center md:h-[90%]'>
          <div className='md:w-[60ch]'>
            <header className='text-3xl font-bold my-6'>
              <h2>
                Start Exploring Camps from all around the world.
              </h2>
            </header>
            <form className='flex flex-col gap-4' onSubmit={createUserAccount}>
              <div className={`${errorMsg ? 'block' : 'hidden'} border border-red-400 text-red-400 rounded-md p-4`}>
                { errorMsg }
              </div>
              <div className='flex flex-col my-4'>
                <label htmlFor="" className='font-semibold'>Email</label>
                <input type="email" placeholder='Ivan_93' required ref={emailRef} className='p-4 bg-gray-100 rounded-md' />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="" className='font-semibold'>Password</label>
                <input type="password" placeholder='Choose a Password' required ref={passwordRef} className='p-4 bg-gray-100 rounded-md' />
              </div>
              <input type="submit" value="Create an Account" className='primary-button' />
            </form>
            <p className='mt-4 font-semibold text-gray-600'>
              Already a user?  
              <NavLink to="/signIn" className='ml-2 text-blue-500 underline'>
                Sign in
              </NavLink>
            </p>
          </div>
        </section>
      </div>
      <section className='bg-gray-100 mt-10 md:mt-0 md:basis-[40%] md:flex justify-center items-center'>
        <article className='px-4 py-8 md:w-[38ch]'>
          <p className='text-2xl font-bold mb-4 leading-8'>
            "YelpCamp has honestly saved me hours of research time, and the camps on here are definitely well picked and added"
          </p>
          <div className='flex gap-2 items-center'>
            <img src={mayAvatar} alt="" className='w-12' />
            <div>
              <p className='font-bold text-sm'>May Andrews</p>
              <p className='text-gray-600  text-sm'>Professional Hiker</p>
            </div>
          </div>
        </article>
      </section>
    </main>
  )
};
 
export default SignUp;