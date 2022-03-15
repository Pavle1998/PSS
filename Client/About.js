var about = document.querySelector(".about");

//klik na about skroluje na dno stranice sa efektom smooth
about.addEventListener("click",function(){
    window.scrollTo({ left: 0,  top: document.body.scrollHeight, behavior:'smooth'})
})