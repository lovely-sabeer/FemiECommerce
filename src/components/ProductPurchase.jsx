import React, { useState } from 'react';
import pic25 from "../assests/pic25.webp"
import { auth, db } from '../config';
import { setDoc, updateDoc, doc, arrayUnion, getDoc, collection, addDoc } from "firebase/firestore";
// import { onAuthStateChanged } from 'firebase/auth';


const ProductPurchase = () => {
	const [quantity, setQuantity] = useState(1);
	const [price, setPrice] = useState(100);
	const [name, setName] = useState(0);
  const prices = [100,200,300,400];
	const user = auth.currentUser;
	const sizes = ["L - 280mm (12 Pads)", "XL - 320mm (10 Pads)", "XXL - 410mm (5 Pads)", "Panty Liner - 180mm (30 Pieces)"]
	const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
	const day = String(today.getDate()).padStart(2, '0');
	
	const handleOrder = async () => {
  if (user) {
    // Reference to the user's order document
    const userOrderRef = doc(db, "userOrders", user.uid);
		const ordersRef = collection(db, "orders");

    // Check if the userOrders document exists
		const userOrderSnap = await getDoc(userOrderRef);

		
		const docRef = await addDoc(ordersRef, {
			userEmail: user.email,
      productName: sizes[name],
      quantity: quantity,
      totalPrice: price * quantity,
      Date: `${day}-${month}-${year}`,
      status: "placed" 
    });

    if (userOrderSnap.exists()) {
      // If the document exists, update the orders array
      await updateDoc(userOrderRef, {
        orders: arrayUnion({
          productId: "001",
          Name: sizes[name],
          quantity: quantity,
          totalPrice: price * quantity,
          Date: `${day}-${month}-${year}`
        })
      });
    } else {
      // If the document doesn't exist, create it with the first order
      await setDoc(userOrderRef, {
        orders: [
          {
            productId: "001",
            Name: sizes[name],
            quantity: quantity,
            totalPrice: price * quantity,
            Date: `${day}-${month}-${year}`
          }
        ]
      });
    }
  }
	};
	
  // Increase quantity
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
		<div className=" flex flex-col lg:flex-row md:flex-row self-center gap-10 justify-between items-center bg-white p-4 rounded-lg shadow-lg max-w-3xl mt-40">
			
      {/* Left Side - Product Image */}
      <div className="w-2/3 md:w-1/2 lg:w-1/2 ">
        <img 
          src={pic25} 
          alt="Product" 
          className="rounded-lg w-full h-auto object-cover" 
        />
      </div>

      {/* Right Side - Product Details */}
			<div className=" w-2/3 md:w-1/2 lg:w-1/2 flex flex-col justify-between">
				
        {/* Product Name */}
        <h1 className="text-2xl font-bold mb-2">Product Name</h1>
        
        {/* Vendor Name */}
        <p className="text-sm text-gray-500 mb-4">Vendor: Femi</p>
        
				{/* Size Selector */}
        <label htmlFor="size" className="font-medium text-gray-700 mb-2">
          Size:
        </label>
        <select 
          id="size" 
					className="p-2 border rounded-md mb-4"
					onChange={(e) => {
						setPrice(e.target.value)
						setName(prices.indexOf(Number(e.target.value)))
					}}
        >
					<option key={0} value={prices[0]}>{sizes[0]}</option>
					<option key={1} value={prices[1]}>{sizes[1]}</option>
					<option key={2} value={prices[2]}>{sizes[2]}</option>
					<option key={3} value={prices[3]}>{sizes[3]}</option>
				</select>
				
				{/* Price */}
				<span><span></span>Price : <span></span>{price*quantity}</span>
        <p className="text-sm text-gray-500 mb-4">Vendor: Femi</p>

        {/* Quantity Selector */}
        <div className="w-full flex  mb-4">
          <button 
            onClick={decreaseQuantity} 
            className="px-3 py-2 bg-gray-200 rounded-l-md text-lg"
          >
            -
          </button>
          <input 
            type="text" 
            value={quantity} 
            readOnly 
            className="w-12 text-center border-t border-b py-2"
          />
          <button 
            onClick={increaseQuantity} 
            className="px-3 py-2 bg-gray-200 rounded-r-md text-lg"
          >
            +
          </button>
        </div>

        {/* Order Now Button */}
        <button 
					className=" bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
					onClick={handleOrder}
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default ProductPurchase;
