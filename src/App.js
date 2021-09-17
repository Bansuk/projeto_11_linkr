<<<<<<< HEAD
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import SignUp from "./Components/signUp";
import Timeline from "./Components/Timeline";

export default function App() {
    return (
        <>
        <BrowserRouter>
            <Switch>
                <Route path='/sign-up' exact>
                    <SignUp />
                </Route>
            </Switch>
            
        </BrowserRouter>            
        </>
=======
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Timeline from "./components/Timeline";
import SignUp from "./components/signUp";
import Login from "./components/login";
import UserContext from "./contexts/userContext";
import { useState } from "react";
import TopBar from "./components/TopBar";

export default function App() {
    const [user, setUser] = useState({});
>>>>>>> e2845fa432f9e55223ca2cf42c6fcd4060f750a4

    return (
        <UserContext.Provider value={user}>
            <BrowserRouter>
                <GlobalStyle />
                <Switch>
                    <Route path="/sign-up" exact>
                        <SignUp />
                    </Route>
                    <Route path="/" exact>
                        <Login user={user} setUser={setUser} />
                    </Route>
                    <Route path="/timeline" exact>
                        <TopBar setUser={setUser} />
                        <Timeline />
                    </Route>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    );
}