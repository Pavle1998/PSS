using System.Collections.Generic;//za povezivanja
using System.ComponentModel.DataAnnotations;//za specifikacije propova
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{   
    [Table("Sezona")]
    public class Sezona
    {   
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(100)]
        public string Naziv { get; set; }

        [Required]
        public int RedniBrojSezone { get; set; }

        [Required]
        public int BrojEpizoda { get; set; }

        [Required]
        public int GodinaEmitovanja { get; set; }

        public Serija SezonaSerija { get; set; }
        [JsonIgnore]
        public List<Epizoda> SezonaEpizoda { get; set; }
    }
}