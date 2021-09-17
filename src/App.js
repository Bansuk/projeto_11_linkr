import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";
import SignUp from "./components/signUp";
import Login from "./components/login";
import UserContext from "./contexts/userContext";
import Timeline from "./components/Timeline";
import TopBar from "./components/TopBar";
import GlobalStyle from "./styles/GlobalStyle";

export default function App() {
    const [user, setUser] = useState({});

    return (
        <UserContext.Provider value={user}>
            <BrowserRouter>
                <GlobalStyle />
                <TopBar setUser={setUser} />
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
