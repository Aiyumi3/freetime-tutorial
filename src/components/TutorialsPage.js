import React, {useEffect, useState, useMemo} from 'react';
import { Link } from 'react-router-dom';
import useFirestore from '../hooks/useFirestore'; 
import useCreateFirestoreDocument from '../hooks/useCreateFirestoreDocument'; 
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TutorialInfoPage from './TutorialInfoPage';
import {timestamp} from "../firebase/config";
import 'uikit/dist/css/uikit.min.css'; // Підключення CSS стилів
import img1H from './bg/hairstyle/1.png';
import img2H from './bg/hairstyle/2.png';
import img3H from './bg/hairstyle/3.png';
import img1D from './bg/dishes/1.png';
import img2D from './bg/dishes/2.png';
import img3D from './bg/dishes/3.png';
import img4D from './bg/dishes/4.png';
import img5D from './bg/dishes/5.png';
import img1K from './bg/knitting/1.png';
import img2K from './bg/knitting/2.png';
import img3K from './bg/knitting/3.jpg';
import img4K from './bg/knitting/4.png';
import img5K from './bg/knitting/5.png';
import img6K from './bg/knitting/6.png';
import img1M from './bg/makeup/1.png';
import img2M from './bg/makeup/2.png';
import img3M from './bg/makeup/3.jpg';
import img4M from './bg/makeup/4.png';
import img5M from './bg/makeup/5.jpg';

