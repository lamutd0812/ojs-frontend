import React from 'react';

const CustomInput = ({ value, onClick }) => {
    return (
        <div className="badge-ol badge-ol-secondary badge-outlined pl-3 pr-3 pt-1 pb-1" onClick={onClick}>
            {value}
        </div>
    );
};

export default CustomInput;