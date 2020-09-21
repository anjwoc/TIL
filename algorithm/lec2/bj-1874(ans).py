import sys
input = lambda: sys.stdin.readline().strip()
# 문제에 따라 다르지만 일반 input 메소드를 사용하는 경우와 시간 차이가 많이 나는 경우가 있는데
# 해당 문제의 경우
# 기본 input 일때의 속도: 4000ms
# readline 메소드 일때의 속도: 100ms

n = int(input())

cnt = 1
stack = []
result = []

for i in range(1, n+1):
    data = int(input())
    while cnt <= data:
        stack.append(cnt)
        cnt += 1
        result.append('+')
    if stack[-1] == data:
        stack.pop()
        result.append('-')
    else:
        print('NO')
        exit(0)
print('\n'.join(result))