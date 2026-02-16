package homework2;

/*
You need to:
Randomly generate three numbers between 0 and 9
Print them side by side

Check:
  All three same → jackpot

  Any two same → small win

  None same → no win

Ask the user if they want to play again

Keep looping until they choose to stop
*/
import java.util.Random;
import java.util.Scanner;

public class e02 {
  public static void main(String[] args) {
    Scanner scan = new Scanner(System.in);
    Random ran = new Random();

    boolean playAgain = true;

    while (playAgain) {
    int ran1 = ran.nextInt(10);
    int ran2 = ran.nextInt(10);
    int ran3 = ran.nextInt(10);

    System.out.println("Slot: "+ran1+ran2+ran3);
    
    // Check results
    if (ran1 == ran2 && ran2 == ran3) {
        System.out.println("🎉 JACKPOT! All three numbers are the same!");
    } else if (ran1 == ran2 || ran1 == ran3 || ran2 == ran3) {
        System.out.println("You got two matching numbers!");
    } else {
        System.out.println("No match. Try again!");
    }

    // Ask user to continue
      System.out.print("Play again? (y/n): ");
      String choice = scan.nextLine().toLowerCase();

      if (!choice.equals("y")) {
          playAgain = false;
      }

      System.out.println();
    }
    scan.close();
    System.out.println("See you!");
  }
}
