export const validateEnquiry = (formData) => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!/^\d{10}$/.test(formData.phone)) {
    errors.phone = "Enter a valid 10-digit phone number";
  }

  if (!formData.projectType) {
    errors.projectType = "Select a project type";
  }

  if (!formData.budget) {
    errors.budget = "Select your estimated budget";
  }

  if (!formData.location.trim()) {
    errors.location = "Project location is required";
  }

  if (!formData.message.trim()) {
    errors.message = "Please describe your project";
  }

  return errors;
};