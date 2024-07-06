import { useState, useEffect } from "react";

import { apiRequest } from "../../../api/API.jsx";

import Form from "../../form/Form.jsx";
import FormInput from "../../form/FormInput.jsx";
import FormSelect from "../../form/FormSelect.jsx";
import { validateModuleName, validateModuleCode, validateModuleLevel, validateModuleLeader, validateModuleImage, realtimeValidator } from "./ModuleFormValidation.jsx";

import '../../form/FormInput.scss';

function ModuleForm({ onSubmit, onCancel, existingModule=null }) {
    // Properties ----------------------------------
    if (!existingModule) existingModule = { ModuleName: "", ModuleCode: "", ModuleLevel: 3, ModuleLeaderID: 0, ModuleImageURL: "" };

    // Hooks ---------------------------------------
    const [loadingMessage, setLoadingMessage] = useState("Loading Users...");
    const [users, setUsers] = useState(null);
    const [moduleForm, setModuleForm] = useState(existingModule);
    const [errors, setErrors] = useState(Object.keys(existingModule).reduce((accum, key) => ({ ...accum, [key]: null }), {}));
    const [noFormInput, setNoFormInput] = useState(false);

    // Context -------------------------------------
    useEffect(() => { fetchUsers() }, []);

    // Methods -------------------------------------
    const fetchUsers = async () => {
        const outcome = await apiRequest('Users');
        if (outcome.success) setUsers (outcome.response);
        else setLoadingMessage(`Error ${outcome.response.status}: Users could not be found.`);
    }

    const handleSubmit = event => {
        event.preventDefault();
        moduleForm.ModuleLevel = parseInt(moduleForm.ModuleLevel);
        moduleForm.ModuleLeaderID = parseInt(moduleForm.ModuleLeaderID);

        if (moduleForm.ModuleName !== "" || moduleForm.ModuleCode !== "" || moduleForm.ModuleLevel !== 3 || moduleForm.ModuleLeaderID !== 0 || moduleForm.ModuleImageURL !== "") {
            setNoFormInput(false);
            setErrors({
                ModuleName: validateModuleName(moduleForm.ModuleName),
                ModuleCode: validateModuleCode(moduleForm.ModuleCode),
                ModuleLevel: validateModuleLevel(moduleForm.ModuleLevel),
                ModuleLeaderID: validateModuleLeader(moduleForm.ModuleLeaderID),
                ModuleImageURL: validateModuleImage(moduleForm.ModuleImageURL)
            });
            if (!errors.ModuleName && !errors.ModuleCode && !errors.ModuleLevel && !errors.ModuleLeaderID && !errors.ModuleImageURL) {
                onSubmit(moduleForm);
            }
        }
        else {
            setNoFormInput(true);
        }
    }

    const handleChange = event => {
        setNoFormInput(false);
        setModuleForm({ ...moduleForm, [event.target.name]: event.target.value });
    }

    const handleKeyUp = event => {
        setErrors(realtimeValidator(event));
    }

    // View ----------------------------------------
    return (
        <>
            <Form onSubmit={handleSubmit} onCancel={onCancel}>
                {
                    noFormInput && <p className='errormessage'>Please complete the form before submitting.</p>
                }
                <FormInput 
                    type='text'
                    id='modulename'
                    name='ModuleName'
                    label='Module Name'
                    description='Enter the title of the module'
                    errormessage={errors.ModuleName}
                    placeholder='Games Programming'
                    value={moduleForm.ModuleName}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                />
                <FormInput 
                    type='text'
                    id='modulecode'
                    name='ModuleCode'
                    label='Module Code'
                    description='Enter the code of the module'
                    errormessage={errors.ModuleCode}
                    placeholder='CI0380'
                    value={moduleForm.ModuleCode}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                />
                <FormSelect
                    id='modulelevel'
                    name='ModuleLevel'
                    label='Module Level'
                    description='Enter the level of the module'
                    errormessage={errors.ModuleLevel}
                    selectoptions = {[
                        {value: '3', displaytext: '3'},
                        {value: '4', displaytext: '4'},
                        {value: '5', displaytext: '5'},
                        {value: '6', displaytext: '6'},
                        {value: '7', displaytext: '7'}
                    ]}
                    value={moduleForm.ModuleLevel}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                />
                <FormSelect
                    id='moduleleaderid'
                    name='ModuleLeaderID'
                    label='Module Leader'
                    description='Select a module leader from the list'
                    errormessage={errors.ModuleLeaderID}
                    selectoptions={[{value:'0', displaytext: 'Select a module leader'}]}
                    value={moduleForm.ModuleLeaderID}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                >
                    {
                        !users
                            ? <option key='0' value='0'>{loadingMessage}</option>
                            : users.length === 0
                                ? <option key='0' value='0'>No users found</option>
                                : users.map((user) => 
                                    <option 
                                        key={user.UserID} 
                                        value={user.UserID}
                                    >
                                        {user.UserLastname}
                                        {', '}
                                        {user.UserFirstname}
                                    </option>
                                  )
                    }
                </FormSelect>
                <FormInput 
                    type='text'
                    id='moduleimage'
                    name='ModuleImageURL'
                    label='Module Image'
                    description='Enter the image url of the module'
                    errormessage={errors.ModuleImageURL}
                    placeholder='https://www.images.com/mypic.jpg'
                    value={moduleForm.ModuleImageURL}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                />
            </Form>
        </>
    );
}

export default ModuleForm;