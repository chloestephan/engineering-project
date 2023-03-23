

/**
 * Sauvegarde du token dans le localStorage
 * @param {string} token 
 */

let saveTokenAdmin = (token) => {
    localStorage.setItem('tokenAdmin', token)
}

/**
 * Suppression du token du localStorage
 */
let logoutAdmin = () => {
    localStorage.removeItem('tokenAdmin')
}

/**
 * Etat de la présence d'un token en localStorage
 * @returns {boolean}
 */
let isAdminLogged = () => {
    let token = localStorage.getItem('tokenAdmin')
    return !!token
}

/**
 * Sauvegarde du token dans le localStorage
 * @param {string} token 
 */

let saveTokenCustomer = (token) => {
    localStorage.setItem('tokenCustomer', token)
}

/**
 * Suppression du token du localStorage
 */
let logoutCustomer = () => {
    localStorage.removeItem('tokenCustomer')
}

/**
 * Etat de la présence d'un token en localStorage
 * @returns {boolean}
 */
let isCustomerLogged = () => {
    let token = localStorage.getItem('tokenCustomer')
    return !!token
}

// Déclaration des serivces pour import
export const accountService = {
    saveTokenAdmin, logoutAdmin, isAdminLogged, saveTokenCustomer, logoutCustomer, isCustomerLogged
}