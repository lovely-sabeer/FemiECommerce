import { herobg } from "../data";
import pic10 from "../assests/pic10.webp";

function Container() {
  return (
    <div className="bg-[#FFFFE4]">
      <div className="text-center md:text-left md:ml-96">
       
        <h1 className="p-5 mt-12 text-4xl sm:text-5xl md:text-6xl font-bold text-green-900 md:-ml-20">
          Science Behind Femi
        </h1>
      </div>
      <div className="text-center md:text-left">
      
        <p className="px-5 text-lg sm:text-xl md:text-xl md:ml-80">
          Experience our Difference: Unmatched Quality and Innovation
        </p>
      </div>
      <div className="grid grid-cols-2 gap-10 mt-10 md:mt-20 md:ml-8 lg:flex lg:justify-center">
    {herobg.map((item, index) => (
        <div key={index} className="flex flex-col gap-6 items-center mb-6 lg:mb-0">
            <img src={item.imageSrc} alt="" className="w-32 h-28 sm:w-36 sm:h-32 md:w-40 md:h-36" />
            <div className="leading-relaxed text-center">
                <p className="text-sm">
                    {item.desc}
                    <br />
                    {item.desc1}
                </p>
            </div>
        </div>
    ))}
</div>


      <div className="flex flex-col md:flex-row items-center mt-12 md:mt-16">
  
  <div className="w-full md:w-1/2 ">
    <img 
      src={pic10} 
      alt="" 
      className="w-full h-auto " 
    />
  </div>

  
  <div className="bg-red-900 w-full md:w-1/2 px-3 py-9">
    
    <h2 className="text-4xl sm:text-5xl md:text-6xl text-center md:text-left font-bold text-[rgb(236,156,31)]">
      You Deserve <br /> The Best
    </h2>
    <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-[#EC9C1F] leading-6 md:leading-7 text-center md:text-left">
      Femi9’s products include high quality, ultra-thin daily
      <br className="hidden md:block" />
      wear pads for women. The natural, comfortable, and
      <br className="hidden md:block" />
      breathable pads are made by women for women, and
      <br className="hidden md:block" />
      offer complete period protection, under any
      <br className="hidden md:block" />
      circumstance.
    </p>
    <div className="text-center md:text-left">
      <button className="px-8 py-3 bg-[#EC9C1F] hover:bg-gray-600 text-white font-normal transition duration-300 mt-4">
        Shop Now
      </button>
    </div>
  </div>
</div>


    </div>
  );
}

export default Container;
