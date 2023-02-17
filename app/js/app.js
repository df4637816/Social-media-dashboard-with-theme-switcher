const toggle = document.querySelector('.toggle')
const toggleButton = document.querySelector('.toggle__button')
const  body = document.querySelector('body')

toggle.addEventListener('click',function(){
      toggle.classList.toggle('active');
      body.classList.toggle('active');
      
      })