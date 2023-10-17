import logo from '../assets/Logo.svg'
import { NavLink } from 'react-router-dom'
const Footer = () => {
  return ( 
    <div className='flex justify-between items-center py-10'>
      <NavLink to="/">
        <img src={logo} alt="Yelp" />
      </NavLink>
    </div>
  );
}
 
export default Footer;