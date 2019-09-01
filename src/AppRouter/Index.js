import {Router} from '@reach/router';
import Main from '../Main';
import Search from '../Search';
import Landing from '../Landing';
import Details from '../Details';
import Chapter from '../Chapter';
import UploadForm from '../UploadForm';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import User from '../User';
import About from '../About';
import NotFound from '../NotFound';
import React from 'react';
const AppRouter = () => (
    <Router>
        <Main path="/">
            <Search path="/search/:param" />
            <Landing path="/" />
            <Details path="/:title" />
            <Chapter path="/:title/:chapterNr/:pageNr" />
            <UploadForm path="/upload" />
            <Login path="login" />
            <Signup path="signup" />
            <User path="user" />
            <About path="about" />
            <NotFound default />
        </Main>
    </Router>
);
export default AppRouter;
