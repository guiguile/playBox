import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class HistogramScaled {
    public static void main(String[] args) {
        int[] counts = new int[10];
        
        try {
            Scanner fileScanner = new Scanner(new File("input.txt"));
            
            while (fileScanner.hasNextInt()) {
                int value = fileScanner.nextInt();
                if (value >= 1 && value <= 100) {
                    int bucket = (value - 1) / 10;
                    counts[bucket]++;
                }
            }
            fileScanner.close();
            
        } catch (FileNotFoundException e) {
            System.out.println("Error: input.txt not found.");
            return;
        }
        
        // Print scaled histogram (1 asterisk per 5 values)
        System.out.println("Histogram (1 asterisk = 5 values):");
        System.out.println();
        
        for (int i = 0; i < 10; i++) {
            int lowerBound = i * 10 + 1;
            int upperBound = i * 10 + 10;
            
            System.out.printf("%2d - %3d | ", lowerBound, upperBound);
            
            // Integer division: 17/5 = 3, 4/5 = 0
            int asterisks = counts[i] / 5;
            
            for (int j = 0; j < asterisks; j++) {
                System.out.print("*");
            }
            System.out.println(" (" + counts[i] + " values)");
        }
    }
}