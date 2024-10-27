const validateFields = (fields, values) => {
  let errors = {};
  fields.forEach(({ name, rules }) => {
    const value = values[name];

    rules.forEach((rule) => {
      if (rule.type === "required" && !value) {
        errors[name] = rule.message || `${name} is required.`;
      }

      if (rule.type === "minLength" && value.length < rule.length) {
        errors[name] =
          rule.message || `${name} must be at least ${rule.length} characters.`;
      }

      if (rule.type === "exactLength" && value.length !== rule.length) {
        errors[name] =
          rule.message || `${name} should have ${rule.length} numbers.`;
      }
      if (rule.type === "email" && !/\S+@\S+\.\S+/.test(value)) {
        errors[name] = "Invalid Email";
      }
      if (rule.type === "match" && value !== values[rule.matchField]) {
        errors[name] = rule.message || `${name} must match ${rule.matchField}.`;
      }
      if (rule.type === "validPhNumber" && !/^(09)[0-9]{9}$/.test(value)) {
        errors[name] = 'Phone number should start with "09"';
      }
    });
  });

  return errors;
};

const isFormValid = (fields, form, setErrors) => {
  const errors = validateFields(fields, form);

  setErrors(errors);
  return Object.keys(errors).length === 0;
};

export { isFormValid };
