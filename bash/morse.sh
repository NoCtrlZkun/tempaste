#!/bin/bash
# Define pin numba
PIN=4
# Function setup
long() {
	gpio -g write $PIN 1;
	sleep 1;
	gpio -g write $PIN 0;
	sleep 1;
}
short() {
	gpio -g write $PIN 1;
	sleep .1;
	gpio -g write $PIN 0;
	sleep 1;
}
# Blink by morse function
morse() {
case $1 in
	1)
		short;long;long;long;long; sleep 5;
		;;
	2)
		short;short;long;long;long; sleep 5;
		;;
	3)
		short;short;short;long;long; sleep 5;
		;;
	4)
		short;short;short;short;long; sleep 5;
		;;
	5)
		short;short;short;short;short; sleep 5;
		;;
	6)
		long;short;short;short;short; sleep 5;
		;;
	7)
		long;long;short;short;short; sleep 5;
		;;
	8)
		long;long;long;short;short; sleep 5;
		;;
	9)
		long;long;long;long;short; sleep 5;
		;;
	0)
		long;long;long;long;long; sleep 5;
		;;
	*)
		sleep 10;
		;;
esac
}
# PIN setup
gpio -g mode $PIN out;
# code begin
short; short; short;
sleep 3;
# get ip and show morse code on pin 4+5 (gpio4 + gnd)
if [ $1 ]; then
	text=$1;
else
	text=$(hostname -I | grep -Po "^\d+\.\d+\.\d+\.\d+");
fi;
for (( i=0; i<${#text}; i++ )); do
	echo "${text:$i:1}";
	morse "${text:$i:1}";
done
