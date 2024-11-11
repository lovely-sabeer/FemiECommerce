import bg2 from "../assets/bg-2.webp";

function Aboutus() {
  return (
    <div className="bg-[#FFFFE4] py-10 px-4">
      <div className="flex flex-col lg:flex-row justify-center items-center">
        {/* Image Section */}
        <img
          src={bg2}
          alt="Femi"
          className="w-full h-auto rounded-xl max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[50%] mx-auto lg:mx-0 mt-8 mb-6 lg:mb-0 lg:mt-0"
        />

        {/* Text Section */}
        <div className="text-center lg:text-left lg:ml-8 xl:ml-16 mt-6 lg:mt-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-900 mb-4">
            ABOUT Femi
          </h1>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0">
            Designed by Women, for Women. To provide
            {/* <br /> */}
            women with sustainable, comfortable, and reliable
            {/* <br /> */}
            menstrual hygiene solutions. We are driven to
            {/* <br /> */}
            promote empowerment, eco-consciousness to make
            {/* <br /> */}
            women feel comfortable and confident each day.
          </p>

          {/* Button */}
          {/* <div className="mt-6 flex justify-center lg:justify-start">
            <button className="px-6 py-3 bg-green-900 hover:bg-gray-600 text-yellow-300 font-semibold rounded transition duration-300">
              Read More
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
