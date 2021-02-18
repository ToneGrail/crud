import React from "react";
import ReactDOM from 'react-dom';
import CrudBrowseForm from "./CrudBrowseForm"
import {callFetch} from "./Utilities";

class CrudEditForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {id: "", description: ""};


        this.getCrud = this.getCrud.bind(this); 
        this.saveCrud = this.saveCrud.bind(this); 

        this.handleChangedDescription = this.handleChangedDescription.bind(this); 
        this.handleChangedQty = this.handleChangedQty.bind(this); 
    }

    componentDidMount() {
        this.getCrud();
    }

    getCrud() {
        //let params = new URLSearchParams(window.location.search);
        //let id = params.get("id") === null ? "" : params.get("id");
        //if (id === null)
        //    return;


        let id = this.props.id + "";
        if (id.length === 0)
            return;

        console.log("id = " + id);

        let fetch = callFetch("GET", "", id);
        fetch
        .then(
            response => response.json()
        )
        .then(
            data => this.setState(
                {
                    id: data.id,
                    description: data.description,
                    qty: data.qty
                }
            )
        );
    }

    handleChangedDescription(event) {
        //console.log(event.target.value);
        //debugger;
        
        this.setState({"description":event.target.value});
    }

    handleChangedQty(event) {
        this.setState({"qty":event.target.value});
    }


    saveCrud(event) {
        event.preventDefault();

        //console.log(document.querySelector("#description").value);

        if (document.querySelector("#description").value.trim().length === 0) {
            alert("Must enter description");
            document.querySelector("#description").focus();
            return;
        }

        if (document.querySelector("#qty").value.trim().length === 0) {
            alert("Must enter quantity");
            document.querySelector("#qty").focus();
            return;
        }

        if (isNaN(document.querySelector("#qty").value)) {
            alert("Must be a number");
            document.querySelector("#qty").focus();
            return;
        }

        let method = "PUT";
        let id = this.state.id + "";

        //let params = new URLSearchParams(window.location.search);
        //if (params.get("id") === null)
        //    method = "POST";

        if (id.length === 0)
            method = "POST";


        //console.log(method);

        let jsonArray = {
            id: id,
            description:document.querySelector("#description").value,
            qty: document.querySelector("#qty").value
        };
        //console.log(jsonArray);
        
        let fetch = callFetch(method, JSON.stringify(jsonArray), id);
        fetch.then( response => response.json() );

        //alert("Update Successful!");
        //window.location = "CrudBrowseReact.html";

        setTimeout(() => {
            ReactDOM.render(
                <React.StrictMode>
                <CrudBrowseForm/>
                </React.StrictMode>,
                document.getElementById('root')
            );
        }, 500);

    }

    render() {
        //let type = "text";
        let label="Crud ID :";

        //let params = new URLSearchParams(window.location.search);
        //let id = params.get("id") === null ? "" : params.get("id");

        //console.log(this.props.id);
        let id = this.props.id;
        if (id.length === 0) {
            //type = "hidden";
            label="";
        }

        return (
          
            <div>
                <form name="CrudEditForm" id="CrudEditForm" onSubmit={this.saveCrud}>

                    <table>
                    <tbody>
                    <tr>
                        <td>{label}</td>
                        <td style={{"textAlign": "right"}}>
                            <input type="hidden" name="id"
                                id="id" value={this.state.id}/>
                            {this.props.id}
                        </td>
                    </tr>
                    <tr>
                        <td>Description :</td>
                        <td>
                            <input type="text"
                                id="description"
                                value={this.state.description}
                                onChange={this.handleChangedDescription} autoFocus/>
                        </td>
                    </tr>
                    <tr>
                        <td>Quantity :</td>
                        <td>
                            <input type="text"
                                id="qty"
                                value={this.state.qty}
                                onChange={this.handleChangedQty}/>
                        </td>
                    </tr>
                    </tbody>
                    </table>

                    <input type="submit" name="btnSave" id="btnSave" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default CrudEditForm;