public class Main {

    public static void printString(String text) {
        if (text.isEmpty()) {
            return;
        }

        System.out.print(text.charAt(0));
        printString(text.substring(1));
    }

    public static void main(String[] args) {
        printString("Java Structure");
        System.out.println();
    }
}