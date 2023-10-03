const BSiteContent = (props) => {
    
    return (
    <div className="tab-content">
        {props.predictor.map((p, i) =>(
            <div className={"tab-pane fade" + (props.bindSiteTab === props.index ? " active show" : "")}  id={"nav-" + props.index} role="tabpanel" aria-labelledby={"bindSite-" + props.index}>
                <div class="table-responsive">
                    <table class="table table-sm table-hover">
                        <thead class="bg-light">
                        <tr>
                            <th class="text-center">Residue</th>
                            <th class="text-center">Number</th>
                            <th class="text-center">Chain</th>
                            <th class="text-center">Look at</th>
                        </tr>
                        </thead>
                        
                        <tbody>
                            {p.map((res, j) => (
                                <tr>
                                    <td class="text-center">{res[1]}</td>
                                    <td class="text-center">{res[2]}</td>
                                    <td class="text-center">{res[0]}</td>
                                    {console.log(res)}
                                
                                    <td>
                                        <div class="row justify-content-center">
                                            <button type="button" onClick={() => props.focusResidue(props.stage, res[2], res[0])} data-toggle="tooltip" data-placement="top" title="Focus on this residue">
                                                Look
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        ))}
    </div>
    )
}
export default BSiteContent;