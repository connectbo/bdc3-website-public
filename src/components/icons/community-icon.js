import React from "react";
import PropTypes from "prop-types";

export const CommunityIcon = ({ size, fill, ...rest }) => {
  return (
    <svg
      {...rest}
      fill={fill}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 134.8 110.6"
    >
      <path d="M23.2,50.2c0-7.2,2.4-14,6.7-19.8C13.9,35.5,2.6,47.8,2.6,62c0,13.3,9.9,24.9,24.3,30.6L18.2,103L39,95.7 c2.6,0.4,5.2,0.6,7.9,0.6c9,0,17.3-2.1,24.3-5.6C44.3,88.9,23.2,71.5,23.2,50.2z" />
      <path d="M131.4,48.6C131.4,26.2,107.9,8,78.9,8C59.2,8,42,16.4,33,28.8c-4.3,5.9-6.7,12.6-6.7,19.8c0,21.3,21.1,38.7,48,40.5 c1.5,0.1,3,0.2,4.5,0.2c8.9,0,17.3-1.7,24.6-4.7l19.3,11l-9.2-16.4C124.5,71.7,131.4,60.8,131.4,48.6z M62.8,54.9 c-2.3,0-4.2-1.9-4.2-4.2c0-2.3,1.9-4.2,4.2-4.2c2.3,0,4.2,1.9,4.2,4.2C67,53,65.1,54.9,62.8,54.9z M78.6,54.9 c-2.3,0-4.2-1.9-4.2-4.2c0-2.3,1.9-4.2,4.2-4.2c2.3,0,4.2,1.9,4.2,4.2C82.8,53,80.9,54.9,78.6,54.9z M94.4,54.9 c-2.3,0-4.2-1.9-4.2-4.2c0-2.3,1.9-4.2,4.2-4.2c2.3,0,4.2,1.9,4.2,4.2C98.6,53,96.8,54.9,94.4,54.9z" />
    </svg>
  );
};

CommunityIcon.propTypes = {
  size: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired
};

CommunityIcon.defaultProps = {
  size: 24,
  fill: "#000"
};
