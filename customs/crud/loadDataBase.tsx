import * as SQLite from 'expo-sqlite';

export default async function loadDataBase() {
    try {
        console.log('Carregando banco de dados...');
        const db = await SQLite.openDatabaseAsync('produtos');

        await db.runAsync(`
            CREATE TABLE IF NOT EXISTS produtos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                preco TEXT,
                restantes TEXT NOT NULL,
                dataDeVencimento TEXT NOT NULL,
                codigoDeBarras TEXT NOT NULL,
                codigoDoMercado TEXT NOT NULL
            );
        `);

        const allRolls = await db.getAllAsync('SELECT * FROM produtos');
        console.log(`Total de produtos cadastrados: ${allRolls.length}`);
        console.log('Banco de dados carregado com sucesso!');
    } catch (err) {
        console.log(err);
    };
};