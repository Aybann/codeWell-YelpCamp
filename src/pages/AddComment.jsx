import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import DataContext from '../context/DataProvider';
import { useNavigate } from 'react-router-dom';
import { useRef, useContext, useEffect } from "react";
import { arrayUnion, updateDoc, doc  } from 'firebase/firestore'
import { db }  from "../config/firebase";
import { useParams } from 'react-router-dom'

const AddComment = () => {
  const { id } = useParams();
  const { user } = useContext(DataContext)
  const textInput = useRef()
  const navigate = useNavigate()

  const formatDate = (date) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
  
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
    return `${month} ${day} ${year}`;
  }

  const handleAddComment = async (e) => {
    e.preventDefault()

    try {
      const docRef = doc(db, 'campgrounds', id)
      updateDoc(docRef, {
        comments: arrayUnion(
          { 
            author: user,
            comment: textInput.current.value, 
            timestamp: formatDate(new Date())
          })
      })
      navigate(-1)
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if(!user) {
      navigate('/signIn')
    }
  })

  return ( 
    <main className="px-4 md:px-16">
       <Navigation />
       <section className="xl:flex justify-center items-center">
        <header className="flex flex-col gap-4 text-gray-600 md:w-[70ch]">
          <h1 className="text-4xl font-bold text-black">Add New Comment</h1>
          <form onSubmit={handleAddComment} className="flex gap-4 flex-col">
            <label className="mb-4 font-semibold">Description</label>
            <textarea required ref={textInput} cols="30" rows="10" placeholder="This is the most amazing place i've been!" className="bg-gray-100 p-6 rounded-md w-full">
            </textarea>
            <input type="submit" value="Add Comment" className="primary-button w-full "/>
          </form>
        </header>
       </section>
       <Footer />
    </main>
  );
}
 
export default AddComment;