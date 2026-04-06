package chapter10;
/**
 * Abstract base class for employees. Implements Payable so that
 * all employees can be treated polymorphically through that interface.
 */
public abstract class Employee implements Payable {
    private String name;

    public Employee(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return name;
    }
}
