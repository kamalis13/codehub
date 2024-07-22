
let select = document.querySelectorAll('.currency')  // by classname currency in select
// console.log(select)
let btn = document.getElementById('btn')
let input = document.getElementById('input')
fetch('https://api.frankfurter.app/currencies')
.then((res)=>res.json())
.then(res=>displayDropDown(res))           // passing into function

function displayDropDown(res){
    // console.log(Object.entries(res))   // converts to array
    let curr = Object.entries(res)
    for(let i = 0;i<curr.length;i++){
        console.log(curr[i][0])
        let opt = `<option value="${curr[i][0]}">${curr[i][0]}</option>`
        select[0].innerHTML += opt      // each element will be added 
        select[1].innerHTML += opt      
    }
}

btn.addEventListener('click',()=>{
    let curr1 = select[0].value      // value in dropdown 1
    let curr2 = select[1].value     // value in dropdown 2
    let inputVal = input.value     // input box value
    if(curr1 === curr2)
     alert('Choose different Currencies')
    else
     convert(curr1,curr2,inputVal)
})

function convert(curr1,curr2,inputVal){    // https://www.frankfurter.app/docs/
    const host = 'api.frankfurter.app';
fetch(`https://${host}/latest?amount=${inputVal}&from=${curr1}&to=${curr2}`)
  .then(resp => resp.json())
  .then((data) => {
     // console.log( Object.values(data.rates)[0]);
     document.getElementById('result').value = Object.values(data.rates)[0]
  });
}