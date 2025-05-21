import React, { useEffect, useState } from 'react';
import Header from "../components/LayoutComponents/Header";
import Footer from "../components/LayoutComponents/Footer";

import PlaceMap from '../components/PlacePageComponents/PlaceMap';
import EmergencyButton from '../components/PlacePageComponents/EmergencyForm';
import FilterForm from '../components/PlacePageComponents/FilterForm';
import KeywordForm from '../components/PlacePageComponents/KeywordForm';
import Modal from '../components/PlacePageComponents/PlaceModal';
import classes from './PlacePage.module.css';

const DEFAULT_COORDINATE = { latitude: 37.3211, longitude: 127.1325 };

const PlacePage = () => {
  const [center, setCenter] = useState(DEFAULT_COORDINATE);
  const [places, setPlaces] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isKeywordOpen, setIsKeywordOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(true); // 최초 진입 시 모달 열림

  // 사용자가 위치 허용을 클릭했을 때
  const handleAllowLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter({ latitude, longitude });
        setIsLocationModalOpen(false); // 모달 닫기
      },
      (error) => {
        console.warn("위치 권한 거부됨. 기본 위치 사용");
        setIsLocationModalOpen(false);
      }
    );
  };

  // 사용자가 거부를 클릭했을 때
  const handleDenyLocation = () => {
    setCenter(DEFAULT_COORDINATE); // 기본 좌표 유지
    setIsLocationModalOpen(false);
  };

  return (
    
    <div className={classes.map_page_wrapper}>

      <Header/>
      {/* 위치 권한 요청 모달 */}
      <Modal isOpen={isLocationModalOpen} onClose={() => {}}>
        <div className={classes.modalContent}>
          <h3>위치 정보 제공</h3>
          <p>현재 위치를 사용하여 주변 장소를 검색하시겠습니까?</p>
          <button onClick={handleAllowLocation}>예, 위치 사용</button>
          <button onClick={handleDenyLocation}>아니요, 기본 위치 사용</button>
        </div>
      </Modal>

      <div className={classes.button_panel}>
        <EmergencyButton onSetPlaces={setPlaces} />
        <button onClick={() => setIsFilterOpen(true)}> 필터 선택</button>
        <button onClick={() => setIsKeywordOpen(true)}> 주소 입력</button>
      </div>

      <PlaceMap coordinate={center} places={places} />

      <Modal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
        <FilterForm
          onSetPlaces={(data) => {
            setPlaces(data);
            setIsFilterOpen(false);
          }}
        />
      </Modal>

      <Modal isOpen={isKeywordOpen} onClose={() => setIsKeywordOpen(false)}>
        <KeywordForm
          onSelectPlace={(place) => {
            setCenter({ latitude: place.latitude, longitude: place.longitude });
            setPlaces([place]);
            setIsKeywordOpen(false);
          }}
        />
      </Modal>
      <Footer/>
    </div>
  );
};

export default PlacePage;
