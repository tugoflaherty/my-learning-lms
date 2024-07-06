import Button from './Button.jsx';
import IconTrashCan from '../icon/IconTrashCan.jsx';

function ButtonDelete({ onClick, hasTitle=false }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------

    // View ----------------------------------------
    return (
        <Button onClick={onClick} hasTitle={hasTitle} title='Delete'>
            <IconTrashCan />
        </Button>
    );
}

export default ButtonDelete;