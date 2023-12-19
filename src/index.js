import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import 'uikit/dist/css/uikit.min.css'; // Підключення CSS стилів

UIkit.use(Icons); // Активація розширення для іконок

// v 18.2.0
const mainRoot = document.querySelector('#root');

ReactDOM.createRoot(mainRoot).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);



/////
/*
ReactDOM.render(
    <React.StrictMode>
        <App  />
    </React.StrictMode>,
    document.querySelector('#root')
);*/

