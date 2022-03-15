var aparent = document.querySelectorAll(".aparent");
var services = document.querySelectorAll(".dropMeni");
var dd_menu_a = document.querySelectorAll(".ddmenua");
var dd_submenu_a = document.querySelectorAll(".ddsubmenua");

var baner = document.querySelector(".banner");//da kad korisnik klikne bilo gde ispod nav bara, da se submeni i nadmeni ugase


////klikom na bilo sta drugo u okviru navbara gasimo submeni
aparent.forEach(function(aparent_item){
    aparent_item.addEventListener("click", function(event){
        event.preventDefault();

        dd_menu_a.forEach( x => {       /*ako ima neki otvoren submeni da ga zatvori */
            x.classList.remove("active");
        })
        aparent.forEach( x => {
            x.classList.remove("active");
        })
        aparent_item.classList.add("active");

    })
}) 




//klikom na bilo sta drugo u okviru navbara gasimo submeni_a
dd_menu_a.forEach(function(dd_menu_a_item){
    dd_menu_a_item.addEventListener("mouseover", function(event){ //event smo dodali da se ne refresuje strana
        event.preventDefault();

        dd_menu_a.forEach( x => {           //da prvo pozatvara sve otvorene 
            x.classList.remove("active");
        })
        dd_menu_a_item.classList.add("active"); //pa da ovde otvori za taj kliknut

    })
}) 



dd_submenu_a.forEach(function(dd_submenu_a_item){ //da sprecimo refresovanje strane kad kliknemo na nesto iz submenija
    dd_submenu_a_item.addEventListener("click", function(event){
        event.preventDefault();
    })
})




//klikni bilo gde i ugasi navbar
baner.addEventListener("click",function(event){
    event.preventDefault(); //spreci refresh strane

    dd_menu_a.forEach( x => {       /*ako ima neki otvoren submeni da ga zatvori */
        x.classList.remove("active");
    })
    aparent.forEach( x => {         //ako ima neki otvoren prvi nivo menija, atvori
        x.classList.remove("active");
    })
})