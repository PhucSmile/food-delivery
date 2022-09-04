import React, { useRef, useState } from 'react';
import './Header.scss';
import Container from 'react-bootstrap/Container';
import logo from '../../assets/images/res-logo.png';
import { NavLink, Link } from 'react-router-dom';

import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MenuIcon from '@mui/icons-material/Menu';

import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/reducer';

const nav__links = [
    {
        display: 'Home',
        path: '/home',
    },
    {
        display: 'Foods',
        path: '/foods',
    },
    {
        display: 'Cart',
        path: '/cart',
    },
    {
        display: 'Contact',
        path: '/contact',
    },
];

const Header = () => {
    const [scroll, setScroll] = useState(false);
    const showMenuRef = useRef();
    const dispatch = useDispatch();

    // Show cart ui
    const HandleShowCartUi = () => {
        dispatch(cartActions.toggleCart());
    };

    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    const ToggleMenu = () => {
        showMenuRef.current.classList.toggle('show__menu');
    };

    window.onscroll = () => {
        setScroll(window.scrollY > 80 ? true : false);
        return () => window.onscroll(null);
    };

    return (
        <header className={`Header ${scroll ? 'Header__shrink' : ''} `}>
            <Container>
                <div className="nav__wrapper d-flex align-items-center justify-center justify-content-between">
                    <div className="logo text-center">
                        <Link to="/home">
                            <img src={logo} alt="logo" />
                            <h5>Tasty Treat</h5>
                        </Link>
                    </div>

                    {/* Menu */}
                    <div className="navigation" ref={showMenuRef} onClick={ToggleMenu}>
                        <div className="menu d-flex align-items-center gap-5">
                            {nav__links.map((item, index) => (
                                <NavLink
                                    to={item.path}
                                    key={index}
                                    className={(navClass) => (navClass.isActive ? 'active__menu' : '')}
                                >
                                    {item.display}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* nav right icons */}
                    <div className="nav__right d-flex align-items-center gap-4">
                        <span className="cart__icon">
                            <ShoppingBasketOutlinedIcon className="icon" onClick={HandleShowCartUi} />
                            {totalQuantity >= 1 ? <span className="cart__badge">{totalQuantity}</span> : null}
                        </span>

                        <span className="user">
                            <Link to="/login">
                                <PersonOutlineIcon className="icon" />
                            </Link>
                        </span>

                        {/* Mobile Menu */}
                        <span className="mobile__menu" onClick={ToggleMenu}>
                            <MenuIcon className="icon" />
                        </span>
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
