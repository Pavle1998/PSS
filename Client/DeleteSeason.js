import { Serija } from "./Serija.js";
import { Sezona } from "./Sezona.js";
var parent = document.querySelector(".banner");
var child = document.querySelector(".prikaz")
var deleteSeason = document.querySelector(".deleteSeason");

deleteSeason.addEventListener("click", function(){
   
    dd_menu_a.forEach( x => {       /*gasimo submeni  */
        x.classList.remove("active");
    })
    aparent.forEach( x => {         /*gasim meni*/
        x.classList.remove("active");
    })

    //ukloni prethodni deo za crtanje
    parent.removeChild(child);

    //skroluj na vrh stranice 
    window.scrollTo({ left: 0,  top: document.body.scrollHeight, behavior:'smooth'})

    //kreiramo novi deo za crtanje
    let noviPrikaz5 = document.createElement("div");
    noviPrikaz5.className="noviPrikaz5";
    parent.appendChild(noviPrikaz5);


    //levi deo
    let np5l = document.createElement("div");
    np5l.className="np5l";
    noviPrikaz5.appendChild(np5l);
        //labela want to delete series
        let label36 = document.createElement("label");
        label36.className="label36";
        label36.innerHTML="Want to delete the season?";
        np5l.appendChild(label36);
        //blok za unos naziva serije
        let np5l0 = document.createElement("div");
        np5l0.className="np5l0";
        np5l.appendChild(np5l0);
            //ime serije labela
            let label37 = document.createElement("label");
            label37.className="label37";
            label37.innerHTML="Select series"
            np5l0.appendChild(label37);
            //selekt serije 
            let selectSeriesnp5 = document.createElement("select");
            selectSeriesnp5.className="selectSeriesnp5";
            let op;
            op = document.createElement("option");
            op.innerHTML="";
            op.value=-1;
            selectSeriesnp5.appendChild(op);
            np5l0.appendChild(selectSeriesnp5);
           
            //pokupi sve serije
            var listaSerijaa = [];
            fetch("https://localhost:5001/Serija/PreuzmiSerije") 
            .then( p => {
                p.json().then( serije => {
                    serije.forEach( serija => {
                        var sr = new Serija(serija.id, serija.naziv, serija.brojSezona, serija.ocena);
                        listaSerijaa.push(sr); 
                    });

                    listaSerijaa.forEach( p => {
                        op = document.createElement("option");
                        op.innerHTML=p.naziv;
                        op.value=p.id;
                        selectSeriesnp5.appendChild(op);
                    });
                })
            })
        
            //ime sezone labela
            let label38 = document.createElement("label");
            label38.className="label38";
            label38.innerHTML="Season to delete"
            np5l0.appendChild(label38);
            //selekt sezonu 
            let selectSeasonnp5 = document.createElement("select");
            selectSeasonnp5.className="selectSeasonnp5";
            np5l0.appendChild(selectSeasonnp5);
            op;
            op = document.createElement("option");
            op.innerHTML="";
            op.value=-1;
            selectSeasonnp5.appendChild(op);
            //na svaku promenu serije ucitaj njene sezone ali izbrisi prethodne
            selectSeriesnp5.onchange=function(){
                    var nizSezonaZaPovracaj=[];
                    fetch("https://localhost:5001/Sezona/PreuzmiSezoneZaDatuSeriju/"+selectSeriesnp5.options[selectSeriesnp5.selectedIndex].value,
                    {
                        method:"GET"
                    }) .then( p => {
                        if(p.ok){
                       
                        p.json().then( sezone => {
                            sezone.forEach( sezona => {
                                var sz = new Sezona(sezona.id, sezona.redniBrojSezone, sezona.naziv, sezona.brojEpizoda, sezona.godinaEmitovanja);
                                nizSezonaZaPovracaj.push(sz); 
                           });
                           //izbrisi prethodne opcije
                           var i, L=selectSeasonnp5.options.length -1 ;
                           for( i=L; i>=0; i--){
                                selectSeasonnp5.remove(i);
                           }
                           //dodamo novi sadrzaj
                            let op;
                            op = document.createElement("option");
                            op.innerHTML="";
                            op.value=-1;
                            selectSeasonnp5.appendChild(op);
                            nizSezonaZaPovracaj.forEach( p => {
                                op = document.createElement("option");
                                op.innerHTML=p.nazivSezone;
                                op.value=p.id;
                                selectSeasonnp5.appendChild(op);
                           });
                        })}
                    }) 
            }
        let dugmeDelete1 = document.createElement("button");   
        dugmeDelete1.className="dugmeDelete1";
        dugmeDelete1.innerHTML="Delete"
        np5l.appendChild(dugmeDelete1);

         //dodamo desni div
         let np5d = document.createElement("div");
         np5d.className="np5d";
         noviPrikaz5.appendChild(np5d);
             //np5d0
             let np5d0 = document.createElement("div");
             np5d0.className="np5d0";
             np5d.appendChild(np5d0);
                 //label39
                 let label39 = document.createElement("label");
                 label39.className="label39";
                 np5d0.appendChild(label39);
                
                 //label40
                 let label40 = document.createElement("label");
                 label40.className="label40";
                 np5d0.appendChild(label40);
                


            dugmeDelete1.onclick=function(){
            if(selectSeasonnp5.options[selectSeasonnp5.selectedIndex].value > 0){
                    fetch("https://localhost:5001/Sezona/IzbrisiSezonuISavNjenSadrzaj/" + selectSeasonnp5.options[selectSeasonnp5.selectedIndex].value,
                    {
                        method:"DELETE"
                    }) .then( p => {
                        if(p.ok){

                            np5d.style.border="3px solid white";
                            np5d.style.borderRadius = "15px 80px 30px";
                            
                            label39.innerHTML=selectSeasonnp5.options[selectSeasonnp5.selectedIndex].text;
                            label40.innerHTML="was successfully deleted from the database!";

                           
                            //da se odmah azurira lista, da se obrisana sezona ne vidi!!!
                            var nizSezonaZaPovracaj=[];
                            fetch("https://localhost:5001/Sezona/PreuzmiSezoneZaDatuSeriju/"+selectSeriesnp5.options[selectSeriesnp5.selectedIndex].value,
                            {
                                method:"GET"
                            }) .then( p => {
                                if(p.ok){
                               
                                p.json().then( sezone => {
                                    sezone.forEach( sezona => {
                                        var sz = new Sezona(sezona.id, sezona.redniBrojSezone, sezona.naziv, sezona.brojEpizoda, sezona.godinaEmitovanja);
                                        nizSezonaZaPovracaj.push(sz); 
                                   });
                                   //izbrisi prethodne opcije
                                   var i, L=selectSeasonnp5.options.length -1 ;
                                   for( i=L; i>=0; i--){
                                        selectSeasonnp5.remove(i);
                                   }
                                   //dodamo novi sadrzaj
                                    let op;
                                    op = document.createElement("option");
                                    op.innerHTML="";
                                    op.value=-1;
                                    selectSeasonnp5.appendChild(op);
                                    nizSezonaZaPovracaj.forEach( p => {
                                        op = document.createElement("option");
                                        op.innerHTML=p.nazivSezone;
                                        op.value=p.id;
                                        selectSeasonnp5.appendChild(op);
                                   });
                                })}
                            }) 

                        }
                        
                    }) 
            }
            else{
                alert("Choose a season that you want to delete!")
            }
        }


    
})

