package HM6;

public class LockableDriver {
    public static void main(String[] args) {
        Coin myCoin = new Coin();
        myCoin.setKey(1234);

        System.out.println("Initial: " + myCoin);

        // Lock the coin
        myCoin.lock(1234);
        System.out.println("After locking: " + myCoin);

        // Attempt to flip while locked
        myCoin.flip();
        
        // Unlock with wrong key
        myCoin.unlock(9999);
        System.out.println("After wrong key: " + myCoin);

        // Unlock with right key
        myCoin.unlock(1234);
        myCoin.flip();
        System.out.println("After unlocking and flipping: " + myCoin);
    }
}
