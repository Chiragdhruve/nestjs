let responseHandler = {
    sendResponse: function (response, jsonResponse, statusCode, errorMsg) {
        let finalJson = {'errorMsg': errorMsg, 'response': jsonResponse};
        response.status(statusCode).send(finalJson);
    }
};

// module.exports = responseHandlers;
