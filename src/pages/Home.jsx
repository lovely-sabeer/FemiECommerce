import bg1 from "../assets/bg-1.jpg";
import Navbar from "../components/Navbar";
import Aboutus from "../components/Aboutus";
import Categories from "../components/Categories";
import Container from "../components/Container";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div >
      <Navbar />

      {/* Hero Section */}
      <div 
        className="flex justify-center items-end bg-[#FFFFE4] bg-cover bg-left md:bg-center h-screen sm:h-auto md:h-[80vh] lg:h-[100vh]"
        style={{ backgroundImage: `url(${bg1})`, backgroundSize: 'cover' }}
      >
        <div className="bg-opacity-50 p-8 rounded-lg text-center mx-auto mb-10">
          <button 
            onClick={() => navigate("/shop")} 
            className="px-9 py-3 bg-green-900 hover:bg-gray-600 text-white font-semibold rounded transition duration-300 sm:mt-12 lg:mt-0 sm:translate-y-8 lg:translate-y-0"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative">
        <Aboutus />
        <Container />
        <Categories />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
