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
    public class EpizodaController : ControllerBase
    {
        public SerijaContext Context { get; set; }

        public EpizodaController(SerijaContext context){
            Context=context;
        }

        //koristimo
        [Route("PreuzmiNazivEpizode/{idEpizode}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiNazivEpizode(int idEpizode){
            try{
                var imeEpizode = await  Context.Epizode
                    .Where( p => p.ID == idEpizode)
                    .Select( p => new { p.Naziv}).ToListAsync();
                return Ok(imeEpizode);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
        
        //koristimo
        [Route("PreuzmiTrajanjeEpizode/{idEpizode}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiTrajanjeEpizode(int idEpizode){
            try{
                var trajanje = await  Context.Epizode
                    .Where( p => p.ID == idEpizode)
                    .Select( p => new { p.Trajanje}).ToListAsync();
                return Ok(trajanje);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        //koristimo
        [Route("PreuzmiOpisEpizode/{idEpizode}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiOpisEpizode(int idEpizode){
            try{
                var opis = await  Context.Epizode
                    .Where( p => p.ID == idEpizode)
                    .Select( p => new { p.Opis}).ToListAsync();
                return Ok(opis);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        //koristimo
        [Route("PreuzmiEpizodeZaDatuSezonu/{idSezone}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiEpizodeZaDatuSezonu(int idSezone){
            try{
                var epizode = await  Context.Epizode
                    .Include( p => p.EpizodaSezona)
                    .Where( p => p.EpizodaSezona.ID == idSezone)
                    .Select( p => new { p.ID, p.RedniBrojEpizode, p.Naziv, p.Trajanje, p.Opis}).ToListAsync();
                return Ok(epizode);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

    
        /*[Route("DodajEpizodu")]
        [HttpPost]
        public async Task<ActionResult> DodajEpizodu( int redBr, string nazivE, int trajanje, string opis, string nazivZ, string ime, string prezime, int redBrSezone){
            if( redBr <= 0 ){
                return BadRequest("Redni broj epizode mora biti veci od 0!");
            }

            if( nazivE.Length <= 0 || nazivE.Length > 100 ){
                return BadRequest("Duzina naziva mora biti veca od 0 karaktera i manja od 100 karaktera!");
            }

            if( trajanje <=0 ){
                return BadRequest("Trajanje epizode mora biti duze od 0 minnuta!");
            }

            if( opis.Length <=0 || opis.Length >999 ){
                return BadRequest("Duzina opisa mora biti veca od 0 karaktera i manja od 999 karaktera!");
            }

            if( redBrSezone <= 0 ){
                return BadRequest("Redni broj sezone mora biti veci od 0!");
            }

            try{

                var zanr = await Context.Zanrovi.Where( p => p.Naziv == nazivZ ).FirstOrDefaultAsync();
                var reziser = await Context.Reziseri.Where( p => p.Ime == ime && p.Prezime == prezime ).FirstOrDefaultAsync();
                var sezona = await Context.Sezone.Where( p => p.RedniBrojSezone == redBrSezone).FirstOrDefaultAsync();

                Epizoda e = new Epizoda{
                    RedniBrojEpizode = redBr,
                    Naziv = nazivE,
                    Trajanje = trajanje,
                    Opis = opis,
                    EpizodaZanr = zanr,
                    EpizodaReziser = reziser,
                    EpizodaSezona = sezona
                };


                Context.Epizode.Add(e);
                await Context.SaveChangesAsync();
                return Ok($"Epizoda pod nazivom: {e.Naziv} je uspesno dodata!");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("IzbrisiEpizodu/{naziv}/{redBr}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiEpizodu(string naziv, int redBr){
            if( naziv.Length <= 0 || naziv.Length > 100 ){
                return BadRequest("Duzina naziva epizode mora biti veca od 0 karaktera i manja od 100 karaktera!");
            }

            if( redBr <=0 ){
                return BadRequest("Redni broj epizode mora biti veci od 0!");
            }

             var epizoda = Context.Epizode.Where( p => p.Naziv == naziv && p.RedniBrojEpizode == redBr ).FirstOrDefault();

            try{
               if( epizoda != null){
                   Context.Remove(epizoda);
                   await Context.SaveChangesAsync();
                   return Ok($"Uspesno izbrisana epizoda sa nazivom: {naziv} i rednim brojem: {redBr}!");
               }
               else{
                   return BadRequest($"Epizoda pod nazivom: {naziv} i rednim brojem: {redBr} nije pronadjena!");
               }


            }
            catch(Exception e){
                return BadRequest(e.Message);
            }

        }
*/
    }
}
