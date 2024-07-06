import Button from './Button.jsx';
import IconHeart from '../icon/IconHeart.jsx';

function ButtonShowFavorites({ onClick, hasTitle=false }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------

    // View ----------------------------------------
    return (
        <Button onClick={onClick} hasTitle={hasTitle} title='Show Favourites'>
            <IconHeart />
        </Button>
    );
}

export default ButtonShowFavorites;