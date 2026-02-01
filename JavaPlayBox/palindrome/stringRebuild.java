package palindrome;
import java.util.Scanner;

public class stringRebuild {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Give the name: ");
        String name = sc.nextLine();

        String cleaned = name.toLowerCase().replaceAll("[^a-z]", "");
     /*   for (int i=cleaned.length()-1;i>=0;i--) {
            System.out.println(cleaned.charAt(i));
        }
*/
        //char[] clName = cleaned.toCharArray();
        String reversed = new StringBuilder(cleaned).reverse().toString();
        System.out.println(reversed);

        if (reversed.equals(cleaned)) System.out.println("Is palindrome.");      
        else System.out.println("Not a parlindrome.");

        sc.close();
    }
}
