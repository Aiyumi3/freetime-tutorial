import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFirestore2 from '../hooks/useFirestore2';
import useUpdateDoc from '../hooks/useUpdateDoc';
import {timestamp, projectStorage} from "../firebase/config";
import { useHistory } from 'react-router-dom';
import useDeleteAllInfo from '../hooks/useDeleteAllInfo';
import useDeleteInfo from '../hooks/useDeleteInfo';
import 'uikit/dist/css/uikit.min.css'; // Підключення CSS стилів
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const TutorialInfoPage = () => {
    const history = useHistory();
	const { nameT } = useParams();
    const { createSubcollectionDocument } = useUpdateDoc();
//
	const [stepNumber, setStepNumber] = useState('');
	const [contInfo, setContInfo] = useState('');
	const [file, setFile] = useState('');
	const [fileType, setFileType] = useState('');
	const types = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'video/mp4', 'video/webm'];
	const [error, setError] = useState('');
    const [preview, setPreview] = useState(null);
    const [progress, setProgress] = useState(0);
    const [compl, setCompl] = useState('');
    /**/
    // Стан, щоб відстежити, чи була форма відправлена
    const [formSubmitted, setFormSubmitted] = useState(false);

	const handleFileChange = (e) => {                         //picture/video selecting
        if (e.target.files.length > 0) { // check if a file was selected
            setFile(e.target.files[0]);
            const reader = new FileReader();
            reader.onload = () => {
                const prev = reader.result;
                setPreview(prev);
            };
            reader.readAsDataURL(e.target.files[0]);
            if (types.includes(e.target.files[0].type)) {
                setFileType(e.target.files[0].type);
                setError('');
            }else {
                setFile('');
                setFileType('');
                setError('Please select image file or video file');
            }
        } 
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            if(formSubmitted) {
                if ((stepNumber === '' && contInfo === '') ||
                    (stepNumber !== '' && contInfo === '') ||
                    (stepNumber === '' && contInfo !== '')) {
                    setError('Please enter text!!!');
                    setStepNumber('');
                    setContInfo('');
                } else {
                    if (file) {
                        // створює storageRef лише коли файл вибрано
                        const storageRef = ref(projectStorage, file.name);
                        const uploadTask = uploadBytesResumable(storageRef, file);

                        uploadTask.on('state_changed', (snap) => {  //when file is changed   відправляє файл до Firebase Storage
                                let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                                setProgress(percentage);
                                    /// progress animation!!!
                                setCompl('100% completed');
                            }, (err) => {
                                setError('error:'+ err);
                            }, async () => {                //oncomplete loading file to Storage
                                try {
                                    const urlL = await getDownloadURL(uploadTask.snapshot.ref);
                                    console.log('File available at', urlL);

                                    const data = {
                                        title: nameT,
                                        stepNumber,
                                        contInfo,
                                        url: urlL,
                                        createdAt: timestamp(),
                                        filetype : fileType
                                    };
                                    console.log('Data: ', data);
                                    await createSubcollectionDocument(nameT, data); // нові дані

                                    setFile(null);
                                } catch (error) {
                                    console.error('Error getting file URL: ', error.message);
                                }
                            });
                        setStepNumber('');
                        setContInfo('');
                        setFileType('');
                        setError('');
                        setPreview(null);
                    }
                }
            }
            setFormSubmitted(true); //відмітка про відправлення форми
        } catch (error) {
            console.error('Error:', error);
            setError(error.message); // Handle and display the error
        }

    };

    //console.log(stepNumber);
     const {docs} = useFirestore2(nameT);
    // Використовуємо хук useFirestore2 для отримання даних з сабколекції


    useEffect(() => {
        const animate = setInterval(() => {
            if (progress >= 100) {
                clearInterval(animate);
                setProgress(0);
                setCompl('');
                return progress;
            }
            return progress + 10;
        }, 1000);
        return () => clearInterval(animate);
    }, [progress]);

    const { handleDeleteAll } = useDeleteAllInfo(history);

    const { handleDelete } = useDeleteInfo();

    return (
        <div style={{position: 'relative',
            zIndex: 12}} className="uk-flex uk-flex-center">
        <div className="uk-container"><br/><br/>
            <h2 style={{color: '#AD6FFF', textAlign: 'left',  fontSize: '200%', fontFamily: '"DynaPuff", Helvetica, display',
			WebkitBackgroundClip: 'text', WebkitTextStroke: '1px linear-gradient(90deg, rgba(204, 142, 164, 0.95) 0%, rgba(80, 78, 38, 0.95) 100%)',
                whiteSpace: 'normal',
                overflowWrap: 'normal',
                wordBreak: 'break-word', textShadow: '3px 0 5px black'
                }}
            >{nameT} </h2>
            <br/>

			<div className="uk-flex uk-card uk-card-default uk-grid-collapse" style={{
				borderRadius: '84px', border: '2px solid #E0EEAF', background: 'rgba(255, 255, 255, 0.45)',
				backgroundBlendMode: 'screen', boxShadow: '0px 3px 10px 3px rgba(255, 255, 255, 0.70)',
                display: 'flex', flexDirection: 'column', alignItems: 'center'
			}}>
            <form className="uk-flex uk-flex-center uk-flex-wrap uk-flex-wrap-stretch uk-flex-row">
                <div className="uk-margin" style={{display: 'inline-flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div style={{
						display: 'flex', height: '76px', justifyContent: 'center', alignItems: 'center'
					}}>
					<input className="uk-input " type="text" placeholder="enter № of step" aria-label="Medium" style={{
						height: '76px', padding: '13px 12px', borderRadius: '50px 12px 50px 50px', border: '1px solid #AD6FFF',
                        backgroundImage: 'linear-gradient(90deg, rgba(216, 238, 231, 0.95) 0%, rgba(222, 211, 238, 0.95) 100%)', backgroundBlendMode: 'multiply',
						boxShadow: '4px 4px 10px 5px rgba(0, 0, 0, 0.25) inset', fontSize: '12px'
						}} name="step"
                           value={stepNumber} onChange={(e) => {
                        const inputValue = e.target.value;
                        // Паттерн для числа
                        const numberPattern = /^[0-9]*$/;
                        if (numberPattern.test(inputValue)) {
                            // Введено корректное число, обновляем состояние
                            setStepNumber(inputValue);
                            setError(''); // Очищаем ошибку
                        } else {
                            // Введено некорректное значение, устанавливаем ошибку
                            setError('Please enter a valid number');
                            setStepNumber('');
                        }
                           }} />
                    <textarea className="uk-textarea " rows="5" placeholder="enter info" aria-label="Textarea" style={{
						height: '76px', padding: '13px 12px', borderRadius: '12px 12px 50px 50px', border: '1px solid #AD6FFF', alignItems: 'center',
                        backgroundImage: 'linear-gradient(281deg, rgba(167, 236, 193, 0.95) 2.25%, rgba(245, 237, 247, 0.95) 73.56%)', backgroundBlendMode: 'multiply',
						boxShadow: '4px 4px 10px 5px rgba(0, 0, 0, 0.25) inset', fontSize: '20px', zIndex: 1
						}} name="info"
                              value={contInfo} onChange={(e) => {setContInfo(e.target.value); setError('');}} ></textarea>
                    <div data-uk-form-custom>
                        <input type="file" accept="image/png, image/jpeg, image/jpg, image/gif, video/mp4, video/webm" onChange={handleFileChange} name="file"/>
                        <button className="uk-button uk-button-default photoSend" type="button" tabIndex="-1" style={{
							color: '#504E26', display: 'flex', alignItems: 'center', width: '79px', height: '72px', padding: '25px 20px', borderRadius: '12px 55px 55px 55px',
							backgroundColor: '#F5EDF7', transition: 'color 0.3s'
							}}><span uk-icon="icon: image; ratio: 1.5"></span></button>
                    </div>
					</div>
                    <button className="uk-button uk-button-default" onClick={handleSearch} style={{
						width: '150px', height: '73px', flexDirection: 'column',
                        padding: '25px 20px', justifyContent: 'center', alignItems: 'center', borderRadius: '50px',
                        backgroundColor: '#471F3D', boxShadow: '4px 4px 15px 3px rgba(255, 255, 255, 0.58)',
                        WebkitTextStroke: '1px #ad6fff', textAlign: 'center', color: '#F5EDF7', transition: 'background-color 0.3s, color 0.3s'
						}}> ~ add ~</button>
                    <div className="uk-flex">{
                        (fileType === 'video/mp4' || fileType === 'video/webm') ? (
                            preview &&  <video src={preview.toString()} loop muted playsInline
                                               style={{borderRadius: '45px', width: '100px'}}  ></video>
                            ):(
                                preview && <img className="uk-flex-center"
                                        style={{borderRadius: '45px', width: '100px', height:'120px'}}
                                        src={preview.toString()} alt="Preview" />
                        )}</div>
                    { error && <div className="uk-text-center" style={{color:'red'}}>{ error }</div>}
                    {file && <progress className="uk-progress" value={progress} max="100"></progress> }
                    {compl && <p className="uk-text-center">{ compl }</p>}
                </div>
            </form>
			</div>
            <br/>
            <br/>


            <button className="uk-button uk-button-default" type="button" tabIndex="-1" onClick={async () => {
                await handleDeleteAll(nameT)}} style={{ padding: '25px 20px', justifyContent: 'center', alignItems: 'center', borderRadius: '50px',
                backgroundColor: '#471F3D', boxShadow: '4px 4px 15px 3px rgba(255, 255, 255, 0.58)', height: '30px', display: 'flex',
                WebkitTextStroke: '1px #ad6fff', textAlign: 'center', color: '#F5EDF7', transition: 'background-color 0.3s, color 0.3s'}}>
                <span uk-icon="icon: trash; ratio: 1"> All</span>
            </button><br/>
            <div uk-scrollspy="cls: uk-animation-fade; target: .uk-card; delay: 500; repeat: true">
            {docs.map((doc) =>(
                <div key={doc.id} className="uk-flex uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin uk-card-hover" uk-grid="true" style={{
                    backgroundColor: 'transparent',  borderRadius: '25px'
                }}>
                    <div className="uk-flex-last@s uk-card-media-right uk-cover-container" style={{
                        backgroundImage: 'linear-gradient(90deg, rgba(148, 136, 113, 0.97) -5.64%, rgba(148, 136, 113, 0.27) 8.21%)', strokeWidth: '1px', stroke: '#948871',
						filter: 'drop-shadow(3px 5px 10px rgba(255, 255, 255, 0.25))', borderRadius: '25px', borderLeft: '3px solid #E0EEAF'
					}}>
                        <div uk-lightbox="true">
                            {(doc.filetype === 'video/mp4' || doc.filetype === 'video/webm') ? (
                                <a href={doc.url} data-caption={doc.stepNumber}>

                                    <video src={doc.url} width="600" height="200" loop muted playsInline
                                           uk-video="autoplay: inview" uk-cover="true" style={{
                                        padding: '20px 36px', borderRadius: '80px 85px 10px 85px'
                                    }}></video>

                                    <canvas width="605" height="200"></canvas>
                                </a>
                            ) : (
                                <a href={doc.url} data-caption={doc.stepNumber}>
                                    <img src={doc.url} alt="picture" uk-cover="true" style={{
                                        padding: '20px 36px', borderRadius: '80px 85px 10px 85px'}} />
                                    <canvas width="605" height="200"></canvas>
                                </a>
                            )}

                        </div>

                        <div className="uk-animation-toggle" tabIndex="0">
                        <div style={{
							transform: 'rotate(-35deg)', backgroundColor: 'transparent'
							}} className="uk-card-badge uk-label uk-animation-scale-up uk-transform-origin-bottom-right">
                            👆🏻
                        </div>
                        </div>
                    </div>
                    <div style={{
                        backgroundImage: 'linear-gradient(270deg, rgba(224, 238, 175, 0.95) 0%, rgba(71, 31, 61, 0.95) 100%)', strokeWidth: '1px', stroke: '#F5EDF7', backgroundBlendMode: 'multiply',
						filter: 'drop-shadow(3px 5px 10px rgba(255, 255, 255, 0.25))', borderRadius: '25px'
						}}>
                        <div className="uk-card-body" >
                            <div className="uk-card-badge uk-label" style={{ position: 'relative', top: '0', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(194,181,181,0.56)',
                                borderRadius: '20px', height: '35px', color: '#471F3D', fontSize: '55%', fontFamily: '"Audiowide", Helvetica, display'}}>
                                {doc.createdAt && doc.createdAt.toDate() && doc.createdAt.toDate().toLocaleString()}
                                <button className="uk-button uk-button-default" type="button" tabIndex="-1" style={{position:'relative', textAlign: 'center', fontFamily: '"Andika","Arial Rounded MT", Helvetica, sans-serif', fontSize: '160%',
                                    borderRadius: '20px', top: '-17px', right: '-15px', color: '#471F3D', padding: '2px 10px'}}
                                        onClick={async () => await handleDelete(nameT, doc.id)}>
                                    <span uk-icon="icon: trash; ratio: 1"></span>
                                </button>
                            </div>


                            <div style={{display: 'flex'}}>
                                <div style={{marginLeft: '-30px', marginTop: '-55px', marginBottom: '-29px'}}>
                                    <div style={{ width: '120px', height: '100%', backgroundColor: 'rgba(122, 82, 102, 0.95)', borderBottomRightRadius: '50%', borderTopRightRadius: '50%',
                                        clipPath: 'polygon(0% 100%, 100% 100%, 100% 0, 0% 0)', marginRight: '10px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <div uk-scrollspy="cls: uk-animation-slide-top; delay: 400; repeat: true" style={{backgroundColor: 'rgba(224,171,241,0.75)',  width: '35px', height: '34px', position: 'relative', top: '51px',
                                            transform: 'translateX(109%)', borderRadius:'90% 0 90% 0' }}>
                                        </div>
                                        <div uk-scrollspy="cls: uk-animation-slide-left; delay: 550; repeat: true"  style={{backgroundColor: 'rgba(222,179,179,0.84)',  width: '124px', height: '153px', position: 'absolute', top: '43px',
                                            transform: 'translateX(-23%)', borderRadius:'30% 90% 50% 0%' }}></div>
                                        <div uk-scrollspy="cls: uk-animation-slide-bottom; delay: 650; repeat: true" style={{backgroundColor: 'rgba(92,71,115,0.89)',  width: '114px', height: '93px', position: 'absolute', top: '65px',
                                            transform: 'translateX(-22%) rotate(-15deg)', borderRadius:'90% 70% 60% 88%' }}>
                                            <div uk-scrollspy="cls: uk-animation-fade; delay: 655; repeat: true" style={{backgroundColor: 'rgba(223,227,159,0.71)',  width: '46px', height: '40px', position: 'inherit', top: '30px',
                                                transform: 'translateX(3%) rotate(85deg)', borderRadius:'10% 70%' }}></div>
                                            <div uk-scrollspy="cls: uk-animation-fade; delay: 660; repeat: true" style={{backgroundColor: 'rgba(223,227,159,0.74)',  width: '46px', height: '40px', position: 'inherit', top: '35px',
                                                transform: 'translateX(36%) rotate(105deg)', borderRadius:'10% 70%' }}></div>
                                            <div uk-scrollspy="cls: uk-animation-fade; delay: 665; repeat: true" style={{backgroundColor: 'rgba(223,227,159,0.69)',  width: '46px', height: '40px', position: 'inherit', top: '50px',
                                                transform: 'translateX(40%) rotate(35deg)', borderRadius:'70% 10%' }}></div>
                                        </div>
                                        <h3 uk-scrollspy="cls: uk-animation-slide-left; delay: 710; repeat: true" className="uk-card-title" style={{ 
										margin: '0', position: 'absolute',  fontSize: '225%', fontFamily: '"DynaPuff", Helvetica, display', color: '#DED3EE' }}>{doc.stepNumber}</h3>
                                    </div>
                                </div>

                                <p style={{ marginLeft: '15px', color: '#171B3B',
                                    whiteSpace: 'normal', lineHeight: '40px',
                                    overflowWrap: 'normal', wordBreak: 'break-word',
                                    textAlign: 'left', fontFamily: '"Andika","Arial Rounded MT", Helvetica, sans-serif', fontSize: '65%'}}>
                                    {doc.contInfo}</p>
                            </div>

                        </div>
                    </div>
                </div>
            ))}


            </div>
        </div>
        </div>
    );
};
export default TutorialInfoPage;