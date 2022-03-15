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
    public class ReziserController : ControllerBase
    {
        public SerijaContext Context { get; set; }

        public ReziserController(SerijaContext context){
            Context=context;
        }

      
        //koristimo
        [Route("PreuzmiRezisera/{idEpizode}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiRezisera(int idEpizode){
            try{
                var reziser = await Context.Epizode
                    .Include( p => p.EpizodaReziser)
                    .Where( p => p.ID == idEpizode)
                    .Select( p => new { p.EpizodaReziser.Ime, p.EpizodaReziser.Prezime}).ToListAsync();
                return Ok(reziser);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
   
     /* [Route("DodajRezisera")]
        [HttpPost]
        public async Task<ActionResult> DodajRezisera([FromBody]Reziser reziser){
            if( reziser.Ime.Length < 0 || reziser.Ime.Length > 100)
            {
                return BadRequest("Ime rezisera mora biti veca od 0 karaktera i manja od 100 karaktera!");
            }

            if( reziser.Prezime.Length < 0 || reziser.Prezime.Length > 100)
            {
                return BadRequest("Prezime rezisera mora biti veca od 0 karaktera i manja od 100 karaktera!");
            }

            try
            {
                Context.Reziseri.Add(reziser);
                await Context.SaveChangesAsync();

                return Ok($"Uspesno upisan reziser: {reziser.Ime} {reziser.Prezime}!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("VratiSveRezisere")]
        [HttpGet]
        public async Task<ActionResult> VratiSveRezisere (){
            
            var reziser = await Context.Reziseri.ToListAsync();

            return Ok(
                reziser.Select( p => 
                    new{
                        Ime = p.Ime,
                        Prezime = p.Prezime
                    }
                ).ToList()
            );
        }
    
        [Route("IzmeniRezisera/{ime}/{prezime}/{novoIme}/{novoPrezime}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniRezisera( string ime, string prezime, string novoIme, string novoPrezime ){
            if( ime.Length <= 0 || ime.Length > 100 ){
                return BadRequest("Ime rezisera mora biti veca od 0 karaktera i manja od 100 karaktera!");
            }

            if( prezime.Length <= 0 || prezime.Length > 100 ){
                 return BadRequest("Prezime rezisera mora biti veca od 0 karaktera i manja od 100 karaktera!");
            }

              if( novoIme.Length <= 0 || novoIme.Length > 100 ){
                return BadRequest("Novo ime rezisera mora biti veca od 0 karaktera i manja od 100 karaktera!");
            }

            if( novoPrezime.Length <= 0 || novoPrezime.Length > 100 ){
                 return BadRequest("Novo prezime rezisera mora biti veca od 0 karaktera i manja od 100 karaktera!");
            }

            try{
                var reziser = Context.Reziseri.Where( p => p.Ime == ime && p.Prezime == prezime ).FirstOrDefault();

                if(reziser != null ){
                    reziser.Ime = novoIme;
                    reziser.Prezime = novoPrezime;

                    await Context.SaveChangesAsync();

                    return Ok($"Reziser {ime} {prezime} je uspesno promejnen u {novoIme} {novoPrezime}!");
                }
                else{
                    return BadRequest($"Reziser {ime} {prezime} nije pronadjen!");
                }
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }

        }
   
        [Route("IzbrisiRezisera/{ime}/{prezime}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiRezisera( string ime, string prezime ){
             if( ime.Length <= 0 || ime.Length > 100 ){
                return BadRequest("Ime rezisera mora biti veca od 0 karaktera i manja od 100 karaktera!");
            }

            if( prezime.Length <= 0 || prezime.Length > 100 ){
                 return BadRequest("Prezime rezisera mora biti veca od 0 karaktera i manja od 100 karaktera!");
            }

            var reziser = Context.Reziseri.Where( p => p.Ime == ime && p.Prezime == prezime ).FirstOrDefault();

            try{
                if( reziser != null  ){
                    Context.Remove(reziser);
                    await Context.SaveChangesAsync();
                    return Ok($"Reziser {ime} {prezime} je uspesno obrisan!");
                }
                else{
                    return BadRequest($"Reziser {ime} {prezime} nije pronadjen!");
                }
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }*/

    }
}
