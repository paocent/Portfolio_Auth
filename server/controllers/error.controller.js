function handleError(req, res) {
// Your code to handle the error
}
function getErrorMessage(errMsg) {
console.log(errMsg);
return errMsg;
}
// Export the controller function
export default {
handleError: handleError,
getErrorMessage:getErrorMessage
};