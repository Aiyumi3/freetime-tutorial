import React from 'react';
import logo from './logo.png';
import twi from './sns/Twitter Circled.png';
import insta from './sns/Instagram.png';
import gm from './sns/Gm.png';
import gt from './sns/GitHub.png';
import yt from './sns/YouTube.png';
import 'uikit/dist/css/uikit.min.css'; // Підключення CSS стилів

const Footer = () => {
	const footerStyle = {
		borderTop: '2px solid #F5EDF7',
		backgroundImage: 'linear-gradient(34deg, #171B3B 20.08%, #471F3D 59.26%)',
		backgroundBlendMode: 'darken',
		boxShadow: '0px 5px 20px 15px rgba(255, 255, 255, 0.15) inset',
		padding: '17px 24px',
		position: 'relative',
		marginTop: '90px',
		zIndex: 9
	};
	const frameStyle = {
        padding: '29px 45px'
	};
	const logoFrame = {
        height: 'clamp(70px, 50vh, 143px)',
		width: 'clamp(165px, 50vw, 243px)'
	};
	const pictureStyle = {
        height: 'clamp(70px, 50vh, 143px)',
		width: 'clamp(165px, 50vw, 243px)',
        padding: '10px',
		backgroundImage: `url(${logo})`,
		backgroundSize: 'contain',
		backgroundRepeat: 'no-repeat'
	};
	const contactStyle = {
	    display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
	};
	const contactTxt = {
	    color: '#F5EDF7',
        fontFamily: '"Andika","Arial Rounded MT", Helvetica, sans-serif',
        fontSize: '150%',
        fontStyle: 'normal',
        lineHeight: '40px',
		marginTop: '20px'
	};
	const iconStyle = {
	    display: 'flex',
        alignItems: 'flex-start',
        gap: '10px'
	};
	const sns1 = {
	    borderRadius: '8px',
        backgroundImage: `url(${twi})`,
		backgroundSize: 'contain',
		backgroundRepeat: 'no-repeat',
		width: '25px',
        height: '25px',
		cursor:'pointer'
	};
	const sns2 = {
	    borderRadius: '8px',
        backgroundImage: `url(${insta})`,
		backgroundSize: 'contain',
		backgroundRepeat: 'no-repeat',
		width: '25px',
        height: '25px',
		cursor:'pointer'
	};
	const sns3 = {
	    borderRadius: '8px',
        backgroundImage: `url(${gm})`,
		backgroundSize: 'contain',
		backgroundRepeat: 'no-repeat',
		width: '28px',
        height: '45px',
		cursor:'pointer'
	};
	const sns4 = {
	    borderRadius: '8px',
        backgroundImage: `url(${gt})`,
		backgroundSize: 'contain',
		backgroundRepeat: 'no-repeat',
		width: '25px',
        height: '23px',
		cursor:'pointer'
	};
	const sns5 = {
	    borderRadius: '8px',
        backgroundImage: `url(${yt})`,
		backgroundSize: 'contain',
		backgroundRepeat: 'no-repeat',
		width: '30px',
        height: '45px',
		cursor:'pointer'
	};
	const copyrStyle = {
		color: '#F5EDF7',
        textAlign: 'center',
        fontFamily: '"Andika","Arial Rounded MT", Helvetica, sans-serif',
        fontSize: '140%',
        fontStyle: 'normal',
		lineHeight: '40px'
	};
    return (
        <footer style={footerStyle} className="uk-flex uk-flex-column">
			<div  className="uk-flex-wrap uk-flex-wrap-around uk-flex-row uk-flex-between">
			<div className="uk-flex-left" style={frameStyle}>
				<div style={logoFrame} uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
					<div style={pictureStyle} ></div>
				</div>

			<div className="uk-flex-right" style={contactStyle}><p style={contactTxt}>Contact info</p>
				<div style={iconStyle}>
				    <a href="https://mobile.twitter.com/salaninalgae" target="_blank" title="Visit Twitter Profile" rel="nofollow noopener noreferrer" ><div style={sns1} ></div></a>
					<a href="https://www.instagram.com/S2_aiyumi_theb_S2/" target="_blank" title="Visit Instagram Profile" rel="nofollow noopener noreferrer" ><div style={sns2} ></div></a>
					<a href="mailto:rsomeonei@gmail.com" target="_blank" title="Send Email" rel="nofollow noopener noreferrer" ><div style={sns3} ></div></a>
					<a href="https://github.com/Aiyumi3" target="_blank" title="Visit GitHub Profile" rel="nofollow noopener noreferrer" ><div style={sns4} ></div></a>
					<a href="https://www.youtube.com/channel/UCmMrqyC2MoDLtOKmfwOlK_w?view_as=subscriber" target="_blank" title="Visit YouTube Profile" rel="nofollow noopener noreferrer" ><div style={sns5} ></div></a>
				</div>
			</div>
			</div></div>
			<amp-ad width="100vw" height="320"
					type="adsense"
					data-ad-client="ca-pub-8463433910692072"
					data-ad-slot="1257070912"
					data-auto-format="rspv"
					data-full-width="">
				<div overflow=""></div>
			</amp-ad>
			<br/>
			<div className="uk-flex uk-flex-bottom uk-flex-wrap uk-flex-wrap-around uk-position-relative uk-position-bottom-center">
				<p style={copyrStyle} className="copyright">Copyright &copy; 2023 Aiyumi S2, For Entertainment, All rights reserved.</p>
			</div>
        </footer>
	);
};
export default Footer;
