import { Serija } from "./Serija.js";

var parent = document.querySelector(".banner");
var child = document.querySelector(".prikaz")
var modifySeries = document.querySelector(".modifySeries");



modifySeries.addEventListener("click", function(){
   
    dd_menu_a.forEach( x => {       /*gasimo submeni  */
        x.classList.remove("active");
    })
    aparent.forEach( x => {         /*gasim meni*/
        x.classList.remove("active");
    })

    //izbrisemo deo za crtanje
    parent.removeChild(child);
    //skrolujemo na vrh
    window.scrollTo({ left: 0,  top: document.body.scrollHeight, behavior:'smooth'})

    //izcrtamo novi deo za crtanje
    let noviPrikaz3 = document.createElement("div");
    noviPrikaz3.className="noviPrikaz3";
    parent.appendChild(noviPrikaz3);

    //levi deo
    let noviPrikaz3L = document.createElement("div");
    noviPrikaz3L.className="noviPrikaz3L";
    noviPrikaz3.appendChild(noviPrikaz3L);

        //labela want to change series
        let label16 = document.createElement("label");
        label16.className="label16";
        label16.innerHTML="Want to modify series?";
        noviPrikaz3L.appendChild(label16);

        //np3l0
        let np3l0 = document.createElement("div");
        np3l0.className="np3l0";
        noviPrikaz3L.appendChild(np3l0);
        
            //labela selekt series
            let label17 = document.createElement("label");
            label17.className="label17";
            label17.innerHTML="Select which series to modify"
            np3l0.appendChild(label17);
            //selekt za serije
            var selektSM = document.createElement("select");
            selektSM.className="selektSM";
            np3l0.appendChild(selektSM);
            let op;
            op = document.createElement("option");
            op.innerHTML="";
            op.value=-1;
            selektSM.appendChild(op);

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
                        selektSM.appendChild(op);
                    });
                })
            })
            

            
           


    // np3l1
    let np3l1 = document.createElement("div");
    np3l1.className="np3l1";
    noviPrikaz3L.appendChild(np3l1);
        //prvi
        let np3l11 = document.createElement("div");
        np3l11.className="np3l11";
        np3l1.appendChild(np3l11);
            //labela
            let label18 = document.createElement("label");
            label18.innerHTML="Change name"
            label18.className="label18";
            np3l11.appendChild(label18);
            //input
            let input01 = document.createElement("input");
            input01.className="input01";
            np3l11.appendChild(input01);

        //drugi
        let np3l12 = document.createElement("div");
        np3l12.className="np3l12";
        np3l1.appendChild(np3l12);
            //labela
            let label19 = document.createElement("label");
            label19.innerHTML="Change No. of seasons"
            label19.className="label19";
            np3l12.appendChild(label19);
            //input
            let input02 = document.createElement("input");
            input02.className="input02";
            np3l12.appendChild(input02);

        //treci
        let np3l13 = document.createElement("div");
        np3l13.className="np3l13";
        np3l1.appendChild(np3l13);
             //labela
             let label20 = document.createElement("label");
             label20.innerHTML="Change rating"
             label20.className="label20";
             np3l13.appendChild(label20);
             //input
             let input03 = document.createElement("input");
             input03.className="input03";
             np3l13.appendChild(input03);
            

        //dugme save
        let dugmeSave = document.createElement("button");
        dugmeSave.className="dugmeSave";
        dugmeSave.innerHTML="Save changes"
        noviPrikaz3L.appendChild(dugmeSave);


        selektSM.onchange=function(){

                fetch("https://localhost:5001/Serija/PreuzmiImeSerije/" + selektSM.options[selektSM.selectedIndex].value,
                {
                    method:"GET"
                }) .then( p => {
                    if(p.ok){
                    var iP;
                    p.json().then( imena => {
                        imena.forEach( i => {
                        iP=i.naziv;
                    });
                    
                    let zaUpis = document.querySelector(".input01");
                    zaUpis.value=iP;

                    fetch("https://localhost:5001/Serija/PreuzmiBrojSezona/" + selektSM.options[selektSM.selectedIndex].value,
                    {
                        method:"GET"
                    }) .then( p => {
                        if(p.ok){
                        var br;
                        p.json().then( brojevi => {
                            brojevi.forEach( broj => {
                            br=broj.brojSezona;
                        });
            
                        let zaUpis = document.querySelector(".input02");
                        zaUpis.value=br;
    
                        fetch("https://localhost:5001/Serija/PreuzmiOcenuSerija/" + selektSM.options[selektSM.selectedIndex].value,
                        {
                            method:"GET"
                        }) .then( p => {
                            if(p.ok){
                            var br;
                            p.json().then( ocene => {
                                ocene.forEach( oc => {
                                    br=oc.ocena;
                                });
                
                            let zaUpis = document.querySelector(".input03");
                            zaUpis.value=br;
                            })}
                            
                        }) 
                        })}
                    }) 

                    })}
                }) 
        }
            
          
        //desni deo
        let noviPrikaz3D = document.createElement("div"); 
        noviPrikaz3D.className="noviPrikaz3D";
        noviPrikaz3.appendChild(noviPrikaz3D);
        
        //np3d0
        let np3d0 = document.createElement("label");
        np3d0.className="np3d0";
       
        noviPrikaz3D.appendChild(np3d0);
        
        
        //za desni deo
        dugmeSave.onclick = function(){
           if(document.querySelector(".input01").value != ""){ //proveri jel korisnik uneo naziv serije
                if(document.querySelector(".input02").value != "" && document.querySelector(".input02").value > 0 ){ //da li je uneo broj sezona i da nije br manji od 0, nema konverzije jer jr type number
                    var unetaOcena = parseFloat(document.querySelector(".input03").value);//preuzmi broj koji je kao txt i parsiraj u float
                    if(!isNaN(unetaOcena) && unetaOcena >= 0 && unetaOcena<=10 ){ //ako nije slovo ili nista, idi dalje
                        fetch("https://localhost:5001/Serija/IzmeniSeriju/"+selektSM.options[selektSM.selectedIndex].value+"/"+document.querySelector(".input01").value+"/"+document.querySelector(".input02").value+"/"+unetaOcena,
                        {
                            method:"PUT"
                        }) .then( p => {
                            if(p.ok){
                                
                                let zacCrtanje = document.querySelector(".noviPrikaz3D");
                                zacCrtanje.style.border="3px solid white";
                                zacCrtanje.style.borderRadius = "15px 60px 15px";
                                np3d0.innerHTML="Series successfully modified!"
                            }
                            
                        }) 
                    }
                    else{
                        alert("Please enter a valid rating!");
                    }
                }
                else{
                    alert("Please enter a valid number of sesons!");
                }
           }
           else{
               alert("Please enter a valid name of the series!");
           }
             
        }
        

    
})

