import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
// import axios from "axios";
import { db } from '../config';
import { getDocs, collection } from "firebase/firestore";

function Admin() {
	const [bookings, setBookings] = useState([]);
	// const [toggling, setToggling] = useState(true);

	
	
	useEffect(() => {
		const fetchBookings = async () => {
			try {
	    const ordersRef = collection(db, "orders");
	    const querySnapshot = await getDocs(ordersRef);
			setBookings(querySnapshot.docs.map(doc => doc.data()));
			console.log(bookings)
	  } catch (error) {
	    console.error("Error fetching orders: ", error);
	  }
		}
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
                  <th className="px-4 py-2">User Name</th>
                  {/* <th className="px-4 py-2">Email ID</th> */}
                  <th className="px-4 py-2">Phone Number</th>
                  <th className="px-4 py-2">Product Name</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{booking.userName}</td>
                      {/* <td className="border px-4 py-2">{booking.userEmail}</td> */}
                      <td className="border px-4 py-2">{booking.phone}</td>
                      <td className="border px-4 py-2">{booking.productName}</td>
                      <td className="border px-4 py-2">{booking.quantity}</td>
                      <td className="border px-4 py-2">{booking.totalPrice}</td>
                      <td className="border px-4 py-2">{booking.Date}</td>
                      <td className="border px-4 py-2">{booking.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4" >No bookings available.</td>
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
