# 바이너리 서치
# data 중에서 target을 검색하여 index값을 return 없으면 None return

def binary_search(target, data):
    data.sort()
    start = 0
    end = len(data) - 1
    
    while start <= end:
        mid = (start + end) // 2
        if data[mid] == target:
            return mid
        elif data[mid] < target:
            start = mid + 1
        else:
            end = mid - 1
    return None

if __name__ == "__main__":
    li = [i**2 for i in range(11)]
    target = 9
    idx = binary_search(target, li)

    if idx:
        print(li[idx])
    else:
        print("None")

