import java.util.*;

public class factorialFunction {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Give a number: ");
        int num = sc.nextInt();

        System.out.println("Factorial Function result: " + factorial(num));
        sc.close();
    }

    public static long factorial(int n) {
        if (n<= 1) return 1;
        return n*factorial(n-1);
    }
}
