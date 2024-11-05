import {ReactComponent as BorderFooter} from './../../assets/border-footer.svg';
import './Footer.scss';

export const Footer = () => {

    return(
        <>
            <footer>
                <BorderFooter className='border-footer' />
                <h3>Copyright ©2024 Clinica Passo a Passo. Todos os direitos reservados.</h3>
            </footer>
        </>
    );
}

export default Footer;