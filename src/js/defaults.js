/**
 * Default options
 * @returns {object} Shell default options
 * @public
 */
const defaults = {

    /**
     * @property {string} user The logged user
     */
    user: 'user',

    /**
     * @property {string} host The local host
     */
    host: 'host',

    /**
     * @property {string} path The current path displayed in the terminal
     */
    path: '~',

    /**
     * @property {string} style The operating system (ubuntu || osx || windows || default)
     */
    style: 'default',

    /**
     * @property {string} theme The theme (dark || light)
     */
    theme: 'dark',

    /**
     * @property {(boolean|function)} theme Adds the Typed.js integration
     */
    typed: false,

    /**
     * @property {boolean} responsive If true the terminal will be fluid
     */
    responsive: false,

    /**
     * @property {array} commands The commands list
     */
    commands: [],

    /**
     * @property {boolean} root If logged user is root or not
     */
    root: false
};

export default defaults;