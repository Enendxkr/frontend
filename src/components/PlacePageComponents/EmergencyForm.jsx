import React from 'react';
import { getOpenPlacesByCategoryService } from '../../api/PlaceService';
import { toast } from 'react-toastify';
import classes from './EmergencyForm.module.css';

const EmergencyForm = ({ onSetPlaces }) => {
  const handleClick = async () => {
    try {
      const response = await getOpenPlacesByCategoryService("동물병원");
      if (response.success && response.data?.places?.length > 0) {
        onSetPlaces(response.data.places);
        toast.success(`운영 중인 동물병원 ${response.data.places.length}곳 표시 중`);
      } else {
        toast.warn("운영 중인 동물병원이 없습니다.");
        onSetPlaces([]);
      }
    } catch (error) {
      toast.error("동물병원 정보를 불러오지 못했습니다.");
    }
  };

  return (
    <button onClick={handleClick} className={classes.emergencyButton}>
      응급상황 (동물병원 찾기)
    </button>
  );
};

export default EmergencyForm;
