import React, { useState, useEffect, useRef } from 'react';
import { getPlacesByKeywordService } from '../../api/PlaceService';
import { motion, AnimatePresence } from 'framer-motion';
import classes from './KeywordForm.module.css';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};

const KeywordForm = ({ onSelectPlace }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }
      const response = await getPlacesByKeywordService(debouncedQuery);
      if (response.success) setResults(response.data.places);
    };
    fetch();
  }, [debouncedQuery]);

  return (
    <div className={classes.searchContainer}>
      <input
        className={classes.searchInput}
        placeholder="장소나 지역명을 검색하세요"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className={classes.resultsContainer}>
        <AnimatePresence>
          {results.map((place, idx) => (
            <motion.div
              key={place.id}
              className={classes.resultItem}
              onClick={() => onSelectPlace(place)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <div className={classes.placeName}>{place.placeName}</div>
              <div className={classes.regionCode}>{place.regionCode}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default KeywordForm;
