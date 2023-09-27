import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ModalControls from './ModalControls';
import '../../styles/ModalControls.css';

const MousePopup = (props) => (
  <Popup trigger={props.children} position="bottom center">
        <div>
          <div><h2>Mouse controls</h2></div>
          <ModalControls/>
        </div>
  </Popup>
)
export default MousePopup