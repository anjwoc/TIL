n = int(input())
arr = dict()
for i in list(map(int, input().split())):
    arr[i] = 1

m = int(input())
for j in list(map(int, input().split())):
    if j in arr:
        print(1)
    else:
        print(0)
        

