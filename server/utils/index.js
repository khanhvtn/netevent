//custom response

//cusResponse func is to create a custom response.
const cusResponse = (res, code, data, errMessage) => {
    let responseTemplate = { code };
    //if an err exists
    if (errMessage) {
        responseTemplate = {
            ...responseTemplate,
            message: 'fail',
            errMessage,
        };
    } else {
        //otherwise
        responseTemplate = { ...responseTemplate, message: 'success', data };
    }

    return res.status(code).json(responseTemplate);
};

module.exports = {
    cusResponse,
};
