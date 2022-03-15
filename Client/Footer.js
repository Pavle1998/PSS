//dohvatimo futer
var futer = document.querySelector("footer");

//levi deo
let levi = document.createElement("div");
levi.className="levi";
futer.appendChild(levi);
//desni deo
let desni = document.createElement("div");
desni.className="desni";
futer.appendChild(desni);



//levi deo futera
let lokacija = document.createElement("div");
lokacija.className="lokacija";
lokacija.innerHTML="Location: Central Expy 201 940 Atheron California"
levi.appendChild(lokacija);

let telefon = document.createElement("div");
telefon.className="telefon";
telefon.innerHTML="Phone: +1(213)555-3890"
levi.appendChild(telefon);

let gmail = document.createElement("div");
gmail.className="gmail";
gmail.innerHTML="E-mail: pakosstreamingservice@gmail.com"
levi.appendChild(gmail);

let web = document.createElement("div");
web.className="web";
web.innerHTML="Web addres: www.pakosstreamingservice.com"
levi.appendChild(web);




//desni deo futera
let info = document.createElement("div");
info.className="info";
info.innerHTML="Want to contact us?"
desni.appendChild(info);

let podaci = document.createElement("div");
podaci.className="podaci";
desni.appendChild(podaci);

let podaci1 = document.createElement("div");
podaci1.className="podaci1";
podaci.appendChild(podaci1);
    //deo za ime
    let ime = document.createElement("div");
    ime.className="ime";
    podaci1.appendChild(ime);

    let imeLabel = document.createElement("label");
    imeLabel.innerHTML="Name"
    ime.appendChild(imeLabel);

    let imeInput = document.createElement("input");
    imeInput.type="text"
    imeInput.className="imeInput";
    ime.appendChild(imeInput);

    //deo za mejl
    let email = document.createElement("div");
    email.className="email";
    podaci1.appendChild(email);

    let emailLabel = document.createElement("label");
    emailLabel.innerHTML="E-mail"
    email.appendChild(emailLabel);

    let emailInput = document.createElement("input");
    emailInput.type="text"
    emailInput.className="emailInput";
    email.appendChild(emailInput);

    //deo za naslov
    let naslovporuke = document.createElement("div");
    naslovporuke.className="naslovporuke";
    podaci.appendChild(naslovporuke);

    let naslovporukeLabel = document.createElement("label");
    naslovporukeLabel.innerHTML="Header"
    naslovporuke.appendChild(naslovporukeLabel);

    let naslovporukeInput = document.createElement("input");
    naslovporukeInput.type="text"
    naslovporukeInput.className="naslovporukeInput";
    naslovporuke.appendChild(naslovporukeInput);

    //poruka
    let poruka = document.createElement("div");
    poruka.className="poruka";
    podaci.appendChild(poruka);

    let porukaLabel = document.createElement("label");
    porukaLabel.innerHTML="Message"
    poruka.appendChild(porukaLabel);

    let porukaInput = document.createElement("input");
    porukaInput.type="text"
    porukaInput.className="porukaInput";
    poruka.appendChild(porukaInput);

    //dugme send, klikom na send prikazuje nesto
    let btnSend = document.createElement("button");
    podaci.appendChild(btnSend);
    btnSend.innerHTML="Send";
    btnSend.className="btnSend"
    btnSend.addEventListener("click",function(){
        let name = document.querySelector(".imeInput");
        let mejl = document.querySelector(".emailInput");
        let header = document.querySelector(".naslovporukeInput");
        let mess = document.querySelector(".porukaInput");

        alert("Message was successfully sent!\n\n\n\nName: "+ name.value + "\nE-mail: " + mejl.value + "\nHeader: "+ header.value + "\nMessage: " + mess.value);
    });