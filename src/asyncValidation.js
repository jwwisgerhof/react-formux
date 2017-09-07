export default {
    name: (value, formData) => new Promise((resolve, reject) => {
        window.setTimeout(() => {
            resolve(value.length > 6 ? 'Cannot be longer than 6 characters!' : undefined);
        }, 10);
    }),
    description: (value, formData) => new Promise(resolve => {
        window.setTimeout(() => {
            resolve(value && value.length > 6 ? 'Description is too long!' : undefined);
        }, 2000);
    })
};