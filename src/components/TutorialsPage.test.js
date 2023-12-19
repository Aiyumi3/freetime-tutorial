import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import TutorialInfoPage from './TutorialInfoPage';
import App from '../App';
import Header from "./Header";

test('TutorialsPage renders correctly', () => {
    render(<App />);
    render(<Header />);

    const btnNav = document.querySelector('.uk-button');
    userEvent.click(btnNav);

    waitFor (() => {
        const menuItem = screen.getByText('hairstyles');
        userEvent.click(menuItem);

        const btnClose = document.querySelector('.uk-offcanvas-close');
        userEvent.click(btnClose);

        const elBg = document.querySelector('.uk-flex');
        expect(elBg).toBeInTheDocument();
        expect(elBg).toBeVisible();

        const elH1 = document.querySelector('h1');
        expect(elH1).toBeInTheDocument();
        expect(elH1).toBeVisible();

        const elH2 = screen.getByText('Create Tutorial Titles');
        expect(elH2).toBeInTheDocument();
        expect(elH2).toBeVisible();

        const btnCreate = screen.getByText('~ create ~');
        expect(btnCreate).toBeInTheDocument();
        expect(btnCreate).toBeVisible();
        const inputTitle = screen.getByPlaceholderText('enter title');
        expect(inputTitle).toBeInTheDocument();
        expect(inputTitle).toBeVisible();

        const btnT = screen.getByText('Titles');
        expect(btnT).toBeInTheDocument();
        expect(btnT).toBeVisible();

        const titlesRect = document.querySelector('#toggle-animation-multiple');
        expect(titlesRect).toBeInTheDocument();
        expect(titlesRect).toBeVisible();

        expect(screen.getByText('ponytail')).toBeInTheDocument();

        const ulL = document.querySelector('ul');
        expect(ulL).toBeVisible();
        expect(ulL).toBeInTheDocument();
        expect(ulL).toHaveClass('uk-grid');
    });
});

test('TutorialsPage form and button interaction', () => {
    render(<App />);
    render(<Header />);
    const btnNav = document.querySelector('.uk-button');
    userEvent.click(btnNav);
    waitFor (() => {
        const menuItem = screen.getByText('hairstyles');
        userEvent.click(menuItem);
        const btnClose = document.querySelector('.uk-offcanvas-close');
        userEvent.click(btnClose);

        const elBg = document.querySelector('.uk-flex');
        expect(elBg).toBeInTheDocument();
        expect(elBg).toBeVisible();

        const inputElement = screen.getByPlaceholderText('enter title');
        const buttonElement = screen.getByText('~ create ~');

        expect(inputElement.value).toBe('');
        userEvent.click(buttonElement);
        const err = screen.getByText('Please enter text!!!');
        expect(err).toBeVisible();
        expect(err).toBeInTheDocument();

        fireEvent.change(inputElement, {target: {value: 'Title'}});
        expect(inputElement.value).toBe('Title');
        inputElement.cleartext();
        expect(inputElement.value).toBe('');

        const tutleBtn = screen.getByText('ponytail');
        userEvent.click(tutleBtn);
        const btnT = screen.getByText('Titles');
        userEvent.click(btnT);
        expect(document.querySelector('#toggle-animation-multiple')).toBeNull();

        render(<TutorialInfoPage />);
        const stepNumberInput = screen.getByPlaceholderText('enter № of step');
        const contInfoInput = screen.getByPlaceholderText('enter info');
        fireEvent.change(stepNumberInput, { target: { value: '1' } });
        fireEvent.change(contInfoInput, { target: { value: 'Some information' } });

        const addButton = screen.getByText('~ add ~');
        fireEvent.click(addButton);
        const errM = screen.getByText('Please select image file or video file');
        expect(errM).toBeVisible();
        expect(errM).toBeInTheDocument();

        const picture = screen.getByAltText('picture');
        expect(picture).toBeVisible();
        expect(picture).toBeInTheDocument();
        userEvent.click(picture);
        const imgOnScreen = document.querySelector('img');
        expect(imgOnScreen).toBeVisible();
        expect(imgOnScreen).toBeInTheDocument();
    });
});
