package homework2;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;
public class e03 {
  public static void main(String[] args) throws FileNotFoundException {

    Scanner file1 = new Scanner(new File("file1.txt"));
    Scanner file2 = new Scanner(new File("file2.txt"));

    int lineNumber = 1;

    while (file1.hasNextLine() || file2.hasNextLine()) {

        String line1 = file1.hasNextLine() ? file1.nextLine() : "";
        String line2 = file2.hasNextLine() ? file2.nextLine() : "";

        if (!line1.equals(line2)) {
            System.out.println("Line " + lineNumber + " differs:");
            System.out.println("File 1: " + line1);
            System.out.println("File 2: " + line2);
            System.out.println();
        }

        lineNumber++;
    }

    file1.close();
    file2.close();
  }
}