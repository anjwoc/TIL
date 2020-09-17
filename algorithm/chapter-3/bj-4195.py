import sys
from itertools import chain
from collections import defaultdict
input = lambda: sys.stdin.readline().strip()

tc = int(input())
for _ in range(tc):
    F = int(input())
    dic1 = {}
    dic2 = {}
    for __ in range(F):
        result = {}
        f1, f2 = input().split()
        dic1[f1] = [f2]
        dic2[f2] = [f1]
        
        dic3 = defaultdict(list)
        for k, v in chain(dic1.items(), dic2.items()):
            dic3[k].append(v)
        print(len(dic3[f1]) + len(dic3[f2]))
        


