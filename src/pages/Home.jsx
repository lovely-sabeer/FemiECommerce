import bg1 from "../assests/bg-1.jpg";
import Navbar from "../components/Navbar";
import Aboutus from "../components/Aboutus";
import Categories from "../components/Categories";
import Container from "../components/Container";
import Footer from "../components/Footer";
import { Navigate, useNavigate } from "react-router-dom";
// useNavigate


function Home() {
	const navigate = useNavigate();
  return (
    <div>
        <Navbar />
        <div className="flex justify-center items-center bg-[#FFFFE4] bg-cover bg-center h-screen sm:h-auto lg:h-[100vh]" style={{ backgroundImage: `url(${bg1})`, backgroundSize: 'cover' }}>
            <div className="bg-opacity-50 p-8 rounded-lg text-center mx-auto sm:transform translate-x-40 translate-y-32 lg:translate-x-60 lg:translate-y-48">
                <button onClick={()=>navigate("/shop")} className="px-9 py-3 bg-green-900 hover:bg-gray-600 text-white font-semibold rounded transition duration-300 transform lg:translate-x-0 lg:translate-y-0 sm:translate-y-12 sm:mx-auto lg:mx-0" >
                    {/* <Link to={"/shop"}>Shop Now</Link> */}Shop Now
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