const TutorialsPage = () => {
	let {tutorialName} = useParams();                              // url /dishes зчитується  :tutorialName in route
	const [title, setTitle] = useState('');
	const [error, setError] = useState('');
	                                                                  // хук для додання даних в Firestore
	const { createDocument } = useCreateFirestoreDocument(tutorialName); // example 'dishes' - назва колекції Firestore
	const handleCreateDocument = (e) => {
		e.preventDefault();

		if (title === '' ) {
			setError('Please enter text!!!');
		} else {

			const data = {
				title,
				createdAt: timestamp()
			};
			createDocument(data, title).then((response) => {
				if (response.updated) {
					// Обробка відповіді
					console.log('Дані створені');
					setTitle('');
				} else {
					setError(response.errMs);
				}
			}).catch(error => {
				// Обробка помилки
				console.error('Визвана помилка:', error);
			});
		}
		// Викликаємо функцію для створення нового документу
    };
	// Після додавання документу, дані автоматично оновляться через useFirestore
	// Використовуємо хук useFirestore для отримання даних з колекції
	const { docs } = useFirestore(tutorialName); // example 'dishes' -  назва  колекції Firestore

	// Get the image array based on the tutorialName
	const images = useMemo(() => { /* будет пересчитывать images только в том случае, если tutorialName изменится.
	Если tutorialName остается тем же, React будет использовать закэшированное значение images, избегая повторных вычислений*/
		const imagesByTutorial = {
			hairstyles: [img1H, img2H, img3H],
			dishes: [img1D, img2D, img3D, img4D, img5D],
			'knitting-crochet': [img1K, img2K, img3K, img4K, img5K, img6K],
			makeup: [img1M, img2M, img3M, img4M, img5M]
		};
		return imagesByTutorial[tutorialName] || [];
	}, [tutorialName]);
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
		<div style={{position: 'relative',
			zIndex: 11,
			backgroundImage: `url(${images[currentImage] || ''}`,
			backgroundRepeat: 'no-repeat',
			backgroundAttachment: 'fixed',
			backgroundPosition: 'center',
			backgroundSize: '100% 100%',
			backgroundBlendMode: 'multiply', transition: 'background-image 20s ease-in-out',
			boxShadow: 'rgb(156, 140, 180, 0.3) 0px 4px 15px 40px'
		}} className="uk-flex uk-flex-center">
        <div className="uk-container"><br/>

		<h1 style={{textAlign: 'left', color: '#F5EDF7', WebkitTextStroke: '1px #ad6fff',  fontSize: '200%', fontFamily: '"DynaPuff", Helvetica, display'}}> ~ { tutorialName } ~ </h1><br/><br/>
            <h2 style={{textAlign: 'center', color: '#F5EDF7', WebkitTextStroke: '1px #ad6fff',  fontSize: '180%', fontFamily: '"DynaPuff", Helvetica, display'}}
			>Create Tutorial Titles</h2>
			<br/>

			<form className="uk-flex uk-flex-center uk-flex-wrap uk-flex-wrap-stretch uk-flex-row">
			    <div className="uk-margin" style={{display: 'inline-flex', flexDirection: 'column', alignItems: 'center'}}>
                    <input style={{
						padding: '13px 12px', height: '80px', width: '311px',
						borderRadius: '50px',
						border: '1px solid #AD6FFF',
						backgroundImage: 'linear-gradient(90deg, rgba(216, 238, 231, 0.95) 0%, rgba(222, 211, 238, 0.95) 100%)',
						backgroundBlendMode: 'multiply',
						boxShadow: '4px 4px 10px 5px rgba(0, 0, 0, 0.25) inset'
					}} className="uk-input uk-form-width-medium" type="text" placeholder="enter title" aria-label="Medium" name="titles"
					value={title} onChange={(e) => {setTitle(e.target.value.trim()); setError('');}} />
				    <button className="uk-button uk-button-default" onClick={handleCreateDocument} style={{
						padding: '25px 20px', borderRadius: '50px',
						backgroundColor: '#471F3D', justifyContent: 'center',
						boxShadow: '4px 4px 15px 3px rgba(255, 255, 255, 0.58)',
						WebkitTextStroke: '1px #ad6fff', alignItems: 'center', textAlign: 'center',
						color: '#F5EDF7', transition: 'background-color 0.3s, color 0.3s'
					}}> ~ create ~</button>
				</div>
			</form>
			{ error && <div className="uk-text-center" style={{color:'red'}}>{ error }</div>}
			<br/><br/>

			<div className="uk-flex uk-flex-center uk-flex-wrap uk-flex-wrap-around">
			    <button className="uk-button uk-button-default" type="button" uk-toggle="target: #toggle-animation-multiple; animation:  uk-animation-slide-left, uk-animation-slide-bottom" style={{
					width: '200px', height: '90px', padding: '25px 20px', justifyContent: 'center', alignItems: 'center', borderRadius: '50px', display: 'flex',
					backgroundImage: 'linear-gradient(270deg, rgba(245, 237, 247, 0.95) 0%, rgba(222, 211, 238, 0.95) 100%)',
					backgroundBlendMode: 'multiply'
				}}><span className="uk-margin-small-right" uk-icon="icon: thumbnails; ratio: 2"></span> <p style={{WebkitTextStrokeColor: 'rgb(23, 27, 59)',
					WebkitTextStrokeWidth: '1px', backgroundImage: 'linear-gradient(90deg, rgba(173, 111, 255, 0.95) 0%, rgba(68, 255, 200, 0.95) 100%)',
					WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', fontFamily: '"Andika","Arial Rounded MT", Helvetica, sans-serif', fontSize: '160%', lineHeight: '40px'}}>Titles</p></button>
                <div id="toggle-animation-multiple" className="uk-card uk-card-default uk-card-body uk-margin-small" style={{
					borderRadius: '45px', display: 'flex', padding: '10px'
				}}>
				    <ul style={{gap: '25px', padding: '10px', justifyContent: 'center', alignItems: 'center'}} className="uk-grid" uk-grid="true">
					{docs.map((doc) => (  
                        <li key={doc.id}><Link to={`/tutorial/${tutorialName}/${doc.title}`}>
							<div onClick={()=>setTimeout(()=>window.location.reload(false), 1000)} className="uk-card uk-card-default uk-card-body uk-text-center uk-flex-wrap uk-flex-wrap-around titlesColor"
							style={{padding: '25px 20px', margin: '10px',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textDecoration: 'none', display: 'flex',
								width: '170px', borderRadius: '12px', backgroundColor: '#F5EDF7', color: '#AD6FFF', textAlign: 'center', transition: 'color 0.3s',
								whiteSpace: 'normal',
								overflowWrap: 'normal',
								wordBreak: 'break-word', fontFamily: '"Andika","Arial Rounded MT", Helvetica, sans-serif', fontSize: '80%', lineHeight: '45px'
								}}>
								{doc.title}
							</div>
						</Link></li>
                    ))} 
                    </ul>
				</div>     
			</div>
			<Router>

                <Route path={`/tutorial/${tutorialName}/:nameT`} component={TutorialInfoPage} />
			</Router>
        </div>
        </div>
    );
};
export default TutorialsPage;