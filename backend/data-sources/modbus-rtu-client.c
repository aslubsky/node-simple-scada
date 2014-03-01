/*
 * Copyright © 2008-2013 Stéphane Raimbault <stephane.raimbault@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

#include <stdio.h>
#include <inttypes.h>
#include <unistd.h>
#include <string.h>
#include <stdlib.h>
#include <errno.h>
#include <modbus.h>

int main(int argc, char *argv[])
{
    modbus_t *mb;
    uint16_t tab_reg[32];
    int rc;
    int i;
    int rn;
    
    if (argc > 1) {
        if (strcmp(argv[1], "-r") == 0) {
            rn = atoi(argv[2]);
        }
    } else {
        printf("Usage:\n  %s -r %%d - Modbus client for TRM (in RTU mode). %%d - register number\n\n", argv[0]);
        exit(1);
    }
    
    // printf("R: %d\n\n", rn);

    mb = modbus_new_rtu("/dev/ttyUSB0", 115200, 'N', 8, 2);
    if (mb == NULL) {
        fprintf(stderr, "Unable to allocate libmodbus context\n");
        return -1;
    }
    
    //modbus_set_debug(mb, TRUE);
    modbus_set_error_recovery(mb,
                              MODBUS_ERROR_RECOVERY_LINK |
                              MODBUS_ERROR_RECOVERY_PROTOCOL);
    modbus_set_slave(mb, 1);
    
    if (modbus_connect(mb) == -1) {
        fprintf(stderr, "Connection failed: %s\n", modbus_strerror(errno));
        modbus_free(mb);
        return -1;
    }

    /* Read 5 registers from the address 0 */
    rc = modbus_read_registers(mb, rn, 1, tab_reg);
    
    if (rc == -1) {
        fprintf(stderr, "%s\n", modbus_strerror(errno));
        return -1;
    }

    for (i=0; i < rc; i++) {
        // printf("reg[%d]=%d (0x%X)\n", i, tab_reg[i], tab_reg[i]);
        printf("%d\n", tab_reg[i]);
    }

    modbus_close(mb);
    modbus_free(mb);

    return 0;
}