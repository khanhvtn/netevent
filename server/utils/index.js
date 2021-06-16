/* 
    @Description
    cusResponse func is to create a custom response.

    @Parameter
    res is response func from Express.
    code is HTTP response status code.
 */
const cusResponse = (res, code, data, errors, totalPages) => {
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
        responseTemplate = {
            ...responseTemplate,
            message: 'success',
            data,
            total: data ? data.length : 0,
        };
        if (totalPages) {
            responseTemplate = {
                ...responseTemplate,
                totalPages,
            };
        }
    }

    return res.status(code).json(responseTemplate);
};
const createPersistentDownloadUrl = (bucket, fileName, downloadToken) => {
    return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${fileName}.jpg?alt=media&token=${downloadToken}`;
};

module.exports = {
    cusResponse,
    createPersistentDownloadUrl,
};
