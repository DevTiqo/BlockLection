import React from 'react';
import NewElection from './views/admin/NewElection';
import Landing from './views/Landing';
import Home from './views/components/Home';
import Vote from './views/components/Vote';
import VoteCount from './views/components/VoteCount';
import ElectionData from './views/adminComponents/ElectionData';
import Choose from './views/components/Choose';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
    History
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import NewCandidate from './views/admin/NewCandidate';
import UserView from './views/user/UserView';
import AdminView from './views/admin/AdminView';
import Login from './views/components/Login';
import CandLogin from './views/components/CandLogin';
import AdminLogin from './views/adminComponents/Login';
import VoterList from './views/adminComponents/VoterList';
import CandidateList from './views/adminComponents/CandidateList';
import Register from './views/components/Register';
import CandRegister from './views/components/CandRegister';
import UserHome from './views/components/Home';
import AdminHome from './views/adminComponents/Home';
import RfidRegister from './views/components/RfidRegister';
import RfidVote from './views/components/RfidVote';





const routes = [
    {
        path: "/home",
        component: Landing,
        AuthReq: false
    },
    {
        path: "/user",
        component: UserView,
        routes: [

            {
                path: "/user/login",
                component: Login,
                AuthReq: false
            },
            {
                path: "/user/candlogin",
                component: CandLogin,
                AuthReq: false
            },
            {
                path: '/user/vote/:id',
                component: Vote,
                AuthReq: true
            },
            {
                path: '/user/choose',
                component: Choose,
                AuthReq: true
            },
            {
                path: '/user/voteCount/:id',
                component: VoteCount,
                AuthReq: true
            },
            {
                path: '/user/register',
                component: Register,
                AuthReq: false
            },
            {
                path: '/user/candregister',
                component: CandRegister,
                AuthReq: false
            },
            {
                path: '/user/home',
                component: UserHome,
                AuthReq: false
            },
            {
                path: '/user/rfidregister',
                component: RfidRegister,
                AuthReq: false
            },
            {
                path: '/user/rfidvote',
                component: RfidVote,
                AuthReq: true
            }

        ]
    },
    {
        path: "/admin",
        component: AdminView,
        Adminreq: true,
        routes: [
            {
                path: "/admin/elections",
                component: ElectionData,
                AuthReq: true
            },
            {
                path: "/admin/home",
                component: AdminHome,
                AuthReq: false
            },
            {
                path: "/admin/newcandidates/:id",
                component: NewCandidate,
                AuthReq: true
            },
            {
                path: "/admin/candidates",
                component: CandidateList,
                AuthReq: true
            },
            {
                path: "/admin/newElection",
                component: NewElection,
                AuthReq: true
            },
            {
                path: '/admin/voters',
                component: VoterList,
                AuthReq: true
            },
            {
                path: '/admin/login',
                component: AdminLogin,
                AuthReq: false
            },
            {
                path: '/admin/voteCount/:id',
                component: VoteCount,
                AuthReq: true
            }
        ]
    }
];


const RouteWithSubRoutes = (route) => (
    <Route path={route.path} render={(props) => (
        <route.component {...props} routes={route.routes} />
    )} />
)


const App = () => {




    return (

        <Router>
            <div className="App">
                <Switch>


                    {/* {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))} */}

                    {routes.map((route) => (
                        <RouteWithSubRoutes key={route.path} {...route} />
                    ))}

                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>



                </Switch>
            </div>
        </Router>
    );

}

export default App;
