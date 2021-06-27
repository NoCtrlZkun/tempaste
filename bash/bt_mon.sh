#!/bin/bash

sudo bluetoothctl power on;
sudo bluetoothctl pairable on;
sudo bluetoothctl discoverable on;
# amixer set Headphone 100%;
TABLE=""; # Allowed Bluetooth MAC Addr here
LT="";

while true; do
	CONNECTED=$(hcitool con | grep -o "[[:xdigit:]:]\{8,17\}");
	CURR_BRT=$(grep cd /etc/bt_speaker/config.ini);

	if [[ "$CONNECTED" != "$LT" ]]; then # Always reset vol. to 100% when any device connected
		amixer set Headphone 100%;
		LT=$CONNECTED;
	fi;

	if [[ $TABLE == *"$CONNECTED"* ]]; then # Is device is approved?
		echo "Device $CONNECTED is in DB, no action";
	else
		echo "Device $CONNECTED IS NOT in DB, blocking....";
		sudo bluetoothctl block $CONNECTED;
	fi
	sleep 5;
done;

# add this script to service & run at startup
# run as sudo
#echo -e "[Unit]\nDescription=Monitor connected bluetooth devices\n\n[Service]\nType=exec\nExecStart=/home/pi/bt_mon.sh\n\n[Install]\nWantedBy=multi-user.target" > /etc/systemd/system/bt_mon.service && systemctl daemon-reload && systemctl start bt_mon && systemctl status bt_mon && systemctl enable bt_mon;

# delete all previously connected devices
#for device in $(sudo bluetoothctl devices  | grep -o "[[:xdigit:]:]\{8,17\}"); do echo "removing bluetooth device: $device | $(sudo bluetoothctl remove $device)"; done

# restart bluetooth & bt_speaker
#sudo systemctl restart bluetooth bt_speaker; sudo systemctl status bluetooth bt_speaker

# This script is the support for https://github.com/lukasjapan/bt-speaker
