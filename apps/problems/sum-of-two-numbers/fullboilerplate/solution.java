import java.util.*;

public class solution {
    // User code here //

    public static void main (String[] args) {
        Scanner sc = new Scanner(System.in);
        int num1_size;
        num1_size = sc.nextInt();
        int[] num1 = new int[num1_size];
        for (int i = 0; i < num1_size; i++) {
            num1[i] = sc.nextInt();
        }
        int arr_size;
        arr_size = sc.nextInt();
        String[] arr = new String[arr_size];
        sc.nextLine(); // Consume the leftover newline character
        for (int i = 0; i < arr_size; i++) {
            arr[i] = sc.nextLine();
        }
        char ch;
        ch = sc.next().charAt(0);
        List<Float> result = sum(num1, arr, ch);
        System.out.println(result);
    }
}
