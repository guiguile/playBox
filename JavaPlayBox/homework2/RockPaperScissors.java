package homework2;

import java.util.Random;
import java.util.Scanner;

public class RockPaperScissors {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();
        
        int userWins = 0;
        int computerWins = 0;
        int ties = 0;
        boolean playAgain = true;
        
        System.out.println("Welcome to Rock-Paper-Scissors!");
        System.out.println("Enter your choice: (R)ock, (P)aper, (S)cissors, or (Q)uit");
        
        while (playAgain) {
            // Computer's random choice
            int computerChoice = random.nextInt(3); // 0=Rock, 1=Paper, 2=Scissors
            
            // Get user input
            System.out.print("\nYour choice: ");
            String userInput = scanner.nextLine().trim().toUpperCase();
            
            // Check if user wants to quit
            if (userInput.equals("Q") || userInput.equals("QUIT")) {
                playAgain = false;
                break;
            }
            
            // Convert user input to numerical choice
            int userChoice;
            if (userInput.equals("R") || userInput.equals("ROCK")) {
                userChoice = 0;
            } else if (userInput.equals("P") || userInput.equals("PAPER")) {
                userChoice = 1;
            } else if (userInput.equals("S") || userInput.equals("SCISSORS")) {
                userChoice = 2;
            } else {
                System.out.println("Invalid input. Please enter R, P, S, or Q.");
                continue;
            }
            
            // Display choices
            System.out.println("\n--- Game Results ---");
            System.out.println("Your choice: " + choiceToString(userChoice));
            System.out.println("Computer's choice: " + choiceToString(computerChoice));
            
            // Determine winner
            if (userChoice == computerChoice) {
                System.out.println("It's a tie!");
                ties++;
            } else if ((userChoice == 0 && computerChoice == 2) ||  // Rock beats Scissors
                       (userChoice == 1 && computerChoice == 0) ||  // Paper beats Rock
                       (userChoice == 2 && computerChoice == 1)) {  // Scissors beats Paper
                System.out.println("You win! " + choiceToString(userChoice) + 
                                 " beats " + choiceToString(computerChoice));
                userWins++;
            } else {
                System.out.println("Computer wins! " + choiceToString(computerChoice) + 
                                 " beats " + choiceToString(userChoice));
                computerWins++;
            }
            
            // Display current statistics
            System.out.println("\n--- Current Statistics ---");
            System.out.println("Wins: " + userWins + " | Losses: " + computerWins + " | Ties: " + ties);
            System.out.println("\nPlay again? Enter (R)ock, (P)aper, (S)cissors, or (Q)uit");
        }
        
        // Display final results
        System.out.println("\n=== Final Game Statistics ===");
        System.out.println("Total games played: " + (userWins + computerWins + ties));
        System.out.println("Wins: " + userWins);
        System.out.println("Losses: " + computerWins);
        System.out.println("Ties: " + ties);
        
        scanner.close();
    }
    
    // Helper method to convert numerical choice to string
    private static String choiceToString(int choice) {
        switch (choice) {
            case 0: return "Rock";
            case 1: return "Paper";
            case 2: return "Scissors";
            default: return "Invalid";
        }
    }
}