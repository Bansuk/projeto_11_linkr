import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Timeline from "./components/Timeline";
import SignUp from "./components/signUp";
import Login from "./components/login";
import UserContext from "./contexts/userContext";
import { useState } from "react";
import TopBar from "./components/TopBar";
import MyPosts from "./components/myPosts";
import Hashtag from "./components/Hashtag";

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
                    <>
                        <TopBar setUser={setUser} />

                        <Route path="/timeline" exact>
                            <Timeline />
                        </Route>
                        <Route path="/my-posts" exact >
                            <MyPosts />
                        </Route> 
                        <Route path='/hashtag/:idHashtag' exact>
                            <Hashtag />
                        </Route>
                    </>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    );
}