package HM6;

import java.text.NumberFormat;

public class Account implements Lockable {
    private final double RATE = 0.035; // 3.5% interest rate
    private long acctNumber;
    private double balance;
    private String name;

    // Lockable state variables
    private int key;
    private boolean isLocked;

    public Account(String owner, long account, double initial) {
        name = owner;
        acctNumber = account;
        balance = initial;
        isLocked = false; // Default state
    }

    // --- Lockable Implementation ---
    public void setKey(int key) {
        this.key = key;
    }

    public void lock(int key) {
        if (key == this.key) isLocked = true;
    }

    public void unlock(int key) {
        if (key == this.key) isLocked = false;
    }

    public boolean locked() {
        return isLocked;
    }

    // --- Protected Account Methods ---
    public double deposit(double amount) {
        if (!isLocked && amount > 0) {
            balance = balance + amount;
        }
        return balance;
    }

    public double withdraw(double amount, double fee) {
        if (!isLocked && amount + fee > 0 && amount + fee <= balance) {
            balance = balance - amount - fee;
        }
        return balance;
    }

    public double addInterest() {
        if (!isLocked) {
            balance += (balance * RATE);
        }
        return balance;
    }

    public double getBalance() {
        return balance;
    }

    public String toString() {
        NumberFormat fmt = NumberFormat.getCurrencyInstance();
        String status = isLocked ? " [LOCKED]" : " [UNLOCKED]";
        return acctNumber + "\t" + name + "\t" + fmt.format(balance) + status;
    }
}

