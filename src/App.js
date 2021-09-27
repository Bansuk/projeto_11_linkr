import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";

import SignUp from "./components/signUp";
import Login from "./components/login";
import UserContext from "./contexts/userContext";
import { useState } from "react";
import TopBar from "./components/TopBar";
import AnimatedTransition from "./components/AnimatedTransition";

export default function App() {
    const [user, setUser] = useState(() => {
        let loggedUser = localStorage.getItem("user");
        loggedUser = JSON.parse(loggedUser);
        return loggedUser;
    });

    const isAuth = !!user;

    return (
        <UserContext.Provider value={user}>
            <BrowserRouter>
                <GlobalStyle />
                <Switch>
                    <Route path="/sign-up" exact>
                        <SignUp />
                    </Route>

                    <Route path="/" exact>
                        <Login user={user} setUser={setUser} isAuth={isAuth} />
                    </Route>
                    <>
                        <TopBar setUser={setUser} />
                        <Route path="*">
                            <AnimatedTransition />
                        </Route>
                    </>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    );
}
