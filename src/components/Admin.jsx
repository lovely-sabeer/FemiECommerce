import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";

function Admin() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/User/booking/allUser');
        console.log("Response from booking API:", response.data);

        
        const reversedBookings = response.data.reverse();
        setBookings(reversedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
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
                  <th className="px-4 py-2">Email ID</th>
                  <th className="px-4 py-2">Phone Number</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2">Size</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{booking.userName}</td>
                      <td className="border px-4 py-2">{booking.emailId}</td>
                      <td className="border px-4 py-2">{booking.phoneNumber}</td>
                      <td className="border px-4 py-2">{booking.price}</td>
                      <td className="border px-4 py-2">{booking.quantity}</td>
                      <td className="border px-4 py-2">{booking.address}</td>
                      <td className="border px-4 py-2">{booking.size}</td>
                      <td className="border px-4 py-2">{booking.date}</td>
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
