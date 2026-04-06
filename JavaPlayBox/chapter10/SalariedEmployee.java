package chapter10;
/**
 * A salaried employee paid a fixed weekly salary.
 */
public class SalariedEmployee extends Employee {
    private double weeklySalary;

    public SalariedEmployee(String name, double weeklySalary) {
        super(name);
        this.weeklySalary = weeklySalary;
    }

    @Override
    public double getPaymentAmount() {
        return weeklySalary;
    }

    @Override
    public String toString() {
        return "SalariedEmployee " + getName() +
               " | Weekly salary: $" + weeklySalary;
    }
}
