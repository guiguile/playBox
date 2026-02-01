import java.util.*;

public class scoreList {

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        System.out.print("How many students on the course: ");
        int count = scan.nextInt();
        double[][] scoreList = new double[count][5];
        double courseAverage = 0;

        for (int row=0; row<count; row++) {
            System.out.print("Student " + (row+1) + "\t");
            double sum = 0;
            for (int col=0; col<5; col++) {
                scoreList[row][col] = scan.nextDouble();
                sum += scoreList[row][col];
            }
            System.out.println("Student " + (row+1) + " average: " + sum/5);
            courseAverage += sum/5;
        }
        System.out.print("Course average score: " + courseAverage/count);

        scan.close();
 
    }
}