import ResidueRow from "./ResidueRow";

const ResidueTable = (props) => {
    return (
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
                    {props.resList.map((res, i) => (
				        <ResidueRow res={res}/>
			        ))}
                </tbody>
            </table>
        </div>
    );
}
export default ResidueTable;