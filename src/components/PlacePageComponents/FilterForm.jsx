import React, { useState } from 'react';
import { getPlacesByFilterService } from '../../api/PlaceService';
import { toast } from 'react-toastify';
import classes from './FilterForm.module.css';

const FilterForm = ({ onSetPlaces }) => {
  const [formData, setFormData] = useState({
    placeName: '',
    category: '',
    regionCode: '',
    isParking: false,
    isInside: false,
    isOutside: false,
  });

  const categories = ['동물병원', '반려동물용품', '여행지', '미용', '동물약국'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category) {
      toast.error('카테고리를 선택해주세요.');
      return;
    }

    const response = await getPlacesByFilterService(formData);
    if (response.success) {
      onSetPlaces(response.data.places);
    } else {
      toast.error('필터 검색 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.filterForm}>
      <div className={classes.formGroup}>
        <label htmlFor="placeName">Place Name</label>
        <input 
          type="text" 
          id="placeName" 
          name="placeName" 
          value={formData.placeName} 
          onChange={handleChange} 
          placeholder="Enter place name" 
          className={classes.inputField}
        />
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="category">Category <span className={classes.required}>*</span></label>
        <select 
          id="category" 
          name="category" 
          value={formData.category} 
          onChange={handleChange} 
          className={classes.inputField}
        >
          <option value="">Select a category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="regionCode">Region Code</label>
        <input 
          type="text" 
          id="regionCode" 
          name="regionCode" 
          value={formData.regionCode} 
          onChange={handleChange} 
          placeholder="Enter region code" 
          className={classes.inputField}
        />
      </div>
      <div className={classes.toggleGroup}>
        <label className={classes.toggleLabel}>
          <span>Parking</span>
          <input 
            type="checkbox" 
            name="isParking" 
            checked={formData.isParking} 
            onChange={handleToggle} 
            className={classes.toggleSwitch}
          />
        </label>
        <label className={classes.toggleLabel}>
          <span>Inside</span>
          <input 
            type="checkbox" 
            name="isInside" 
            checked={formData.isInside} 
            onChange={handleToggle} 
            className={classes.toggleSwitch}
          />
        </label>
        <label className={classes.toggleLabel}>
          <span>Outside</span>
          <input 
            type="checkbox" 
            name="isOutside" 
            checked={formData.isOutside} 
            onChange={handleToggle} 
            className={classes.toggleSwitch}
          />
        </label>
      </div>
      <button type="submit" className={classes.submitButton}>Submit</button>
    </form>
  );
};

export default FilterForm;
