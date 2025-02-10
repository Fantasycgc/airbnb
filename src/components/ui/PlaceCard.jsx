import React from 'react';
import { Link } from 'react-router-dom';

const PlaceCard = ({ place }) => {
  const { id: placeId, hinhAnh:photos, tenPhong:tenphong,moTa:title, giaTien:price } = place;
  return (
    <Link to={`/place/${placeId}`} className="m-4 flex flex-col md:m-2 xl:m-0">
      <div className="card ">
        {photos?.[0] && (
          <img
            src={`${photos}`}
            className="h-4/5 w-full rounded-xl object-cover"
          />
        )}
        <h2 className="truncate font-bold">{tenphong}</h2>
        <h3 className="truncate text-sm text-gray-500">{title}</h3>
        <div className="mt-1">
          <span className="font-semibold">{price} / VND </span>
          per night
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;
