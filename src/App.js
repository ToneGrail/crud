import "./App.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import CrudBrowseForm from "./components/Hooks/CrudBrowseForm";
import CrudEditForm from "./components/Hooks/CrudEditForm";
import About from "./components/Hooks/About";
import {useToken} from "./components/Helper/Utilities";
import Login from "./components/Hooks/Login";


function App() {
    const {token, setToken} = useToken();

    if (!token) {
        return (
            <Login setToken={setToken} />
        );
    }

    return (
        <div className="wrapper">
            <h1>CRUD APP</h1>
            <Router>
                <Switch>
                    <Route path="/" exact component={CrudBrowseForm}/>
                    <Route path="/CrudEditForm" exact component={CrudEditForm}/>
                    <Route path="/about" exact component={About} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
