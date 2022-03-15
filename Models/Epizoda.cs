using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;//naziv tabele
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Epizoda")]
    public class Epizoda
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public int RedniBrojEpizode { get; set; }

        [Required]
        [MaxLength(100)]
        public string Naziv { get; set; }

        [Required]
        [Range(1,100)] //trajanje u minutima
        public int Trajanje { get; set; }

        [Required]
        [MaxLength(999)]
        public string Opis { get; set; }
        [JsonIgnore]
        public Sezona EpizodaSezona { get; set; }
        [JsonIgnore]
        public Zanr EpizodaZanr { get; set; }
        [JsonIgnore]
        public Reziser EpizodaReziser { get; set; }
    }
}