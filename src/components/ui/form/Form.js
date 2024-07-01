import ButtonBar from '../button/ButtonBar';
import ButtonCancel from '../button/ButtonCancel';
import ButtonSubmit from '../button/ButtonSubmit';
import ToolTip from '../tooltip/ToolTip';

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