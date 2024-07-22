
/*
Bangalore : population = 8443675
            literacyRate = 88.71
            language = 'Kannada'
Chennai :   population = 4646732
            literacyRate = 90.20
            language = 'Tamil'
Delhi :     population = 9875685
            literacyRate = 85.7
            language = 'Hindi'
Mumbai :    population = 6545678
            literacyRate = 84.09
            language = 'Hindi'
*/
const button = document.querySelector('button') // get button using button tag
let resultdiv = document.createElement('div') // creating a new div tag for result
resultdiv.id = 'result'
document.getElementById('wrapper').appendChild(resultdiv) // add this div in the id wrapper at the last tag

// event listener --> check whether any action is performing in the button
button.addEventListener('click',displayStats)

function displayStats(){
    const inputVal = document.getElementById('input')
    const city = input.options[input.selectedIndex].value
    let population = 0, literacyRate = 0, language = ''
    switch(city){
        case 'Bangalore' :
            population = 8443675
            literacyRate = 88.71
            language = 'Kannada'
            break;
        case 'Chennai'  :
            population = 4646732
            literacyRate = 90.20
            language = 'Tamil'
            break;
        case 'Mumbai'   :
            population = 6545678
            literacyRate = 84.09
            language = 'Hindi'
            break;
        case 'Delhi'   :
            population = 9875685
            literacyRate = 85.7
            language = 'Hindi'
    }
    let text = `The Indian city of ${city} has a population of ${population}.
                Language spoken in ${language} and literacy rate is ${literacyRate}%` 
    console.log(text)
    document.getElementById('result').innerHTML = text


}