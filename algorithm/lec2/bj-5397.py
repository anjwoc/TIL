import sys
input = lambda: sys.stdin.readline().strip()

tc = int(input())
idx = 0
for _ in range(tc):
    log = list(input())
    result = []
    i=0
    while log:
        char = log.pop(0)
        if char == '>':
            idx += 1
        elif char == '<':
            if idx != 0:
                print('minus')
                idx -=1
        elif char == '-':
            print(idx)
            result.pop(idx-1)
        else:
            result.append(char)
            idx+=1
        i+=1
    print(result)