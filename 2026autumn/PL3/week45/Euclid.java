public class Euclid {
  public static int gcd(int x, int y) {
        if (y == 0) {
            return x;
        }

        return gcd(y, x % y);
    }

  public static void main(String[] args) {
      System.out.println(gcd(48, 18)); // Expected: 6
      System.out.println(gcd(18, 48)); // Expected: 6
      System.out.println(gcd(17, 5));  // Expected: 1
      System.out.println(gcd(12, 0));  // Expected: 12
      System.out.println(gcd(0, 12));  // Expected: 12
  }
}
