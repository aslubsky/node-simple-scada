exports.values = {
    main: {
        logLevel: 'info'
    },
    socketio: {
        port: 8085,
        logLevel: 2
    },
    web: {
        port: 8081,
        logLevel: 'dev'
    },
    api: {
        hostname: 'localhost',
        port: 8082
    },
    mysql: {
        host : 'localhost',
        port : 3306,
        user : 'root',
        password: '',
        database: 'scada_db'
    },
    dataSources: [
//        {
//            "type": "GPIO",
//            "pin": 0,
//            "time": 1000,
//            "id": 1,
//            "name": 'relay1',
//            "data_type": "bool"
//        },
//        {
//            "type": "GPIO",
//            "pin": 3,
//            "time": 1000,
//            "id": 2,
//            "name": 'relay2',
//            "data_type": "bool"
//        },
//        {
//            "type": "GPIO",
//            "pin": 4,
//            "time": 1000,
//            "id": 3,
//            "name": 'relay3',
//            "data_type": "bool"
//        },
//        {
//            "type": "GPIO",
//            "pin": 5,
//            "time": 1000,
//            "id": 4,
//            "name": 'relay4',
//            "data_type": "bool"
//        },
//        {
//            "type": "GPIO",
//            "pin": 6,
//            "time": 1000,
//            "id": 5,
//            "name": 'relay5',
//            "data_type": "bool"
//        },
//        {
//            "type": "ModBus",
//            "register": "3",
//            "time": 500,
//            "wrtite_ratio": 120, // (1000/time) * 60
//            "id": 6,
//            "name": 'trm1',
//            "data_type": "number"
//        },
        {
            "id": 1,
            "name": 'ph'
        },
//        {
//            "path": "/dev/ttyAMA0",
//            "baudrate": 38400,
//            "type": "ScadaSerial",
//            "wrtite_ratio": 180, // (1000/time) * 60
//            "id": 9,
//            "name": 'orp',
//            "data_type": "number"
//        },
//        {
//            "type": "ModBus",//fake
//            "register": "4",
//            "time": 500,
//            "wrtite_ratio": 120, // (1000/time) * 60
//            "id": 9,
//            "name": 'cl',
//            "data_type": "number"
//        }
    ]
};
