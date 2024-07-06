const validateModuleNameLength = moduleName => moduleName.length < 8 && "Module name must be more than 8 characters. ";

export const validateModuleName = moduleName => {
    return validateModuleNameLength(moduleName);
}

const validateModuleCodeFormat = moduleCode => !(/^\D{2}\d{4}$/.test(moduleCode)) && "Module code must be in format CI5250. ";

export const validateModuleCode = moduleCode => {
    return validateModuleCodeFormat(moduleCode);
}

const validateModuleLevelNumber = moduleLevel => ((moduleLevel < 2) && (moduleLevel > 8)) && "Module level must be between 3 and 7. ";

export const validateModuleLevel = moduleLevel => {
    return validateModuleLevelNumber(moduleLevel);
}

const validateModuleLeaderIntType = moduleLeader => !parseInt(moduleLeader) && "Module Leader ID must be an integer. ";

export const validateModuleLeader = moduleLeader => {
    return validateModuleLeaderIntType(moduleLeader);
}

const validateModuleImageFormat = moduleImage => !(/^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?(#([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?)?$/.test(moduleImage)) && "Module image must be in a valid URL format. ";

export const validateModuleImage = moduleImage => {
    return validateModuleImageFormat(moduleImage);
}

export const realtimeValidator = event => {
    if (event.target.name === 'ModuleName') var moduleNameValidation = validateModuleName(event.target.value);
    if (event.target.name === 'ModuleCode') var moduleCodeValidation = validateModuleCode(event.target.value);
    if (event.target.name === 'ModuleLevel') var moduleLevelValidation = validateModuleLevel(event.target.value);
    if (event.target.name === 'ModuleLeaderID') var moduleLeaderValidation = validateModuleLeader(event.target.value);
    if (event.target.name === 'ModuleImageURL') var moduleImageValidation = validateModuleImage(event.target.value);
    return { 
        ModuleName: moduleNameValidation,
        ModuleCode: moduleCodeValidation,
        ModuleLevel: moduleLevelValidation,
        ModuleLeaderID: moduleLeaderValidation,
        ModuleImageURL: moduleImageValidation
    };
}