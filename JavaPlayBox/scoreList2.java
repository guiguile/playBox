import java.util.Scanner;

public class scoreList2 {
    Scanner scan = new Scanner(System.in);
    System.out.print("How many students on the course: ");
    int count = scan.nextInt();
    double[][] scoreList = new double[count][5];
    System.out.print("Student\tTest1\tTest2\tTest3\tTest4\tTest5\tAverage\n");

    for (int row = 0; row < studentCount; row++) {
        System.out.print((row + 1) + "\t");
        double sum = 0;

        for (int col = 0; col < 5; col++) {
            System.out.print(scores[row][col] + "\t");
            sum += scores[row][col];
        }

        System.out.println(sum / 5);
    }

}
