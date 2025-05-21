import { Map, MapMarker } from 'react-kakao-maps-sdk';
import React, { useState, useRef } from 'react';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa6';
import classes from './PlaceMap.module.css';

const { kakao } = window;

const PlaceMap = ({ coordinate, places }) => {
  const mapRef = useRef(null);
  const [level, setLevel] = useState(5); // 지도 줌 레벨

  const handleLevel = (type) => {
    const map = mapRef.current;
    if (!map) return;

    if (type === 'increase') {
      map.setLevel(map.getLevel() + 1);
      setLevel(map.getLevel());
    } else {
      map.setLevel(map.getLevel() - 1);
      setLevel(map.getLevel());
    }
  };

  return (
    <div className={classes.map_container}>
      {coordinate && (
        <Map
          center={{ lat: coordinate.latitude, lng: coordinate.longitude }}
          level={level}
          zoomable={true}
          ref={mapRef}
          className={classes.map}
        >
          {/* 중심 마커 */}
          <MapMarker position={{ lat: coordinate.latitude, lng: coordinate.longitude }} />

          {/* API로 받은 장소 마커 */}
          {places.map((place) => (
            <MapMarker
              key={place.id}
              position={{ lat: place.latitude, lng: place.longitude }}
            >
              <div>{place.placeName}</div>
            </MapMarker>
          ))}

          {/* 줌 버튼 */}
          <div className={classes.button_container}>
            <div className={classes.plus_box} onClick={() => handleLevel('decrease')}>
              <FaPlus />
            </div>
            <div className={classes.minus_box} onClick={() => handleLevel('increase')}>
              <FaMinus />
            </div>
          </div>
        </Map>
      )}
    </div>
  );
};

export default PlaceMap;
