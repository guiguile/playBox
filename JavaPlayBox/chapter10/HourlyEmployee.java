package chapter10;
/**
 * An hourly employee paid by hours worked this week.
 */
public class HourlyEmployee extends Employee {
    private double hourlyRate;
    private double hoursWorked;

    public HourlyEmployee(String name, double hourlyRate, double hoursWorked) {
        super(name);
        this.hourlyRate = hourlyRate;
        this.hoursWorked = hoursWorked;
    }

    @Override
    public double getPaymentAmount() {
        return hourlyRate * hoursWorked;
    }

    @Override
    public String toString() {
        return "HourlyEmployee " + getName() +
               " | Rate: $" + hourlyRate + ", Hours: " + hoursWorked;
    }
}
