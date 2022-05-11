// VALIDATIONS
const validateName = (inputValue , validationMsgId)=>{
    console.log(inputValue);
    if (/^[a-zA-Z]+$/.test(inputValue))
    {
        return inputValue;
    }
    else
    {
        document.getElementById(validationMsgId).textContent = 'Only alphabetical characters allowed';
        document.getElementById(validationMsgId).classList.remove('hidden');
    }
}

const validateEmailAddress = (inputValue , validationMsgId)=>{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputValue))
    {
        return inputValue;
    }
    else
    {
        document.getElementById(validationMsgId).textContent = 'Enter a valid email ex:Example@email.com';
        document.getElementById(validationMsgId).classList.remove('hidden');
    }
}

const validatePassword = (inputValue , validationMsgId)=>{
    if (inputValue.length >= 8)
    {
        return inputValue;
    }
    else
    {
        document.getElementById(validationMsgId).textContent = 'Password must be at least 8 characters';
        document.getElementById(validationMsgId).classList.remove('hidden');
    }
}

const validateRePassword = (inputValue , originalPassword , validationMsgId)=>{
    if (inputValue === originalPassword)
    {
        return inputValue;
    }
    else
    {
        document.getElementById(validationMsgId).textContent = 'Passwords are not matched';
        document.getElementById(validationMsgId).classList.remove('hidden');
    }
}

