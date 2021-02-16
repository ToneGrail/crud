import React from "react";
import ReactDOM from 'react-dom';
import CrudBrowseDetail from "./CrudBrowseDetail";
import CrudEditForm from "./CrudEditForm";
import {callFetch} from "./Utilities";

class CrudBrowseForm extends React.Component {

    constructor() {
        super();
        
        this.state = {jsonCrudArray: []}; // initialize table of line items to empty array

        this.getCruds = this.getCruds.bind(this); 
        this.deleteCruds = this.deleteCruds.bind(this);
    }

    componentDidMount() {
        this.getCruds(); //prepopulate the array from the database
    }            

    getCruds() {
        let fetchResults = callFetch("GET", "", "");

        fetchResults
            .then(response => {
                    return (
                        response.json()
                    );
                }
            )
            .then(data => {
                    return (
                        this.setState({ jsonCrudArray: data })
                    );
                }
            );
    }

    deleteCruds() {
        let nodeListArray = Array.from(document.querySelectorAll("#mytable tr"));
        let jsonDeleteArray = nodeListArray.map(each => {
            let deleteStatus = each.querySelector("#deleteStatus").value;
            let id = each.querySelector("#id").value;

            return ({
                    id : id,
                    deleteStatus : deleteStatus
                }
            );
        });
        

        let checkedCount = 0;
        for (let i = 1; i < jsonDeleteArray.length; i++) {
            if (jsonDeleteArray[i].deleteStatus === "Y")
                checkedCount++;
        }


        if (checkedCount === 0) {
            alert("You must check at least one row.");
            return;
        }


        callFetch("DELETE", JSON.stringify(jsonDeleteArray), "");

        setTimeout(() => {
            this.getCruds();
        }, 500);
    }

    add() {
        ReactDOM.render(
            <React.StrictMode>
              <CrudEditForm id=""/>
            </React.StrictMode>,
            document.getElementById('root')
        );
    }

    render() {
        //let rows = [];
        //this.props.cruds.forEach(
        //	function(crud)
        //	{
        //		rows.push(<Crud crud={crud} key={crud.id} />);
            
        //	}
        //);
        
        let rows = this.state.jsonCrudArray.map(
            crud => <CrudBrowseDetail crud={crud} key={crud.id} />
        );


        return (          
            <div>
                <form name="CrudBrowseForm" id="CrudBrowseForm">
                      <input type="button" name="btnAdd" id="btnAdd" value="Add" onClick={this.add} autoFocus/>
                      <input type="button" name="btnDelete" id="btnDelete" value="Delete Checked" onClick={this.deleteCruds}/>

              
                    <table  id="mytable">
                    <thead>
                        <tr>
                            <th>
                                <input type="hidden" name="cbxDelete" id="cbxDelete" />
                                <input type="hidden" name="deleteStatus" id="deleteStatus" value=""/>
                                <input type="hidden" name="id" id="id"/>
                            </th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default CrudBrowseForm;