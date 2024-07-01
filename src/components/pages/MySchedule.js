import Form from "../ui/form/Form";
import FormInput from "../ui/form/FormInput";
import FormSelect from "../ui/form/FormSelect";
import FormTextArea from "../ui/form/FormTextArea";

function MySchedule() {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------
    const onSubmit = () => alert("Submit Button Clicked");

    const onCancel = () => alert("Cancel Button Clicked");

    // View ----------------------------------------
    return (
        <>
            <h1>My Schedule</h1>
            <Form onSubmit={onSubmit} onCancel={onCancel}>
                <FormInput 
                    type='text' 
                    id='firstName' 
                    name='userFirstName' 
                    label='First Name' 
                    description='Please enter a first name' 
                    errormessage='Error - must be more than 10 characters'
                    placeholder='John Smith'
                />
                <FormTextArea
                    id='complaint'
                    name='userComplaint'
                    label='Complaint Description'
                    description='Tell us more about your complaint'
                    errorMessage='Error - must be more than 10 words'
                    defaulttext='Insert default text here...'
                />
                <FormSelect
                    id='gender'
                    name='userGender'
                    label='Gender'
                    description='Please select a gender'
                    errormessage='Select a gender from the list'
                    selectoptions = {[
                        {value: 'male', displaytext: 'Male'},
                        {value: 'female', displaytext: 'Female'},
                        {value: 'nonbinary', displaytext: 'Non-Binary'},
                        {value: 'other', displaytext: 'Other'},
                        {value: 'anonymous', displaytext: 'Prefer not to say'}
                    ]}
                />
            </Form>
        </>
    );
}

export default MySchedule;