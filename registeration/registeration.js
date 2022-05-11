const fistNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailAddressInput = document.getElementById("emailAddress");
const passwordInput = document.getElementById("password");
const rePasswordInput = document.getElementById("rePassword");
const sumbitBtn = document.getElementById("submitBtn");

const inputFieldsArr = [
    fistNameInput,
    lastNameInput,
    emailAddressInput,
    passwordInput,
    rePasswordInput,
  ];
  const validationMsgsArr = [
    document.getElementById('firstNameValidation'),
    document.getElementById('lastNameValidation'),
    document.getElementById('emailAddressValidation'),
    document.getElementById('passwordValidation'),
    document.getElementById('rePasswordValidation'),
  ];


const activeSubmitBtn = () => {
  if (
    fistNameInput.value &&
    lastNameInput.value &&
    emailAddressInput.value &&
    passwordInput.value &&
    rePasswordInput.value
  ) {
    sumbitBtn.classList.remove("disabled");
    validationMsgsArr.forEach((el)=>{el.classList.add('hidden')});

  } else {
    sumbitBtn.classList.add("disabled");
  }
};


inputFieldsArr.forEach((el) => {
  el.addEventListener("input", activeSubmitBtn);
});

sumbitBtn.addEventListener("click", () => {
    validationMsgsArr.forEach((el)=>{el.classList.add('hidden')});
  if (
    validateName(fistNameInput.value, "firstNameValidation") &&
    validateName(lastNameInput.value, "lastNameValidation") &&
    validateEmailAddress(emailAddressInput.value, "emailAddressValidation") &&
    validatePassword(passwordInput.value, "passwordValidation") &&
    validateRePassword(rePasswordInput.value,passwordInput.value,"rePasswordValidation")
  ) {
    window.localStorage.setItem(
      "UserName",
      fistNameInput.value + " " + lastNameInput.value
    );
    window.localStorage.setItem("EmailAddress", emailAddressInput.value);
    window.localStorage.setItem("Password", passwordInput.value);
    window.location.replace("login/login.html");
  } else {
    sumbitBtn.classList.add("disabled");
  }
});
