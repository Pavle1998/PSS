import { Prikaz } from "./Prikaz.js";
import { Serija } from "./Serija.js";
import { Sezona } from "./Sezona.js";


var listaSerija = [];
fetch("https://localhost:5001/Serija/PreuzmiSerije")
.then( p => {
    p.json().then( serije => {
        serije.forEach( serija => {
            var sr = new Serija(serija.id, serija.naziv, serija.brojSezona, serija.ocena);
            listaSerija.push(sr); 
        });

        var x1 = new Prikaz(listaSerija);
        x1.crtaj(document.querySelector(".prikaz"));

        var x2 = new Prikaz(listaSerija);
        x2.crtaj(document.querySelector(".prikaz"));

        var x3 = new Prikaz(listaSerija);
        x3.crtaj(document.querySelector(".prikaz"));
        
    })
})

