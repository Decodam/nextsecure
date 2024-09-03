export function checkPasswordStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength++;

  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;

  if (/\d/.test(password)) strength++;

  if (/[@$!%*?&#]/.test(password)) strength++;

  return strength;
}