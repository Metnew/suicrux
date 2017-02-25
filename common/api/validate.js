// Functions for <InputComponent /> validation,
// feel free to remove this file and InputComponent.jsx,
// if you dont like to work with forms using this approach.
export function maxSize(num, error='Value is too long') {
    return function(value, field) {
        if (value) {
            return value.length > num ? error : true
        }
    }
}

export function noSpace(str, field) {
    // trully can't get why do we need this check,
    // but without it on /profile/settings page we get error
    if (str !== undefined) {
        return true;
    }
    return str.match(/[^-\s]/g) ? true : false
}

export function isRequired(str, field) {
    if (str && str.length === 0) {
        return `Please, enter your ${field}`
    }
    return true
}

export function latin(str, field) {
    return str.match(/[a-zA-Z0-9]+/g)? true : false
}

export function number(str, field) {
    return str.match(/\d+/g)? true : false
}

export function email() {}

export function phone() {}

export function composition(array) {
    return function(value, field) {
        for (var i = 0; i < array.length; i++) {
            if (array[i](value, field) !== true) {
                return array[i](value, field)
            }
        }
        return false
    }
}

export default {
    isRequired,
    phone,
    email,
    noSpace,
    number,
    latin,
    maxSize,
    composition
}
