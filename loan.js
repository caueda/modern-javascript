const form = document.querySelector("#loan-form");

form.addEventListener('submit', function(e){
    //Hider results
    document.querySelector("#results").style.display = 'none';
    document.querySelector("#loading").style.display = 'block';
    setTimeout(calculateResults, 2000);
    //Show loader
    e.preventDefault();
});

//Calculate Results
function calculateResults(){
    // UI vars
    const amount = document.querySelector("#amount");
    const interest = document.querySelector("#interest");
    const years = document.querySelector("#years");
    const monthlyPayment = document.querySelector("#monthly-payment");
    const totalPayment = document.querySelector("#total-payment");
    const totalInterest = document.querySelector("#total-interest");

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);

    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly*calculatedPayments)-principal).toFixed(2);
    
        document.querySelector("#results").style.display = 'block';
        document.querySelector("#loading").style.display = 'none';
    
    } else {
        document.querySelector("#results").style.display = 'none';
        document.querySelector("#loading").style.display = 'none';
        showError('Please check your numbers');        
    }
}

function showError(error){
    //Create a div
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));
    //Get elements
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds
    setTimeout(clearError, 3000);
}

function clearError(){
    document.querySelector(".alert").remove();
}