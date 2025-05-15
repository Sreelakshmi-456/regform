const form = document.getElementById('registrationForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const termsCheck = document.getElementById('termsCheck');

const monthSelect = document.getElementById('month');
const daySelect = document.getElementById('day');
const yearSelect = document.getElementById('year');

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Populate dropdowns
months.forEach((m, i) => {
  let opt = document.createElement('option');
  opt.value = (i + 1).toString().padStart(2, '0');
  opt.text = m;
  monthSelect.add(opt);
});
for (let d = 1; d <= 31; d++) {
  let opt = document.createElement('option');
  opt.value = d;
  opt.text = d;
  daySelect.add(opt);
}
for (let y = 2024; y >= 1950; y--) {
  let opt = document.createElement('option');
  opt.value = y;
  opt.text = y;
  yearSelect.add(opt);
}

// Submit handler
form.addEventListener('submit', function (e) {
  e.preventDefault();
  validateForm();
});

// Reset handler to clear error messages
form.addEventListener('reset', function () {
  document.querySelectorAll('.error').forEach(el => el.innerText = '');
});

function validateForm() {
  // Clear errors
  document.getElementById('nameError').innerText = '';
  document.getElementById('emailError').innerText = '';
  document.getElementById('phoneError').innerText = '';
  document.getElementById('passwordError').innerText = '';
  document.getElementById('confirmPasswordError').innerText = '';
  document.getElementById('dobError').innerText = '';
  document.getElementById('genderError').innerText = '';
  document.getElementById('termsError').innerText = '';

  let isValid = true;

  const nameVal = fullName.value.trim();
  const emailVal = email.value.trim();
  const phoneVal = phone.value.trim();
  const gender = document.querySelector('input[name="gender"]:checked');
  const passVal = password.value.trim();
  const confirmVal = confirmPassword.value.trim();

  // Name validation
  if (nameVal.length < 5) {
    document.getElementById('nameError').innerText = 'Name must be at least 5 characters.';
    isValid = false;
  }

  // Email validation using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailVal)) {
    document.getElementById('emailError').innerText = 'Invalid email format (e.g., email@gmail.com).';
    isValid = false;
  }

  // DOB validation
  if (!monthSelect.value || !daySelect.value || !yearSelect.value) {
    document.getElementById('dobError').innerText = 'Please select complete date of birth.';
    isValid = false;
  }

  // Phone validation
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phoneVal) || phoneVal === '1234567890') {
    document.getElementById('phoneError').innerText = 'Phone must be a 10-digit number and not "1234567890".';
    isValid = false;
  }

  // Gender validation
  if (!gender) {
    document.getElementById('genderError').innerText = 'Please select your gender.';
    isValid = false;
  }

  // Password validation
  if (
    passVal.length < 8 ||
    passVal.toLowerCase() === 'password' ||
    passVal.toLowerCase() === nameVal.toLowerCase()
  ) {
    document.getElementById('passwordError').innerText = 'Password must be at least 8 characters and not weak.';
    isValid = false;
  }

  // Confirm password
  if (confirmVal !== passVal) {
    document.getElementById('confirmPasswordError').innerText = 'Passwords do not match.';
    isValid = false;
  }

  // Terms checkbox
  if (!termsCheck.checked) {
    document.getElementById('termsError').innerText = 'You must agree by checking the box.';
    isValid = false;
  }

  if (isValid) {
    alert('Form submitted successfully!');
    form.reset();
  }
}
