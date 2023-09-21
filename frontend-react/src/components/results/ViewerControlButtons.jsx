const ViewerControlButtons = (props) => {
    return (
        <div style={{display: "flex", justifyContent: "right"}}>
            <div>
                <div class="dropdown mx-1" data-toggle="tooltip" data-placement="top" title="Molecular representation">
                    <button class="btn btn-outline-dark btn-sm dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">cartoon</button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <button class="dropdown-item" type="button" onclick="select_repr('cartoon')">cartoon</button>
                    <button class="dropdown-item" type="button" onclick="select_repr('licorice')">licorice</button>
                    <button class="dropdown-item" type="button" onclick="select_repr('surface')">surface 1</button>
                    <button class="dropdown-item" type="button" onclick="select_repr('surface+cartoon')">surface 2</button>
                    </div>
                </div>
            </div>
            <div>
                <div class="dropdown mx-1" data-toggle="tooltip" data-placement="top" title="Molecular representation">
                    <button class="btn btn-outline-dark btn-sm dropdown-toggle" type="button" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">color</button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu3">
                    <button class="dropdown-item" type="button" onclick="select_color('uniform')">uniform</button>
                    <button class="dropdown-item" type="button" onclick="select_color('chain')">by chain</button>
                    </div>
                </div>
            </div>
            <div>
                <button class="btn btn-outline-dark btn-sm mx-1" onClick={props.handleBackgroundButton} data-toggle="tooltip" data-placement="top" title="Background color" >
                    <span>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-back" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z"/>
                        </svg>
                    </span>
                </button>	
            </div>
            <div>
                <button class="btn btn-outline-dark btn-sm mx-1" data-toggle="modal" data-target="#modal-control">
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