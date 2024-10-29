import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Namecontext } from "../App";

function Previous() {
  const { userList } = useContext(Namecontext);
  const [showPopup, setShowPopup] = useState(false);
  const [bookings, setBookings] = useState([]);

  const handleClick = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    if (userList._id || userList.uid) {
      const getBook = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/User/GetOrders/${userList._id}`);
          console.log("Previous Bookings Response:", response.data);

          if (Array.isArray(response.data) && response.data.length > 0) {
            setBookings(response.data);
          } else {
            setBookings([]);
            console.log("No previous bookings found for the user.");
          }
        } catch (error) {
          console.error("Error Fetching Previous bookings", error);
        }
      };
      getBook();
    } else {
      console.log("User ID not available");
    }
  }, [userList._id]);

  const handleClose = () => {
    setShowPopup(false);
  };
  const deleteItem = async (bookingId) => {
    if (!bookingId) {
      console.error("User ID is not available.");
      alert("User added item is Deleted");
      return;
    }
  
    const deletedBooking = bookings.find((booking) => booking._id === bookingId);
  
    try {
      await axios.delete(`http://localhost:3001/User/DeleteOrder/${userList._id}/${bookingId}`);
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
      console.log(`Booking with ID ${bookingId} deleted successfully.`);
      
      
      if (deletedBooking) {
        await sendCompletionNotification(deletedBooking, bookingId);
      } 
    } catch (error) {
      console.error("Error deleting booking", error);
    }
  };
  
  const sendCompletionNotification = async (bookingDetails, bookingId) => {
    try {
        const payload = {
            subject: "Order Deletion Notification",
            message: `Order with ID ${bookingId} has been deleted. Details:\n
                      Size: ${bookingDetails.size}\n
                      Price: ${bookingDetails.price}\n
                      Date: ${bookingDetails.date}\n
                      Quantity: ${bookingDetails.quantity}`,
            emailId: 'prasathsaran336@gmail.com', 
        };

        console.log("Sending notification with payload:", payload); 

        const response = await axios.post('http://localhost:3001/notify-admin', payload);

        if (response.status === 200) {
            console.log('Admin email notification sent successfully:', response.data);
        } else {
            console.error('Failed to send admin email notification');
        }
    } catch (error) {
        console.error('Error sending admin email notification:', error.response?.data || error.message);
    }
};



  
  return (
    <div className="flex justify-center -mt-14 lg:-mt-60 lg:ml-80 ">
      <div className="transform sm:-translate-y-16 lg:translate-y-32  flex justify-center lg:justify-start">
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-[#EC9C1F] hover:bg-gray-600 text-white font-normal transition duration-300 lg:ml-24 sm:ml-0"
        >
          View
        </button>
      </div>

      {showPopup && bookings.length > 0 && (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              X
            </button>
            <h2 className="text-xl font-bold mb-4">Previous Bookings</h2>
            <div className="overflow-y-auto max-h-64">
              {bookings.map((booking) => (
                <div key={booking._id} className="mb-4">
                  <p><strong>BookId:</strong> {booking.bookid || "No available BookId"}</p>
                  <p><strong>Size:</strong> {booking.size || "No description available"}</p>
                  <p><strong>Price:</strong> {booking.price || "Price not available"}</p>
                  <p><strong>Date:</strong> {booking.date || "No Date"}</p>
                  <p><strong>Quantity:</strong> {booking.quantity || "No Quantity"}</p>
                  <button
                    onClick={() => deleteItem(booking._id)}
                    className="px-3 py-1 bg-[#EC9C1F] hover:bg-gray-600 text-white font-normal transition duration-300 mt-5"
                  >
                    Delete
                  </button>
                  <hr className="my-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showPopup && bookings.length === 0 && (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              X
            </button>
            <h2 className="text-xl font-bold mb-4">No Previous Bookings</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Previous;
