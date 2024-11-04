import { List } from 'react-bootstrap-icons';
import './Header.scss';
import {ReactComponent as BorderHeader } from './../../assets/border-header.svg';

export const Header = () => {

    return(
        <header>
            <div className='header-container'>
                <button className='menu btn' >
                    <List/>
                </button>
            </div>
            <BorderHeader className='border-header'/>
        </header>
    );
}

export default Header;