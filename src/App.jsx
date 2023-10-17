import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from "./components/Navigation"
import Landing from "./pages/Landing"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import CampPage from './pages/CampPage';
import AddComment from './pages/AddComment';
import AddCamp from './pages/AddCamp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/signUp' element={<SignUp />}/>
        <Route path='/signIn' element={<SignIn />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/camp/:id' element={<CampPage />}/>
        <Route path='/AddComment/:id' element={<AddComment />}/>
        <Route path='/AddCamp' element={<AddCamp />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
