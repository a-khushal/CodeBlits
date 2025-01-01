#include <bits/stdc++.h>

using namespace std;

// User code here //

int main(void) {
    int size_num1;
    std::cin >> size_num1;
    vector<int> num1;
    for (int i = 0; i < size_num1; i++) {
        int num1_i;
        std::cin >> num1_i;
        num1.push_back(num1_i);
    }
    int size_arr;
    std::cin >> size_arr;
    vector<string> arr;
    for (int i = 0; i < size_arr; i++) {
        string arr_i;
        std::cin >> arr_i;
        arr.push_back(arr_i);
    }
    char ch;
    std::cin >> ch;

	vector<float> result = sum(num1, arr, ch);
    std::cout << result << endl;
    return 0;
}