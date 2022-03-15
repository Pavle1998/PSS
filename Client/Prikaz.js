import { Sezona } from "./Sezona.js";
import { Epizoda } from "./Epizoda.js";

export class Prikaz{
    constructor(listaSerija){
        this.listaSerija=listaSerija;
        this.kontejner=null;
    }

    crtaj(host){
        if(!host){
            throw new Error("Host nije operativan!");
        }

        this.kontejner = document.createElement("div");
        this.kontejner.className="glavniKontejner";
        host.appendChild(this.kontejner);

        //levi deo
        let leviPrikaz = document.createElement("div");
        leviPrikaz.className="leviPrikaz"
        this.kontejner.appendChild(leviPrikaz);
        
        //desni deo
        let desniPrikaz = document.createElement("div");
        desniPrikaz.className="desniPrikaz"
        this.kontejner.appendChild(desniPrikaz);

        //pozovemo fje za crtanje
        this.crtajLeviDeo(leviPrikaz);
        this.crtajDesniDeo(desniPrikaz);
    }

   

    //levi prikaz
    crtajLeviDeo(host){
        if(!host){
            throw new Error("Host za levi deo nije operativan!");
        }

        let lp1 = document.createElement("div");
        lp1.className="lp1";
        host.appendChild(lp1);

        //labela odaberi seriju
        let osrLabel = document.createElement("label");
        osrLabel.className="osrLabel";
        osrLabel.innerHTML="Select series";
        lp1.appendChild(osrLabel);

        //za odabir serije
        let se = document.createElement("select");
        se.className="serijaSelect";
        lp1.appendChild(se);
        let op;
        op = document.createElement("option");
        op.innerHTML="";
        op.value=-1;
        se.appendChild(op);
        this.listaSerija.forEach( p => {
            op = document.createElement("option");
            op.innerHTML=p.naziv;
            op.value=p.id;
            se.appendChild(op);
        });//izbrisi na kraju epizodu blok
        //kad promenimo seriju, ucitaj nove sezone za nju, ali izbrisi prethodni sadrzaj i izbrisi epizode
        se.onchange=(ev)=>(this.ucitajSezone(this.vratiIDSerije(),".sezonaSelect"), this.izbaciOpcije(this.kontejner.querySelector(".sezonaSelect")),this.izbaciOpcije(this.kontejner.querySelector(".epizodaSelect")));

        let lp2 = document.createElement("div");
        lp2.className="lp2";
        host.appendChild(lp2);

        //labela odaberi sezonu
        let oseLabel = document.createElement("label");
        oseLabel.className="oseLabel";
        oseLabel.innerHTML="Select season";
        lp2.appendChild(oseLabel);
       

        //odaberi sezonu
        var se1 = document.createElement("select");
        se1.className="sezonaSelect";
        op = document.createElement("option");
        op.innerHTML="";
        op.value=-1;
        se1.appendChild(op);
        lp2.appendChild(se1);
        
        //ucitaj epizode kad odaberemo sezonu, ali izbaci prethodne opcije da se ne gomila sadrzaj
        se1.onchange=(ev)=>(this.ucitajEpizode(this.vratiIDSezone(),".epizodaSelect"),this.izbaciOpcije(this.kontejner.querySelector(".epizodaSelect")));
       

        let lp3 = document.createElement("div");
        lp3.className="lp3";
        host.appendChild(lp3);

        //labela odaberi epizodu
        let oeLabel = document.createElement("label");
        oeLabel.className="oeLabel";
        oeLabel.innerHTML="Select episode";
        lp3.appendChild(oeLabel);

        //odaberi epizodu
        let se2 = document.createElement("select");
        se2.className="epizodaSelect";
        lp3.appendChild(se2);
        op = document.createElement("option");
        op.innerHTML="";
        op.value=-1;
        se2.appendChild(op);
        


        //dugme search
        let searchDugme = document.createElement("button");
        searchDugme.className="searchDugme";
        searchDugme.innerHTML="Search";
       
        //na klik pokreni crtanje=proveru
        searchDugme.onclick=(ev)=>(this.proveriUcitano());
        
        host.appendChild(searchDugme);
        
    }

