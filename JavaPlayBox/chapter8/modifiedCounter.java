package chapter8;
import java.util.Scanner;

//modify the numberCounter.java so that it works for numbers in the range bewteen -25 and 25.
public class modifiedCounter {
  public static void main(String[] args) {
    int[] counts = new int[51];
    Scanner scan = new Scanner(System.in);

    System.out.println("Enter a number between -25 and 25 (inclusive).");
    System.out.println("Enter a number outside of this range to stop.");
    System.out.println();
    
    while (true) {
      System.out.print("Your number: ");
      int number = scan.nextInt() + 25;
      if (number<0 || number>50) {
        System.out.println("Quit! Due to the input outside of the boudry.");
        break;
      }

      counts[number]++;
    }

    System.out.println("Result as follows: ");
    boolean anyFound = false;

    for (int i=0; i<counts.length;i++){
      if (counts[i]>0){
        System.out.println("Number "+(i-25)+" Occurences is "+ counts[i]);
        anyFound = true;
      }
    }

    if (!anyFound) {
      System.out.println("No valid numbers were entered.");
      
    }

  scan.close();
  }
}
