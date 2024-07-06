import { Link } from 'react-router-dom';
import conferencecallfill from '../../assets/conference-call-fill.png';

import './Header.scss';

function Header() {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------

    // View ----------------------------------------
    return (
        <header>
            <Link to='/'>
                <img src={conferencecallfill} alt='Icon showing group'/>
            </Link>
            <Link to='/'>
                <h1>My Learning</h1>
            </Link>
            <div className='login'>
                <p>Welcome Graeme!</p>
            </div>
        </header>
    );
}

export default Header;