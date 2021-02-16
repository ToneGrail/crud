import React from "react";
import ReactDOM from 'react-dom';
import CrudEditForm from "./CrudEditForm";

class CrudBrowseDetail extends React.Component {
    constructor() {
        super();

        this.state = {checked:false, deleteStatus:""}; //initialize to blanks

        this.updateDeleteStatus = this.updateDeleteStatus.bind(this); //bind
        this.handleClick = this.handleClick.bind(this); //bind
    }

    updateDeleteStatus() {//executed upon onChange event fired (checkbox clicked)
        this.setState({checked: !this.state.checked}); // set checkbox to the opposite of what it was


        if (this.state.deleteStatus === "Y") // set hidden status to opposite of what it was
            this.setState({deleteStatus:""});
        else
            this.setState({deleteStatus:"Y"});
        
    }

    handleClick() {
        ReactDOM.render(
            <React.StrictMode>
                <CrudEditForm id={this.props.crud.id} />
            </React.StrictMode>,
            document.getElementById('root')
        );
    }

    handleMouseOver() {
        //console.log("Mouse over");
        document.body.style.cursor = "pointer";
    }

    handleMouseOut() {
        //console.log("Mouse out");
        document.body.style.cursor = "default";
    }

    render() {
        return (
                <tr>
                    <td>
                        <input type="checkbox" name="cbxDelete" id="cbxDelete" ref="cbxDelete" onChange={this.updateDeleteStatus} checked={this.state.checked}/>
                        <input type="hidden" name="deleteStatus" id="deleteStatus" value={this.state.deleteStatus}/>
                        <input type="hidden" name="id" id="id" value={this.props.crud.id}/>
                    </td>
                    <td onClick={this.handleClick} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                        <font color="blue"><u>{this.props.crud.id}</u></font>
                    </td>
                    <td>
                        &nbsp;
                    </td>
                    <td>{this.props.crud.description}</td>
                    <td>
                        &nbsp;
                    </td>
                    <td>{this.props.crud.qty}</td>
                </tr>
        );
    }
}

export default CrudBrowseDetail;