package homework2;

public class starsD {
    //-----------------------------------------------------------------
    //  Prints a diamond shape using asterisk (star) characters.
    //-----------------------------------------------------------------
    public static void main(String[] args)
    {
        final int LIMIT = 10;

        // Print top half of diamond
        for (int row = 1; row <= LIMIT/2; row++)
        {
            for (int space = 1; space <= (LIMIT / 2) - row; space++)
                System.out.print(" ");

            for (int star = 1; star <= (row * 2) - 1; star++)
                System.out.print("*");

            System.out.println();
        }

        // Print bottom half of diamond
        for (int row = 1; row <= LIMIT / 2; row++)
        {
            for (int space = 1; space <= row - 1; space++)
                System.out.print(" ");

            for (int star = 1; star <= LIMIT - (row * 2) + 1; star++)
                System.out.print("*");

            System.out.println();
        }
    }
}