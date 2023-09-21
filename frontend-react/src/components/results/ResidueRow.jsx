const ResidueRow = (props) => {
    return (
        <tr>
            <td class="text-center">{props.res[1]}</td>
            <td class="text-center">{props.res[2]}</td>
            <td class="text-center">{props.res[0]}</td>
        
            <td>
                <div class="row justify-content-center">
                    <button type="button" data-toggle="tooltip" data-placement="top" title="Focus on this residue">
                        Look
                    </button>
                </div>
            </td>
        </tr>
    )
}
export default ResidueRow;