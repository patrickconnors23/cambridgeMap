#!/bin/bash

# Call file that sends imessage with attachment

file="$PWD/$2"

if [ ! -f $file ]; then
	echo "File not found ya dummy"
else
	exFile="$HOME/scripts/sendmsg.scpt"
	osascript $exFile "$file" "$1"  
	echo "Sent file to $1"
fi
