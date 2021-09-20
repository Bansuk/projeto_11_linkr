<<<<<<< HEAD
<<<<<<< HEAD
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import SignUp from "./signUp";
import Timeline from "./Timeline";
=======
import { BrowserRouter, Switch, Route } from "react-router-dom";
=======
import { BrowserRouter, Switch, Route, useHistory, Redirect } from "react-router-dom";
>>>>>>> 820f21fd70e2de1c727e1cc6b4adfbb07d0e9ebf
import GlobalStyle from "./styles/GlobalStyle";
import Timeline from "./components/Timeline";
import SignUp from "./components/signUp";
import Login from "./components/login";
import UserContext from "./contexts/userContext";
<<<<<<< HEAD
import { useState } from "react";
import TopBar from "./components/TopBar";
import MyPosts from "./components/myPosts";
>>>>>>> 3d4eeb9ad646b4ee9425456368d8dd67a374087a

export default function App() {
    const [user, setUser] = useState({});

    return (
<<<<<<< HEAD
        <>
        <BrowserRouter>
            <Switch>
                <Route path='/sign-up' exact>
                    <SignUp />
                </Route>
                <Route path="/timeline" exact>
                    <Timeline />
                </Route>
                
            </Switch>
            
        </BrowserRouter>            
        </>

=======
=======
import { useState, useEffect } from "react";
import TopBar from "./components/TopBar";
import MyPosts from "./components/myPosts";

export default function App() {
    const [user, setUser] = useState(() => {
        let loggedUser = localStorage.getItem('user');
        loggedUser = JSON.parse(loggedUser);
        return loggedUser;
    });

    const isAuth = !!user;
    

    return (
>>>>>>> 820f21fd70e2de1c727e1cc6b4adfbb07d0e9ebf
        <UserContext.Provider value={user}>
            <BrowserRouter>
                <GlobalStyle />
                <Switch>
                    <Route path="/sign-up" exact>
                        <SignUp />
                    </Route>
<<<<<<< HEAD
                    <Route path="/" exact>
                        <Login user={user} setUser={setUser} />
                    </Route>
                    <Route path="/timeline" exact>
                        <TopBar setUser={setUser} />
                        <Timeline />
                    </Route>
=======

                    <Route path="/" exact>
                        <Login user={user} setUser={setUser} isAuth={isAuth} />
                    </Route>

                    <Route path="/timeline" exact >
                        <TopBar setUser={setUser} />
                        <Timeline />                 
                    </Route>

>>>>>>> 820f21fd70e2de1c727e1cc6b4adfbb07d0e9ebf
                    <Route path="/my-posts" exact>
                        <TopBar setUser={setUser} />
                        <MyPosts />
                    </Route>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
<<<<<<< HEAD
>>>>>>> 3d4eeb9ad646b4ee9425456368d8dd67a374087a
=======
>>>>>>> 820f21fd70e2de1c727e1cc6b4adfbb07d0e9ebf
    );
}
