import IconHeart from '../icon/IconHeart.jsx';

import './Button.scss';

function ButtonFavoriteOverlay({ children, unFavorite }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------

    // View ----------------------------------------
    return (
        <div className='favoriteoverlay'>
            {
                <div className='favorite' onClick={unFavorite}>
                    <IconHeart />
                </div>
            }
            {children}
        </div>
    );
}

export default ButtonFavoriteOverlay;