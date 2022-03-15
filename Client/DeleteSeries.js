import { Serija } from "./Serija.js";

var parent = document.querySelector(".banner");
var child = document.querySelector(".prikaz")
var deleteSeries = document.querySelector(".deleteSeries");

deleteSeries.addEventListener("click", function(){
   
    dd_menu_a.forEach( x => {       /*gasimo submeni  */
        x.classList.remove("active");
    })
    aparent.forEach( x => {         /*gasim meni*/
        x.classList.remove("active");
    })

    //uklonimo prethodni deo za crtanje
    parent.removeChild(child);

    //skrolujemo na vrh strane
    window.scrollTo({ left: 0,  top: document.body.scrollHeight, behavior:'smooth'})

    //novi deo za crtanje
    let noviPrikaz2 = document.createElement("div");
    noviPrikaz2.className="noviPrikaz2";
    parent.appendChild(noviPrikaz2);


    //levi deo
    let noviPrikaz2L = document.createElement("div");
    noviPrikaz2L.className="noviPrikaz2L";
    noviPrikaz2.appendChild(noviPrikaz2L);
        //labela want to delete series
        let label12 = document.createElement("label");
        label12.className="label12";
        label12.innerHTML="Want to delete series?";
        noviPrikaz2L.appendChild(label12);
        //blok za unos naziva serije
        let np2l0 = document.createElement("div");
        np2l0.className="np2l0";
        noviPrikaz2L.appendChild(np2l0);
            //ime serije labela
            let label13 = document.createElement("label");
            label13.className="label13";
            label13.innerHTML="Select series to delete"
            np2l0.appendChild(label13);
            //selekt serije 
            let selektIS = document.createElement("select");
            selektIS.className="selektIS";
            np2l0.appendChild(selektIS);
            let op;
            op = document.createElement("option");
            op.innerHTML="";
            op.value=-1;
            selektIS.appendChild(op);
            //pokupi sve serije
            var listaSerijaa = [];
            fetch("https://localhost:5001/Serija/PreuzmiSerije")
            .then( p => {
                p.json().then( serije => {
                    serije.forEach( serija => {
                        var sr = new Serija(serija.id, serija.naziv, serija.brojSezona, serija.ocena);
                        listaSerijaa.push(sr); 
                    });
                    //prodjemo kroz listu serija i dodamo ih kao opcije u selektu
                    listaSerijaa.forEach( p => {
                        op = document.createElement("option");
                        op.innerHTML=p.naziv;
                        op.value=p.id;
                        selektIS.appendChild(op);
                    });
                })
            })
    
        let deleteDugme = document.createElement("button");   
        deleteDugme.className="deleteDugme";
        deleteDugme.innerHTML="Delete"
        noviPrikaz2L.appendChild(deleteDugme);

         //dodamo desni div
         let noviPrikaz2D = document.createElement("div");
         noviPrikaz2D.className="noviPrikaz2D";
         noviPrikaz2.appendChild(noviPrikaz2D);
             //np2d0
             let np2d0 = document.createElement("div");
             np2d0.className="np2d0";
             noviPrikaz2D.appendChild(np2d0);
                 //label14
                 let label14 = document.createElement("label");
                 label14.className="label14";
                 np2d0.appendChild(label14);
                
                 //label15
                 let label15 = document.createElement("label");
                 label15.className="label15";
                 np2d0.appendChild(label15);
                


        deleteDugme.onclick=function(){
            let selektZaSeriju = document.querySelector(".selektIS");
            let selektovanaSerija=selektZaSeriju.options[selektZaSeriju.selectedIndex].value;
            
            //proverimo da li je korisnik izabrao seriju
            if(selektovanaSerija > 0){
                    fetch("https://localhost:5001/Serija/IzbrisiSerijuISavNjenSadrzaj/"+selektovanaSerija,
                    {
                        method:"DELETE"
                    }) .then( p => {
                        if(p.ok){

                            let zacCrtanje = document.querySelector(".noviPrikaz2D");
                            zacCrtanje.style.border="3px solid white";
                            zacCrtanje.style.borderRadius = "15px 80px 30px";
                           
                            label14.innerHTML=selektZaSeriju.options[selektZaSeriju.selectedIndex].text;
                            label15.innerHTML="was successfully deleted from the database!";
                            

                             //izbrisi prethodne opcije
                             var i, L=selektIS.options.length -1 ;
                             for( i=L; i>=0; i--){
                                selektIS.remove(i);
                             }
                             
                             //dodamo nove opcije nakon brisanja
                            var listaSerijaa = [];
                            fetch("https://localhost:5001/Serija/PreuzmiSerije")
                            .then( p => {
                                p.json().then( serije => {
                                    serije.forEach( serija => {
                                        var sr = new Serija(serija.id, serija.naziv, serija.brojSezona, serija.ocena);
                                        listaSerijaa.push(sr); 
                                    });
                                    let op;
                                    op = document.createElement("option");
                                    op.innerHTML="";
                                    op.value=-1;
                                    selektIS.appendChild(op);
                                    //prodjemo kroz listu serija i dodamo ih kao opcije u selektu
                                    listaSerijaa.forEach( p => {
                                        op = document.createElement("option");
                                        op.innerHTML=p.naziv;
                                        op.value=p.id;
                                        selektIS.appendChild(op);
                                    });
                                })
                            })
                        }
                    })
            }
            else{
                alert("Choose a series that you want to delete!")
            }
        }



           



    
})

