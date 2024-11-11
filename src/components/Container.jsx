import { herobg } from "../data";
import pic10 from "../assets/pic10.webp";

function Container() {
  return (
    <div className="bg-[#FFFFE4]">
      <div className="text-center">
        <h1 className="text-3xl md:text-6xl font-bold text-green-900 ">
          Science Behind Femi
				</h1>
				<p className="text-md md:text-lg ">
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



      <div className="w-full flex h-96 flex-col md:flex-row items-center my-10 ">
			    <img 
			      src={pic10} 
			      alt="" 
			      className="w-full md:w-1/2 h-full rounded-md m-5" 
			    />
			  <div className="w-full md:w-1/2 h-full bg-red-900 p-10 rounded-md m-5">
			    <h2 className="text-4xl md:text-4xl lg:text-6xl text-center font-bold text-[rgb(236,156,31)]">
			      You Deserve <br /> The Best
			    </h2>
			    <p className="mt-4 text-sm md:text-base lg:text-lg text-[#EC9C1F] text-center">
			      Femi's products include high quality, ultra-thin daily
			      wear pads for women. The natural, comfortable, and
			      breathable pads are made by women for women, and
			      offer complete period protection, under any
			      circumstance.
			    </p>
			  </div>
			</div>


    </div>
  );
}

export default Container;
