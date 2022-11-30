
/**
 * SUCCESS LOG
 * @param {*} message
 */
export const successLog = (message:any) => {
    console.log('\x1b[32m', message)
}

/**
 * WARNING LOG
 * @param {*} message
 */
export const warningLog =  (message:any) => {
    console.log('\x1b[33m', message)
}

/**
 * ERROR LOG
 * @param {*} message
 */
export const errorLog = (message:any) => {
    console.log('\x1b[31m', message)
}

/**
 * EXIT WITH MESSAGE
 * @param message
 */
export const  exitWithErrorMessage = (message:any) => {
    console.log('\x1b[31m', message)
    return process.exit(1)
}
