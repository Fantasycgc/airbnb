import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AccountNav from '../components/ui/AccountNav';
import AddressLink from '../components/ui/AddressLink';
import BookingDates from '../components/ui/BookingDates';
import PlaceGallery from '../components/ui/PlaceGallery';
import Spinner from '../components/ui/Spinner';
import axiosInstance from '@/config/axiosClient.js';

const SingleBookedPlace = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState({});
  const [roomDetails, setRoomDetails] = useState({}); // State mới cho chi tiết phòng
  const [loading, setLoading] = useState(false);
  const [roomDetailsLoading, setRoomDetailsLoading] = useState(false); // Loading state cho chi tiết phòng
  const getBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/dat-phong/${id}`);
      console.log("data: ", data);

      // filter the data to get current booking
      // const filteredBooking = data.booking.filter(
      //   (booking) => booking.id === id,
      // );

       setBooking(data.content);
       if (data.content && data.content.maPhong) { // Kiểm tra maPhong tồn tại
        getRoomDetails(data.content.maPhong);
      }
   
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      setLoading(false);
    }
  };
  const getRoomDetails = async (maPhong) => {
    try {
      setRoomDetailsLoading(true);
      const { data } = await axiosInstance.get(`/phong-thue/${maPhong}`); // API endpoint cho chi tiết phòng
     
      setRoomDetails(data.content); // Giả sử API trả về data.content là thông tin chi tiết phòng
      console.log("Room Details:", data.content);
    } catch (error) {
      console.error('Error getting room details:', error);
    } finally {
      setRoomDetailsLoading(false);
    }
  };
  useEffect(() => {
    getBookings();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <AccountNav />
      {booking.id ?  (
        <div className="p-4">
          <h1 className="text-3xl">{booking?.place?.title}</h1>     
          <div className="my-6 flex flex-col items-center justify-between rounded-2xl bg-gray-200 p-6 sm:flex-row">
            <div className=" ">
              <h2 className="mb-4 text-2xl md:text-2xl">
                Your booking information
              </h2>
              {/* <BookingDates booking={booking} /> */}
                   {/* Truyền dữ liệu vào component BookingDates */}
          {booking && roomDetails && (
            <BookingDates booking={booking} roomDetails={roomDetails} />
          )}
              
            </div>
            {/* <div className="mt-5 w-full rounded-2xl bg-primary p-6 text-white sm:mt-0 sm:w-auto">
              <div className="hidden md:block">Total price</div>
              <div className="flex justify-center text-3xl">
                <span>₹{booking?.price}</span>
              </div>
            </div> */}
          </div>
          {/* <PlaceGallery place={booking?.place} /> */}
        </div>
      ) : (
        <h1> No data</h1>
      )}
    </div>
  );
};

export default SingleBookedPlace;
