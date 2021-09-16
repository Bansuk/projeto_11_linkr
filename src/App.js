import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyle from "./Styles/GlobalStyle";
import Timeline from "./Components/Timeline";
import SignUp from "./Components/signUp";
import UserContext from "./Context/UserContext";
import { useState } from "react/cjs/react.development";

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
