import NotFoundIcone from "./NotFoundIcone.png";
import "../../index.css";
import { Link } from "react-router-dom";
function NotFoundPage() {
  return (
    <div className="bg-dark-linear-gradient flex items-center flex-col py-24">
      <img className=" w-96" src={NotFoundIcone} alt="" />
      <h2 className=" mt-9 mb-1 text-2xl font-bold ">No Results</h2>
      <h2 className=" mb-4 text-sm font-medium">piease refine your search and try again</h2>
      <Link to={"/"} className=" px-12 text-orange font-medium py-3 border border-gray-200 rounded-md ">Try AGAIN</Link>
      
    </div>
  );
}

export default NotFoundPage;
