import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Timeline from "./Timeline";

function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Switch>
                <Route path="/timeline" exact component={Timeline} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
