import React from 'react';

const PopupComponent = ({ htmlContent }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default PopupComponent;
