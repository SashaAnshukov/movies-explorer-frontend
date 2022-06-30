import React from 'react';

const ProgressBar = ({ completeColor, completed, titleBar1, titleBar2, spanBar1, spanBar2 }) => {


    const ProgressLineOne = {
        width: `${completed}%`,
        backgroundColor: completeColor,
    }
    
    const ProgressLineTwo = {
        width: `${'100' - completed}%`,
    }

    const ProgressLineSpanOne = {
        width: `${completed}%`,
    }

    return (
        <div>
            <div className="ProgressBar">
                <div style={ProgressLineOne}>
                    <p className="ProgressBar__text">{titleBar1}</p>
                </div>
                <div style={ProgressLineTwo}>
                    <p className="ProgressBar__text">{titleBar2}</p>
                </div>
            </div>
            <div className="ProgressBar">
                <div style={ProgressLineSpanOne}>
                    <span className="ProgressBar__span">{spanBar1}</span>
                </div>
                <div style={ProgressLineTwo}>
                    <span className="ProgressBar__span">{spanBar2}</span>
                </div>
            </div>
            
            
        </div>
    );
};

export default ProgressBar;