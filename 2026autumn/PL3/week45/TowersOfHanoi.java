/**
 * TowersOfHanoi represents the classic Towers of Hanoi puzzle.
 *
 * @author Lewis and Chase
 * @version 4.0
 */
public class TowersOfHanoi
{
    private int totalDisks;
    private long moveCount;

    /**
     * Sets up the puzzle with the specified number of disks.
     *
     * @param disks the number of disks 
     */
    public TowersOfHanoi(int disks)
    {
        if (disks < 0)
        {
            throw new IllegalArgumentException("The number of disks cannot be negative.");
        }
        totalDisks = disks;
    }

    /**
     * Performs the initial call to moveTower to solve the puzzle.
     * Moves the disks from tower 1 to tower 3 using tower 2.
     */
    public void solve()
    {
        moveCount = 0;
        moveTower(totalDisks, 1, 3, 2);
    }
    
    /**
     * Moves the specified number of disks from one tower to another
     * by moving a subtower of n-1 disks out of the way, moving one
     * disk, then moving the subtower back. The base case is zero disks.
     *
     * @param numDisks  the number of disks to move
     * @param start     the starting tower
     * @param end       the ending tower
     * @param temp      the temporary tower
     */
    private void moveTower(int numDisks, int start, int end, int temp)
    {
        if (numDisks == 0)
        {
            return;
        }

        moveTower(numDisks - 1, start, temp, end);
        moveOneDisk(start, end);
        moveTower(numDisks - 1, temp, end, start);
    }

    /**
     * Prints instructions to move one disk from the specified start
     * tower to the specified end tower.
     *
     * @param start  the starting tower
     * @param end    the ending tower
     */
    private void moveOneDisk(int start, int end)
    {
        moveCount++;
        System.out.println("Move one disk from " + start + " to " + end);
    }

    public static void main(String[] args)
    {
        for (int disks = 1; disks <= 5; disks++)
        {
            TowersOfHanoi puzzle = new TowersOfHanoi(disks);
            puzzle.solve();
            System.out.printf("%d disk(s): %d move(s)%n%n", disks, puzzle.moveCount);
        }
    }
}
