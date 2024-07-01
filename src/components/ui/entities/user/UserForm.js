import { useState } from "react";

import Form from "../../form/Form";
import FormInput from "../../form/FormInput";
import FormSelect from "../../form/FormSelect";
import { validateUserFirstname, validateUserLastname, validateUserEmail, validateUserImage, realtimeValidator } from "./UserFormValidation";

import '../../form/FormInput.scss';

function UserForm({ onSubmit, onCancel, existingUser=null }) {
    // Properties ----------------------------------
    if (!existingUser) existingUser = { UserFirstname: "", UserLastname: "", UserEmail: "", UserPassword: "", UserRegistered: false, UserUsertypeID: 0, UserLevel: 0, UserImageURL: "" };

    // Hooks ---------------------------------------
    const [userForm, setUserForm] = useState(existingUser);
    const [errors, setErrors] = useState(Object.keys(existingUser).reduce((accum, key) => ({ ...accum, [key]: null }), {}));
    const [noFormInput, setNoFormInput] = useState(false);

    // Context -------------------------------------

    // Methods -------------------------------------

    const handleSubmit = (event) => {
        event.preventDefault();
        userForm.UserUsertypeID = parseInt(userForm.UserUsertypeID);
        userForm.UserLevel = parseInt(userForm.UserLevel);

        if (userForm.UserFirstname !== "" || userForm.UserLastname !== "" || userForm.UserEmail !== "" || userForm.UserUsertypeID !== 0 || userForm.UserLevel !== 0 || userForm.UserImageURL !== "") {
            setNoFormInput(false);
            setErrors({
                UserFirstname: validateUserFirstname(userForm.UserFirstname),
                UserLastname: validateUserLastname(userForm.UserLastname),
                UserEmail: validateUserEmail(userForm.UserEmail),
                UserImageURL: validateUserImage(userForm.UserImageURL)
            });

            if (!errors.UserFirstname && !errors.UserLastname && !errors.UserEmail && !errors.UserImageURL) {
                onSubmit(userForm);
            }
        }
        else {
            setNoFormInput(true);
        }
    }

    const handleChange = (event) => {
        setNoFormInput(false);
        setUserForm({ ...userForm, [event.target.name]: event.target.value });
    }

    const handleKeyUp = (event) => {
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
                    id='userfirstname'
                    name='UserFirstname'
                    label='First Name'
                    description='Enter the first name of the user'
                    errormessage={errors.UserFirstname}
                    placeholder='Johnny'
                    value={userForm.UserFirstname}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                />
                <FormInput 
                    type='text'
                    id='userlastname'
                    name='UserLastname'
                    label='Last Name'
                    description='Enter the last name of the user'
                    errormessage={errors.UserLastname}
                    placeholder='Appleseed'
                    value={userForm.UserLastname}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                />
                <FormInput 
                    type='text'
                    id='useremail'
                    name='UserEmail'
                    label='Email Address'
                    description='Enter the email address of the user'
                    errormessage={errors.UserEmail}
                    placeholder='johnny.appleseed@icloud.com'
                    value={userForm.UserEmail}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                />
                <FormSelect
                    id='usertype'
                    name='UserUsertypeID'
                    label='User Type'
                    description='Enter the role of the user'
                    errormessage={errors.UserUsertypeID}
                    selectoptions = {[
                        {value: 1, displaytext: 'Administrator'},
                        {value: 2, displaytext: 'Module Leader'},
                        {value: 3, displaytext: 'Lecturer'},
                        {value: 4, displaytext: 'Teaching Assistant'},
                        {value: 5, displaytext: 'Student'}
                    ]}
                    value={userForm.UserUsertypeID}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                />
                <FormSelect
                    id='userlevel'
                    name='UserLevel'
                    label='User Level'
                    description='Enter the level of the user'
                    errormessage={errors.UserLevel}
                    selectoptions = {[
                        {value: 3, displaytext: '3'},
                        {value: 4, displaytext: '4'},
                        {value: 5, displaytext: '5'},
                        {value: 6, displaytext: '6'},
                        {value: 7, displaytext: '7'}
                    ]}
                    value={userForm.UserLevel}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                />
                <FormInput 
                    type='text'
                    id='userimage'
                    name='UserImageURL'
                    label='User Image'
                    description='Enter the image url of the user'
                    errormessage={errors.UserImageURL}
                    placeholder='https://www.images.com/mypic.jpg'
                    value={userForm.UserImageURL}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                />
            </Form>
        </>
    );
}

export default UserForm;