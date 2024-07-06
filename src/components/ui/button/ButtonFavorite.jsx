import Button from './Button.jsx';
import IconMinus from '../icon/IconMinus.jsx';

function ButtonFavorite({ onClick, hasTitle=false }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------

    // View ----------------------------------------
    return (
        <Button onClick={onClick} hasTitle={hasTitle} title='Favourite'>
            <IconMinus />
        </Button>
    );
}

export default ButtonFavorite;