var parent = document.querySelector(".banner");
var child = document.querySelector(".prikaz")
var addSeries = document.querySelector(".addseries");



addSeries.addEventListener("click", function(){
   
    dd_menu_a.forEach( x => {       /*gasimo submeni  */
        x.classList.remove("active");
    })
    aparent.forEach( x => {         /*gasim meni*/
        x.classList.remove("active");
    })

    //uklanjamo prethodni prikaz
    parent.removeChild(child);

    //ako je bilo skolovano, popni nas na vrh strane
    window.scrollTo({ left: 0,  top: document.body.scrollHeight, behavior:'smooth'})

    //kreiraj deo za crtanje
    let noviChild = document.createElement("div");
    noviChild.className="noviPrikaz";
    parent.appendChild(noviChild);

    //levi deo
    let noviPrikazL = document.createElement("div");
    noviPrikazL.className="noviPrikazL";
    noviChild.appendChild(noviPrikazL);

        //labela za naslov
        let label1 = document.createElement("label");
        label1.className="label1";
        label1.innerHTML="Want to add new series?";
        noviPrikazL.appendChild(label1);

        //bl0
        let bl0 = document.createElement("div");
        bl0.className="bl0";
        noviPrikazL.appendChild(bl0);
        
            //bl1
            let bl1 = document.createElement("div");
            bl1.className="bl1";
            bl0.appendChild(bl1);
                //labela za naziv serije
                let label2 = document.createElement("label");
                label2.className="label2";
                label2.innerHTML="Series name";
                bl1.appendChild(label2);
                //input za ime serije
                let input1 = document.createElement("input");
                input1.className="input1";
                bl1.appendChild(input1);

            //bl2
            let bl2 = document.createElement("div");
            bl2.className="bl2";
            bl0.appendChild(bl2);
                //labela za broj sezona
                let label3 = document.createElement("label");
                label3.className="label3";
                label3.innerHTML="No. of seasons";
                bl2.appendChild(label3);
                //input za broj sezona
                let input2 = document.createElement("input");
                input2.className="input2";
                input2.type="number";
                bl2.appendChild(input2);
            
            //bl3
            let bl3 = document.createElement("div");
            bl3.className="bl3";
            bl0.appendChild(bl3);
                //labela za ocenu
                let label4 = document.createElement("label");
                label4.className="label4";
                label4.innerHTML="Rating";
                bl3.appendChild(label4);
                //input za ocenu
                let input3 = document.createElement("input");
                input3.className="input3";
                bl3.appendChild(input3);

        //dugme add
        let dugmeAdd = document.createElement("button");
        dugmeAdd.className="dugmeAdd";
        dugmeAdd.innerHTML="Add"
        noviPrikazL.appendChild(dugmeAdd);



        //desni deo
        let noviPrikazD = document.createElement("div"); 
        noviPrikazD.className="noviPrikazD";
        noviChild.appendChild(noviPrikazD);

            //bd0
            let bd0 = document.createElement("div");
            bd0.className="bd0";
            noviPrikazD.appendChild(bd0);
                 //labela serija:
                 let label5 = document.createElement("label");
                 label5.className="label5";
                 bd0.appendChild(label5);
                 //labela serija
                 let label6 = document.createElement("label");
                 label6.className="label6";
                 bd0.appendChild(label6);

            //bd1
            let bd1 = document.createElement("div");
            bd1.className="bd1";
            noviPrikazD.appendChild(bd1);
                    //labela broj sezona:
                    let label7 = document.createElement("label");
                    label7.className="label7";                   
                    bd1.appendChild(label7);
                    //labela br
                    let label8 = document.createElement("label");
                    label8.className="label8";
                    bd1.appendChild(label8);

            //bd2
            let bd2 = document.createElement("div");
            bd2.className="bd2";
            noviPrikazD.appendChild(bd2);
                    //labela rejting:
                    let label9 = document.createElement("label");
                    label9.className="label9";
                    bd2.appendChild(label9);
                    //labela rejting
                    let label10 = document.createElement("label");
                    label10.className="label10";                   
                    bd2.appendChild(label10);

            //labela sa porukom
            let label11 = document.createElement("label");
            label11.className="label11";
            noviPrikazD.appendChild(label11);

        dugmeAdd.onclick = function(){
           if(document.querySelector(".input1").value != ""){ //proveri jel korisnik uneo naziv serije
                if(document.querySelector(".input2").value != "" && document.querySelector(".input2").value > 0){ //da li je uneo broj sezona i da nije br manji od 0, nema konverzije jer jr type number
                    var unetaOcena = parseFloat(document.querySelector(".input3").value);//preuzmi broj koji je kao txt i parsiraj u float
                    if( !isNaN(unetaOcena) && unetaOcena>=0 ) { //ako nije slovo idi dalje
                        fetch("https://localhost:5001/Serija/DodajSeriju/"+document.querySelector(".input1").value+"/"+document.querySelector(".input2").value+"/"+unetaOcena,
                        {
                            method:"POST"
                        }) .then( p => {
                            if(p.ok){

                            let zacCrtanje = document.querySelector(".noviPrikazD");
                            zacCrtanje.style.border="3px solid white";
                            zacCrtanje.style.borderRadius = "15px 80px 30px";
                            

                            label5.innerHTML="Series:"
                            label6.innerHTML=document.querySelector(".input1").value;       
                                   
                            label7.innerHTML="No. of seasons:"
                            label8.innerHTML=document.querySelector(".input2").value;

                            label9.innerHTML="Rating:"
                            label10.innerHTML=unetaOcena;

                            label11.innerHTML="The series was successfully added to the database!"
                            
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
               alert("Please enter the name of the series!");
           }
             
        }
        

    
})

