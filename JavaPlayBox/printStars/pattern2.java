package printStars;

public class pattern2 {
  public static void main(String[] args) {
    
    // using string method in one loop
    for (int i = 1; i<=10;i++) {
      System.out.print(" ".repeat(10-i));
      System.out.println("*".repeat(i));
    }

      System.out.println();
    // loop inside a loop
    for (int line = 1; line<=10;line++) {
      for (int space = 10-line; space>0;space--) {
        System.out.print(" ");
      }
      for (int star=1; star<=line;star++) {
        System.out.print("*");
      }
      System.out.println();
    }     
  }
}
