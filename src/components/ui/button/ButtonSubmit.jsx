import Button from './Button.jsx';
import IconCheckmark from '../icon/IconCheckmark.jsx';

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