import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ModalControls from './ModalControls';
import '../../../styles/ModalControls.css';

const MousePopup = (props) => (
  <Popup className='custom-popup' trigger={props.children} position="bottom center">
        <div className="container text-center mt-3">
          <div className="mb-4 pb-2 border-bottom"><h4>Mouse controls</h4></div>
          <ModalControls/>
        </div>
  </Popup>
)
export default MousePopup