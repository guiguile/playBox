package chapter10;
/**
 * Exercise 10 / Section 10.3 - Speaker interface.
 * Any object that can "speak" implements this.
 */
public interface Speaker {
    /** Produce a spoken greeting. */
    void speak();

    /** React to being asked a question. */
    void announce(String message);
}
