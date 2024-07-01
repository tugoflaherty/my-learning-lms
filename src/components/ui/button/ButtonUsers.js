import Button from './Button';
import IconUsers from '../icon/IconUsers';

function ButtonUsers({ onClick, hasTitle=false, item="" }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------

    // View ----------------------------------------
    return (
        <Button onClick={onClick} hasTitle={hasTitle} title={item}>
            <IconUsers />
        </Button>
    );
}

export default ButtonUsers;