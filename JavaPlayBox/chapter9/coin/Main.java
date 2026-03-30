package coin;

public class Main{
  public static void main(String[] args){

    MonetaryCoin c1 = new MonetaryCoin(5);
    MonetaryCoin c2= new MonetaryCoin(10);
    MonetaryCoin c3 = new MonetaryCoin(8);

    System.out.println("Value of coin 1 is: " + c1.getValue());
    System.out.println("Coin 1 flip is: " + c1.toString());
    System.out.println();

    System.out.println("Value of coin 2 is: " + c2.getValue());
    System.out.println("Coin 2 flip is: " + c2.toString());
    System.out.println();

    System.out.println("Value of coin 3 is: " + c3.getValue());
    System.out.println("Coin 3 flip is: " + c3.toString());
    System.out.println();

    int sum = c1.getValue()+c2.getValue()+c3.getValue();
    System.out.println("Sum of value: " + sum);
  }
}
