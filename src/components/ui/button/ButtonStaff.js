import Button from './Button';
import IconEducation from '../icon/IconEducation';

function ButtonStaff({ onClick, hasTitle=false }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------

    // View ----------------------------------------
    return (
        <Button onClick={onClick} hasTitle={hasTitle} title='Show Staff'>
            <IconEducation />
        </Button>
    );
}

export default ButtonStaff;