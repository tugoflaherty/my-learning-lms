import Button from './Button.jsx';
import IconCross from '../icon/IconCross.jsx';

function ButtonClose({ onClick, hasTitle=false }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------

    // View ----------------------------------------
    return (
        <Button onClick={onClick} hasTitle={hasTitle} title='Close'>
            <IconCross />
        </Button>
    );
}

export default ButtonClose;