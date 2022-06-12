import React from 'react';

const ProgressBar = ({ completeColor, completed, titleBar1, titleBar2, spanBar1, spanBar2 }) => {


    const fillerStyles = {
        width: `${completed}%`,
        backgroundColor: completeColor,
    }
    
    const fillerStyles2 = {
        width: `${'100' - completed}%`,
    }

    const fillerStyles3 = {
        width: `${completed}%`,
    }

    return (
        <div>
            <div className="ProgressBar">
                <div style={fillerStyles}>
                    <p className="ProgressBar__text">{titleBar1}</p>
                </div>
                <div style={fillerStyles2}>
                    <p className="ProgressBar__text">{titleBar2}</p>
                </div>
            </div>
            <div className="ProgressBar">
                <div style={fillerStyles3}>
                    <span className="ProgressBar__span">{spanBar1}</span>
                </div>
                <div style={fillerStyles2}>
                    <span className="ProgressBar__span">{spanBar2}</span>
                </div>
            </div>
            
            
        </div>
    );
};

export default ProgressBar;