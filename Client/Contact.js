var contact = document.querySelector(".contact");

//klik na about skroluje na dno stranice sa efektom smooth
contact.addEventListener("click",function(){
   window.scrollTo({ left: 0,  top: document.body.scrollHeight, behavior:'smooth'})
})