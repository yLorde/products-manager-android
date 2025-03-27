import * as SQLite from 'expo-sqlite';

export default async function searchProduct({ codigo }: { codigo : string }) {
    try {
        const db = await SQLite.openDatabaseAsync('produtos');
        const produtoEncontrado = await db.getAllAsync(`SELECT * FROM produtos WHERE codigoDeBarras == '${codigo}' LIMIT 1;`);

        return produtoEncontrado;
    } catch (err) {
        console.log(err);
    };
};