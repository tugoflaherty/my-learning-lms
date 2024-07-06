import Button from './Button.jsx';
import IconPencil from '../icon/IconPencil.jsx';

function ButtonEdit({ onClick, hasTitle=false }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------

    // View ----------------------------------------
    return (
        <Button onClick={onClick} hasTitle={hasTitle} title='Edit'>
            <IconPencil />
        </Button>
    );
}

export default ButtonEdit;