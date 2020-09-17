import sys
input = lambda: sys.stdin.readline().strip()


tc = int(input())
cur = 0
for _ in range(tc):
    left = []
    right = []
    data = input()
    for i in data:
        if i == '-':
            if left:
                left.pop()
        elif i == '<':
            if left:
                right.append(left.pop())
        elif i == '>':
            if right:
                left.append(right.pop())
        else:
            left.append(i)
    left.extend(reversed(right))
    print(''.join(left))
    
    