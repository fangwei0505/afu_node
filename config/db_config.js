/**
 * 数据库配置参数
 */

module.exports = {
    mssql_connection: {
        user: 'sa',
        password: 'FC4B3E72676E6673',
        server: '127.0.0.1',
        database: 'afuerp',
        port: 2888,
        options: {
            encrypt: true // Use this if you're on Windows Azure
        },
        pool: {
            min: 0,
            max: 10,
            idleTimeoutMillis: 3000
        }
    },
    mysql_connnection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'afu_scm',
        port: 3306
    }
}