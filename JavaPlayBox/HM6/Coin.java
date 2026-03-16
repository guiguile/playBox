package HM6;

public class Coin implements Lockable {
    private final int HEADS = 0;
    private int face;
    
    private int key;
    private boolean isLocked;

    public Coin() {
        isLocked = false; // Default state
        flip();
    }

    // --- Lockable Implementations ---
    public void setKey(int key) {
        this.key = key;
    }

    public void lock(int key) {
        if (key == this.key) {
            isLocked = true;
        }
    }

    public void unlock(int key) {
        if (key == this.key) {
            isLocked = false;
        }
    }

    public boolean locked() {
        return isLocked;
    }

    // --- Regular Methods (Protected by Lock) ---
    public void flip() {
        if (!isLocked) {
            face = (int) (Math.random() * 2);
        } else {
            System.out.println("Coin is locked. Cannot flip.");
        }
    }

    public int getFace() {
        return face;
    }

    public String toString() {
        String faceName = (face == HEADS) ? "Heads" : "Tails";
        return faceName + (isLocked ? " (LOCKED)" : " (UNLOCKED)");
    }
}

