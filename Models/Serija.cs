using System.Collections.Generic;//za povezivanje
using System.ComponentModel.DataAnnotations;//za specifikacije
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models 
{
    [Table("Serija")]
    public class Serija
    {

        [Key]
        [Required]
        public int ID { get; set; }

        [Required]
        [MaxLength(100)]
        public string Naziv { get; set; }

        [Required]
        public int BrojSezona { get; set; }

        [Required]
        [Range(0,10)]
        public double Ocena { get; set; }
        [JsonIgnore]
        public List<Sezona> SerijaSezona { get; set; }
    }
}