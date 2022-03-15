using System.Collections.Generic;//za konekcije (List)
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models{
    [Table("Zanr")]
    public class Zanr
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(100)]
        public string Naziv { get; set; }
        [JsonIgnore]
        public List<Epizoda> ZanrEpizoda { get; set; }
    }
}