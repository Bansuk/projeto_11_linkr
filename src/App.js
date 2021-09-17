import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Timeline from "./components/Timeline";
import SignUp from "./components/signUp";
import Login from "./components/login";
import UserContext from "./contexts/userContext";
import { useState } from "react";
import TopBar from "./components/TopBar";
import UsersPosts from "./components/usersPosts";

export default function App() {
    const [user, setUser] = useState({});

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
                    <Route path='/user/:id' exact>
                        <TopBar setUser={setUser} />
                        <UsersPosts />
                    </Route>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    );
}