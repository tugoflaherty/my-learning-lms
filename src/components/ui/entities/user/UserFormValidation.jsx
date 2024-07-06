const validateUserFirstnameLength = firstName => firstName.length < 2 && "First name must be more than 1 character. ";

export const validateUserFirstname = firstName => {
    return validateUserFirstnameLength(firstName);
}

const validateUserLastnameLength = lastName => lastName.length < 3 && "Last name must be more than 2 characters. ";

export const validateUserLastname = lastName => {
    return validateUserLastnameLength(lastName);
}

const validateUserEmailFormat = email => !(/^([\w.-]+)@([\w-]+)((\.(\w){2,3})+)$/.test(email)) && "User email must be in a valid email format. ";

export const validateUserEmail = email => {
    return validateUserEmailFormat(email);
}

const validateUserImageFormat = image => !(/^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?(#([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?)?$/.test(image)) && "User image must be in a valid URL format. ";

export const validateUserImage = image => {
    return validateUserImageFormat(image);
}

export const realtimeValidator = event => {
    if (event.target.name === 'UserFirstname') var userFirstnameValidation = validateUserFirstname(event.target.value);
    if (event.target.name === 'UserLastname') var userLastnameValidation = validateUserLastname(event.target.value);
    if (event.target.name === 'UserEmail') var userEmailValidation = validateUserEmail(event.target.value);
    if (event.target.name === 'UserImageURL') var userImageURLValidation = validateUserImage(event.target.value);
    return{
        UserFirstname: userFirstnameValidation,
        UserLastname: userLastnameValidation,
        UserEmail: userEmailValidation,
        UserImageURL: userImageURLValidation
    };
}