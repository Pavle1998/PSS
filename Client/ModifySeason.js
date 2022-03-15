import { Serija } from "./Serija.js";
import { Sezona } from "./Sezona.js";

var parent = document.querySelector(".banner");
var child = document.querySelector(".prikaz")
var modifySeason = document.querySelector(".modifySeason");



modifySeason.addEventListener("click", function(){
   
    dd_menu_a.forEach( x => {       /*gasimo submeni  */
        x.classList.remove("active");
    })
    aparent.forEach( x => {         /*gasim meni*/
        x.classList.remove("active");
    })

    //otkacimo prethodni deo za crtanje
    parent.removeChild(child);
    //skrolujemo na vrh ako smo bili nesge nize
    window.scrollTo({ left: 0,  top: document.body.scrollHeight, behavior:'smooth'})

    //kreiramo novi deo za crtanje
    let noviPrikaz6 = document.createElement("div");
    noviPrikaz6.className="noviPrikaz6";
    parent.appendChild(noviPrikaz6);

    //levi deo
    let np6l = document.createElement("div");
    np6l.className="np6l";
    noviPrikaz6.appendChild(np6l);

        //labela want to modify season
        let label41 = document.createElement("label");
        label41.className="label41";
        label41.innerHTML="Want to modify season?";
        np6l.appendChild(label41);

        //np6l0
        let np6l0 = document.createElement("div");
        np6l0.className="np6l0";
        np6l.appendChild(np6l0);
        
            //labela selekt series
            let label410 = document.createElement("label");
            label410.className="label410";
            label410.innerHTML="Select series"
            np6l0.appendChild(label410);
            //selekt za serije
            var selektSeriesnp6 = document.createElement("select");
            selektSeriesnp6.className="selektSeriesnp6";
            np6l0.appendChild(selektSeriesnp6);
            let op;
            op = document.createElement("option");
            op.innerHTML="";
            op.value=-1;
            selektSeriesnp6.appendChild(op);

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
                        selektSeriesnp6.appendChild(op);
                    });
                })
            })
            

            //labela selekt season
            let label411 = document.createElement("label");
            label411.className="label411";
            label411.innerHTML="Select season to modify"
            np6l0.appendChild(label411);
            //selekt za sezonu
            var selektSeasonnp6 = document.createElement("select");
            selektSeasonnp6.className="selektSeasonnp6";
            np6l0.appendChild(selektSeasonnp6);
            op = document.createElement("option");
            op.innerHTML="";
            op.value=-1;
            selektSeasonnp6.appendChild(op);

            /*klikom na selekt za serije izbacuje nam njene sezone*/
            selektSeriesnp6.onchange=function(){
                var nizSezonaZaPovracaj=[];
                fetch("https://localhost:5001/Sezona/PreuzmiSezoneZaDatuSeriju/"+selektSeriesnp6.options[selektSeriesnp6.selectedIndex].value,
                {
                    method:"GET"
                }) .then( p => {
                    if(p.ok){
                
                    p.json().then( sezone => {
                        sezone.forEach( sezona => {
                            var sz = new Sezona(sezona.id, sezona.redniBrojSezone, sezona.naziv, sezona.brojEpizoda, sezona.godinaEmitovanja);
                            nizSezonaZaPovracaj.push(sz); 
                    });
                    //izbrise nam prethodni sadrzaj
                    var i, L=selektSeasonnp6.options.length -1 ;
                    for( i=L; i>=0; i--){
                        selektSeasonnp6.remove(i);
                    }
                    //doda nam sezone za izabranu seriju
                    let op;
                    op = document.createElement("option");
                    op.innerHTML="";
                    op.value=-1;
                    selektSeasonnp6.appendChild(op);
                    nizSezonaZaPovracaj.forEach( p => {
                            op = document.createElement("option");
                            op.innerHTML=p.nazivSezone;
                            op.value=p.id;
                            selektSeasonnp6.appendChild(op);
                    });
                    })}
                }) 
            };
            

            
           


    // np6l1
    let np6l1 = document.createElement("div");
    np6l1.className="np6l1";
    np6l.appendChild(np6l1);
        //prvi
        let np6l11 = document.createElement("div");
        np6l11.className="np6l11";
        np6l1.appendChild(np6l11);
            //labela
            let label42 = document.createElement("label");
            label42.innerHTML="Name"
            label42.className="label42";
            np6l11.appendChild(label42);
            //input
            let input08 = document.createElement("input");
            input08.className="input08";
            np6l11.appendChild(input08);

        //drugi
        let np6l12 = document.createElement("div");
        np6l12.className="np6l12";
        np6l1.appendChild(np6l12);
            //labela
            let label43 = document.createElement("label");
            label43.innerHTML="Seasons number"
            label43.className="label43";
            np6l12.appendChild(label43);
            //input
            let input09 = document.createElement("input");
            input09.className="input09";
            input09.type="number";
            np6l12.appendChild(input09);

        //treci
        let np6l13 = document.createElement("div");
        np6l13.className="np6l13";
        np6l1.appendChild(np6l13);
             //labela
             let label44 = document.createElement("label");
             label44.innerHTML="No. of episodes"
             label44.className="label44";
             np6l13.appendChild(label44);
             //input
             let input010 = document.createElement("input");
             input010.className="input010";
             input010.type="number";
             np6l13.appendChild(input010);
        
        //cetvrti
        let np6l14 = document.createElement("div");
        np6l14.className="np6l14";
        np6l1.appendChild(np6l14);
             //labela
             let label45 = document.createElement("label");
             label45.innerHTML="Year of broadcast"
             label45.className="label45";
             np6l14.appendChild(label45);
             //input
             let input011 = document.createElement("input");
             input011.className="input011";
             input011.type="number";
             np6l14.appendChild(input011);

        //dugme save
        let dugmeSave1 = document.createElement("button");
        dugmeSave1.className="dugmeSave1";
        dugmeSave1.innerHTML="Save changes"
        np6l.appendChild(dugmeSave1);

        selektSeasonnp6.onchange=function(){
            
                fetch("https://localhost:5001/Sezona/PreuzmiImeSezone/" + selektSeasonnp6.options[selektSeasonnp6.selectedIndex].value,
                {
                    method:"GET"
                }) .then( p => {
                    if(p.ok){
                    var iP;
                    p.json().then( imena => {
                        imena.forEach( i => {
                        iP=i.naziv;
                    });
                    
                    let zaUpis = document.querySelector(".input08");
                    zaUpis.value=iP;

                    fetch("https://localhost:5001/Sezona/PreuzmiRedniBrojSezone/" + selektSeasonnp6.options[selektSeasonnp6.selectedIndex].value,
                    {
                        method:"GET"
                    }) .then( p => {
                        if(p.ok){
                        var br;
                        p.json().then( brojevi => {
                            brojevi.forEach( broj => {
                            br=broj.redniBrojSezone;
                        });
                        let zaUpis = document.querySelector(".input09");
                        zaUpis.value=br;
    
                        fetch("https://localhost:5001/Sezona/PreuzmiBrojEpizodaSezone/" + selektSeasonnp6.options[selektSeasonnp6.selectedIndex].value,
                        {
                            method:"GET"
                        }) .then( p => {
                            if(p.ok){
                            var br;
                            p.json().then( ocene => {
                                ocene.forEach( oc => {
                                    br=oc.brojEpizoda;
                                });
                
                            let zaUpis = document.querySelector(".input010");
                            zaUpis.value=br;

                            fetch("https://localhost:5001/Sezona/PreuzmiGodinuEmitovanjaSezone/" + selektSeasonnp6.options[selektSeasonnp6.selectedIndex].value,
                            {
                                method:"GET"
                            }) .then( p => {
                                if(p.ok){
                                var br;
                                p.json().then( ocene => {
                                    ocene.forEach( oc => {
                                        br=oc.godinaEmitovanja;
                                    });
                    
                                let zaUpis = document.querySelector(".input011");
                                zaUpis.value=br;
                                })}
                                
                            }) 
                            })}
                            
                        }) 
                        })}
                    }) 

                    })}
                }) 
        }
            
          
        //desni deo
        let np6d = document.createElement("div"); 
        np6d.className="np6d";
        noviPrikaz6.appendChild(np6d);
        
        //np6d0
        let np6d0 = document.createElement("label");
        np6d0.className="np6d0";
       
        np6d.appendChild(np6d0);
        
        
        //za desni deo
        dugmeSave1.onclick = function(){

           if(document.querySelector(".input08").value != ""){ //proveri jel korisnik uneo naziv sezone
                if(document.querySelector(".input09").value != "" && document.querySelector(".input09").value > 0){ //da li je uneo redni broj sezon i da nije br manji od 0, nema konverzije jer je type number
                    if(document.querySelector(".input010").value != "" && document.querySelector(".input010").value > 0){//proverimo broj epizoda
                        if(document.querySelector(".input011").value != "" && document.querySelector(".input011").value > 1950){//proverimo godinu premijere
                                fetch("https://localhost:5001/Sezona/IzmeniSezonu/"+selektSeasonnp6.options[selektSeasonnp6.selectedIndex].value+"/"+document.querySelector(".input08").value+"/"+document.querySelector(".input09").value+"/"+document.querySelector(".input010").value+"/"+document.querySelector(".input011").value,
                                {
                                    method:"PUT"
                                }) .then( p => {
                                    if(p.ok){
                                        
                                        let zacCrtanje = document.querySelector(".np6d");
                                        np6d.style.border="3px solid white";
                                        np6d.style.borderRadius = "15px 60px 15px";
                                        np6d0.innerHTML="Season successfully modified!"
                                    }
                                }) 
                        }
                        else{
                            alert("Please enter a valid year of seasons broadcast! [Can not be under 1950!]");
                        }
                    }
                    else{
                        alert("Please enter a valid number of episodes!");
                    }
                }
                else{
                    alert("Please enter a valid seasons number!");
                }
           }
           else{
               alert("Please enter a valid name of the season!");
           }
        }
        

    
})

/*
function f1 () {
    console.log("f1");
}
*/

