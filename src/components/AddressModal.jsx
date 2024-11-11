import React, { useState } from 'react';
import { db } from '../config';
import { setDoc, updateDoc, doc, arrayUnion, getDoc, collection, addDoc } from "firebase/firestore";

const AddressModal = ({ isOpen, onClose, user, sizes, quantity, price, name }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); 
  const day = String(today.getDate()).padStart(2, '0');
  
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
    nearbyLocation: ''
  });

  const handleOrder = async () => {
    if (!user) return; // Ensure the user is logged in
  
    try {
      const userOrderRef = doc(db, "userOrders", user.uid);
      const ordersRef = collection(db, "orders");

      const userOrderSnap = await getDoc(userOrderRef);

      const newOrder = {
        userName: address.name,
        phone: address.phone,
        address: `${address.street}, ${address.city}, ${address.district}, ${address.state} - ${address.pincode}. Near: ${address.nearbyLocation}`,
        userEmail: user.email,
        productName: sizes[name],
        quantity: quantity,
        totalPrice: price * quantity,
        Date: `${day}-${month}-${year}`,
        status: "Booked"
      };

      const docRef = await addDoc(ordersRef, newOrder);

      const userOrderData = {
        productId: docRef.id,
        Name: sizes[name],
        quantity: quantity,
        totalPrice: price * quantity,
        Date: `${day}-${month}-${year}`
      };

      if (userOrderSnap.exists()) {
        await updateDoc(userOrderRef, {
          orders: arrayUnion(userOrderData)
        });
      } else {
        await setDoc(userOrderRef, {
          orders: [userOrderData]
        });
      }

      console.log("Order placed successfully!");

    } catch (error) {
      console.error("Error placing order: ", error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleOrder();
    onClose();  // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-0 w-full bg-white mt-20 inset-0 z-50 flex justify-center items-center">
      <div className=" absolute top-0 bg-white p-6 rounded-lg w-full max-w-lg mx-4 md:mx-auto ">
        <h2 className="text-2xl text-center font-bold mb-4">Enter Shipping Address</h2>
        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={address.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={address.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Street */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Street</label>
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* City */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* District */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">District</label>
            <input
              type="text"
              name="district"
              value={address.district}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* State */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">State</label>
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Pincode */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Nearby Location */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nearby Location</label>
            <input
              type="text"
              name="nearbyLocation"
              value={address.nearbyLocation}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
