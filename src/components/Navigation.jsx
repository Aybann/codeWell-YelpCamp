import hamburger from '../assets/Hamburger Menu.svg'
import logo from '../assets/Logo.svg'
import DataContext from '../context/DataProvider';
import { useNavigate, NavLink } from 'react-router-dom'
import { useState, useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth }  from "../config/firebase";


const Navigation = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(DataContext)

  const [isOpen, setIsOpen] = useState(false)

  const handleBurger = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true)
  }

  const handleLogOut = async () => {
    await signOut(auth)
      .then(() => {
        setUser(null)
        navigate('/signIn')
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return ( 
    <div className='relative flex justify-between items-center py-6 sm:py-10'>
      <NavLink to="/">
        <img src={logo} alt="Yelp" />
      </NavLink>
      <nav className={`${isOpen ? 'block' : 'hidden' } absolute left-0 right-0 top-24 bg-white p-8 border border-black shadow-md rounded-md sm:border-none sm:p-0 sm:static sm:bg-none sm:flex sm:justify-between sm:items-center sm:w-full sm:ml-8 sm:shadow-none font-semibold text-gray-500`}>
        <NavLink to="/home" >Home</NavLink>
        {
          user 
          ?  <ul className='flex gap-6 flex-col sm:flex-row sm:items-center'>
              <li>{user}</li>
              <li>
                <button className='primary-button' onClick={handleLogOut}>Logout</button>
              </li>
            </ul>

          :  <ul className='flex gap-6 flex-col sm:flex-row sm:items-center'>
              <li><NavLink to="/signIn">Login</NavLink></li>
              <li><NavLink to="/SignUp" className='primary-button'>Create an Account</NavLink></li>
            </ul>
        }
       
        <div className='w-8 h-8 border-t border-t-black border-l border-l-black bg-white absolute -top-4 right-4 rotate-45 sm:hidden'></div>
      </nav>
      <button onClick={handleBurger} className='sm:hidden bg-gray-100 rounded-md p-2'>
        <img src={hamburger} alt="" />
      </button>
    </div>
  );
}
 
export default Navigation;