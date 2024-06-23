import mysql from 'mysql2/promise';

export const conexion = await mysql.createConnection({
    host: 'viaduct.proxy.rlwy.net',
    port: '30246',
    user: 'root',
    password: 'tBvtWOqbjscWtxInVClNjgzcrfKZtlSW',
    database: 'railway'
})