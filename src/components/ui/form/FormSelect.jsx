import './FormInput.scss';

function FormSelect({ id, name, label, description=null, errormessage=null, selectoptions=[], children, value=null, onChange, onKeyUp }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------
    
    // View ----------------------------------------
    return (
        <div className='selectinput'>
            <label htmlFor={id}>{label}</label>
            {
                description &&
                    <p className='inputdescription'>{description}</p>
            }
            <select id={id} name={name} defaultValue={value} onChange={onChange} onKeyUp={onKeyUp}>
                {selectoptions.map(selectoption => {
                    return (
                        <option 
                            key={selectoption.value} 
                            value={selectoption.value}
                        >
                            {selectoption.displaytext}
                        </option>
                    );
                })}
                {children}
            </select>
            {
                errormessage &&
                    <p className='errormessage'>{errormessage}</p>
            }
        </div>
    );
}

export default FormSelect;