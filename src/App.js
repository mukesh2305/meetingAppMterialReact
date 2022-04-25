import React from 'react';
import { Fragment } from 'react';
import ErrorPage from "./views/ErrorPage";
import ActivityPage from "./views/ActivityPage";
import LoginPage from "./views/LoginPage";
import PreloadPage from "./views/PreloadPage";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import MeetingRoom from "./views/MeetingRoom";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    useRoutes,
    useLocation
} from "react-router-dom";
import IsometricMeeting from './views/IsometricMeeting';


function RequireAuth() {
    const authData = useSelector(state => state.authReducer);
    let location = useLocation();
    // console.log(process.env);
    if (!authData.token) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/" state={{ from: location }} />;
    }
    return <Outlet />;
}


function App() {
    return (<Routes>
        {/* <Route path="/" exact element={<LoginPage />} /> */}
        {/* <Route element={<RequireAuth />}> */}
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/activity/meeting/room1" element={<IsometricMeeting />} />
        <Route path="/preload" element={<PreloadPage />} />
        <Route path="/meet" element={<MeetingRoom />} />
        {/* </Route> */}
        <Route path="*" element={<ErrorPage />} />
    </Routes>)
}

export default App;
