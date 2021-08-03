export const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

export const getLastMonth = () => {
    var targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() - 1);
    return targetDate;
};
