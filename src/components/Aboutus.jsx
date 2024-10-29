import bg2 from "../assests/bg-2.webp";

function Aboutus() {
  return (
    <div className="bg-[#FFFFE4]">
      <div className="mb-4 flex flex-col lg:flex-row justify-center items-center">
        <img
          src={bg2}
          alt="Femi"
          className="w-full h-auto max-w-[400px] lg:max-w-[600px] xl:max-w-[50%] mx-auto mt-10 lg:mt-20 mb-4 lg:mb-0"
        />
        <div className="text-center lg:text-left lg:ml-12 xl:ml-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-green-900 mb-4 lg:mb-6">
            ABOUT Femi
          </h1>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0 p-4">
            Designed by Women, for Women. To provide
            <br />
            women with sustainable, comfortable, and reliable
            <br />
            menstrual hygiene solutions. We are driven to
            <br />
            promote empowerment, eco-consciousness to make
            <br />
            women feel comfortable and confident each day.
          </p>
          <div className="mt-4">
            <button
              className="px-6 py-3 bg-green-900 hover:bg-gray-600 text-yellow-300 font-semibold rounded transition duration-300"
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
