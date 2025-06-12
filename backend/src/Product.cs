public class Product
{
    // Id can be Null because it is a auto incremnt value in the db
    public int? Id { get; set; }
    required public string Name { get; set; }
    required public Int32 Price { get; set; }
}