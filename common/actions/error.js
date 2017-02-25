// Global error handling, usefull for handling 404, 403, 500 request statuses
export const SEND_ERROR_TO_SERVER_FAIL = 'SEND_ERROR_TO_SERVER_FAIL';
export const SEND_ERROR_TO_SERVER_SUCCESS = 'SEND_ERROR_TO_SERVER_SUCCESS';

export const THROW_ERROR = (error) => {
    console.error(error)
}

export const SEND_ERROR_TO_SERVER = (error) => {

}
