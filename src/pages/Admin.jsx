import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { db } from '../config';
import { getDocs, collection } from "firebase/firestore";

function Admin() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const ordersRef = collection(db, "orders");
        const querySnapshot = await getDocs(ordersRef);
        setBookings(querySnapshot.docs.map(doc => doc.data()));
        console.log(bookings);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-[#EC9C1F]">
        <Navbar />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mt-8">Admin Dashboard</h2>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
          
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">User Name</th>
                  <th className="px-4 py-2 border">Phone Number</th>
                  <th className="px-4 py-2 border">Product Name</th>
                  <th className="px-4 py-2 border">Quantity</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">{booking.userName}</td>
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
                    <td colSpan="7" className="text-center py-4">No bookings available.</td>
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
