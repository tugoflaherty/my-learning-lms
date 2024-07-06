import Button from './Button.jsx';
import IconCheckmark from '../icon/IconCheckmark.jsx';

function ButtonYes({ onClick, hasTitle=false, title='Yes' }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------

    // View ----------------------------------------
    return (
        <Button onClick={onClick} hasTitle={hasTitle} title={title}>
            <IconCheckmark />
        </Button>
    );
}

export default ButtonYes;