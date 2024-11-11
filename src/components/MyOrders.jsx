import React, { useEffect, useState } from 'react';
import logo from "../assets/pic25.webp";
import { auth, db } from '../config';
import { getDoc, doc } from "firebase/firestore";

const MyOrders = () => {
  const user = auth.currentUser;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (user) {
        // Reference to the user's order document
        const userOrderRef = doc(db, "userOrders", user.uid);

        try {
          // Fetch the document snapshot
          const userOrderSnap = await getDoc(userOrderRef);

          if (userOrderSnap.exists()) {
            // Document exists, retrieve the 'orders' array
            const userOrders = userOrderSnap.data().orders;
            setOrders(userOrders);
            console.log(userOrders);
          } else {
            // Document does not exist
            console.log("No orders found for this user.");
          }
        } catch (error) {
          console.error("Error fetching user orders:", error);
        }
      }
    };

    fetchUserOrders();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto p-4 mt-16">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-lg"
          >
            {/* Product Image */}
            <img
              src={logo}
              alt="Product"
              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mb-4 md:mb-0"
            />

            {/* Order Info */}
            <div className="flex flex-col w-full md:w-1/2 text-center md:text-left mb-4 md:mb-0">
              <h2 className="font-bold text-lg">{order.Name}</h2>
              <p className="text-gray-600">Quantity: {order.quantity}</p>
              <p className="text-gray-500 text-sm">Ordered on: {order.Date}</p>
            </div>

            {/* Action Button */}
            <div className="w-full md:w-auto text-center">
              {order.status === 'success' ? (
                <button className="bg-green-500 text-white px-4 py-2 rounded-md w-full md:w-auto">
                  Order Again
                </button>
              ) : (
                <button className="bg-red-500 text-white px-4 py-2 rounded-md w-full md:w-auto">
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
