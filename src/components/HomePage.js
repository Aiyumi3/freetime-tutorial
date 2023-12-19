import React, { useState, useEffect, useMemo } from 'react';
import poster from './poster.gif';
import 'uikit/dist/css/uikit.min.css'; // Підключення CSS стилів
import img1 from './bg/home/1.png';
import img2 from './bg/home/2.png';
import img3 from './bg/home/3.png';
import img4 from './bg/home/4.png';
import q from './q.gif';
import info from './info.png';

const HomePage = () => {
	const homepageStyle = {
		display: 'flex',
        height: 'clamp(450px, 90vh, 850px)',
        width: 'clamp(24px, 65vw, 605px)',
        padding: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        flexShrink: 0,
		borderRadius: '35px',
        backgroundImage: `url(${poster})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
		margin: '181px 10px',
        cursor: 'pointer',
		boxShadow: '5px 12px 20px 0px rgba(255, 255, 255, 0.50)'
	};
	const aboutTxt = { 
		textAlign: 'center', 
		fontFamily: '"DynaPuff",display,"Arial Rounded MT", Helvetica, sans-serif',
		fontSize: 'clamp(24px, 50vw, 96px)', 
		fontStyle: 'normal',
        backgroundImage: 'linear-gradient(90deg, rgba(173, 111, 255, 0.95) 0%, rgba(68, 255, 200, 0.95) 100%)',
		backgroundBlendMode: 'multiply',
        mixBlendMode: 'multiply'
    };
	const aboutOntop = {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
        height: '500px',
        width: '100vw'
	};

    const images = useMemo(() => {
        return [img1, img2, img3, img4];
    }, []);
    const [currentImage, setCurrentImage] = useState(0);
    useEffect(() => {
        // Change the image every 25 seconds (25000 milliseconds)
        const interval = setInterval(() => {// Function to update the current image index
            setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
        }, 25000);

        return () => {
            // Clean up the interval when the component unmounts
            clearInterval(interval);
        };
    }, [images]);

    return (
        <div style={{
            position: 'relative',
            zIndex: 10,
            backgroundImage: `url(${images[currentImage]})`,
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: '100% 100%', backgroundBlendMode: 'multiply', transition: 'background-image 20s ease-in-out',
            boxShadow: 'rgb(156, 140, 180, 0.3) 0px 4px 15px 40px'
        }} className="uk-flex uk-flex-center">

            <section>
                <div className="bubbles">
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                </div>
            </section>
            <amp-ad width="100vw" height="320"
                    type="adsense"
                    data-ad-client="ca-pub-8463433910692072"
                    data-ad-slot="1257070912"
                    data-auto-format="rspv"
                    data-full-width="">
                <div overflow=""></div>
            </amp-ad>

            <div style={homepageStyle} uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
                <h1 style={aboutTxt} className="aboutT" >A B O U T </h1>
            </div>

			<div style={aboutOntop} className="offcanvas offcanvas-bottom" tabIndex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
                <div style={{backgroundImage: 'linear-gradient(90deg, rgba(122, 82, 119, 0.95) 0%, rgba(122, 82, 102, 0.95) 100%)', backgroundBlendMode: 'multiply'}} className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasBottomLabel" style={{borderColor: '#471f3d', color: '#F5EDF7', fontSize: '160%', fontFamily: '"DynaPuff", Helvetica, display'}}>~ A b o u t ~</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"
                            style={{boxShadow: 'none', borderColor: 'transparent', backgroundColor: 'transparent'}}></button>
                </div>
                <div className="offcanvas-body">
                    <img src={q} alt="?" style={{
                        margin: '20px', borderRadius: '43px'
                    }} />
                    <amp-ad width="100vw" height="320"
                            type="adsense"
                            data-ad-client="ca-pub-8463433910692072"
                            data-ad-slot="5882711633"
                            data-auto-format="mcrspv"
                            data-full-width="">
                        <div overflow=""></div>
                    </amp-ad>
                    <p style={{color: '#171B3B', fontFamily: '"Andika","Arial Rounded MT", Helvetica, sans-serif', fontSize: '160%'}}> <br/>
                        IS YOUR TIME FREE? SPEND WITH US!<br/>
                        tutorials, watch, save, create your own <br/>
                    </p><br/>
                    <amp-ad width="100vw" height="320"
                            type="adsense"
                            data-ad-client="ca-pub-8463433910692072"
                            data-ad-slot="1257070912"
                            data-auto-format="rspv"
                            data-full-width="">
                        <div overflow=""></div>
                    </amp-ad>
                    <img src={info} alt="info" style={{
                        margin: '20px', borderRadius: '43px'
                    }} />
                    <p style={{color: '#171B3B', fontFamily: '"Andika","Arial Rounded MT", Helvetica, sans-serif', fontSize: '160%'}}> <br/>
                        you can add image file type: png, jpeg, jpg, gif; video file type: mp4, webm
                    </p><br/>
                </div>
            </div>
            <amp-ad width="100vw" height="320"
                    type="adsense"
                    data-ad-client="ca-pub-8463433910692072"
                    data-ad-slot="5882711633"
                    data-auto-format="mcrspv"
                    data-full-width="">
                <div overflow=""></div>
            </amp-ad>
        </div>
    );
};
export default HomePage;
