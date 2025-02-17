import React from 'react';
import { differenceInCalendarDays, format } from 'date-fns';

const BookingDates = ({ booking,roomDetails, className }) => {
  if (!booking || !roomDetails) { 
    return <div>Loading booking dates...</div>; 
  }
  return (
    <div className={'flex flex-col gap-4 ' + className}>
    <div className={'flex items-center gap-1 ' + className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        />
      </svg>
      {differenceInCalendarDays(
        new Date(booking.ngayDi),
        new Date(booking.ngayDen),
      )}
      nights:
      <div className="ml-2 flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
          />
        </svg>
        {format(new Date(booking.ngayDen), 'dd-MM-yyyy')} &rarr;{' '}
      </div>
      <div className="items- flex gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
          />
        </svg>
        {format(new Date(booking.ngayDi), 'dd-MM-yyyy')}
   
      </div>
      
      <div>
        
     </div>
      
    </div>
    <div className="mt-2 border rounded p-4">
        <div className="flex flex-col md:flex-row gap-4"> 
            <div className="md:w-1/2"> 
              <h3 className="text-lg font-semibold mb-2">Detail phòng</h3> 
              <p>Type: {roomDetails?.tenPhong || "N/A"}</p>
            </div>
            <div className="md:w-1/2"> 
              <h3 className="text-lg font-semibold mb-2">Image Room</h3> 
           
              {roomDetails.hinhAnh && roomDetails.hinhAnh.length > 0 ? (
                <div className="flex flex-wrap gap-2"> 
                
                    <img
                    src={`${roomDetails.hinhAnh}`}
                      className="w-24 h-24 object-cover rounded"
                    />
              
                </div>
              ) : (
                <p>No images available.</p>
              )}
            </div>
          </div>
      </div>
    </div>
  );
};

export default BookingDates;
