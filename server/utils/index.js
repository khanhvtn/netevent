//custom response

//cusResponse func is to create a custom response.
const cusResponse = (res, code, data, err) => {
    let responseTemplate = { code };
    //if an err exists
    if (err) {
        responseTemplate = {
            ...responseTemplate,
            message: 'fail',
            errMessage: err,
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
