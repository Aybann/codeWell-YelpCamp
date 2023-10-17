import { useNavigate } from 'react-router-dom';

const Card = ({campground}) => {
  const navigate = useNavigate()

  const handleViewDetails = () => {
    navigate(`/camp/${campground.id}`)
  }
  
  return ( 
    <article className="rounded-md flex flex-col font-semibold border border-slate-300 p-4">
      <img src={campground.img} alt="" className="rounded-md h-[200px]"/>
      <header>
        <h2 className="mt-4 font-bold">{campground.title}</h2>
        <p className="my-3 text-gray-500 line-clamp-3">{campground.description}</p>
      </header>
      <button onClick={handleViewDetails} className=" mt-auto p-4 border border-slate-300 font-semibold rounded-md w-full">
          View Campgrounds
      </button>
    </article>
  );
}
 
export default Card;