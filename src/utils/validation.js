export const validatePhoneNumber = (phoneNumber) => {
  const regex = /^[0-9]{10}$/;
  return regex.test(phoneNumber);
};

export const validateName = (name) => {
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(name);
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateAge = (birthday) => {
  const age = new Date().getFullYear() - new Date(birthday).getFullYear();
  return age >= 18;
};
