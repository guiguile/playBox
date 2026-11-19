public class sumOfIntegers {

    public static int sum(int[] numbers) {
        return sumFrom(numbers, 0);
    }

    private static int sumFrom(int[] numbers, int index) {
        if (index == numbers.length) {
            return 0;
        }

        return numbers[index] + sumFrom(numbers, index + 1);
    }

    public static void main(String[] args) {
        System.out.println(sum(new int[]{4, 2, 7}));  // Expected: 13
        System.out.println(sum(new int[]{5, -3}));    // Expected: 2
        System.out.println(sum(new int[]{8}));        // Expected: 8
        System.out.println(sum(new int[]{}));         // Expected: 0
    }
}