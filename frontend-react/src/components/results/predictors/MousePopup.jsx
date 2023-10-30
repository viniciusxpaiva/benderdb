import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ModalControls from './ModalControls';

const popupStyle = {
    width: '80%',
    maxWidth: '600px',
    height: '40vh',
    overflowY: 'auto',
    overflowX: 'hidden', // Add this line to enable horizontal scrollbar when needed
};

const MousePopup = (props) => (

  
  <Popup className='custom-popup' trigger={props.children} position="left" contentStyle={popupStyle}>
        <div className="container text-center mt-3">
          <div className="mb-4 pb-2 border-bottom"><h4>Mouse controls</h4></div>
          <ModalControls/>
        </div>
  </Popup>
)
export default MousePopup