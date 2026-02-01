/*
    Exercise 2
    Directory: w45/e02
    Objective: 
        - Create a 3x3 2D array filled with integers. 
            Write methods to calculate the sum of each row and each column.
    Expected Output:
        - Print each row and column sum, e.g., "Sum of row 1: 15" and "Sum of column 1: 12".
*/

package typicalProblem;

import java.util.*;

public class Array {
    public static void main(String[] args) {
        // YOUR CODE GOES HERE  
        int[][] matrix = new int[3][3];
        int[] row = new int[3];  
        Random ran = new Random();
        for (int j=0; j<matrix.length; j++) {
            int rowSum=0;
            for (int i:row) {
                i = ran.nextInt(10);
                System.out.print(i + " ");
                rowSum+=i;               
            }
            System.err.print("row sum is %d".formatted(rowSum));
            System.out.println();
            //colSum+=matrix[j][j];
        }
        
        for (int r=0; r<3; r++) {
            int colSum=0;
            for (int col=0; col<matrix.length; col++) {
            colSum += matrix[col][r];           
            }
            System.out.println("colum sum is %d".formatted(colSum));
        }
    }
}
