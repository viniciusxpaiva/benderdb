const Summary = (props) => {
    return (
    <div className="card mt-4" id="card-results">
        <div className="card-header color-dark text-white">
            <div className="row">
                <div className="col-md-12">
                    <span className="align-middle">{props.title}</span>
                </div>
            </div>
        </div>
        {props.children}
    </div>
    )
}
export default Summary;