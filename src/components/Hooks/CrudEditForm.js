import { useHistory } from "react-router-dom";
import {useState} from "react";
import {fetchCrud} from "../Helper/Utilities";
import {formattedDate} from "../Helper/Utilities";

const CrudEditForm = (props) => {
    const paramCrud = props.location.state.crud;
    
    let history = useHistory();

    const [id, setId] = useState(paramCrud.id);
    const [description, setDescription] = useState(paramCrud.description);
    const [dte, setDte] = useState(paramCrud.dte === "" ? "" :formattedDate(paramCrud.dte));
    const [tme, setTme] = useState(paramCrud.tme);
    const [qty, setQty] = useState(paramCrud.qty);

    const onSubmit = event => {
        //console.log("onSubmit");
        event.preventDefault();

        if (!description) {
            alert("Description Required!");
            return;
        }

        if (!dte) {
            alert("Date Required!");
            return;
        }

        if (!tme) {
            alert("Time Required!");
            return;
        }

        if (!qty) {
            alert("Quantity Required!");
            return;
        }

        setId(paramCrud.id);

        updCrud({id:id,
                 description:description,
                 dte:Date.parse(dte),
                 tme:tme,
                 qty:qty});
    };

    const updCrud = async crud => {
        //console.log("updating json " + JSON.stringify(crud));

        let method = "PUT";
        if (crud.id === "")
            method = "POST";

        const response = await fetchCrud(method, JSON.stringify(crud), crud.id);
        if (!response.ok)
            console.log("error = ", response.statusText);

        history.push("/");
    };

    const goBack = () => {
        history.push("/");
    };

    return (
        <div>
            <center>
                <form name="CrudEditForm" id="CrudEditForm" onSubmit={onSubmit}>
                    <table>
                    <tbody>
                    <tr>
                        <td>{paramCrud.id !== "" && "ID"}</td>
                        <td style={{"textAlign": "right"}}>
                            <input type="hidden" name="id"
                                id="id" value={id}
                            />
                            {id}
                        </td>
                    </tr>
                    <tr>
                        <td>Description :</td>
                        <td>
                            <input type="text"
                                id="description"
                                value={description}
                                onChange={event => setDescription(event.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Date :</td>
                        <td>
                            <input type="text"
                                id="dte"
                                value={dte}
                                onChange={(event) => setDte(event.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Time :</td>
                        <td>
                            <input type="text"
                                id="tme"
                                value={tme}
                                onChange={event => setTme(event.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Quantity :</td>
                        <td>
                            <input type="text"
                                id="qty"
                                value={qty}
                                onChange={event => setQty(event.target.value)}
                            />
                        </td>
                    </tr>
                    </tbody>
                    </table>

                    <input type="submit" name="btnSave" id="btnSave" value="Submit"/>
                    <input type="button" name="btnBack" id="btnBack" value="Back" onClick={goBack}/>
                </form>
            </center>
        </div>
    );
};

export default CrudEditForm;