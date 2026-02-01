import java.util.Scanner;
import java.util.Random;

public class guessGame {
    public static void main(String[] args) {
        Random rd = new Random();
        int rand = rd.nextInt(10);
        Scanner sc = new Scanner(System.in);
        System.out.println("Your guess: ");
        int guess = sc.nextInt();

        if (rand==guess) System.out.println("Spot on! Great!");
        else if (rand>guess) System.out.println("Not higher enough.");
        else System.out.println("Too high!");
        
        sc.close();
    } 

        
}
