import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {fetchCrud} from "../Helper/Utilities";
import CrudBrowseDetail from "./CrudBrowseDetail";
import { useHistory } from "react-router-dom";

const CrudBrowseForm = () => {
    const [cruds, setCruds] = useState([]); // initialize table of line items to empty array

    let history = useHistory();

    useEffect(() => {
        const getCruds = async () => {
            const crudsFromServer = await fetchCruds();

            const crudArray = crudsFromServer.map(each => ({
                id : each.id,
                description : each.description,
                dte : each.dte,
                tme : each.tme,
                qty : each.qty,
                cbxDelete : "",
                deleteStatus : ""
            }));

            const headerRow = {id : "",
                               description : "DESCRIPTION",
                               dte : "DATE",
                               tme : "TIME",
                               qty : "QUANTITY",
                               cbxDelete : "",
                               deleteStatus : ""
            };


            setCruds([headerRow, ...crudArray]);
        };

        getCruds();
    }, []);

    const fetchCruds = async () => {
        //const res = await fetch("https://www.auxpolice.org/crud/cruds");
        let retValue = null;
        try {
            const response = await fetchCrud("GET", "", "");
            const data = await response.json();
            if (!response.ok)
                console.log(response.statusText);

            //console.log("data = ", data);
            //console.log(response);
            retValue = data;

        } catch (err) {
            console.log(err);
        }

        return retValue;
    };

    const updDeleteStatus = (crud, isChecked) => {
        //console.log("before = ", cruds[crud.id].deleteStatus);

        const updatedCrud = {
            ...crud, cbxDelete : isChecked, deleteStatus : (isChecked  ? "Y" : "")
        };

        setCruds(cruds.map(each =>
            each.id === crud.id ? updatedCrud : each 
        ));

        //console.log("after = ", cruds[crud.id].deleteStatus);
    };

    const deleteCheckedCruds = async () => {
        const jsonDeleteArray = cruds.filter(each =>
             each.deleteStatus === "Y" || each.dte === "DATE").map(each => ({
                "id" : each.id,
                "deleteStatus" : each.deleteStatus
        }));
        //console.log(jsonDeleteArray);

        if (jsonDeleteArray.length <= 1) {
            alert("Must check at least one row to delete!");
            return;
        }

        await fetchCrud("DELETE", JSON.stringify(jsonDeleteArray), "");

        setCruds(cruds.filter(each =>
            each.deleteStatus !== "Y"
        ));
    };

    const goToAddPage = () => {
        const crud = {
            id : "",
            description : "",
            dte : "",
            tme : "",
            qty : "",
            cbxDelete : "",
            deleteStatus : ""
        };

        history.push('/CrudEditForm', {  crud: crud } );
    };


    const crudDetailArray = cruds.map(each => <CrudBrowseDetail key={each.id}
                                                                crud={each}
                                                                updDeleteStatus={updDeleteStatus}/>
    );

    //console.log(crudDetailArray);

    return (
        <div>
            <center>
                <button name="btnDelete" id="btnDelete" onClick={deleteCheckedCruds}>Delete Checked</button>
                <button name="btnAdd" id="btnAdd" onClick={goToAddPage}>Add</button>
                <table>
                    <tbody>
                        {crudDetailArray}
                    </tbody>
                </table>
                <Link to="/about">About</Link>
            </center>
        </div>
    );
};

export default CrudBrowseForm;