import sys
import copy
input = lambda: sys.stdin.readline().strip()

cnt = 1
def solve(arr, n):
    if len(arr) == n:
        op_list.append(copy.deepcopy(arr))
        return
    arr.append(' ')
    solve(arr, n)
    arr.pop()

    arr.append('+')
    solve(arr, n)
    arr.pop()

    arr.append('-')
    solve(arr, n)
    arr.pop()

tc = int(input())
for _ in range(tc):
    op_list = []
    n = int(input())
    solve([], n-1)

    integers = [i for i in range(1, n+1)]
    for op in op_list:
        string = ""
        for i in range(n-1):
            string += str(integers[i]) + op[i]
        string += str(integers[-1])
        if eval(string.replace(" ", "")) == 0:
            print(string)
    print()


