

const ModalControls = () => {
    return (
        <div class="container">
        <div class="row">
            <div class="col-md-2">
            <img src="img/mouselefthold.jpg" alt="" style={{width:"50px", height:"50px"}}/>
            </div>
            <div class="col-md-10">
            <span class="font-weight-bold">Left button hold and move:</span> rotate camera around center.
            </div>
        </div>

        <div class="row">
            <div class="col-md-2">
            <img src="img/mouserighthold.jpg" alt="" style={{width:"50px", height:"50px"}}/>
            </div>
            <div class="col-md-10">
            <span class="font-weight-bold">Right button hold and move:</span> translate camera in screen plane.
            </div>
        </div>

        <div class="row">
            <div class="col-md-2">
            <img src="img/mousescroll.jpg" alt="" style={{width:"50px", height:"50px"}}/>
            </div>
            <div class="col-md-10">
            <span class="font-weight-bold">Middle button scroll:</span> zoom camera.
            </div>
        </div>

        <div class="row">
            <div class="col-md-2">
            <img src="img/mousemiddlehold.jpg" alt="" style={{width:"50px", height:"50px"}}/>
            </div>
            <div class="col-md-10">
            <span class="font-weight-bold">Middle button hold and move:</span> zoom camera in and out.
            </div>
        </div>

        <div class="row">
            <div class="col-md-2">
            <img src="img/mouseleftclick.jpg" alt="" style={{width:"50px", height:"50px"}}/>
            </div>
            <div class="col-md-10">
            <span class="font-weight-bold">Left button click:</span>  pick atom.
            </div>
        </div>

        <div class="row">
            <div class="col-md-2">
            <img src="img/mousemiddleclick.jpg" alt="" style={{width:"50px", height:"50px"}}/>
            </div>
            <div class="col-md-10">
            <span class="font-weight-bold">Middle button click:</span> center camera on atom.
            </div>
        </div>

        </div>
    )
}
export default ModalControls;