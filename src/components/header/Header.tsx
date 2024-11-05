import { List, X, House, PCircle, Person } from 'react-bootstrap-icons';
import './Header.scss';
import {ReactComponent as BorderHeader } from './../../assets/border-header.svg';
import logo from './../../assets/Logo-Passo-a-Passo.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const [isOpenMenu, setIsOpenMenu] = React.useState(false);
    const navigate = useNavigate();


    const goToPage = (page: string) => {
        navigate(page);
    }

    return(
        <header>
            <div className='header-container'>
                <button className='menu-btn btn' >
                    <List onClick={() => setIsOpenMenu(!isOpenMenu)}/>
                </button>
                <div className={`menu ${!isOpenMenu ? 'close' : 'open'}`}>
                    <div className='menu-header'>
                        <X onClick={() => setIsOpenMenu(!isOpenMenu)}/>
                    </div>
                    <div className='logo-container'>
                        <span>Clinica</span>
                        <img className='logo' src={logo} alt="Logo" />
                        <span>Passo a Passo</span>
                    </div>
                    <div className='menu-items'>
                        <div className='item' onClick={() => goToPage('/')}>
                            <House />
                            <h3>Home</h3>
                        </div>
                        <div className='item' onClick={() => goToPage('/cadastrar-paciente')}>
                            <PCircle />
                            <h3>Cadastrar</h3>
                        </div>
                        <div className='item' onClick={() => goToPage('/pacientes')}>
                            <Person />
                            <h3>Pacientes</h3>
                        </div>
                    </div>
                </div>
                <div className={`menu-background ${!isOpenMenu ? 'close' : ''}`} onClick={() => setIsOpenMenu(!isOpenMenu)}></div>
            </div>
            <BorderHeader className='border-header'/>
        </header>
    );
}

export default Header;