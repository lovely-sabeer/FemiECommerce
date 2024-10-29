import React, { useState, useContext, useEffect } from "react";
import pic25 from "../assests/pic25.webp";
import { mini } from "../data";
import Navbar from "./Navbar";
import Detail from "./Detail";
import { Namecontext } from "../App";
import axios from "axios";
import Previous from "./Previous";
import auth from "../config";
import { onAuthStateChanged } from "firebase/auth";

function Shop() {
    const { sizes, selectedSize, setSelectedSize, userList, setUserList, setGoogle, google } = useContext(Namecontext);
    const [showDropdown, setShowDropdown] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [address, setAddress] = useState("");
    const [phoneNumber,setPhone] = useState();
    const [date, setDate] = useState();
    const [bookid, setBookId] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const phoneNumber = user.phoneNumber || "No phone number provided";  
    
                setUserList((prevList) => ({
                    ...prevList,
                    userName: user.displayName|| "User",
                    emailId: user.email,
                    phoneNumber: phoneNumber,
                    _id: user.uid 
                }));
                localStorage.setItem("_id", user.uid )
            } else {
                setGoogle({});  
            }
        });
    
        return () => unsubscribe();
    }, [setGoogle]);

    useEffect(() => {
        if (selectedSize) {
            setQuantity(selectedSize.quantity || 1);
        }
    }, [selectedSize]);

    useEffect(() => {
        if (selectedSize) {
            const price = selectedSize.price ? parseFloat(selectedSize.price) : 0;
            setTotalPrice(price * quantity);
        }
    }, [quantity, selectedSize]);

    const handleSelect = (size) => {
        setSelectedSize(size);
        setShowDropdown(false);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    // const handlephone = (e)=>{
    //     setPhone(e.target.value);
    // }

    const increaseQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        setSelectedSize({ ...selectedSize, quantity: newQuantity });
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            setSelectedSize({ ...selectedSize, quantity: newQuantity });
        }
    };

    const handleAdd = () => {
        const orderData = {
            price: totalPrice,
            quantity: quantity,
            size: selectedSize.label,
            address: address,
            userName: userList.userName || "Anonymous", 
            emailId: userList.emailId || "No Email", 
            userId: userList._id || "No ID", 
            phoneNumber: phoneNumber || "No Phone Number", 
            date: date,
            bookid: bookid,
        };
    
        axios.post("http://localhost:3001/User/order", orderData)
            .then((response) => {
                console.log("Order created successfully:", response.data);
                setUserList((prevList) => [{ ...prevList }, response.data]);
                setSelectedSize(response.data);
                setShowPopup(false);
                setAddress("");
                setBookId();
                alert("Order successfully placed!");
            })
            .catch((error) => {
                console.error("Error creating order:", error);
            });
    };
    
    

    return (
        <div className="bg-[#FFFFE4] min-h-screen">
            <div className="absolute top-0 w-full">
                <Navbar />
            </div>
            <div className="bg-[#FFFFE4] mt-10 sm:mt-24 md:mt-32">
                <div className="flex flex-col md:flex-row md:justify-between items-center">
                    <div className="w-full md:w-1/2 p-4 md:p-8">
                        <img src={pic25} alt="Femi Anion" className="mx-auto w-72 h-72 sm:w-96 sm:h-96 lg:w-[30rem] lg:h-[30rem] rounded-sm bg-[#FFFFE4]" />
                    </div>

                    <div className="md:w-1/2 mt-8 md:mt-0 p-4 md:p-8">
                        <h1 className="text-center md:text-left text-4xl sm:text-6xl lg:text-7xl font-bold text-green-900">
                            Femi Anion
                        </h1>

                        <div className="mt-6">
                            <p className="text-lg sm:text-xl">Price:</p>
                            <p className="font-bold text-[#EC9C1F] text-lg sm:text-2xl ml-16 -mt-7">
                                {totalPrice ? `$${totalPrice.toFixed(2)}` : "Select a size"}
                            </p>
                        </div>

                        <div className="mt-4 flex items-center">
                            <p className="mr-2 text-lg">{selectedSize ? selectedSize.label : "Size"}</p>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={selectedSize ? `${selectedSize.label} - ${selectedSize.description}` : ""}
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    readOnly
                                    className="border border-gray-300 rounded-md px-3 py-1 cursor-pointer ml-2 w-52 sm:w-72"
                                    placeholder="Select size"
                                />
                                {showDropdown && (
                                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                        {sizes.map((size) => (
                                            <div
                                                key={size.id}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => handleSelect(size)}
                                            >
                                                {size.label} - {size.description}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-5">
                            <p className="text-lg">Vendor:</p>
                            <p className="ml-20 -mt-6 font-normal transform translate-x-2">Femi</p>
                        </div>

                        <div className="mt-5">
                            <p className="text-lg">Quantity:</p>
                            <div className="flex items-center mt-2">
                                <button onClick={decreaseQuantity} className="border border-gray-400 px-3 py-1 text-xl">-</button>
                                <span className="mx-4 text-xl">{quantity}</span>
                                <button onClick={increaseQuantity} className="border border-gray-400 px-3 py-1 text-xl">+</button>
                            </div>
                        </div>

                        <button 
                            onClick={() => setShowPopup(true)} 
                            className="px-4 py-2 mt-6 bg-[#EC9C1F] hover:bg-gray-600 text-white font-normal transition duration-300 lg:mt-10"
                        >
                            Open
                        </button>
                        
                        {showPopup && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                                <div className="bg-white p-5 rounded-md shadow-lg">
                                    <h2 className="text-lg font-bold mb-4">Enter Address</h2>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Address"
                                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                                    />
                                    <input
                                        type="number"
                                        value={phoneNumber}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Phone Number"
                                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                                    />
                                    <label className="block mb-2">
                                        <span className="text-gray-700">Date:</span>
                                        <input
                                            type="date"
                                            name="date"
                                            value={date}
                                            onChange={handleDateChange}
                                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                        />
                                    </label>

                                    <div className="flex justify-end">
                                        <button 
                                            onClick={handleAdd} 
                                            className="px-4 py-2 bg-[#EC9C1F] hover:bg-gray-600 text-white font-normal transition duration-300 mr-2"
                                        >
                                            Add item
                                        </button>
                                        <button 
                                            onClick={() => setShowPopup(false)} 
                                            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black font-normal transition duration-300"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Previous />
                <Detail />
            </div>
        </div>
    );
}
export default Shop;