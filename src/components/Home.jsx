import bg1 from "../assests/bg-1.webp";
import Navbar from "./Navbar";
import Aboutus from "./Aboutus";
import Categories from "./Categories";
import Container from "./Container";
import Footer from "./Footer";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Navbar />
      
      <div
        className="flex justify-center items-center bg-[#FFFFE4] bg-cover bg-center h-screen sm:h-auto lg:h-[100vh]" // Set height for larger screens
        style={{ backgroundImage: `url(${bg1})`, backgroundSize: 'cover' }} // Keep background cover for larger screens
      >
       <div className="bg-opacity-50 p-8 rounded-lg text-center mx-auto sm:transform translate-x-40 translate-y-32 lg:translate-x-60 lg:translate-y-48">
  <button
    className="px-9 py-4 bg-green-900 hover:bg-gray-600 text-white font-semibold rounded transition duration-300 transform lg:translate-x-0 lg:translate-y-0 sm:translate-y-12 sm:mx-auto lg:mx-0"
  >
    <Link to={"/shop"}>Shop Now</Link>
  </button>
</div>

      </div>

      <div>
        <Aboutus />
        <Container />
        <Categories />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
