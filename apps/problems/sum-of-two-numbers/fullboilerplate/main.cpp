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
    int size_num2;
    std::cin >> size_num2;
    vector<string> num2;
    for (int i = 0; i < size_num2; i++) {
        string num2_i;
        std::cin >> num2_i;
        num2.push_back(num2_i);
    }
    int num3;
    std::cin >> num3;

	vector<float> result = sum(num1, num2, num3);
    std::cout << result << endl;
    return 0;
}