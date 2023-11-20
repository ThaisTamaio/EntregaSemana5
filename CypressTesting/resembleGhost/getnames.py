# get names of all files in the folder v5
# and save them in a file names.txt
import os
import sys

def getnames():
    names = []
    for root, dirs, files in os.walk('v5'):
        for name in files:
            names.append(name)
    names.sort()
    with open('namesv5.txt', 'w') as f:
        for name in names:
            f.write(name + '\n')

def getnamesList():
    names = []
    for root, dirs, files in os.walk('v3'):
        for name in files:
            #replace second letter with x
            name = name[0] + 'x' + name[2:]
            names.append(name)
    names.sort()
    with open('list.txt', 'w') as f:
        f.write('[')
        for name in names:
            f.write('"' + name + '",')
        f.write(']')

if __name__ == '__main__':
    getnames()