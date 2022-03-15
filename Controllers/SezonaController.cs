using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;//osnovno
using Microsoft.EntityFrameworkCore;
using Models;//za SerijaContext

namespace Project_v1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SezonaController : ControllerBase
    {
        public SerijaContext Context { get; set; }

        public SezonaController(SerijaContext context){
            Context=context;
        }

        //koristimo
        [Route("DodajSezonu/{idSerije}/{nazivS}/{rbSezone}/{brEpizoda}/{godPremijere}")]
        [HttpPost]
        public async Task<ActionResult> DodajSezonu(int idSerije, string nazivS, int rbSezone, int brEpizoda, int godPremijere){
            if( idSerije <0 ){
                return BadRequest("Invalid Id!");
            }
            if( rbSezone <= 0 ){
                return BadRequest("Redni broj sezone ne moze biti manji ili jednak 0!");
            }

            if( nazivS.Length <=0 || nazivS.Length > 100 ){
                return BadRequest("Naziv sezone ne moze da sadrzi 0 karaktera ili vise od 100 karaktera!");
            }

            if( brEpizoda < 0 ){
                return BadRequest("Sezona ne moze da sadrzi negativan broj opizoda!");
            }

            if( godPremijere < 1950 ){
                return BadRequest("Godina prvog emitovanja sezone ne moze biti negativan broj!");
            }
            //dohvatimo seriju koja ima trazeni id
            var serija = await Context.Serije.Where( p => p.ID == idSerije ).FirstOrDefaultAsync();
            
            //kreiramo sezonu i kacimo je na dohvacenu seriju
            try{
                Sezona s = new Sezona{
                    Naziv = nazivS,
                    RedniBrojSezone = rbSezone,
                    BrojEpizoda = brEpizoda,
                    GodinaEmitovanja = godPremijere,
                    SezonaSerija = serija 
                };
                Context.Sezone.Add(s);
                await Context.SaveChangesAsync();

                return Ok();
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        //koristimo
        [Route("PreuzmiSezoneZaDatuSeriju/{idSerije}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiSezoneZaDatuSeriju(int idSerije){
            try{
                //odemo  usezone
                var sezonee = await  Context.Sezone
                    //ukljucimo serije
                    .Include( p => p.SezonaSerija)
                    //nadjemo samo one sezone koje pripadaju datoj seriji
                    .Where( p => p.SezonaSerija.ID == idSerije)
                    //i uzmemo odredjene informacije
                    .Select( p => new { p.ID, p.RedniBrojSezone, p.Naziv, p.BrojEpizoda, p.GodinaEmitovanja}).ToListAsync();
                
                return Ok(sezonee);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

       
        //koristimo
        [Route("IzbrisiSezonuISavNjenSadrzaj/{idSezone}")]
        [HttpDelete]
        public async Task<ActionResult>IzbrisiSezonuISavNjenSadrzaj(int idSezone){
            //ovde nema potrebe za proverom jer smo ogranicili korisnika da izabere samo postojece
            if( idSezone <=0 ){
                return BadRequest("Los id sezone!");
            }
            
            //nadjemo tu sezonu u bazi na osnovu idSezone
            var sezona =  await Context.Sezone.Where( p => p.ID == idSezone).FirstOrDefaultAsync();

            //nadjemo sve epizode te sezone uporedjujuci id zeljene sezone sa kolonom-vezom za sezona-epizoda
            var epizode =  await Context.Epizode.Where( p => p.EpizodaSezona == sezona ).ToListAsync();
        

            try{
                //prodjemo kroz sve pronadjene epizode i obrisemo svaku
                foreach (Epizoda item in epizode)
                {
                   Context.Epizode.Remove(item);
                }
               
                //obrisemo sezonu
                Context.Sezone.Remove(sezona);

                await Context.SaveChangesAsync();
                return Ok("uspesno obrisana serija");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }


        //koristimo
        [Route("PreuzmiImeSezone/{idSezone}")]
        [HttpGet]
         public async Task<ActionResult>PreuzmiImeSezone(int idSezone){
             try{
                var i = await  Context.Sezone
                    .Where( p => p.ID == idSezone)
                    .Select( p => new { p.Naziv }).ToListAsync();
                
                

                return Ok(i);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        //koristimo
        [Route("PreuzmiRedniBrojSezone/{idSezone}")]
        [HttpGet]
         public async Task<ActionResult>PreuzmiRedniBrojSezone(int idSezone){
             try{
                var i = await  Context.Sezone
                    .Where( p => p.ID == idSezone)
                    .Select( p => new { p.RedniBrojSezone }).ToListAsync();
                
                

                return Ok(i);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        //koristimo
        [Route("PreuzmiBrojEpizodaSezone/{idSezone}")]
        [HttpGet]
         public async Task<ActionResult>PreuzmiBrojEpizodaSezone(int idSezone){
             try{
                var i = await  Context.Sezone
                    .Where( p => p.ID == idSezone)
                    .Select( p => new { p.BrojEpizoda }).ToListAsync();
                
                

                return Ok(i);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        //koristimo
        [Route("PreuzmiGodinuEmitovanjaSezone/{idSezone}")]
        [HttpGet]
         public async Task<ActionResult>PreuzmiGodinuEmitovanjaSezone(int idSezone){
             try{
                var i = await  Context.Sezone
                    .Where( p => p.ID == idSezone)
                    .Select( p => new { p.GodinaEmitovanja }).ToListAsync();
                
                

                return Ok(i);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        //koristimo
        [Route("IzmeniSezonu/{idSezone}/{noviNazivSezone}/{noviRedniBrojSezone}/{noviBrojEpizoda}/{novaGodinaPremijere}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniSeriju(int idSezone, string noviNazivSezone, int noviRedniBrojSezone, int noviBrojEpizoda, int novaGodinaPremijere){
            if( idSezone < 0){
                return BadRequest("Neispravan id!");
            }
            if( noviNazivSezone.Length <=0 || noviNazivSezone.Length > 100)
            {
                return BadRequest("Naziv sezone mora biti duzine vece od 0 karaktera i manje od 100 karaktera!");
            }

            if( noviRedniBrojSezone <= 0){
                return BadRequest("Redni broj sezone ne moze biti jednak 0 ili negtivan broj!");
            }

            if( noviBrojEpizoda <= 0 ){
                return BadRequest("Broj epizoda ne moze biti negativan broj !");
            }

            if( novaGodinaPremijere <1950 ){
                return BadRequest("Godina emitovanja ne moze biti manja od 1950!");
            }

            //uhvatimo sezonu za izmenu
            var sezonaZaIzmenu = Context.Sezone.Where( p =>  p.ID == idSezone ).FirstOrDefault();
           

            if(sezonaZaIzmenu==null){
                return BadRequest("Trazena sezona nije pronadjena!");
            }

            try{
                //odradimo izmene
                sezonaZaIzmenu.Naziv = noviNazivSezone;
                sezonaZaIzmenu.RedniBrojSezone = noviRedniBrojSezone;
                sezonaZaIzmenu.BrojEpizoda = noviBrojEpizoda;
                sezonaZaIzmenu.GodinaEmitovanja = novaGodinaPremijere;

                await Context.SaveChangesAsync();
                return Ok("Sezona uspesno izmenjena!");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
          
        }
   
    /*[Route("IzbrisiSezonu/{idSezone}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiSezonu(int idSezone){
             if( idSezone <= 0 ){
                return BadRequest("ID serije ne moze biti manji ili jednak 0!");
            }

            var sezonaZaBrisanje = await Context.Sezone.Where( p => p.ID == idSezone).FirstOrDefaultAsync();

            try{
                if( sezonaZaBrisanje != null ){
                    Context.Sezone.Remove(sezonaZaBrisanje);
                    await Context.SaveChangesAsync();

                    return Ok("uspesno je");
                }   
                else{
                    return BadRequest("Trazena sezona nije pronadjena! Brisanje nije uspelo!");
                } 
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }*/
         /* [Route("PrikaziSveSezone")]
        [HttpGet]
        public async Task<ActionResult> VratiSveSezone(){
            var sezone =  Context.Sezone;
            
            var sezona = await sezone.ToListAsync();

            return Ok(
                sezona.Select( p => 
                    new{
                            RedniBrojSezone = p.RedniBrojSezone,
                            NazivSezone = p.Naziv,
                            GodinaPrvogEmitovanja = p.GodinaEmitovanja,
                            BrojEpizoda = p.BrojEpizoda
                       }
                ).ToList()
            );

        }
        */

        /*[Route("PreuzmiSezonu")]
        [HttpGet]
        public async Task<ActionResult> Preuzmi(){
            return Ok(
                await Context.Sezone.Select( p => new { p.ID, p.RedniBrojSezone, p.Naziv, p.BrojEpizoda, p.GodinaEmitovanja} ).ToListAsync()
            );
        }
        */
    }
}
