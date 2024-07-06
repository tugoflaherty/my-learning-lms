import Button from './Button.jsx';
import IconHeart from '../icon/IconHeart.jsx';

function ButtonUnfavorite({ onClick, hasTitle=false }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------

    // View ----------------------------------------
    return (
        <Button onClick={onClick} hasTitle={hasTitle} title='Remove From Favourites'>
            <IconHeart />
        </Button>
    );
}

export default ButtonUnfavorite;