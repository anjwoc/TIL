import sys
input = sys.stdin.readline

arr = []
for i in range(9):
    arr.append(int(input()))

res = sum(arr)
arr.sort()

for i in range(9):
    for j in range(i+1, 9):
        if res-arr[i]-arr[j] == 100:
            for k in range(9):
                if k==i or k==j:
                    continue
                else:
                    print(arr[k])
            exit()