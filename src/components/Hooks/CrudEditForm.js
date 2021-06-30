import { useHistory } from "react-router-dom";
import {useState} from "react";
import { useRef } from 'react';
import {fetchCrud} from "../Helper/Utilities";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import TimePicker from 'react-time-picker';

const CrudEditForm = (props) => {
    const paramCrud = props.location.state.crud;
    
    let history = useHistory();

    const [id] = useState(paramCrud.id);

    const [description, setDescription] = useState(paramCrud.description);
    const descriptionRef = useRef();

    const [dte, setDte] = useState(paramCrud.dte);

    const [tme, setTme] = useState(paramCrud.tme);

    const [qty, setQty] = useState(paramCrud.qty);
    const qtyRef = useRef();

    const token = sessionStorage.getItem('token');


    const onSubmit = event => {
        event.preventDefault();

        if (!description) {
            alert("Description Required!");
            descriptionRef.current.focus();
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

        //if (parseInt(tme.substring(3, 5)) % 15 !== 0)
        //{
        //    alert("Time must be in 15 minute increments!");
        //    return;
        //}

        if (!qty) {
            alert("Quantity Required!");
            qtyRef.current.focus();
            return;
        }

        updCrud({id:id,
                 description:description,
                 dte:dte,
                 tme:tme,
                 qty:qty});
    };

    const updCrud = async crud => {
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
        <div className="wrapper">
            <h2>
                You have access level {token}
            </h2>
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
                            ref={descriptionRef}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Date :</td>
                    <td>
                        <DatePicker selected={dte}
                                    onChange={date => setDte(date)}
                                    name="dte"
                                    dateFormat="MM/dd/yyyy"
                        />
                    </td>
                </tr>
                <tr>
                    <td>Time :</td>
                    <td>
                        <TimePicker
                            onChange={time => setTme(time)}
                            value={tme}
                            disableClock
                            format="HH:mm"
                            name="tme"
                        />

                    </td>
                </tr>
                <tr>
                    <td>Quantity :</td>
                    <td>
                        <input type="number"
                            id="qty"
                            value={qty}
                            onChange={event => setQty(event.target.value)}
                            ref={qtyRef}
                            step="1"
                            min="0"
                        />
                    </td>
                </tr>
                </tbody>
                </table>

                <input type="submit" name="btnSave" id="btnSave" value="Submit"/>
                <input type="button" name="btnBack" id="btnBack" value="Back" onClick={goBack}/>
            </form>
    </div>
    );
};

export default CrudEditForm;