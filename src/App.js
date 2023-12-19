import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'uikit/dist/css/uikit.min.css'; // Підключення CSS стилів
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';

import TutorialsPage from './components/TutorialsPage';
import Menu from "./Menu";

import welcome from './Welcome.gif';
import phone from './feed.png';
import hair from './hairsalon.png';
import cook from './Recipe.png';
import knitting from './Knitting.png';
import makeup from './Makeup.png';

const StartPage = () => {

    return (
        <>
            <div className="uk-flex uk-flex-center">
                <img src={welcome} alt="welcome" style={{ padding: '20px 36px', borderRadius: '100%', width: '30%', height: '30%'}} />
            </div>
            <amp-ad width="100vw" height="320"
                    type="adsense"
                    data-ad-client="ca-pub-8463433910692072"
                    data-ad-slot="1257070912"
                    data-auto-format="rspv"
                    data-full-width="">
                <div overflow=""></div>
            </amp-ad>
            <div className="uk-flex uk-flex-center">
                <img src={phone} alt="phone" style={{ padding: '20px 36px', width: '30%', height: '30%'}} />
                <p style={{display: 'flex', padding: '10px', justifyContent: 'center', textAlign: 'justify',
                    boxShadow: '5px 12px 20px 0px rgba(255, 255, 255, 0.50)'}}> It is a freeTime community.<br/>
                    A web app for spending your free time in online community. You can create your own tutorials
                    for makeup, dishes, hairstyles, knitting, crochet, or watch other's tutorials and repeat according to the tutorial.
                    <br/>IS YOUR TIME FREE? SPEND WITH US!</p>
            </div>
            <amp-ad width="100vw" height="320"
                    type="adsense"
                    data-ad-client="ca-pub-8463433910692072"
                    data-ad-slot="5882711633"
                    data-auto-format="mcrspv"
                    data-full-width="">
                <div overflow=""></div>
            </amp-ad>
            <div className="uk-flex uk-flex-center" style={{padding: '20px', margin: '20px',
                animationName: 'rotate', animationDuration: '5s', animationTimingFunction: 'linear', animationIterationCount: 'infinite'}}>
                <img src={hair} alt="hair" style={{ borderRadius: '100%', width: '30%', height: '30%'}} />
                <img src={cook} alt="cook" style={{ borderRadius: '100%', width: '30%', height: '30%'}} />
                <img src={knitting} alt="knitting" style={{ borderRadius: '100%', width: '30%', height: '30%'}} />
                <img src={makeup} alt="makeup" style={{ borderRadius: '100%', width: '30%', height: '30%'}} />
            </div>
            <amp-ad width="100vw" height="320"
                    type="adsense"
                    data-ad-client="ca-pub-8463433910692072"
                    data-ad-slot="1257070912"
                    data-auto-format="rspv"
                    data-full-width="">
                <div overflow=""></div>
            </amp-ad>
        </>
    );
};

const App = () => {

	return (
        <Router>
            <Menu />
            <Header />
            <Switch>
                <Route exact path="/" component={StartPage} />
                <Route exact path="/tutorial" component={HomePage} />
                <Route path="/tutorial/:tutorialName" component={TutorialsPage} />
            </Switch>
            <Footer />
        </Router>
    );
};
export default App;