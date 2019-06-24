document.querySelector("#name").addEventListener('blur', validateName);

function validateName(){
    let re = /^[a-zA-z]{2,10}$/i;
    let name = document.querySelector("#name");

    if(name.value == ''){
        return;
    }

    if(!re.test(name.value)){
        name.classList.add('is-invalid');
    } else {
        name.classList.remove('is-invalid');
    }
}