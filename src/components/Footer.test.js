import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Footer from './Footer';
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

test('renders logo', async () => {
    render(<Footer />);
    const logo = document.querySelector('.uk-flex-left');
    expect(logo).toBeInTheDocument();
    expect(logo).toBeVisible();
    await waitFor (() => {
        expect(logo).toContainHTML('<div uk-scrollspy="cls: uk-animation-slide-left; repeat: true"><div style="padding: 10px; background-image: url(logo.png); background-size: contain; background-repeat: no-repeat;" /></div>');
    });
});

test('clicks the social media icons',  () => {
    render(<Footer />);
    const snsLink = document.querySelector('a');
    expect(snsLink).toBeInTheDocument();
    expect(snsLink).toBeVisible();
    userEvent.click(snsLink);
});
test('displays the social media icons', () => {
    render(<Footer />);
    const snsLink = screen.getAllByRole('link');
    expect(snsLink.length).toBe(5);
});

test('displays the text', () => {
    render(<Footer />);
    const contactInfoText = screen.getByText('Contact info');
    expect(contactInfoText).toBeInTheDocument();
    expect(contactInfoText).toBeVisible();

    const copyrightText = screen.getByText('Copyright © 2023 Aiyumi S2, For Entertainment, All rights reserved.');
    expect(copyrightText).toBeVisible();
    expect(copyrightText).toBeInTheDocument();
});
