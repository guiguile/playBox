package chapter8;
/*
Implement a general class Adder that contain several versions of Add methods for different data types (overloading). Addition of following data types are supported: integers, floating point values, characters (in here numeric values of two characters are added and their sum is converted back to a character), strings (adding two strings means here concatenating them). The result is always returned back as a return value.

Do also main program for this project where you test your different Add methods.

*/
public class Adder {

  public static int Add(int a, int b) {
    return a + b;
  }

  public static double Add(double a, double b) {
    return a + b;
  }

  public static String Add(String a, String b) {
    return a + b;
  }

  public static char Add(char a, char b) {

    return (char)(a+b);

  }

  public static void main(String[] args) {
    
    char charResult = Add('A', 'B');


    System.out.println("int 6 + 9 = " + Add(6,9));
    System.out.println("\nfloat 3.1415926 + 1.678524 = " + Add(3.1415926,1.678524));
    System.out.println("\nString marja + saa = " + Add("marja","ssa"));
    System.out.println("\nCharacters: 'A' (65) + 'B' (66) = '" + charResult + "' (ASCII: " + (int)charResult + ")");

    char charResult2 = Add('1', '2');
    System.out.println("Characters: '1' (49) + '2' (50) = '" + charResult2 + "' (ASCII: " + (int)charResult2 + ")");
  }


}