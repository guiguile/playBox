/*
Leave out from inspection special characters (punctuation marks, white spaces and similar) and study only the letter and number characters for palindrome checking. Uppercase and lowercase letters are considered to be same letters.
*/


package palindrome;
import java.util.Scanner;

public class palindrome {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        System.out.print("Input: ");
        String input = scan.nextLine();

        if (isPalindrome(input)) System.out.println("It's a palindrome.");else System.out.println("Not a palindrome.");

        scan.close();
    }

    public static boolean isPalindrome(String text) {

        int left = 0; int right = text.length()-1;

        while(left<right) {

            char cLeft = text.charAt(left);
            char cRight = text.charAt(right);

            if (!Character.isLetterOrDigit(cLeft)) {
                left++;
                continue;
            }

            if (!Character.isLetterOrDigit(cRight)) {
                right--;
                continue;
            }

            // compare
            if (Character.toLowerCase(cLeft) != Character.toLowerCase(cRight)) {
                return false;
            }
            
            left++;
            right--;

        }
        return true;
    }
}
