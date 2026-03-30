package chapter8;
import java.util.Scanner;

public class pl {
  public static void main(String[] args) {
    Scanner scan = new Scanner(System.in);
    double[] numbers = new double[10];
    System.out.println("The size of the array: " + numbers.length);

    for (int i=0;i<numbers.length;i++) {
      System.out.print("Enter number " + (i+1) + ": ");
      numbers[i] = scan.nextDouble();
    }
  
    System.out.println("Array in reverse order as follows: ");

    for (int i=numbers.length-1;i>=0;i--) {
      System.out.print(numbers[i]+" ");
    }

    scan.close();
  }
  
}
