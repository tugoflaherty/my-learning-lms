import ButtonBar from '../button/ButtonBar.jsx';
import ButtonCancel from '../button/ButtonCancel.jsx';
import ButtonSubmit from '../button/ButtonSubmit.jsx';
import ToolTip from '../tooltip/ToolTip.jsx';

import './Form.scss';

function Form({ children, onCancel, onSubmit }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------

    // View ----------------------------------------
    return (
        <form className='reusableform'>
            <div className='formcontents'>
                {children}
            </div>
            <div className='formbuttons'>
                <ButtonBar>
                    <ToolTip text='Click to close form'>
                        <ButtonCancel hasTitle onClick={onCancel} />
                    </ToolTip>
                    <ToolTip text='Click to save changes'>
                        <ButtonSubmit hasTitle onClick={onSubmit} />
                    </ToolTip>
                </ButtonBar>
            </div>
        </form>
    );
}

export default Form;