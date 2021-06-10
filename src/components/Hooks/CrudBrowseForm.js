import {useState, useEffect} from "react";
import {fetchCrud} from "../Helper/Utilities";
import CrudBrowseDetail from "./CrudBrowseDetail";

const CrudBrowseForm = () => {
    const [cruds, setCruds] = useState([]); // initialize table of line items to empty array

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
        const response = await fetchCrud("GET", "", "");
        const data = await response.json();

        //console.log("data = ", data);
        //console.log(response);

        return data;
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
        const jsonDeleteArray = cruds.map(each =>
            ({
                "id" : each.id,
                "deleteStatus" : each.deleteStatus
            })
        );

        setCruds(cruds.filter(each =>
            each.deleteStatus !== "Y"
        ));


        //console.log(jsonDeleteArray);

        await fetchCrud("DELETE", JSON.stringify(jsonDeleteArray), "");
    };

    const crudDetailArray = cruds.map(row => <CrudBrowseDetail key={row.id} row={row} updDeleteStatus={updDeleteStatus}/>);

    //console.log(crudDetailArray);

    return (          
        <div>
            <button name="btnDelete" id="btnDelete" onClick={deleteCheckedCruds}>Delete Checked</button>
            <table>
                <tbody>
                    {crudDetailArray}
                </tbody>
            </table>
        </div>
    );
};

export default CrudBrowseForm;