const signupValidation = (signupData) => {
  const error = {};

  if (!signupData.firstName?.trim()) {
    error.firstName = "First name is required";
  }

  if (!signupData.lastName?.trim()) {
    error.lastName = "Last name is required";
  }

  if (!signupData.email?.trim()) {
    error.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) {
    error.email = "Invalid email";
  }

  if (!signupData.password?.trim()) {
    error.password = "Password is required";
  } else if (signupData.password.length < 6) {
    error.password = "Minimum 6 characters required";
  }

  if (!signupData.confirmPassword?.trim()) {
    error.confirmPassword = "Confirm password is required";
  } else if (signupData.password !== signupData.confirmPassword) {
    error.confirmPassword = "Passwords do not match";
  }

  return error;
};

export default signupValidation;
