import { picture, box } from "../data";
import pic11 from "../assests/pic11.webp";
import pic12 from "../assests/pic12.webp";

function Categories() {
  return (
    <div className="px-4 lg:px-16 py-8">
      {/* Section Title */}
      <div className="text-center lg:text-left lg:ml-96">
        <h1 className="mt-16 text-4xl sm:text-5xl md:text-6xl font-bold text-green-900 transform -translate-x-16">
          Femi At A Glance
        </h1>
      </div>

      {/* Picture Gallery */}
      <div className="flex flex-wrap justify-center lg:justify-start gap-10 mt-16 mb-5">
        {picture.map((item, index) => (
          <div key={index} className="flex justify-center items-center">
            <img
              src={item.imageSrc}
              alt=""
              className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-56 border rounded-md"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-20 mb-6">
        <img src={pic11} alt="" className="w-full sm:w-3/4 md:w-1/2 lg:w-auto h-auto" />
      </div>

      <div className="flex justify-center mt-10 mb-6">
        <img src={pic12} alt="" className="w-4/5 sm:w-3/4 md:w-2/3 lg:w-880 h-44" />
      </div>

      {/* Instagram Highlights Section */}
      <div className="text-center lg:text-left lg:ml-44 mt-10">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-green-900">
          Every Day Highlights On Instagram
        </h1>
      </div>

      {/* Instagram Highlights Gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 mt-8 mb-5">
  {box.slice(0, 6).map((item, index) => (
    <div key={index} className="flex justify-center items-center">
      <img src={item.imageSrc} alt="" className="w-32 h-28 sm:w-36 sm:h-32 md:w-40 md:h-36 mb-2" />
    </div>
  ))}
</div>

    </div>
  );
}

export default Categories;
