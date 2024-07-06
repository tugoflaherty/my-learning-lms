import Button from './Button.jsx';
import IconEducation from '../icon/IconEducation.jsx';

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