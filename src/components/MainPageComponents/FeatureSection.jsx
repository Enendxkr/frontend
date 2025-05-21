import React from 'react';
import FeatureButton from '../MainPageComponents/FeatureButton';
import section from './FeatureSection.module.css'

const FeatureSection = ({ image, title, description, buttonLabel, buttonLink }) => {

  return (
    <div className={section.section}>
        <section >
            {image && (
                <img
                    src={image}
                    alt={`${title} 이미지`}
                    style={{ width: '800px', height: 'auto', marginBottom: '20px' }}
                />
            )}
            <h2>{title}</h2>
            <p>{description}</p>
            <FeatureButton label={buttonLabel} link={buttonLink} />
            <hr className={section.divider} />
        </section>
    </div>
    
  );
};

export default FeatureSection;