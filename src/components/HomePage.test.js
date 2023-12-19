import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import HomePage from './HomePage';

test('renders the HomePage component', () => {
    render(<HomePage />);
    const elBg = document.querySelector('.uk-flex');
    expect(elBg).toBeInTheDocument();
    expect(elBg).toBeVisible();

    const aboutText = screen.getByText('A B O U T');
    expect(aboutText).toBeInTheDocument();
    expect(aboutText).toBeVisible();
});
test('shows bubbles', () => {
    render(<HomePage />);
    const bubbles = document.querySelector('.bubbles');
    expect(bubbles).toBeInTheDocument();
    expect(bubbles).toBeVisible();
});
test('displays the About content', async () => {
    render(<HomePage />);
    const aboutText = screen.getByText('A B O U T');
    userEvent.click(aboutText);
    await waitFor (() => {
        const aboutContent = document.querySelector('#offcanvasBottom');
        expect(aboutContent).toBeInTheDocument();
        expect(aboutContent).toBeVisible();

        const aboutHeadertxt = screen.getByText('~ A b o u t ~');
        expect(aboutHeadertxt).toBeInTheDocument();
        expect(aboutHeadertxt).toBeVisible();

        const aboutQ = screen.getByAltText('?');
        expect(aboutQ).toBeInTheDocument();
        expect(aboutQ).toBeVisible();

        const aboutImg = screen.getByAltText('info');
        expect(aboutImg).toBeInTheDocument();
        expect(aboutImg).toBeVisible();

        const aboutContenttxt = document.querySelectorAll('p');
        expect(aboutContenttxt.length).toBe(2);

        const btnClose = screen.getByRole('button');
        userEvent.click(btnClose);
        waitFor (() => {
            expect(aboutContent).not.toBeVisible();
        });
    });
});