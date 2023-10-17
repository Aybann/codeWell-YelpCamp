import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import DataContext from '../context/DataProvider';
import { useNavigate } from 'react-router-dom';
import { useRef, useContext, useEffect } from "react";
import { collection, addDoc  } from 'firebase/firestore'
import { db }  from "../config/firebase";

const AddCamp = () => {
  const { user } = useContext(DataContext)
  const navigate = useNavigate()
  const titleRef = useRef()
  const descriptRef = useRef()
  const imgRef = useRef()
  const priceRef = useRef()

  const handleSubmitForm = async (e) => {
    e.preventDefault()

    try {
      await addDoc(collection(db, 'campgrounds'), {
        title: titleRef.current.value,
        description: descriptRef.current.value,
        img: imgRef.current.value,
        price: priceRef.current.value,
        comments: []
      })
      navigate('/home')
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(!user) {
      navigate('/signIn')
    }
  })
  
  return ( 
    <main className="px-4 md:px-16 text-gray-600">
       <Navigation />
       <section className="xl:flex justify-center items-center">
        <div className="md:w-[70ch]">
          <header className="flex flex-col gap-4  md:w-[70ch]">
            <h1 className="text-4xl font-bold text-black">Add New Campgrounds</h1>
          </header>
          <form onSubmit={handleSubmitForm}>
            <div className="flex flex-col gap-2 py-4 rounded-md">
              <label className="font-semibold">Campground Name</label>
              <input type="text" placeholder='Name of camps' required ref={titleRef} className="bg-gray-100 p-4 rounded-md w-full focus:outline-none"/>
            </div>
            <div className="flex flex-col gap-2 py-4 rounded-md">
              <label className="font-semibold">Price</label>
              <input type="text" placeholder='$142' required ref={priceRef} className="bg-gray-100 p-4 rounded-md w-full focus:outline-none"/>
            </div>
            <div className="flex flex-col gap-2 py-4 rounded-md">
              <label className="font-semibold">Image</label>
              <input type="text" placeholder='http://127.0.0.1:5173/image' required ref={imgRef} className="bg-gray-100 p-4 rounded-md w-full focus:outline-none"/>
            </div>
            <div className="flex flex-col gap-2 py-4 rounded-md">
              <label className="font-semibold">Description</label>
              <textarea cols="30" rows="10" placeholder="This is the most amazing place i've been!"  required ref={descriptRef} className="bg-gray-100 p-6 rounded-md w-full">
              </textarea>
            </div>
            <input type="submit" value="Add Campgrounds" className="primary-button w-full " />
          </form>
        </div>
       </section>
       <Footer />
    </main>
  );
}
 
export default AddCamp;