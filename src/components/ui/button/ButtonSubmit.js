import Button from './Button';
import IconCheckmark from '../icon/IconCheckmark';

function ButtonSubmit({ onClick, hasTitle=false }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------

    // View ----------------------------------------
    return (
        <Button onClick={onClick} hasTitle={hasTitle} title='Submit'>
            <IconCheckmark />
        </Button>
    );
}

export default ButtonSubmit;