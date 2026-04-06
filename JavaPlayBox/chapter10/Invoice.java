package chapter10;
/**
 * An invoice for parts purchased. Also Payable, showing that
 * the interface works across unrelated class hierarchies.
 */
public class Invoice implements Payable {
    private String partName;
    private int quantity;
    private double pricePerItem;

    public Invoice(String partName, int quantity, double pricePerItem) {
        this.partName = partName;
        this.quantity = quantity;
        this.pricePerItem = pricePerItem;
    }

    @Override
    public double getPaymentAmount() {
        return quantity * pricePerItem;
    }

    @Override
    public String toString() {
        return "Invoice [" + partName + " x" + quantity +
               " @ $" + pricePerItem + "]";
    }
}
