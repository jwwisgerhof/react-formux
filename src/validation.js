export default formData => {
    const errors = {};
    errors.name = formData.name.length < 5 ? 'This field should be at least 5 characters' : undefined;

    // Arbitrary re-render test
    if (!errors.name && (!formData.description || formData.description === '')) {
        errors.description = 'If username is empty, description cannot be empty';
    }

    return errors;
};