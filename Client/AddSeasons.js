import { Serija } from "./Serija.js";

var parent = document.querySelector(".banner");
var child = document.querySelector(".prikaz")
var addSeasons = document.querySelector(".addSeasons");



addSeasons.addEventListener("click", function(){
   
    dd_menu_a.forEach( x => {       /*gasimo submeni*/
        x.classList.remove("active");
    })
    aparent.forEach( x => {         /*gasim meni*/
        x.classList.remove("active");
    })
    //uklonimo prethodni prikay
    parent.removeChild(child);

    //skroluj na vrh strane sa fektom smooth
    window.scrollTo({ left: 0,  top: document.body.scrollHeight, behavior:'smooth'})

    //div u kome crtamo prikaz
    let noviPrikaz4 = document.createElement("div");
    noviPrikaz4.className="noviPrikaz4";
    parent.appendChild(noviPrikaz4);

    //levi deo
    let np4l = document.createElement("div");
    np4l.className="np4l";
    noviPrikaz4.appendChild(np4l);

        //labela za naslov
        let label21 = document.createElement("label");
        label21.className="label21";
        label21.innerHTML="Want to add new seasons?";
        np4l.appendChild(label21);

        //np4l0
        let np4l0 = document.createElement("div");
        np4l0.className="np4l0";
        np4l.appendChild(np4l0);
            //labela za izaberi seriju
            let label22 = document.createElement("label");
            label22.className="label22";
            label22.innerHTML="Select series";
            np4l0.appendChild(label22);
            //selekt
            let selectSeriesnp4l = document.createElement("select");
            selectSeriesnp4l.className="selectSeriesnp4l";
            np4l0.appendChild(selectSeriesnp4l);
            let op;
            op = document.createElement("option");
            op.innerHTML="";
            op.value=-1;
            selectSeriesnp4l.appendChild(op);
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
                            selectSeriesnp4l.appendChild(op);
                        });
                    })
                })
            
        //np4l1
        let np4l1 = document.createElement("div");
        np4l1.className="np4l1";
        np4l.appendChild(np4l1);
            //np4l1l
            let np4l1l = document.createElement("div");
            np4l1l.className="np4l1l";
            np4l1.appendChild(np4l1l);
                //label serija ime
                let label23 = document.createElement("label");
                label23.className="label23";
                label23.innerHTML="Season name";
                np4l1l.appendChild(label23);
                //input ime
                let input04 = document.createElement("input");
                input04.className="input04";
                np4l1l.appendChild(input04);
                //label serija ime
                let label24 = document.createElement("label");
                label24.className="label24";
                label24.innerHTML="Season number";
                np4l1l.appendChild(label24);
                //input ime
                let input05 = document.createElement("input");
                input05.className="input05";
                input05.type="number";
                np4l1l.appendChild(input05);
            //np4l1d
            let np4l1d = document.createElement("div");
            np4l1d.className="np4l1d";
            np4l1.appendChild(np4l1d);
                 //label broj epizoda
                 let label25 = document.createElement("label");
                 label25.className="label25";
                 label25.innerHTML="No. of episodes";
                 np4l1d.appendChild(label25);
                 //input broj epizoda
                 let input06 = document.createElement("input");
                 input06.className="input06";
                 input06.type="number";
                 np4l1d.appendChild(input06);
                 //label god emitovanja
                 let label26 = document.createElement("label");
                 label26.className="label26";
                 label26.innerHTML="Season premiered(year)";
                 np4l1d.appendChild(label26);
                 //input premijered
                 let input07 = document.createElement("input");
                 input07.className="input07";
                 input07.type="number";
                 np4l1d.appendChild(input07);

        //dugme add
        let dugmeAdd1 = document.createElement("button");
        dugmeAdd1.className="dugmeAdd1";
        dugmeAdd1.innerHTML="Add"
        np4l.appendChild(dugmeAdd1);




        //desni deo
        let np4d = document.createElement("div"); 
        np4d.className="np4d";
        noviPrikaz4.appendChild(np4d);
            //np4d0
            let np4d0 = document.createElement("div");
            np4d0.className="np4d0";
            np4d.appendChild(np4d0);
                 //labela naziv sezone:
                 let label27 = document.createElement("label");
                 label27.className="label27";
                 np4d0.appendChild(label27);
                 //labela naziv
                 let label32 = document.createElement("label");
                 label32.className="label32";
                 np4d0.appendChild(label32);
            //np4d1
            let np4d1 = document.createElement("div");
            np4d1.className="np4d1";
            np4d.appendChild(np4d1);
                 //labela br sezone:
                 let label28 = document.createElement("label");
                 label28.className="label28";
                 np4d1.appendChild(label28);
                 //labela broj
                 let label33 = document.createElement("label");
                 label33.className="label33";
                 np4d1.appendChild(label33);
            //np4d2
            let np4d2 = document.createElement("div");
            np4d2.className="np4d2";
            np4d.appendChild(np4d2);
                //labela br epizoda:
                let label29 = document.createElement("label");
                label29.className="label29";
                np4d2.appendChild(label29);
                //labela broj
                let label34 = document.createElement("label");
                label34.className="label34";
                np4d2.appendChild(label34);
            //np4d3
            let np4d3 = document.createElement("div");
            np4d3.className="np4d3";
            np4d.appendChild(np4d3);
                //labela premijera:
                let label30 = document.createElement("label");
                label30.className="label30";
                np4d3.appendChild(label30);
                //labela god
                let label35 = document.createElement("label");
                label35.className="label35";
                np4d3.appendChild(label35);


            //labela sa porukom
            let label31 = document.createElement("label");
            label31.className="label31";
            np4d.appendChild(label31);

        dugmeAdd1.onclick = function(){
           if(document.querySelector(".input04").value != ""){ //proveri jel korisnik uneo naziv sezone
                if(document.querySelector(".input05").value != "" && document.querySelector(".input05").value > 0){ //da li je uneo broj sezona i da nije br manji od 0, nema konverzije jer jr type number
                    if(document.querySelector(".input06").value != "" && document.querySelector(".input06").value > 0){ //da li je broj epizoda veci od 0
                        if(document.querySelector(".input07").value != "" && document.querySelector(".input07").value > 1950){    //npr da ne bude manje od 1950 god
                            
                            fetch("https://localhost:5001/Sezona/DodajSezonu/"+selectSeriesnp4l.options[selectSeriesnp4l.selectedIndex].value+"/"+document.querySelector(".input04").value+"/"+document.querySelector(".input05").value+"/"+document.querySelector(".input06").value + "/" + document.querySelector(".input07").value,
                            {
                                method:"POST"
                            }).then( p => {
                                if(p.ok){

                                    let zacCrtanje = document.querySelector(".np4d");
                                    zacCrtanje.style.border="3px solid white";
                                    zacCrtanje.style.borderRadius = "15px 80px 30px";
                                        

                                    label27.innerHTML="Season name:"
                                    label32.innerHTML=document.querySelector(".input04").value;       
                                            
                                    label28.innerHTML="Season number:"
                                    label33.innerHTML=document.querySelector(".input05").value;

                                    label29.innerHTML="No. of episodes:"
                                    label34.innerHTML=document.querySelector(".input06").value;       
                                            
                                    label30.innerHTML="Season premiered:"
                                    label35.innerHTML=document.querySelector(".input07").value;

                                    label31.innerHTML="Season was successfully added to the database!"
                                        
                                    }
                                        
                            }) 
                            
                        }
                        else{
                            alert("Please enter a valid year of seasons premier!");
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

