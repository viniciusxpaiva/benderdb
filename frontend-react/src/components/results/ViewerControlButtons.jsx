import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const options = [
    'one', 'two', 'three'
  ];
const defaultOption = options[0];

const ViewerControlButtons = (props) => {
    return (
        <div style={{display: "flex", justifyContent: "right"}}>
            <div>
                <select className="btn btn-outline-dark btn-sm dropdown-toggle mx-1" onChange={() => {console.log(props.stage)}}>
                    <option value="cartoon">Cartoon</option>
                    <option value="licorice">Licorice</option>
                    <option value="surface1">Surface 1</option>
                    <option value="surface2">Surface </option>
                </select>
            </div>
            <div>
                <select className="btn btn-outline-dark btn-sm dropdown-toggle mx-1" onChange={(e) => {console.log(e.target.value)}}>
                    <option value="color">Color</option>
                    <option value="uniform">Uniform</option>
                    <option value="bychain">By Chain</option>
                </select>
            </div>
            <div>
                <button class="btn btn-outline-dark btn-sm mx-1" onClick={props.handleBackgroundColor} data-toggle="tooltip" data-placement="top" title="Background color" >
                    <span>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-back" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z"/>
                        </svg>
                    </span>
                </button>	
            </div>
            <div>
                <button class="btn btn-outline-dark btn-sm mx-1" onClick={props.handleRepresentation} data-toggle="modal" data-target="#modal-control">
                    <span data-toggle="tooltip" title="Mouse controls" >
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-mouse2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M3 5.188C3 2.341 5.22 0 8 0s5 2.342 5 5.188v5.625C13 13.658 10.78 16 8 16s-5-2.342-5-5.188V5.189zm4.5-4.155C5.541 1.289 4 3.035 4 5.188V5.5h3.5V1.033zm1 0V5.5H12v-.313c0-2.152-1.541-3.898-3.5-4.154zM12 6.5H4v4.313C4 13.145 5.81 15 8 15s4-1.855 4-4.188V6.5z"/>
                        </svg>
                    </span>
                </button>

            </div>
    </div>
    )
}
export default ViewerControlButtons;