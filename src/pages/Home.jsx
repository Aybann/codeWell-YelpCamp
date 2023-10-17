import Navigation from "../components/Navigation";
import searchIcon from "../assets/Search Icon.svg";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { collection, getDocs  } from 'firebase/firestore'
import { db }  from "../config/firebase";

const Home = () => {
  const query = useRef()
  const [campgrounds, setCampgrounds] = useState()
  const [filteredData, setFilteredData] = useState()

  const handleFilteredItems = (e) => {
    e.preventDefault()
    const newData = campgrounds?.filter(item => {
      return item.title.toLowerCase().includes(query.current.value.toLowerCase())
    })
    setFilteredData(newData)
  }

  const fetchData = async () => {
    await getDocs(collection(db, 'campgrounds'))
      .then((snapshot) => {
        const newData = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
        setCampgrounds(newData)
        setFilteredData(newData)
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return ( 
    <main className="px-4 md:px-16">
      <Navigation />
      <header className="bg-slate-100 p-8 rounded-sm">
        <div >
          <h1 className="text-4xl font-bold mb-4">Welcome to YelpCamp!</h1>
          <p className="sm:w-[43ch] text-gray-500">View our hand-picked campgrounds from all over the world, or add your own.</p>
          <form onSubmit={handleFilteredItems} className="flex flex-wrap gap-2 my-6">
            <div className="flex gap-2 bg-white w-fit p-4 rounded-md border border-slate-300">
              <img src={searchIcon} alt="" />
              <input ref={query} type="search" placeholder='Search for camps' className=" rounded-md bg-transparent focus:outline-none"/>
            </div>
            <input type="submit" value="Search" className="primary-button"/>
          </form>
          <Link to="/AddCamp" className="underline">Or add your own campground</Link>
        </div>
      </header>
      <section className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {
          campgrounds && filteredData.map((campground, index) => (
            <Card key={index} campground={campground}/>
          ))
        }
      </section>
      <Footer />
    </main>
  );
}
 
export default Home;
