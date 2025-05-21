import React from 'react';
import { useNavigate } from 'react-router-dom';
import mainbtn from './FeatureButton.module.css'

const ActionButton = ({ label, link }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <div >
        <button className={mainbtn.main_btn} onClick={handleClick} >
            <span>{label}</span>
        </button>
    </div>
    
  );
};

export default ActionButton;