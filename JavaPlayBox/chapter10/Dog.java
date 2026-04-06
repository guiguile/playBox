package chapter10;

/**
 * A dog that speaks in its own way.
 */
public class Dog implements Speaker {
    private String name;

    public Dog(String name) {
        this.name = name;
    }

    @Override
    public void speak() {
        System.out.println("Dog " + name + " says: \"Woof! Woof!\"");
    }

    @Override
    public void announce(String message) {
        System.out.println("Dog " + name + " hears \"" + message + "\" and barks loudly!");
    }
}
