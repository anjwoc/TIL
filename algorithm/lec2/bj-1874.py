n = int(input())
arr = []
st = []

for i in range(n):
    num = int(input())
    sNum = not arr and 1 or arr[-1]+1
    for i in range(sNum, num+1):
        arr.append(i)
        st.append(i)
        print("+")
    if num == st[-1]:
        st.pop()
        print("-")