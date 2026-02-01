package printStars;

class pattern1 {
  public static void main(String[] args) {
    
    // using string.repeat() methord
    for (int i = 1; i<8;i++) {
      System.out.println("*".repeat(i));
    }


    // classic loop way
    for (int line = 1; line<8;line++) {
      for (int colon = 7; colon>=line; colon--)
        System.out.print("*");
      System.out.println();
    }
  }
}