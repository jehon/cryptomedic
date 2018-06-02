#!/bin/sh
#
# This pre-commit hook looks for `fdescribe`, `fcontext`, `fit`, `fspecify` and `fexample` in the
# staged files and exits with an error code of 1 if there are such changes.
#

# Thanks to https://gist.github.com/DerLobi/d938ac7dc422145f85e6

for focus in fdescribe fcontext fit fspecify fexample; do
    FILES=$(git diff --staged -G"^\s*$focus\(" --name-only | wc -l)
    if [ $FILES -gt 0 ]; then
        echo "You forgot to remove a $focus in the following files:"
        git diff --staged --name-only -G"^\s*$focus\("
        echo ""
        STATUS=1
    fi
done
