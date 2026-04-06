package chapter10;
/**
 * A robot that speaks in a robotic, monotone manner.
 */
public class Robot implements Speaker {
    private int id;

    public Robot(int id) {
        this.id = id;
    }

    @Override
    public void speak() {
        System.out.println("Robot-" + id + " says: \"GREETINGS. I AM UNIT " + id + ". HOW MAY I ASSIST.\"");
    }

    @Override
    public void announce(String message) {
        System.out.println("Robot-" + id + " announces: \"" +
                message.toUpperCase() + ". MESSAGE DELIVERED.\"");
    }
}
