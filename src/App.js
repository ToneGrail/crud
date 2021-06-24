import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import CrudBrowseForm from "./components/Hooks/CrudBrowseForm";
import CrudEditForm from "./components/Hooks/CrudEditForm";
import About from "./components/Hooks/About";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={CrudBrowseForm}/>
                <Route path="/CrudEditForm" exact component={CrudEditForm}/>
                <Route path="/about" component={About}/>
            </Switch>
        </Router>
    );
}

export default App;
