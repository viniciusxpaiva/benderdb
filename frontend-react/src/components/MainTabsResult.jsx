export default function MainTabsResult() {
    return (
        <div class="row d-block m-0">
            <nav>
                <div class="nav nav-tabs nav-fill bg-light" role="tablist">
                    <a class="nav-item nav-link active" id="predictor-Summary" data-toggle="tab" href="#nav-Summary" role="tab" aria-controls="nav-Summary" aria-selected="false">Summary</a>
                    <a class="nav-item nav-link" id="predictor-tmp" data-toggle="tab" href="#nav-tmp" role="tab" aria-controls="nav-tmp" aria-selected="false">tmp</a>
                </div>
            </nav>
            <div class="tab-content">
                <div class="tab-pane fade active show" id="nav-Summary" role="tabpanel" aria-labelledby="predictor-Summary">
                </div>
                <div class="tab-pane fade" id="nav-TMP" role="tabpanel" aria-labelledby="predictor-TMP">
                    // Row for each predictor
                    <div class="row">
                        // Table of residues
                        <div class="col-md-6">
                            <div class="card mx-0" id="card-results">
                                <div class="card-header color-dark text-white">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <span class="align-middle">RESULTS TMP</span>
                                        </div>
                                        <div class="col-md-6 ">
                                            <a class="btn btn-outline-light btn-sm float-right" role="button" href="{{url_for('home')}}" data-toggle="tooltip" data-placement="top" title="Download results" >
                                                rs.get_svg("download")
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body p-0 b-0" style="height: 415px;">
                                    // Residues clustered
                                    <div class="container d-block p-0" id="cl-tab">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <nav>
                                                    <div class="nav nav-tabs nav-fill bg-light" role="tablist">
                                                        <a class="nav-item nav-link active" id="pocket-TMP" data-toggle="tab" href="#nav-TMP-TMP" role="tab" aria-controls="nav-TMP-TMP" aria-selected="true" onclick="focusPocket('{{pdb}}', {{pockets[p_num]}})" >Cluster TMP</a>
                                                    </div>
                                                </nav>
                                                <div class="tab-content">
                                                    <div class="tab-pane fade active show" id="nav-TMP-TMP" role="tabpanel" aria-labelledby="pocket-TMP">
                                                        rs.create_table(pdb, pockets[p_num])
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        // Viewer
                        <div class="col-md-6">
                            <div>
                                <h1>VIEWER</h1>
                            </div>
                        </div>
                    </div>
                    // End of predictors row
                </div>
            </div> 
        </div>
    )
}