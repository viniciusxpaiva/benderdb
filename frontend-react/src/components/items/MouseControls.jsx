const ModalControls = () => {
  return (
    <div className="card mx-0" id="card-results">
      <div
        className="card-header text-center d-flex align-items-center justify-content-center"
        style={{ height: "3.6rem", fontSize: "1.25rem" }}
      >
        Mouse Controls
      </div>

      <div className="card-body p-1 b-0">
        <div class="container">
          <div class="row mt-2">
            <div class="col-md-2">
              <img
                src="../img/mouseleftclick.jpg"
                alt=""
                style={{ width: "50px", height: "50px" }}
              />
            </div>
            <div class="col-md-10 p-0 d-flex align-items-center">
              <span class="font-weight-bold">
                <b>Left button click</b>: pick atom.
              </span>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-md-2">
              <img
                src="../img/mousescroll.jpg"
                alt=""
                style={{ width: "50px", height: "50px" }}
              />
            </div>
            <div class="col-md-10 p-0 d-flex align-items-center">
              <span class="font-weight-bold">
                <b>Middle button scroll</b>: zoom camera.
              </span>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-md-2">
              <img
                src="../img/mousemiddleclick.jpg"
                alt=""
                style={{ width: "50px", height: "50px" }}
              />
            </div>
            <div class="col-md-10 p-0 d-flex align-items-center">
              <span class="font-weight-bold">
                <b>Middle button click</b>: center camera on atom.
              </span>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-md-2">
              <img
                src="../img/mousemiddlehold.jpg"
                alt=""
                style={{ width: "50px", height: "50px" }}
              />
            </div>
            <div class="col-md-10 p-0 d-flex align-items-center">
              <span class="font-weight-bold">
                <b>Middle button hold and move</b>: zoom camera in and out.
              </span>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-md-2">
              <img
                src="../img/mouselefthold.jpg"
                alt=""
                style={{ width: "50px", height: "50px" }}
              />
            </div>
            <div class="col-md-10 p-0 d-flex align-items-center">
              <span class="font-weight-bold">
                <b>Left button hold and move</b>: rotate camera around center.
              </span>
            </div>
          </div>

          <div class="row mt-2 mb-2">
            <div class="col-md-2">
              <img
                src="../img/mouserighthold.jpg"
                alt=""
                style={{ width: "50px", height: "50px" }}
              />
            </div>
            <div class="col-md-10 p-0 d-flex align-items-center">
              <span class="font-weight-bold">
                <b>Right button hold and move</b>: translate camera in screen
                plane.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalControls;
