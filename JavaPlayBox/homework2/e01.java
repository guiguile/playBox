  /* You need to:

  Print characters with numeric values from 32 to 126

  Show them as number / character pairs

  Print 5 pairs per line

  Separate pairs using tab characters (\t)

  Values increase left to right across the row
*/

package homework2;

public class e01 {
    public static void main(String[] args) {

        int count = 0;

        for (int i = 32; i <= 126; i++) {
            char ch = (char) i;

            // print number/character pair
            System.out.print(i + " " + ch + "\t");

            count++;

            // after 5 pairs, go to next line
            if (count % 5 == 0) {
                System.out.println();
            }
        }
    }
}
