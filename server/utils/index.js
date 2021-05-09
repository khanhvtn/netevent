//custom response

//cusResponse func is to create a custom response.
const cusResponse = (res, code, data, errors) => {
    let responseTemplate = { code };
    //if an err exists
    if (errors) {
        responseTemplate = {
            ...responseTemplate,
            message: 'fail',
            errors,
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
