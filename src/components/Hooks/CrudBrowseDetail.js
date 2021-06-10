//import {useState} from "react";

const CrudBrowseDetail = ({row, updDeleteStatus}) => {
    //const [cbxDelete, setCbxDelete] = useState("");

    return (
        <tr>
            <td>
                <input type={row.id === "" ? "hidden" : "checkbox"}
                       name="cbxDelete" id="cbxDelete"
                       onChange={event => updDeleteStatus(row, event.currentTarget.checked)}
                />

            </td>
            <td>
                <input type="hidden" name="id" id="id" value={row.id}/>
                <input type="hidden" name="deleteStatus" id="deleteStatus" value={row.deleteStatus}/>
                {row.id}
            </td>
            <td>&nbsp;</td>
            <td>{row.description}</td>
        </tr>
    )
};

export default CrudBrowseDetail;
