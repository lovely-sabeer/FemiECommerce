import logo from "../assets/logo.avif";

function Footer() {
    return (
        <div className="w-full bg-[#4F305C] p-4 md:p-6 lg:p-8">
            <div className="flex flex-col items-center">
                {/* Logo Centered */}
                <img src={logo} alt="Logo" className="w-28 sm:w-32 md:w-36 mb-4" />

                {/* Flex container for Contact Us and Info sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
                    {/* Contact Us Section */}
                    <div className="text-[#EC9C1F] leading-8 text-center md:text-left lg:ml-60">
                        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-2">Contact Us</h1>
                        <p className="text-lg sm:text-xl">Femi Health Care</p>
                        <p className="mt-1 text-sm sm:text-base">
                            222/1, Pavizham Nagar,<br />
                            Thindal Post, Erode -<br />
                            638012
                        </p>
                    </div>

                    {/* Info Section */}
                    <div className="text-xl text-[#EC9C1F] leading-8 text-center md:text-left lg:ml-40">
                        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-2">Info</h1>
                        <div className="text-lg leading-8">
                            <p className="mb-1">About Us</p>
                            <p className="mb-1">Refund Policy</p>
                            <p className="mb-1">Privacy Policy</p>
                            <p className="mb-1">Terms & Conditions</p>
                        </div>
                    </div>
                </div>

                {/* Operating Hours */}
                <div className="mt-6 text-[#EC9C1F] text-center">
                    <h1 className="text-xl mb-1">Monday-Saturday</h1>
                    <p className="mb-4">10AM - 6PM</p>
                    <p className="text-sm md:text-base mb-1">Note - please do not make payment by scanning the QR code. In case of any queries, contact 1234567890</p>
                    <p className="text-sm font-normal">copyright &copy; 2021 All rights reserved | Made with ❤ Femi</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
