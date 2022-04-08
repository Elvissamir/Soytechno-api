const passwordComplexity = require('joi-password-complexity')
const rules = require('../rules/userRules')

const passwordOptions = {
    min: rules.passwordMinChars,
    max: rules.passwordMaxChars,
    lowerCase: rules.passwordLowerCase,
    upperCase: rules.passwordUpperCase,
    numeric: rules.passwordNumeric,
    symbol: rules.passwordSymbol,
    requirementCount: 5
}
 
module.exports = function (password) {
    return passwordComplexity(passwordOptions, 'Password').validate(password)
}