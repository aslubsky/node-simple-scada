gcc ./modbus-rtu-client.c -o ./modbus-rtu-client -I/usr/include/modbus  -L/usr/lib -lmodbus
mv ./modbus-rtu-client /usr/local/bin/modbus-rtu-client
chmod 755 /usr/local/bin/modbus-rtu-client