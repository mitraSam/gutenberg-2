import {Router} from '@reach/router';
import Main from '../Main/Index';
import Search from '../Search/Index';
import Landing from '../Landing/Index';
import Details from '../Details/Index';
import Chapter from '../Chapter/Index';
import UploadForm from '../UploadForm/Index';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import User from '../User/Index';
import About from '../About/Index';
import NotFound from '../NotFound/Index';
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
