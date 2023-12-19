import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import Header from './Header';
import App from '../App';

test('displays the search input field and clicks to search',  () => {
    render(<Header />);
    const searchInput = screen.getByPlaceholderText('Search title');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toBeVisible();
    act(() => {
        userEvent.type(searchInput, 'ponytail');
        expect(searchInput).toHaveValue('ponytail');
    });
    const btnSearch = document.querySelector('.uk-search-icon-flip');
    expect(btnSearch).toBeInTheDocument();
    expect(btnSearch).toBeVisible();
    userEvent.click(btnSearch);
    expect(searchInput).not.toHaveFocus();
});

test('displays logo', () => {
    render(<Header />);
    const el = document.querySelector('.uk-navbar-right');
    expect(el).toBeInTheDocument();
    expect(el).toBeVisible();
    expect(el).toContainHTML('<div style="display: flex; width: 91px; height: 53px; justify-content: center; align-items: center; flex-shrink: 0;" uk-scrollspy="cls: uk-animation-slide-right; repeat: true"><div style="display: flex; height: 53px; padding: 10px; justify-content: center; align-items: center; gap: 10px; flex: 1 0 0px; border-radius: 8px; background-image: url(logo.png); background-size: contain; background-repeat: no-repeat;" /></div>');
});

test('displays the nav button', () => {
    render(<Header />);
    const btnNav = document.querySelector('.uk-button');
    expect(btnNav).toBeInTheDocument();
    expect(btnNav).toBeVisible();
});

test('renders the Menu component', async () => {
    render(<App />);
    render(<Header />);
    const btnNav = document.querySelector('.uk-button');
    userEvent.click(btnNav);
    await waitFor (() => {
        const menu = document.querySelector('#offcanvas-slide');
        expect(menu).toBeInTheDocument();
        expect(menu).toBeVisible();

        const menuElement = screen.getByText('Community');
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toBeVisible();

        const menuItems = document.querySelectorAll('.routeMenu');
        const menuItems2 = document.querySelectorAll('.routeMenuTxt');
        expect(menuItems.length).toBe(4);
        expect(menuItems2.length).toBe(4);

        const link = document.querySelector('a');
        expect(link).toBeInTheDocument();
        expect(link).toBeVisible();
        userEvent.click(link);

        const btnClose = document.querySelector('.uk-offcanvas-close');
        expect(btnClose).toBeInTheDocument();
        expect(btnClose).toBeVisible();
        userEvent.click(btnClose);

        waitFor (() => {
            expect(menu).toBeNull();
        });
    });
});