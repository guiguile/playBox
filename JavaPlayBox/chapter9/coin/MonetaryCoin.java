package coin;

public class MonetaryCoin extends Coin {
  private int value;

  public MonetaryCoin(int value){
    super();
    this.value = value;
  }

  public int getValue(){
    return value;
  }
  
}
