
const form = document.querySelector('#form')
const username = document.querySelector('#username')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const cpassword = document.querySelector('#cpassword')

form.addEventListener('submit',(e)=>{    // e --> returns event; checking the form using form
   if(!validateInputs()){
     e.preventDefault()      // if error is thrown form shouldn't be submited so prevenDefault is used
   }
   else{
    alert('Successfully Registered') 
   }
  
})

function validateInputs(){
    const usernameVal = username.value.trim()    // trim --> removes extra space
    const emailVal = email.value.trim()  
    const passwordVal = password.value.trim()  
    const cpasswordVal = cpassword.value.trim()
    let success = true
    if(usernameVal === ''){
        success = false
        setError(username,'Username is required')
    }
    else{
        setSuccess(username)
    }

    if(emailVal === ''){
        success = false
        setError(email,'Email is required')
    }
    else if(!validateEmail(emailVal)){
        success = false
        setError(email,'Enter vaild email')
    }
    else{
        setSuccess(email)
    }
       
    if(passwordVal === ''){
        success = false
        setError(password,'Password is required')
    }
    else if(passwordVal.length<8){
        success = false
        setError(password,'Password must be atleast 8 characters')
    }
    else{
        setSuccess(password)
    }

    if(cpasswordVal === ''){
        success = false
        setError(cpassword,'Confirm Password is required')
    }
    else if(cpasswordVal !== passwordVal){
        success = false
        setError(password,'Password does not match')
    }
    else{
        setSuccess(cpassword)
    }
    return success
}
// eg - element: password, msg - passwd is req.
function setError(element,message){     // throwing error msg
    const inputGroup = element.parentElement // get the parent tag of the element in html
    const errorElement = inputGroup.querySelector('.error')  // get the error tag inside the given parent element, so that inputGroup is used instead of document
    errorElement.innerText = message;
    inputGroup.classList.add('error')
    inputGroup.classList.remove('success')
}

function setSuccess(element){     
    const inputGroup = element.parentElement 
    const errorElement = inputGroup.querySelector('.error')  
    errorElement.innerText = '';
    inputGroup.classList.add('success')
    inputGroup.classList.remove('error')
}

const validateEmail = (email)=>{
    return String(email).toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}