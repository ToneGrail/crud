import {Link} from "react-router-dom";
import {formattedDate} from "../Helper/Utilities";

const CrudBrowseDetail = ({crud, updDeleteStatus}) => {
    return (
        <tr>
            <td>
                <input type={crud.id === "" ? "hidden" : "checkbox"}
                       name="cbxDelete" id="cbxDelete"
                       onChange={event => updDeleteStatus(crud, event.currentTarget.checked)}
                />

            </td>
            <td>

                <Link to={{pathname:"/CrudEditForm", state:{crud:crud}}}>{crud.id}</Link>
                
            </td>
            <td>&nbsp;</td>
            <td>
                {crud.description !== "DESCRIPTION" ? crud.description : <b>{crud.description}</b>}
            </td>
            <td>&nbsp;</td>
            <td align="center">
                {crud.dte !== "DATE" ? formattedDate(crud.dte) : <b>{crud.dte}</b>}
            </td>
            <td>&nbsp;</td>
            <td align="center">
                {crud.tme !== "TIME" ? crud.tme : <b>{crud.tme}</b>}
            </td>
            <td>&nbsp;</td>
            <td align="right">
                {crud.qty !== "QUANTITY" ? crud.qty : <b>{crud.qty}</b>}
            </td>
        </tr>
    )
};

export default CrudBrowseDetail;