    //desni prikaz
    crtajDesniDeo(host){
        if(!host){
            throw new Error("Host za desni deo nije operativan!");
        }

       
        
        //naziv serije, brSezona, ocena
        let dp1 = document.createElement("div");
        dp1.className="dp1";
        host.appendChild(dp1);

                //naziv serije
        let nazivSerijeLabel = document.createElement("label");
        nazivSerijeLabel.className="nazivSerijeLabel";
        dp1.appendChild(nazivSerijeLabel);

                 //br sezona
        let brojSezonaLabel = document.createElement("label");
        brojSezonaLabel.className="brojSezonaLabel";
        dp1.appendChild(brojSezonaLabel);

                //ocena
        let ocenaKrug = document.createElement("div");
        ocenaKrug.className="ocenaKrug";
        dp1.appendChild(ocenaKrug);

        let ocenaLabel = document.createElement("label");
        ocenaLabel.className="ocenaLabel";
        ocenaKrug.appendChild(ocenaLabel);
       



        //naziv epizode, trajanje
        let dp2 = document.createElement("div");
        dp2.className="dp2";
        host.appendChild(dp2);
        
        let nazivEpizode = document.createElement("div");
        nazivEpizode.className="nazivEpizode";
        dp2.appendChild(nazivEpizode);

        let dp22 = document.createElement("label");
        dp22.className="dp22";
        nazivEpizode.appendChild(dp22);
                 //naziv epizode
        let nazivEpizodeLabel = document.createElement("label");
        nazivEpizodeLabel.className="nazivEpizodeLabel";
        nazivEpizode.appendChild(nazivEpizodeLabel);
 

        let trajanje = document.createElement("div");
        trajanje.className="trajanje";
        dp2.appendChild(trajanje);

        let dp2d = document.createElement("label");
        dp2d.className=("dp2d");
        trajanje.appendChild(dp2d);
                  //trajanje
        let trajanjeLable = document.createElement("label");
        trajanjeLable.className="trajanjeLable";
        trajanje.appendChild(trajanjeLable);

         
        let dp4 = document.createElement("div");
        dp4.className = "dp4";
        host.appendChild(dp4);

        //labela opis
        let opisLabela = document.createElement("label");
        opisLabela.className="opisLabela";
        dp4.appendChild(opisLabela);

        //opis epizode
        let opisEpizodeLabel = document.createElement("label");
        opisEpizodeLabel.className="opisEpizodeLabel";
        dp4.appendChild(opisEpizodeLabel);

        



        //zanr, reditelj
        let dp3 = document.createElement("div");
        dp3.className="dp3";
        host.appendChild(dp3);

   
                   //zanr
        let zanrLabel = document.createElement("label");
        zanrLabel.className="zanrLabel";
        dp3.appendChild(zanrLabel);
        

        let reditelj = document.createElement("div");
        reditelj.className="reditelj";
        dp3.appendChild(reditelj);

        let director = document.createElement("label");
        director.className="director";
        reditelj.appendChild(director);

                    //reditelj ime
        let rediteljImeLabel = document.createElement("label");
        rediteljImeLabel.className="rediteljImeLabel";
        reditelj.appendChild(rediteljImeLabel);


                    //reditelj prezime
        let rediteljPrezimeLabel = document.createElement("label");
        rediteljPrezimeLabel.className="rediteljPrezimeLabel";
        reditelj.appendChild(rediteljPrezimeLabel);
 
    }
    vratiBrojSezona(idSerije){
        fetch("https://localhost:5001/Serija/PreuzmiBrojSezona/" + idSerije,
        {
            method:"GET"
        }) .then( p => {
            if(p.ok){
            var br;
            p.json().then( brojevi => {
                brojevi.forEach( broj => {
                   br=broj.brojSezona;
               });

              let zaUpis = this.kontejner.querySelector(".brojSezonaLabel");
              zaUpis.innerHTML="No. of seasons: " + br;
            })}
        }) 
    }

    vratiOcenuSerije(idSerije){
        fetch("https://localhost:5001/Serija/PreuzmiOcenuSerija/" + idSerije,
        {
            method:"GET"
        }) .then( p => {
            if(p.ok){
            var br;
            p.json().then( ocene => {
                ocene.forEach( oc => {
                   br=oc.ocena;
               });

              let zaUpis = this.kontejner.querySelector(".ocenaLabel");
              zaUpis.innerHTML=br;

               zaUpis= this.kontejner.querySelector(".ocenaKrug");
               zaUpis.style.border="2px solid white";
               zaUpis.style.borderRadius="100%";
             
            })}
            
        }) 
        
    }

    vratiImeEpizode(idEpizode){
        fetch("https://localhost:5001/Epizoda/PreuzmiNazivEpizode/" + idEpizode,
        {
            method:"GET"
        }) .then( p => {
            if(p.ok){
            var nazivPovratak;
            p.json().then( nazivi => {
                nazivi.forEach( n => {
                    nazivPovratak=n.naziv;
               });

              let zaUpis = this.kontejner.querySelector(".nazivEpizodeLabel");
              zaUpis.innerHTML=nazivPovratak;

              let pom = this.kontejner.querySelector(".dp22");
              pom.innerHTML="Episode: ";
            })}
        }) 
    }

