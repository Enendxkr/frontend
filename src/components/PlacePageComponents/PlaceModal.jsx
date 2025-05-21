import React from 'react';
import ReactDOM from 'react-dom';
import classes from './PlaceModal.module.css'; // 스타일 별도 정의

const PlaceModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // 닫힌 상태면 아무것도 렌더링하지 않음

  return ReactDOM.createPortal(
    <div className={classes.modalOverlay}>
      <div className={classes.modalBackdrop} onClick={onClose} /> {/* 바깥 클릭으로 닫기 */}
      <div className={classes.modalContent}>
        {/* 닫기 버튼 */}
        <button className={classes.closeButton} onClick={onClose}>×</button>
        {children} {/* 내부에 필터폼, 키워드폼 등 렌더링 */}
      </div>
    </div>,
    document.getElementById('setTimeoutModal') // 포털을 이용해 body 외부에 렌더링
  );
};

export default PlaceModal;
