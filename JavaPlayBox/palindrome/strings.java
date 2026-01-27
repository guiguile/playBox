package palindrome;
import java.util.Scanner;

public class strings {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("Palindrome test, please enter some text:");
        String input = sc.nextLine();

        // Normalize the input:
        // 1. Convert to lowercase
        // 2. Remove all non-letter characters (spaces, punctuation, etc.)
        String cleaned = input.toLowerCase().replaceAll("[^a-z]", "");
       /* char nString;
       for (int i=cleaned.length(); i>=0; i--) {
            nString += cleaned.charAt(i);
        }
       System.out.println(nString); */
        // Reverse the cleaned string
        String reversed = new StringBuilder(cleaned).reverse().toString();

        // Check palindrome
        if (cleaned.equals(reversed)) {
            System.out.println(input + " is a palindrome");
        } else {
            System.out.println(input + " is not a palindrome");
        }

        sc.close();
    }
}