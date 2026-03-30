import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Histogram {
    public static void main(String[] args) {
        // Array for 10 ranges: 1-10, 11-20, ..., 91-100
        int[] counts = new int[10];
        
        // Read from file
        try {
            Scanner fileScanner = new Scanner(new File("input.txt"));
            
            while (fileScanner.hasNextInt()) {
                int value = fileScanner.nextInt();
                
                // Validate range 1-100
                if (value >= 1 && value <= 100) {
                    // Determine which bucket (0-9)
                    int bucket = (value - 1) / 10;
                    counts[bucket]++;
                }
            }
            fileScanner.close();
            
        } catch (FileNotFoundException e) {
            System.out.println("Error: input.txt not found.");
            return;
        }
        
        // Print histogram
        System.out.println("Histogram (1 asterisk = 1 value):");
        System.out.println();
        
        for (int i = 0; i < 10; i++) {
            int lowerBound = i * 10 + 1;
            int upperBound = i * 10 + 10;
            
            System.out.printf("%2d - %3d | ", lowerBound, upperBound);
            
            // Print asterisks
            for (int j = 0; j < counts[i]; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}