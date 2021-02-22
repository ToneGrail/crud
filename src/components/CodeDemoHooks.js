import React from "react";
import { useState } from "react";

const myCallback = parameter => {
    if (parameter === "1")
        return ("Option 1 was selected via callback!");

    if (parameter === "2")
        return ("option 2 was selected via callback!");

    return ("Invalid option selected via callback!")
};

const myCaller = (callback, parameter) => {
    return callback(parameter);
};

const myPromise = parameter => {
	return new Promise((resolve, reject) => {
		if (parameter === "1") {
			resolve("Option 1 was selected via promise!");
		}

        if (parameter === "2") {
            resolve("Option 2 was selected via promise!");
        }

		reject("Invalid choice selected via promise!");
	});
};


function CodeDemoHooks() {
    const [callbackMessage, setCallbackMessage] = useState("");
    //const callbackMessage =     myCaller(myCallback, "3");

    //const [promiseMessage, setPromiseMessage] = useState[0];
    
    
    setCallbackMessage(myCaller(myCallback, "3"));
    console.log("Callback message = " + callbackMessage);

    myPromise("3")
    .then(result => {
        console.log("Promise message = " + result);
        //setPromiseMessage(result);
    })
    .catch((result => console.log(result)));


    return (
    <div>
        <p>{callbackMessage}</p>
    </div>
    );
}

export default CodeDemoHooks;
