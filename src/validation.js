export default {
    name: value => value.length < 5 ? 'This field should be at least 5 characters' : undefined,
    description: (value, allData) => {
        return allData.name.length > 0 && value === '' ? 'This field cannot be empty if name is empty' : undefined
    }
};