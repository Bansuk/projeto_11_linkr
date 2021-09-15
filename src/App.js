import { BrowserRouter, Switch, Route } from "react-router-dom";
import Timeline from "./Timeline";
function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/timeline" exact>
                    <Timeline />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
