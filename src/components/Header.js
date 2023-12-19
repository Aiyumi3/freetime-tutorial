import React, {useState} from 'react';
import logo from './logo.png';
import 'uikit/dist/css/uikit.min.css';// Підключення CSS стилів
import {projectFirestore} from "../firebase/config";
import { collection, getDocs, where, query } from 'firebase/firestore';
import {useHistory} from 'react-router-dom';

const Header = () => {
	const logoframe = {
	    display: 'flex',
        width: '91px',
        height: '53px',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0
	};
	const logoStyle = {
	    display: 'flex',
        height: '53px',
        padding: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        flex: '1 0 0',
        borderRadius: '8px',
        backgroundImage: `url(${logo})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
    };
	const headerStyle = {
		backgroundImage: 'linear-gradient(90deg, rgba(245, 237, 247, 0.95) 0%, rgba(173, 111, 255, 0.95) 100%)',
		backgroundBlendMode: 'multiply',
		borderBottomStyle: 'solid',
		borderBottomWidth: '3px',
		borderColor: '#F5EDF7',
		padding: '17px 24px',
		boxShadow: '0px 4px 15px 20px rgba(255, 255, 255, 0.30)'
	};

    const [search, setSearch] = useState('');
    const [nameColl, setNameColl] = useState('');
    const history = useHistory();

    return (
        <header style={{
            mixBlendMode: 'hard-light',
            backgroundBlendMode: 'multiply'
        }} uk-sticky="position: top">
		    <nav style={headerStyle} className="uk-navbar-container">
                <div className="uk-container">
                    <div className="uk-navbar-left" style={{gap: 0}}>

                        <button style={{boxShadow: 'none', borderColor: 'transparent'}} className="uk-button uk-button-default uk-margin-small-right" type="button"
                                uk-toggle="target: #offcanvas-slide">
                            <span uk-icon="icon: menu; ratio: 1"></span>
                        </button>
                        <div className="uk-navbar-right" style={{gap: 0}}>

                            <div style={{margin: '12px'}}>
                                <form className="uk-search uk-search-default" style={{width: '55px', display: 'grid',
                                justifyContent: 'center', alignItems: 'center'}}>
                                    <button style={{
                                        boxShadow: 'none', position: 'absolute', transform: 'scale(0.8)',
                                        zIndex: 1
                                    }} className="uk-search-icon-flip" uk-search-icon="true" onClick={async (e) => {
                                        e.preventDefault();
                                        if(search === ''){
                                            alert('empty, you need to enter title');
                                        }else {
                                            const collections = ['hairstyles', 'dishes', 'knitting-crochet', 'makeup'];
                                            
                                            for (const collectionName of collections) {
                                                const parentDocRef = collection(projectFirestore, collectionName);
                                                const q = query(parentDocRef, where('title', '==', search));
                                                const parentDocSnapshot = await getDocs(q);

                                                if (!parentDocSnapshot.empty) {
                                                    setNameColl(collectionName);
                                                    break;
                                                }else{
                                                    setNameColl('');
                                                    alert(search + ' doesn\'t exist in ' + collectionName);
                                                    setSearch('');
                                                }
                                            }
                                            if (nameColl) {
                                                history.push(`/tutorial/${nameColl}/${search}`);
                                                setSearch('');
                                            }
                                        }
                                    }}></button> 
                                    <input className="uk-search-input" type="search" placeholder="Search title" aria-label="Search" name="search"
                                    value={search} onChange={(e) => setSearch(e.target.value)} style={{
                                        alignItems: 'center',
                                        display: 'grid',
                                        background: 'beige',
                                        borderColor: 'purple',
                                        borderRadius: '50px',
                                        fontSize: '17px', position: 'relative', width: '100%',
                                        transition: 'width 0.9s ease-in-out'
                                    }} onFocus={(e) => {
                                        e.target.style.width = '160px'; // Increase the width on focus
                                        e.target.style.transform = 'translateX(-40px)';
                                    }} onBlur={(e) => {
                                        e.target.style.width = '100%'; // Restore the width on blur
                                        e.target.style.transform = 'translateX(0)';
                                    }} />
                                </form>
                            </div>

					    	<div style={logoframe} uk-scrollspy="cls: uk-animation-slide-right; repeat: true">
                                <div style={logoStyle}></div>
                            </div>
                        </div>
                    </div>

                </div>
            </nav>
		</header>
    );
};
export default Header; 