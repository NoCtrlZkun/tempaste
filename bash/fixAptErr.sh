#!/bin/bash

# Makes script have to be run as root
if [[ $EUID -ne 0 ]]; then
	echo "This Script Must Be Run As Root (Sudo).";
	exit 1;
fi

lsof /var/lib/dpkg/lock || lsof /var/lib/apt/lists/lock || lsof /var/cache/apt/archives/lock || rm /var/lib/apt/lists/lock && rm /var/cache/apt/archives/lock && dpkg --configure -a;