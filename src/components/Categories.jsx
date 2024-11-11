import { picture } from "../data";
import pic11 from "../assets/pic11.webp";
import pic12 from "../assets/pic12.webp";

function Categories() {
  return (
    <div className="relative">
      {/* Section Title */}
        <h1 className="text-center text-3xl md:text-5xl lg:text-6xl font-bold text-green-900 mt-56">
          Femi At A Glance
        </h1>

      {/* Picture Gallery */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 mt-10">
        {picture.map((item, index) => (
          <div key={index} className="flex justify-center items-center">
            <img
              src={item.imageSrc}
              alt=""
              className="w-40 md:w-40  lg:w-60  border rounded-md"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-20 ">
        <img src={pic11} alt="" className="w-full sm:w-3/4 md:w-1/2 lg:w-auto h-auto" />
      </div>

      <div className="flex justify-center ">
        <img src={pic12} alt="" className=" sm:w-3/4 md:w-2/3 lg:w-880 " />
      </div>

      {/* Instagram Highlights Section
      <div className="text-center lg:text-left lg:ml-44 mt-10">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-green-900">
          Every Day Highlights On Instagram
        </h1>
      </div>

      Instagram Highlights Gallery
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 mt-8 mb-5">
  {box.slice(0, 6).map((item, index) => (
    <div key={index} className="flex justify-center items-center">
      <img src={item.imageSrc} alt="" className="w-32 h-28 sm:w-36 sm:h-32 md:w-40 md:h-36 mb-2" />
    </div>
  ))}
</div> */}

    </div>
  );
}

export default Categories;
