import Button from './Button.jsx';
import IconAdd from '../icon/IconAdd.jsx';

function ButtonAdd({ onClick, hasTitle=false, item="" }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------

    // View ----------------------------------------
    return (
        <Button onClick={onClick} hasTitle={hasTitle} title={`Add ${item}`}>
            <IconAdd />
        </Button>
    );
}

export default ButtonAdd;