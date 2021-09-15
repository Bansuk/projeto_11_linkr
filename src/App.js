import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { useState } from 'react';
import SignUp from "./signUp";
import Login from './login';
import UserContext from './contexts/userContext';

export default function App() {
    const [user, setUser] = useState({
        email: '',
        password: ''
      });


    return (
        <>
        <UserContext.Provider value={user}>
            <BrowserRouter>
                <Switch>
                    <Route path='/sign-up' exact >
                        <SignUp />
                    </Route>

                    <Route path='/' exact >
                        <Login user={user} setUser={setUser} />
                    </Route>
                    
                </Switch>
                
            </BrowserRouter>   

        </UserContext.Provider>
                 
        </>
    );
}

