import { NavLink } from 'react-router-dom';

import './Navbar.scss';

function Navbar() {
    // Properties ----------------------------------
    const getLinkStyle = ({isActive}) => (isActive ? 'navSelected' : null);

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------

    // View ----------------------------------------
    return (
        <nav>
            <div className='navItem'>
                <NavLink to='/' className={getLinkStyle}>
                    My Modules
                </NavLink>
            </div>
            <div className='navItem'>
                <NavLink to='/users' className={getLinkStyle}>
                    View Users
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;