const emailAddressInput = document.getElementById("emailAddress");
const passwordInput = document.getElementById("password");
const sumbitBtn = document.getElementById("submitBtn");

const userEmail = localStorage.EmailAddress;
const userPassword = localStorage.Password;
const userName = localStorage.UserName;

localStorage.clear();

const inputFieldsArr = [ emailAddressInput, passwordInput];
const validationMsgsArr = [document.getElementById('emailAddressValidation'),  document.getElementById('passwordValidation')];


const activeSubmitBtn = () => {
    if (emailAddressInput.value && passwordInput.value ) {
      sumbitBtn.classList.remove("disabled");
      validationMsgsArr.forEach((el)=>{el.classList.add('hidden')});
  
    } else {
      sumbitBtn.classList.add("disabled");
    }
  };

inputFieldsArr.forEach((el) => {el.addEventListener("input", activeSubmitBtn);});


sumbitBtn.addEventListener("click", () => {
    validationMsgsArr.forEach((el)=>{el.classList.add('hidden')});
  if (validateEmailAddress(emailAddressInput.value, "emailAddressValidation") &&
    validatePassword(passwordInput.value, "passwordValidation") ) {
        
        if (emailAddressInput.value === userEmail && passwordInput.value === userPassword )
        {
            window.localStorage.setItem("UserName",userName);
            window.localStorage.setItem("EmailAddress", userEmail);
            window.localStorage.setItem("Password", userPassword);
            window.location.replace('../../exam/exam.html')   
        }
        else
        {
            document.getElementById('passwordValidation').textContent = 'No Matching Credentials'
            document.getElementById('passwordValidation').classList.remove("hidden");
        }
    } 
  else
    {
        sumbitBtn.classList.add("disabled");
    }
});
