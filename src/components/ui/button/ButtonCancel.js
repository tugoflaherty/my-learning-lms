import Button from './Button';
import IconCross from '../icon/IconCross';

function ButtonCancel({ onClick, hasTitle=false }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------

    // View ----------------------------------------
    return (
        <Button onClick={onClick} hasTitle={hasTitle} title='Cancel'>
            <IconCross />
        </Button>
    );
}

export default ButtonCancel;