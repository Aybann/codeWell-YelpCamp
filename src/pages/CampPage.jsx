import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import chatBubbleIcon from '../assets/Chat Bubble.svg'
import mapImage from '../assets/Map.png'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc  } from 'firebase/firestore'
import { db }  from "../config/firebase";
import { useParams } from 'react-router-dom'

const CampPage = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [campground, setCampground] = useState()

  const fetchCampground = async () => {
    const docRef = doc(db, 'campgrounds', id)
    await getDoc(docRef)
      .then((doc) => {
        setCampground(doc.data())
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleAddComment = () => {
    navigate(`/AddComment/${id}`)
  }

  useEffect(() => {
    fetchCampground()
  }, [])

  return ( 
    <main className="px-4 md:px-16">
      <Navigation />
      <div className="text-gray-500">
        {
          campground && 
          <article className="md:flex md:flex-row-reverse gap-10">
            <div className="basis-[70%]">
              <header className="flex flex-col gap-4 p-10 rounded-md border  border-slate-300">
                <img src={campground.img} alt="" className="rounded-md "/>
                <div className="flex justify-between items-center text-black"> 
                  <h1 className="font-bold text-3xl">{campground.title}</h1>
                  <span className="text-xl">${campground.price}/night</span>
                </div>
                <p>{campground.description}</p>
                <p className="italic">Submitted by Andrew Mike</p>
              </header>
              <section className="mt-10 flex flex-col gap-4 p-10 rounded-md border  border-slate-300">
                {
                  campground.comments && campground.comments.map((com, index) => (
                    <div key={index} className="border-b border-slate-200 py-4">
                      <div className="flex flex-wrap  justify-between items-center text-black mb-4"> 
                        <span className="font-bold text-3xl">{com.author}</span>
                        <span className="text-sm text-gray-400"> 
                          { com.timestamp }
                        </span>
                      </div>
                      <p>{com.comment}</p>
                     
                    </div>
                  ))
                }
                <button onClick={handleAddComment} className="primary-button w-fit flex gap-4">
                  <img src={chatBubbleIcon} alt=""/>
                  Leave a Review
                </button>
              </section>
            </div>
            <div className="mt-6 p-10 rounded-md border border-slate-300 md:mt-0 basis-[30%] h-fit">
              <img src={mapImage} alt="" className="w-full"/>
            </div>
          </article>
        }
      </div>
      <Footer />
    </main>
  );
}
 
export default CampPage;
