import React from "react";

class CodeDemo extends React.Component {

    constructor() {
        super();
        this.state = {
            callBackMessage : "Callback Initial value",
            promiseMessage : "Promise Initial value"
        }
    }

    myCallback(parameter) {
        if (parameter === "1")
            return ("Option 1 was selected via callback!");
    
        if (parameter === "2")
            return ("option 2 was selected via callback!");
    
        return ("Invalid option selected via callback!");
    }
    
    myCaller(callback, parameter) {
        return callback(parameter);
    }
    
    myPromise(parameter) {
        return new Promise((resolve, reject) => {
            if (parameter === "1") {
                resolve("Option 1 was selected via promise!");
            }
    
            if (parameter === "2") {
                resolve("Option 2 was selected via promise!");
            }
    
            reject("Invalid choice selected via promise!");
        });
    }

    componentDidMount() {
        let callBackMessage = this.myCaller(this.myCallback, "3");

        this.setState({callBackMessage : callBackMessage});
        console.log("Callback message = " + callBackMessage);

        this.myPromise("2")
        .then(result => {
            console.log("Promise message = " + result)
            this.setState({promiseMessage : result});
        })
        .catch((result => console.log("Promise message = " + result)));
    }
    
    render() {


        return (
        <div>
            <p>{this.state.callBackMessage}</p>
            <p>{this.state.promiseMessage}</p>
        </div>
        );
    }
}

export default CodeDemo;