    vratiTrajanjeEpizode(idEpizode){
        fetch("https://localhost:5001/Epizoda/PreuzmiTrajanjeEpizode/" + idEpizode,
        {
            method:"GET"
        }) .then( p => {
            if(p.ok){
            var tP;
            p.json().then( trajanja => {
                trajanja.forEach( t => {
                    tP=t.trajanje;
               });

              let zaUpis = this.kontejner.querySelector(".trajanjeLable");
              zaUpis.innerHTML=tP + " min";

              let upis = this.kontejner.querySelector(".dp2d");
              upis.innerHTML="Duration:";
            })}
        }) 
    }

    vratiOpisEpizode(idEpizode){
        fetch("https://localhost:5001/Epizoda/PreuzmiOpisEpizode/" + idEpizode,
        {
            method:"GET"
        }) .then( p => {
            if(p.ok){
            var oP;
            p.json().then( opisi => {
                opisi.forEach( o => {
                    oP=o.opis;
               });

              let zaUpis = this.kontejner.querySelector(".opisEpizodeLabel");
              zaUpis.innerHTML=oP;

              let desk = this.kontejner.querySelector(".opisLabela");
              desk.innerHTML="Description:";
            })}
        }) 
    }

    vratiZanr(idEpizode){
        fetch("https://localhost:5001/Zanr/PreuzmiZanr/" + idEpizode,
        {
            method:"GET"
        }) .then( p => {
            if(p.ok){
            var zP;
            p.json().then( zanrovi => {
                zanrovi.forEach( z => {
                    zP=z.naziv;
               });

              let zaUpis = this.kontejner.querySelector(".zanrLabel");
              zaUpis.innerHTML=zP;
            })}
        }) 
    }

    izcrtajImeSerije(idSerije){
        fetch("https://localhost:5001/Serija/PreuzmiImeSerije/" + idSerije,
        {
            method:"GET"
        }) .then( p => {
            if(p.ok){
            var iP;
            p.json().then( imena => {
                imena.forEach( i => {
                    iP=i.naziv;
               });

              let zaUpis = this.kontejner.querySelector(".nazivSerijeLabel");
              zaUpis.innerHTML=iP;
            })}
        }) 
    }


    vratiRezisera(idEpizode){
        fetch("https://localhost:5001/Reziser/PreuzmiRezisera/" + idEpizode,
        {
            method:"GET"
        }) .then( p => {
            if(p.ok){
            var rI;
            var rP;
            p.json().then( reziseri => {
                reziseri.forEach( r => {
                    rI=r.ime;
                    rP=r.prezime;
               });

              let zaUpis = this.kontejner.querySelector(".rediteljImeLabel");
              zaUpis.innerHTML=rI;
              zaUpis = this.kontejner.querySelector(".rediteljPrezimeLabel");
              zaUpis.innerHTML=rP;
              zaUpis = this.kontejner.querySelector(".director");
              zaUpis.innerHTML="Director:";
            })}
        }) 
    }
    vratiNazivSerije(){
        let izabranaOpcija = this.kontejner.querySelector(".serijaSelect");
        let serijaNazivIzabrano = izabranaOpcija.options[izabranaOpcija.selectedIndex].innerHTML;
        return serijaNazivIzabrano;
    }

    vratiIDSerije(){
        let izabranaOpcija = this.kontejner.querySelector(".serijaSelect");
        let serijaIDIzabrano = izabranaOpcija.options[izabranaOpcija.selectedIndex].value;
        
        return serijaIDIzabrano;
    }

    vratiIDSezone(){
        let izabranaOpcija = this.kontejner.querySelector(".sezonaSelect");
        let sezonaIDIzabrano = izabranaOpcija.options[izabranaOpcija.selectedIndex].value;

        return sezonaIDIzabrano;
    }

    vratiIDEpizode(){
        let izabranaOpcija = this.kontejner.querySelector(".epizodaSelect");
        let epizodaIDIzabrano = izabranaOpcija.options[izabranaOpcija.selectedIndex].value;

        return epizodaIDIzabrano;
    }

