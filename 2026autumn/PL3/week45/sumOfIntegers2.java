public class sumOfIntegers2 {
  public int sum(int num) {
    return sumRange(1, num);
  }

  private int sumRange(int start, int end) {
    if (start > end) {
        return 0; // Empty range
    }

    if (start == end) {
        return start; // One number left
    }

    int mid = start + (end - start) / 2;
    return sumRange(start, mid) + sumRange(mid + 1, end);
  }
}
