import Button from './Button.jsx';
import IconCross from '../icon/IconCross.jsx';

function ButtonNo({ onClick, hasTitle=false }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------

    // View ----------------------------------------
    return (
        <Button onClick={onClick} hasTitle={hasTitle} title='No'>
            <IconCross />
        </Button>
    );
}

export default ButtonNo;