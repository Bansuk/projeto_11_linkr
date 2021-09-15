import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Timeline from "./Timeline";
import SignUp from "./signUp";

export default function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Switch>
                <Route path="/timeline" exact>
                    <Timeline />
                </Route>
                <Route path="/sign-up" exact>
                    <SignUp />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
