import { product, desc1 } from "../data";
import pic11 from "../assets/pic11.webp";
import Footer from "./Footer";

function Detail() {
  return (
    <div className="w-full h-full lg:mt-80 lg:-ml-14">
     
      <div className="bg-[#EC9C1F] w-56 h-12 py-1 mt-5 sm:ml-4 lg:ml-24 rounded-t-lg sm:transform translate-x-10">
        <h1 className="ml-3 text-xl font-semibold">Product Description</h1>
      </div>

      
      <div className="w-4/5 h-full bg-[#38395C] sm:ml-4 lg:ml-24 mb-20 -mt-2 rounded-sm sm:transform translate-x-10">
        <section className="p-6">
         
          <ul>
            {product.map((item, index) => (
              <li
                key={index}
                className="ml-2 md:ml-8 lg:ml-12 mt-2 text-white leading-8 font-semibold"
              >
                {item.desc}
              </li>
            ))}
          </ul>

         
          <img
            src={pic11}
            alt="Product"
            className="w-full sm:w-4/5 md:w-3/4 sm:ml-4 md:ml-8 lg:ml-16 mt-8"
          />

         
          <h1 className="mt-6 ml-2 md:ml-8 lg:ml-16 font-semibold text-white text-xl mb-2">
            More Information
          </h1>

          
          <ul>
            {desc1.map((item, index) => (
              <li
                key={index}
                className="ml-2 md:ml-8 lg:ml-12 leading-8 font-semibold text-white"
              >
                {item.desc}
              </li>
            ))}
          </ul>
        </section>
      </div>

      
      <Footer />
    </div>
  );
}

export default Detail;
