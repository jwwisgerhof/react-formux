export default formData => {
    return [
        new Promise((resolve, reject) => {
            window.setTimeout(() => {
                resolve({name: formData.name && formData.name.length === 1 ? 'Cannot be just \'a\'!' : undefined});
            }, 1000);
        })
    ];
};