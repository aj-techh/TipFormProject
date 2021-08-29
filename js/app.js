//grab first batch
const billAmountInput = document.querySelector('#input-bill');
const sharingQuantityInput = document.querySelector('#input-users');
const submitButton = document.querySelector('.submitBtn');
const serviceInput = document.querySelector('#input-service');

//grab text to overwrite
const resultsDiv = document.querySelector('#results')
const tipAmountText = document.querySelector('#tip-amount');
const totalAmountText = document.querySelector('#total-amount');
const personAmountText = document.querySelector('#person-amount');
const loader = document.querySelector('#loader');


const PRICE_REGEX = /^\d+\.\d{2}$/;
const SERVICE_INFO = [{
    optionValue: 1,
    calcPercentValue: 20,
    optionText: 'Great! - 20%'
},{
    optionValue: 2,
    calcPercentValue: 10,
    optionText: 'Good! - 10%'
},{
    optionValue: 3,
    calcPercentValue: 5,
    optionText: 'Minimal - 5%'
},{
    optionValue: 4,
    calcPercentValue: 0,
    optionText: 'Skip'
}]

//FUNCTION TO POPULATE SERVICES OPTIONS
for(let i of SERVICE_INFO){
    let opt = document.createElement('option');
    opt.value = i.optionValue;
    opt.innerHTML = i.optionText;
    serviceInput.appendChild(opt);
}

let updateTexts=(tip, total, person)=>{
    // alert(tipAmountText.textContent);
    tipAmountText.textContent = tip;
    totalAmountText.textContent = total;
    personAmountText.textContent = person;
    // setTimeout(()=>{})
    setTimeout(()=>{
        loader.classList.remove('showItem');
        resultsDiv.classList.add('showItem');
    },2000)
    setTimeout(()=>{
        resultsDiv.classList.remove('showItem');
        sharingQuantityInput.value = '';
        billAmountInput.value = '';
    },8500)

}

submitButton.addEventListener('click',(e)=>{
    e.preventDefault();
    let noOfSharers = sharingQuantityInput.value;
    billAmount = billAmountInput.value;
    if(billAmount.match(PRICE_REGEX)){
        if(parseInt(sharingQuantityInput.value)){
            //Service selection
            if(serviceInput.value!=0){
                let amendedServ = serviceInput.value-1;
                let tipAmount = (parseFloat((billAmount*(SERVICE_INFO[amendedServ].calcPercentValue/100)))).toFixed(2);
                let totalAmount = (parseFloat(billAmount)+parseFloat((billAmount*(SERVICE_INFO[amendedServ].calcPercentValue/100)))).toFixed(2);
                let indAmount = (totalAmount/noOfSharers).toFixed(2);
                loader.classList.add('showItem');
                updateTexts(tipAmount, totalAmount, indAmount);
            }else{
                alert('Input Service Option');
            }
        }else{
            alert('Please input valid number of people.');
        }
    } else{
        alert('Please input valid bill total.');
    }
});


