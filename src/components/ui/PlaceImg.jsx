import React from 'react';

const PlaceImg = ({ place, index = 0, className = null }) => {
  if (!place.hinhAnh?.length) {
    return '';
  }
  if (!className) {
    className = 'object-cover';
  }
  return <img src={place.hinhAnh[index]} alt="" className={className} />;
};

export default PlaceImg;
