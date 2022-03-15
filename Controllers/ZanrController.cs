using System;//za exception
using System.Linq;
using System.Threading.Tasks;//za Task<ActionResult>
using Microsoft.AspNetCore.Mvc;//osnovno
using Microsoft.EntityFrameworkCore;
using Models;//za SerijaContext

namespace Project_v1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ZanrController : ControllerBase
    {
        public SerijaContext Context { get; set; }

        public ZanrController(SerijaContext context){
            Context=context;
        }


        //koristimo
        [Route("PreuzmiZanr/{idEpizode}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiZanr(int idEpizode){
            try{
                var zanr = await Context.Epizode
                    .Include( p => p.EpizodaZanr)
                    .Where( p => p.ID == idEpizode)
                    .Select( p => new { p.EpizodaZanr.Naziv}).ToListAsync();
                return Ok(zanr);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
   
    
        /*[Route("DodajZanr")]
        [HttpPost]
        public async Task<ActionResult> DodajZanr([FromBody]Zanr zanr){
            if( zanr.Naziv.Length <= 0 || zanr.Naziv.Length > 100)
            {
                return BadRequest("Duzina naziva mora biti veca od 0 karaktera i manja od 100 karaktera!");
            }

            try
            {
                Context.Zanrovi.Add(zanr);
                await Context.SaveChangesAsync();

                return Ok($"Uspesno upisan zanr sa nazivom: {zanr.Naziv}!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }*/

       /* [Route("VratiSveZanrove")]
        [HttpGet]
        public async Task<ActionResult> VratiSveZanrove (){
            
            var zanrovi = await Context.Zanrovi.ToListAsync();

            return Ok(
                zanrovi.Select( p => 
                    new{
                        NazivZanra = p.Naziv
                    }
                ).ToList()
            );
        }*/


        /*[Route("PromeniZanr/{naziv}/{noviNaziv}")]
        [HttpPut]
        public async Task<ActionResult> PromeniZanr(string naziv, string noviNaziv){
            if( naziv.Length <= 0 || naziv.Length > 100 || noviNaziv.Length <=0 || noviNaziv.Length > 100){
                return BadRequest("Duzina naziva mora biti veca od 0 karaktera i manja od 100 karaktera!");
            }

            try{
                var zanrZaIzmenu = Context.Zanrovi.Where( p => p.Naziv == naziv).FirstOrDefault();

                if( zanrZaIzmenu != null ){
                    zanrZaIzmenu.Naziv = noviNaziv;

                    await Context.SaveChangesAsync();
                    
                    return Ok($"Uspesno promenjen zanr sa nazivom {naziv} u {noviNaziv}");
                }
                else{
                    return BadRequest($"Nije pronadjen zanr sa nazivom: {naziv}!");
                }
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }*/

       /* [Route("IzbrisiZanr/{naziv}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiZanr(string naziv){
            
            if( naziv.Length <= 0 || naziv.Length > 100){
                return BadRequest("Duzina naziva mora biti veca od 0 karaktera i manja od 100 karaktera!");
            }

            try{
                var zanrZaBrisanje = Context.Zanrovi.Where( p => p.Naziv == naziv ).FirstOrDefault();

                if(zanrZaBrisanje != null){
                    Context.Zanrovi.Remove(zanrZaBrisanje);
                    await Context.SaveChangesAsync();

                    return Ok($"Uspesno izbrisan zanr sa nazivom: {naziv}!");
                }
                else{
                    return BadRequest($"Zanr sa nazivom:{naziv} nije pronadjen!");
                }
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }*/
    }
}
