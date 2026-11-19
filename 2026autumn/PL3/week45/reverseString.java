public static String reverse(String text) {
  if (text.length() <= 1) {
      return text;
  }

  return reverse(text.substring(1)) + text.charAt(0);
}

public static void main(String[] args) {
    System.out.println(reverse("Java Structure")); // erutcurtS avaJ
}