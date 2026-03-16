package HM6;

public class Task implements Priority, Comparable<Task> {
    private String name;
    private int priority;

    public Task(String name, int priority) {
        this.name = name;
        this.priority = priority;
    }

    // From previous PPs
    public void setPriority(int priority) {
        this.priority = priority;
    }

    public int getPriority() {
        return priority;
    }

    // Implementing the Comparable interface
    @Override
    public int compareTo(Task other) {
        // Higher number = higher priority
        // Returns positive if this > other, negative if this < other
        return this.priority - other.priority;
    }

    public String toString() {
        return "Priority " + priority + ": " + name;
    }
}

