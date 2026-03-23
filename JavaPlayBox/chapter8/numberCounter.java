package chapter8;
import java.util.Scanner;
/*
Write a program that reads an arbitrary number of integers that are in the range 0 to 50 inclusive and counts how many occurrences of each are entered. Indicate the end of the input by a value outside of therange. After all input has been processed, print all of the values (with the number of occurrences) that were entered one or more times.
*/
public class numberCounter {
  public static void main(String[] args) {
    int[] counts = new int[51];
    Scanner scan = new Scanner(System.in);

    System.out.println("Enter a number between 0-50 (inclusive).");
    System.out.println("Enter a number outside of this range to stop.");
    System.out.println();
    
    while (true) {
      System.out.print("Your number: ");
      int number = scan.nextInt();
      if (number<0 || number>50) {
        System.out.println("Quit! Due to the number entered is outside the range.");
        break;
      }

      counts[number]++;
    }

    System.out.println("Result as follows: ");
    for (int i=0; i<counts.length;i++){
      if (counts[i]>0){
        System.out.println("Number "+i+" Occurences is "+ counts[i]);
      }
    }

  scan.close();
  }
}
