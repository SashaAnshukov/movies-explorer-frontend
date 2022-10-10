function Popup({isOpen, onClose, info}) {

    return (
        <div className= {`popup ${isOpen ? 'popup_visible' : ''} `}> 
        <div className="popup__overlay"></div>
            <div className="popup__container">
                <button id="closeButton" type ="button" aria-label="close" onClick={onClose}
                    className="popup__close-button opacity-buttons">
                </button>
                <div >
                    <img
                        className='popup__infoToolTip_image'
                        src={info.image}
                        alt={info.text}
                    />
                    <p className='popup__infoToolTip_text'>{info.text}</p>
                </div>
            </div>
        </div>
    );
}

export default Popup;