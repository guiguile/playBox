package chapter10;
/**
 * A human speaker who speaks politely and by name.
 */
public class Person implements Speaker {
    private String name;

    public Person(String name) {
        this.name = name;
    }

    @Override
    public void speak() {
        System.out.println("Person " + name + " says: \"Hello, my name is " + name + "!\"");
    }

    @Override
    public void announce(String message) {
        System.out.println("Person " + name + " announces: \"" + message + "\"");
    }
}
