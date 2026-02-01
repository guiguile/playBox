import java.util.Scanner;

public class timePieriodConverter {
    public static void main(String[] args) {

        //Enter the number of seconds: 3661
        //Time period of 3661 seconds is 01:01:01 expressed in hours/minutes/seconds.
        Scanner scan = new Scanner(System.in);
        System.out.print("Enter the number of seconds: ");
        int sec = scan.nextInt();
        int[] remainders = new int[3];
        int i = 2;
        // quotient should not less than 0;
        while(i >= 0) {
            remainders[i] = sec%60;
            sec = sec/60;
            i--;
        }

        System.out.println(String.format("%02d", remainders[0])+ ":" +String.format("%02d", remainders[1])+ ":" + String.format("%02d", remainders[2]));

        scan.close();
    }
}
