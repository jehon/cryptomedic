#!/bin/bash

# Thanks to https://gist.github.com/PaulTaykalo/e10d3bd1b79dfbf550c4872307953438

exec 1>&2
if test $(git diff-index -p -M --cached HEAD -- | grep '^+' | grep '^+[[:space:]]*\(fdescribe(\|fcontext(\|fit(\)' | wc -c ) != 0
then	
    searchedStrings=`git diff-index -p -M --cached HEAD -- | grep '^+' | grep '^+[[:space:]]*\(fdescribe(\|fcontext(\|fit(\)'`
	echo "Error: You forgot to remove fdescribe: ${searchedStrings}"
	exit 1
fi