    ucitajSezone(idSerije,se){
        var nizSezonaZaPovracaj=[];
        fetch("https://localhost:5001/Sezona/PreuzmiSezoneZaDatuSeriju/"+idSerije,
        {
            method:"GET"
        }) .then( p => {
            if(p.ok){
           
            p.json().then( sezone => {
                sezone.forEach( sezona => {
                    var sz = new Sezona(sezona.id, sezona.redniBrojSezone, sezona.naziv, sezona.brojEpizoda, sezona.godinaEmitovanja);
                    nizSezonaZaPovracaj.push(sz); 
               });

               let zaDodavanje = this.kontejner.querySelector(se);
               
               let op;
               op = document.createElement("option");
                op.innerHTML="";
                op.value=-1;
                zaDodavanje.appendChild(op);
                nizSezonaZaPovracaj.forEach( p => {
                    op = document.createElement("option");
                    op.innerHTML=p.nazivSezone;
                    op.value=p.id;
                    zaDodavanje.appendChild(op);
               });
            })}
        }) 
    }
    

    ucitajEpizode(idSezone,se){
        var nizEpizodaZaPovracaj=[];
        fetch("https://localhost:5001/Epizoda/PreuzmiEpizodeZaDatuSezonu/"+idSezone,
        {
            method:"GET"
        }) .then( p => {
            if(p.ok){
           
            p.json().then( epizode => {
               
                epizode.forEach( epizoda => {
                    var ep = new Epizoda(epizoda.id, epizoda.redniBrojEpizode, epizoda.naziv, epizoda.trajanje, epizoda.opis);
                    nizEpizodaZaPovracaj.push(ep); 
               });

                let zaDodavanje = this.kontejner.querySelector(se);

                let op;
                op = document.createElement("option");
                op.innerHTML="";
                op.value=-1;
                zaDodavanje.appendChild(op);   
                nizEpizodaZaPovracaj.forEach( p => {
                    op = document.createElement("option");
                    op.innerHTML=p.rbEpizode+ ". " + p.naziv ;
                    op.value=p.id;
                    zaDodavanje.appendChild(op);
               });
            })}
        }) 
    }


    izbaciOpcije( nekiSelekt ){
        var i, L=nekiSelekt.options.length -1 ;
        for( i=L; i>=0; i--){
            nekiSelekt.remove(i);
        }
    }

    proveriUcitano(){
        let sser = this.kontejner.querySelector(".serijaSelect");
        //proverimo da li je undefined, ako nije uzmemo vrednost
        if( sser.options[sser.selectedIndex] == undefined){
            alert("Odaberi seriju!");
        }
        else{
            var iserija = sser.options[sser.selectedIndex].value;
        }
       

        let sez=this.kontejner.querySelector(".sezonaSelect");
        //proverimo da li je undefined, ako nije uzmemo vrednost
        if(sez.options[sez.selectedIndex] == undefined){
            alert("Odaberi sezonu!");
        }
        else{
            var isezona = sez.options[sez.selectedIndex].value;
        }
      

        let sep =this.kontejner.querySelector(".epizodaSelect");
        //proverimo da li je undefined, ako nije uzmemo vrednost
        if(sep.options[sep.selectedIndex] == undefined){
            alert("Odaberi epizodu!");
        }
        else{
            var iepizoda = sep.options[sep.selectedIndex].value;
        
        }
        
        //proverimo da nije mozda -1
        if( iserija != -1 ){
            if( isezona != -1 ){
                if( iepizoda != -1){
                    //pozovemo metode
                    this.izcrtajImeSerije(this.vratiIDSerije());
                    this.vratiBrojSezona(this.vratiIDSerije());
                    this.vratiOcenuSerije(this.vratiIDSerije());
                    this.vratiImeEpizode(this.vratiIDEpizode());
                    this.vratiTrajanjeEpizode(this.vratiIDEpizode());
                    this.vratiOpisEpizode(this.vratiIDEpizode());
                    this.vratiZanr(this.vratiIDEpizode());
                    this.vratiRezisera(this.vratiIDEpizode());

                    let pdiv = this.kontejner.querySelector(".desniPrikaz");
                    pdiv.style.border="3px solid white";
                    pdiv.style.borderRadius = "15px 50px 30px";

                    let labelaZaDeskripsh = this.kontejner.querySelector(".opisEpizodeLabel");
                    labelaZaDeskripsh.style.border="2px solid white";
                    labelaZaDeskripsh.style.borderRadius = "15px";
                    labelaZaDeskripsh.style.padding="7px";

                }
                else{
                    alert("Odaberi epizodu!");
                    }
            }
            else{
                alert("Odaberi sezonu!");
                }
        }
        else{
            alert("Odaberi seriju!");
        }
    }

}