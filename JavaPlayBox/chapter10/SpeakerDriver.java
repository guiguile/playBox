package chapter10;
/**
 * Driver class that tests the Speaker interface polymorphically.
 */
public class SpeakerDriver {
    public static void main(String[] args) {
        Speaker[] speakers = {
            new Person("Alice"),
            new Dog("Rex"),
            new Robot(42)
        };

        System.out.println("=== Speaker Demo ===\n");

        // All speakers greet
        System.out.println("-- Each speaker introduces themselves --");
        for (Speaker s : speakers) {
            s.speak();
        }

        System.out.println("\n-- Announcing a fire drill --");
        for (Speaker s : speakers) {
            s.announce("Fire drill at 3pm today");
        }
    }
}
