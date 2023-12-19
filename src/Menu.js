import React from 'react';
import { Link } from 'react-router-dom';
import 'uikit/dist/css/uikit.min.css'; // Підключення CSS стилів

import hair from "./components/menu/hair.gif";
import food from "./components/menu/food.gif";
import kc from "./components/menu/kc.gif";
import makeup from "./components/menu/makeup.gif";

const Menu = () => {
    const menuStyle = {
        backgroundImage: 'linear-gradient(270deg, rgba(204, 142, 164, 0.95) 0%, rgba(173, 111, 255, 0.95) 100%)',
        backgroundBlendMode: 'multiply',
        overflow: 'hidden',
        opacity: '0.79',
        backdropFilter: 'blur(500px)'
    };
    const linkGroup = {
        padding: '10px',
        borderRadius: '35px',
        border: '4px solid #CC8EA4',
        backgroundImage: 'linear-gradient(347deg, rgba(148, 136, 113, 0.95) 0.99%, rgba(238, 236, 175, 0.95) 100%)',
        backgroundBlendMode: 'multiply', rowGap: '35px', display: 'grid',
        mixBlendMode: 'hard-light',
        backdropFilter: 'blur(15px) brightness(100%)',
        overflowY: 'scroll', overflowX: 'hidden', height: '500px'
    };
    const navHead = {
        backgroundImage: 'linear-gradient(270deg, #948871 19.37%, #EEECAF 100%)',
        backgroundBlendMode: 'luminosity',
        mixBlendMode: 'luminosity',
        width: '120%',
        boxShadow: '0px 43px 22px 0px rgba(250, 240, 240, 0.25)',
        marginBottom: '25px',
        transform: 'translateX(-30px) translateY(-40px)',
        padding: '17px 24px',
        alignItems: 'center',
        display: 'flex'
    };

    return (<>
            <div style={menuStyle} id="offcanvas-slide" uk-offcanvas="overlay: true">
                <div className="uk-offcanvas-bar" style={{width:'390px', backgroundImage: 'linear-gradient(270deg, rgba(204, 142, 164, 0.95) 0%, rgba(173, 111, 255, 0.95) 100%)',
                    backgroundBlendMode: 'screen', overflow: 'hidden', opacity: '1'}}>
                    <div style={navHead}>
                        <h1 style={{color: '#471F3D', fontSize: '130%', fontFamily: '"DynaPuff", Helvetica, display'}} className="uk-nav uk-nav-primary uk-nav-header uk-navbar-left">
                            Community <Link to="/tutorial"> <span style={{cursor:'pointer', color: '#471F3D', display: 'flex'}} onClick={()=>setTimeout(()=>window.location.reload(false), 100)}
                                                                  className="uk-margin-small-right" uk-icon="icon: home; ratio: 2.5"></span></Link>
                        <button className="uk-offcanvas-close" type="button" style={{display: 'grid', padding: '10px',
                        position: 'relative', marginLeft: '0.3em'}}>
                            <span uk-icon="icon: close; ratio: 1"></span>
                        </button></h1>
                    </div>

                    <ul style={linkGroup} className="uk-nav uk-nav-primary uk-nav-center uk-margin-auto-vertical">

                        <li className="uk-nav-divider"></li>
                        <li style={{cursor:'pointer'}}><Link to="/tutorial/hairstyles"> <div style={{padding: '10px', margin: '5px 4px',
                            borderRadius: '24px', border: '2px solid #948871', backgroundImage: `url(${hair})`, height: '150px',
                            backgroundPosition: '50% 50%', backgroundSize: 'cover', boxShadow: '-3px 4px 15px 0px rgba(0, 0, 0, 0.25)'}}>
                            <div style={{backgroundSize: '100% 100%',
                                backgroundImage: 'linear-gradient(90deg, rgba(224, 238, 175, 0.95) 0%, rgba(238, 236, 175, 0.95) 100%)',
                                backgroundBlendMode: 'multiply'}} className="routeMenu">
                            </div>
                            <span className="routeMenuTxt" >hairstyles</span>
                        </div> </Link></li>
                        <li className="uk-nav-divider"></li>
                        <li style={{cursor:'pointer'}}><Link to="/tutorial/dishes"> <div style={{padding: '10px', margin: '5px 4px',
                            borderRadius: '24px', border: '2px solid #948871', backgroundImage: `url(${food})`, height: '150px',
                            backgroundPosition: '50% 50%', backgroundSize: 'cover', boxShadow: '-3px 4px 15px 0px rgba(0, 0, 0, 0.25)'}}>
                            <div style={{backgroundSize: '100% 100%',
                                backgroundImage: 'linear-gradient(90deg, rgba(191, 165, 109, 0.95) 0%, rgba(224, 238, 175, 0.95) 100%)',
                                backgroundBlendMode: 'multiply'}} className="routeMenu">
                            </div>
                            <span className="routeMenuTxt" >dishes</span>
                        </div> </Link></li>
                        <li className="uk-nav-divider"></li>
                        <li style={{cursor:'pointer'}}><Link to="/tutorial/knitting-crochet"> <div style={{padding: '10px', margin: '5px 4px',
                            borderRadius: '24px', border: '2px solid #948871', backgroundImage: `url(${kc})`, backgroundPosition: '50% 50%', height: '150px',
                            backgroundSize: 'cover', boxShadow: '-3px 4px 15px 0px rgba(0, 0, 0, 0.25)'}}>
                            <div style={{backgroundSize: '100% 100%',
                                backgroundImage: 'linear-gradient(90deg, rgba(167, 236, 193, 0.95) 0%, rgba(191, 165, 109, 0.95) 96.19%)',
                                backgroundBlendMode: 'multiply'}} className="routeMenu">
                            </div>
                            <span className="routeMenuTxt" >knitting&crochet</span>
                        </div> </Link></li>
                        <li className="uk-nav-divider"></li>
                        <li style={{cursor:'pointer'}}><Link to="/tutorial/makeup"> <div style={{padding: '10px', margin: '5px 4px',
                            borderRadius: '24px', border: '2px solid #948871', backgroundImage: `url(${makeup})`, height: '150px',
                            backgroundPosition: '50% 50%', backgroundSize: 'cover', boxShadow: '-3px 4px 15px 0px rgba(0, 0, 0, 0.25)'}}>
                            <div style={{backgroundSize: '100% 100%',
                                backgroundImage: 'linear-gradient(270deg, rgba(167, 236, 193, 0.95) 0%, rgba(204, 142, 164, 0.95) 100%)',
                                backgroundBlendMode: 'multiply'}} className="routeMenu">
                            </div>
                            <span className="routeMenuTxt" >makeup</span>
                        </div> </Link></li>
                    </ul>
                </div>
            </div>

        </>
    );
};
export default Menu;
