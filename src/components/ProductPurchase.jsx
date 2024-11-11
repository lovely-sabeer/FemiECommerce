import React, { useState } from 'react';
import pic25 from "../assets/pic25.webp";
import { auth } from '../config';
import AddressModal from './AddressModal';

const ProductPurchase = () => {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(100);
  const [name, setName] = useState(0);
  const prices = [100, 200, 300, 400];
  const user = auth.currentUser;
  const sizes = ["L - 280mm (12 Pads)", "XL - 320mm (10 Pads)", "XXL - 410mm (5 Pads)", "Panty Liner - 180mm (30 Pieces)"];

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open the modal
  const openModal = () => {
    if (!user) {
      alert("Please log in to place an order.");
      return;
    }
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
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
    <div className="flex flex-col lg:flex-row md:flex-row mt-28  self-center gap-10 justify-between items-center bg-white p-4 rounded-lg shadow-lg max-w-3xl">

      {/* Left Side - Product Image */}
      <div className="w-2/3 md:w-1/2 lg:w-1/2 ">
        <img 
          src={pic25} 
          alt="Product" 
          className="rounded-lg w-full h-auto object-cover" 
        />
      </div>

      {/* Right Side - Product Details */}
      <div className="w-2/3 md:w-1/2 lg:w-1/2 flex flex-col justify-between">
        
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
            setPrice(prices[e.target.selectedIndex]);
            setName(e.target.selectedIndex);  // Index correlates to sizes and prices
          }}
        >
          {sizes.map((size, index) => (
            <option key={index} value={prices[index]}>{size}</option>
          ))}
        </select>

        {/* Quantity Selector */}
        <div className="w-full flex mb-4">
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
        
        {/* Price */}
        <span>Price: {price * quantity}</span>

        {/* Order Now Button */}
        <button 
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
          onClick={openModal}
        >
          Order Now
        </button>
      </div>

      {/* Render the Address Modal */}
      <AddressModal
        isOpen={isModalOpen}
        onClose={closeModal}
        user={user}
        sizes={sizes}
        quantity={quantity}
        price={price}
        name={name}
      />
    </div>
  );
};

export default ProductPurchase;
