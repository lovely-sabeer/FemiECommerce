import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { db } from '../config';
import { getDocs, collection } from "firebase/firestore";

function Admin() {
  const [bookings, setBookings] = useState([]);

	// const fetchBookings = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3001/User/booking/allUser');
  //       console.log("Response from booking API:", response.data);

        
  //       const reversedBookings = response.data.reverse();
  //       setBookings(reversedBookings);
  //     } catch (error) {
  //       console.error('Error fetching bookings:', error);
  //     }
  //   };
  
	const fetchBookings = async () => {
		try {
    // Reference to the 'orders' collection
    const ordersRef = collection(db, "orders");

    // Fetch all documents from the collection
    const querySnapshot = await getDocs(ordersRef);

    // Extract the order data from the querySnapshot
			// const allOrders = querySnapshot.docs.map(doc => doc.data());
			setBookings(querySnapshot.docs.map(doc => doc.data()));
			console.log(bookings)
    // console.log("All Orders:", allOrders);
    // return allOrders; // You can return this data to display in the UI
  } catch (error) {
    console.error("Error fetching orders: ", error);
  }
	}
	
	useEffect(() => {
		fetchBookings();
		console.log(bookings);
  }, []);

  return (
    <div>
      <div className="-mt-10 bg-[#EC9C1F]">
        <Navbar />
      </div>
      <div className="absolute bg-white"></div>

      <div className="mt-10 p-8 relative bg-white">
        <h2 className="text-xl font-bold mt-20">Admin Dashboard</h2>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
          <div>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  {/* <th className="px-4 py-2">User Name</th> */}
                  <th className="px-4 py-2">Email ID</th>
                  {/* <th className="px-4 py-2">Phone Number</th> */}
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Size</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking, index) => (
                    <tr key={index}>
                      {/* <td className="border px-4 py-2">{booking.userName}</td> */}
                      <td className="border px-4 py-2">{booking.userEmail}</td>
                      {/* <td className="border px-4 py-2">{booking.phoneNumber}</td> */}
                      <td className="border px-4 py-2">{booking.totalPrice}</td>
                      <td className="border px-4 py-2">{booking.quantity}</td>
                      <td className="border px-4 py-2">{booking.productName}</td>
                      <td className="border px-4 py-2">{booking.Date}</td>
                      <td className="border px-4 py-2">{booking.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">No bookings available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
