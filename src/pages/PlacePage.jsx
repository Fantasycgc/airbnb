import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axiosInstance from '@/config/axiosClient.js';
// import { ROOMAPI } from "@/API/client/Booking/PhongThue.js";

import Spinner from '@/components/ui/Spinner';
import AddressLink from '@/components/ui/AddressLink';
import BookingWidget from '@/components/ui/BookingWidget';
import PlaceGallery from '@/components/ui/PlaceGallery';
import PerksWidget from '@/components/ui/PerksWidget';

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      return '';
    }

    setLoading(true);

    const getPlace = async () => {
      const { data } = await axiosInstance.get(`/phong-thue/${id}`);

      setPlace(data.content);
      setLoading(false);
    };
    getPlace();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!place) {
    return;
  }

  return (
    <div className="mt-4 overflow-x-hidden px-8 pt-20 ">
      <h1 className="text-3xl">{place.tenPhong}</h1>

      <AddressLink placeAddress={place.address} />
      <PlaceGallery place={place} />

      <div className="mt-8 mb-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
        <div className="">
          <div className="my-4 ">
            <h2 className="text-2xl font-semibold">Description</h2>
            {place.moTa}
          </div>
          Max number of guests: {place.khach}
    
          {/* <PerksWidget place={place?.perks} /> */}
          <div className="mt-4">
      <hr className="mb-5 border" />
      <p className="text-2xl font-semibold">What this place offers</p>

      <div className="mt-4 grid flex-col gap-4 lg:grid-cols-2 lg:justify-items-stretch lg:gap-4">
        <div className="flex gap-4">
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
              d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
            />
          </svg>
          <span className={`${place.wifi ? '' : 'line-through'}`}>
            Wifi
          </span>
        </div>
        <div className="flex gap-4">
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
              d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
          <span className={`${place.tivi ? '' : 'line-through'}`}>
            TV
          </span>
        </div>
        <div className="flex gap-4">
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
              d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            />
          </svg>
          <span
            className={`${place.doXe ? '' : 'line-through'}`}
          >
            Free parking spot
          </span>
        </div>

        <div className="flex gap-4">
        <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
  
            <rect x="3" y="6" width="18" height="8" rx="2" ry="2" stroke="currentColor" />
  

            <path d="M6 16c0 1.5-1 2-1 3s1 1.5 1 2" />
            <path d="M12 16c0 1.5-1 2-1 3s1 1.5 1 2" />
            <path d="M18 16c0 1.5-1 2-1 3s1 1.5 1 2" />
            
          
            <line x1="6" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="1" />
          </svg>
          <span className={`${place.dieuHoa ? '' : 'line-through'}`}>
            Air Condition
          </span>
        </div>
        <div className="flex gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
         className="h-6 w-6"
        >
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" stroke="currentColor" />
          <circle cx="12" cy="12" r="5" stroke="currentColor" />
          <circle cx="7" cy="5" r="1" fill="currentColor" />
          <circle cx="10" cy="5" r="1" fill="currentColor" />
        </svg>
          <span className={`${place.mayGiat ? '' : 'line-through'}`}>
            Washing Machine
          </span>
        </div>
        <div className="flex gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          class="h-6 w-6"
        >
          <rect x="3" y="3" width="18" height="14" rx="2" ry="2" stroke="currentColor" />

          <circle cx="7" cy="8" r="2" stroke="currentColor" />
          <circle cx="17" cy="8" r="2" stroke="currentColor" />
          <circle cx="7" cy="14" r="2" stroke="currentColor" />
          <circle cx="17" cy="14" r="2" stroke="currentColor" />

          <circle cx="5" cy="19" r="1" fill="currentColor" />
          <circle cx="19" cy="19" r="1" fill="currentColor" />

        </svg>
          <span className={`${place.bep ? '' : 'line-through'}`}>
            Kitchen
          </span>
        </div>
      <div className="flex gap-4">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
          <rect x="3" y="5" width="18" height="14" rx="2" ry="2" stroke="currentColor" fill="lightblue" />  
          <path d="M5 9 L 7 7 L 9 9" stroke="currentColor" strokeWidth="1" />  
          <path d="M19 9 L 17 7 L 15 9" stroke="currentColor" strokeWidth="1" />  
          <path d="M12 12 C 14 12, 14 14, 12 14 C 10 14, 10 12, 12 12 Z" stroke="currentColor" fill="white" strokeWidth="1"/> 
          </svg>
          <span
            className={`${place.hoBoi ? '' : 'line-through'}`}
          >
            Pool
          </span>
        </div>
      </div>
      
      
    </div>
        </div>
      
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      {/* <div className="-mx-8 border-t bg-white px-8 py-8">
        <div>
          <h2 className="mt-4 text-2xl font-semibold">Extra Info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm leading-5 text-gray-700">
          {place.extraInfo}
        </div>
      </div> */}
    </div>
  );
};

export default PlacePage;
