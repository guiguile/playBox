package chapter10;
/**
 * PP 10.1 - Firm uses the Payable interface for polymorphism.
 * The payroll list holds both Employee subtypes and Invoice objects —
 * all processed uniformly through Payable.
 */
public class Firm {
    public static void main(String[] args) {
        Payable[] payables = {
            new SalariedEmployee("Alice",  1500.00),
            new SalariedEmployee("Bob",    1200.00),
            new HourlyEmployee ("Carol",   25.00, 38),
            new HourlyEmployee ("Dave",    30.00, 40),
            new Invoice        ("Bolts",   100,    0.50),
            new Invoice        ("Wrench",    3,   19.99)
        };

        System.out.println("=== Firm Payment Report ===\n");
        double total = 0;
        for (Payable p : payables) {
            System.out.printf("%-50s  Payment: $%.2f%n",
                    p.toString(), p.getPaymentAmount());
            total += p.getPaymentAmount();
        }
        System.out.printf("%n%-50s  Total:   $%.2f%n", "", total);
    }
}
