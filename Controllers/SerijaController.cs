using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;//osnovno
using Microsoft.EntityFrameworkCore;
using Models;//za SerijaContext

namespace Project_v1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SerijaController : ControllerBase
    {
        public SerijaContext Context { get; set; }

        public SerijaController(SerijaContext context){
            Context=context;
        }

        //koristimo
        [Route("DodajSeriju/{nazivSerije}/{brojSezona}/{rejting}")]
        [HttpPost]
        public async Task<ActionResult> DodajSeriju(string nazivSerije, int brojSezona, double rejting ){
            if( nazivSerije.Length <=0 || nazivSerije.Length > 100)
            {
                return BadRequest("Naziv serije mora duzine vece od 0 karaktera i manje od 100 karaktera!");
            }

            if( brojSezona <= 0){
                return BadRequest("Broj sezona ne moze biti jednak 0 ili negtivan broj!");
            }

            if( rejting < 0 || rejting > 10 ){
                return BadRequest("Ocena serije ne moze biti negativan broj ili broj veci od 10!");
            }

            var istaSerija = Context.Serije.Where( p =>  p.Naziv==nazivSerije ).FirstOrDefault();
            if(istaSerija!=null){
                return BadRequest("Ta serija vec postoji!");
            }

            try{
                Serija s = new Serija{
                    Naziv = nazivSerije,
                    BrojSezona = brojSezona,
                    Ocena = rejting
                };
                Context.Serije.Add(s);
                await Context.SaveChangesAsync();
                return Ok("Uspesnno dodata serija");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
          
        }

        //koristimo
        [Route("PreuzmiSerije")]
        [HttpGet]
        public async Task<ActionResult> Preuzmi(){
            return Ok(
                await Context.Serije.Select( p => new { p.ID, p.Naziv, p.BrojSezona, p.Ocena } ).ToListAsync()
            );
        }

        //koristimo
        [Route("PreuzmiBrojSezona/{idSerije}")]
        [HttpGet]
        public async Task<ActionResult>PreuzmiBrojSezona(int idSerije){
             try{
                var bs = await  Context.Serije
                    .Where( p => p.ID == idSerije)
                    .Select( p => new { p.BrojSezona}).ToListAsync();
                
                

                return Ok(bs);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        //koristimo
        [Route("PreuzmiOcenuSerija/{idSerije}")]
        [HttpGet]
        public async Task<ActionResult>PreuzmiOcenuSerija(int idSerije){
             try{
                var o = await  Context.Serije
                    .Where( p => p.ID == idSerije)
                    .Select( p => new { p.Ocena}).ToListAsync();
                
                

                return Ok(o);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        //koristimo
        [Route("PreuzmiImeSerije/{idSerije}")]
        [HttpGet]
         public async Task<ActionResult>PreuzmiImeSerije(int idSerije){
             try{
                var i = await  Context.Serije
                    .Where( p => p.ID == idSerije)
                    .Select( p => new { p.Naziv }).ToListAsync();
                
                

                return Ok(i);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        //koristimo
        [Route("IzmeniSeriju/{idSerije}/{noviNazivSerije}/{noviBrojSezona}/{novirRejting}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniSeriju(int idSerije, string noviNazivSerije, int noviBrojSezona, double novirRejting ){
            if( idSerije < 0){
                return BadRequest("Neispravan id!");
            }
            if( noviNazivSerije.Length <=0 || noviNazivSerije.Length > 100)
            {
                return BadRequest("Naziv serije mora duzine vece od 0 karaktera i manje od 100 karaktera!");
            }

            if( noviBrojSezona <= 0){
                return BadRequest("Broj sezona ne moze biti jednak 0 ili negtivan broj!");
            }

            if( novirRejting <= 0 || novirRejting >= 10 ){
                return BadRequest("Ocena serije ne moze biti negativan broj ili broj veci od 10!");
            }

            //dohvatimo seriju za izmenu
            var serijaZaIzmenu = Context.Serije.Where( p =>  p.ID == idSerije ).FirstOrDefault();
           
            //proverimo da li postoji(po meni nema potrebe za ovim jer mi selektujemo serije koje sigurno postoje)
            if(serijaZaIzmenu==null){
                return BadRequest("Trazena serija nije pronadjena!");
            }

            //izvrsimo izmene
            try{
                serijaZaIzmenu.Naziv = noviNazivSerije;
                serijaZaIzmenu.BrojSezona = noviBrojSezona;
                serijaZaIzmenu.Ocena = novirRejting;
                
                //sacuvamo izmene
                await Context.SaveChangesAsync();
                return Ok("Serija uspesno izmenjena!");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
          
        }

        //koristimo
        [Route("IzbrisiSerijuISavNjenSadrzaj/{idSerije}")]
        [HttpDelete]
        public async Task<ActionResult>IzbrisiSerijuISavNjenSadrzaj(int idSerije){
            if( idSerije <=0 ){
                return BadRequest("Los id serije!");
            }
            
            //nadjemo tu seriju u bazi na osnovu idSerije
            var serijazb =  await Context.Serije.Where( p => p.ID == idSerije).FirstOrDefaultAsync();

            //nadjemo sve sezone te serije uporedjujuci id zeljene serije sa kolonom-vezom za seiju-sezonu
            var sezonezb =  await Context.Sezone.Where( p => p.SezonaSerija == serijazb ).ToListAsync();
           
            //nadjemo sve epizode te serije uporedjujuci id sezone sa kolonom-vezom za sezonu-epizodu
            var epizodezb = await Context.Epizode.Where( p => sezonezb.Contains(p.EpizodaSezona)).ToListAsync();

            try{
                //prodjemo kroz sve epizode i obrisemo svaku
                foreach (Epizoda item in epizodezb)
                {
                   Context.Epizode.Remove(item);
                }
                //prodjemo kroz sve sezone i obrisemo svaku
                foreach (Sezona item in sezonezb)
                {
                   Context.Sezone.Remove(item);
                }
                //obrisemo seriju
                Context.Serije.Remove(serijazb);

                await Context.SaveChangesAsync();
                return Ok("uspesno obrisana serija");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }




         /* [Route("VratiSveSerije")]
        [HttpGet]
        public async Task<ActionResult> VratiSveSerije(){
            var serije =  await Context.Serije.ToListAsync();

            return Ok(
                serije.Select( p => 
                    new{
                        NazivSerije = p.Naziv,
                        BrojSezona = p.BrojSezona,
                        Ocena = p.Ocena
                    }
                ).ToList()
            );
        }*/
   
       /* [Route("IzbrisiSeriju")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiSeriju(string naziv){
            if( naziv.Length <=0 || naziv.Length > 100 ){
                return BadRequest("Naziv serije ne moze sadrzati 0 karaktera ili vise od 100 karaktera!");
            }

            var serija = Context.Serije.Where( p => p.Naziv == naziv ).FirstOrDefault();

            try{
                if(serija != null){
                    Context.Remove(serija);
                    await Context.SaveChangesAsync();
                    return Ok($"Uspesno izbrisana serija {serija.Naziv}!");
                }
                else{
                    return BadRequest($"Nije pronadjena serija sa nazivom: {naziv}!");
                }

            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }*/

        /*[Route("IzbrisiSerijuPrekoID/{idSerije}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiSerijuPrekoID(int idSerije){
            if( idSerije < 0 ){
                return BadRequest("ID ne moze biti manji od 0!");
            }

            var serija = Context.Serije.Where( p => p.ID == idSerije ).FirstOrDefault();

            try{
                if(serija != null){
                    Context.Remove(serija);
                    await Context.SaveChangesAsync();
                    return Ok($"Uspesno izbrisana serija {serija.Naziv}!");
                }
                else{
                    return BadRequest($"Nije pronadjena serija sa datim ID!");
                }

            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }*/

        
        /*[Route("DodajSerijuFromBody")]
        [HttpPost]
        public async Task<ActionResult> DodajSerijuFromBody([FromBody] Serija serija){
            if( serija.Naziv.Length <=0 || serija.Naziv.Length > 100)
            {
                return BadRequest("Naziv serije mora duzine vece od 0 karaktera i manje od 100 karaktera!");
            }

            if( serija.BrojSezona <= 0){
                return BadRequest("Broj sezona ne moze biti jednak 0 ili neativan broj!");
            }

            if( serija.Ocena < 0 || serija.Ocena > 10 ){
                return BadRequest("Ocena serije ne moze biti negativan broj ili broj veci od 10!");
            }

            try{
                Context.Serije.Add(serija);
                await Context.SaveChangesAsync();
                return Ok($"Serija pod nazivom: {serija.Naziv} je uspesno upisana!");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }*/

    }
}
