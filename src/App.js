import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Timeline from "./components/Timeline";
import SignUp from "./components/signUp";
import Login from "./components/login";
import UserContext from "./contexts/userContext";
import { useState } from "react";
import TopBar from "./components/TopBar";
import MyLikes from "./components/myLikes";
import UsersPosts from "./components/usersPosts";
import MyPosts from "./components/myPosts";
import Hashtag from "./components/Hashtag";

export default function App() {
    const [user, setUser] = useState(() => {
        let loggedUser = localStorage.getItem('user');
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

                        <Route path="/timeline" exact>
                            <Timeline />
                        </Route>
                        <Route path="/my-posts" exact >
                            <MyPosts />
                        </Route> 
                        <Route path='/hashtag/:idHashtag' exact>
                            <Hashtag />
                        </Route>
                        <Route path='/user/:id' exact>
                            <UsersPosts />
                        </Route>
                        <Route path='/my-likes'>
                            <MyLikes />
                        </Route>
                    </>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    );
}