import './FormInput.scss';

function FormInput({ type, id, name, label, description=null, errormessage=null, placeholder=null, value=null, onChange, onKeyUp }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------
    
    // View ----------------------------------------
    return (
        <div className={type+'input'}>
            <label htmlFor={id}>{label}</label>
            {
                description && 
                    <p className='inputdescription'>{description}</p>
            }
            <input type={type} id={id} name={name} placeholder={placeholder} defaultValue={value} onChange={onChange} onKeyUp={onKeyUp}/>
            {
                errormessage &&
                    <p className='errormessage'>{errormessage}</p>
            }
        </div>
    );
}

export default FormInput;