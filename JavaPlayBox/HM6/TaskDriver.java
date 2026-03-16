package HM6;

public class TaskDriver {
    public static void main(String[] args) {
        Task t1 = new Task("Finish Lab", 10);
        Task t2 = new Task("Eat Lunch", 5);
        Task t3 = new Task("Study for Quiz", 10);

        System.out.println("Comparing '" + t1 + "' to '" + t2 + "':");
        
        if (t1.compareTo(t2) > 0) {
            System.out.println("Result: '" + t1 + "' has higher priority.");
        } else if (t1.compareTo(t2) < 0) {
            System.out.println("Result: '" + t2 + "' has higher priority.");
        } else {
            System.out.println("Result: They have equal priority.");
        }

        // Showing equality
        System.out.println("\nComparing '" + t1 + "' to '" + t3 + "':");
        System.out.println("Result: " + (t1.compareTo(t3) == 0 ? "Equal priority" : "Different priority"));
    }
}