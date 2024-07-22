
const container = document.querySelector('.container')
const btns = document.querySelectorAll('.btn')
const imgList = ['one','two','three','four']

let index = 0
btns.forEach((button)=>{
    button.addEventListener('click',()=>{
        console.log('clicked')
        if(button.classList.contains('btn-left')){
          console.log('clicked left')
          index--;
          if(index<0){
            index = imgList.length-1;
          }
          container.style.background = `url("images/${imgList[index]}.jpeg") center/cover fixed no-repeat`
        }
        else{
            console.log('clicked right')
            index++;
          if(index === imgList.length){
            index = 0;
          }
          container.style.background = `url("images/${imgList[index]}.jpeg") center/cover fixed no-repeat`
        }
    })
})