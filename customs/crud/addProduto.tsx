import * as SQLite from 'expo-sqlite';

interface Produto {
    nome: string;
    restantes: String;
    validade: String;
    codigoDeBarras: String;
    codigoDoMercado: String;
}

export default async function addProduto({ nome, restantes, validade, codigoDeBarras, codigoDoMercado }: Produto) {
    try {
        const db = await SQLite.openDatabaseAsync('produtos');
        await db.runAsync(`
        INSERT INTO produtos (nome, restantes, dataDeVencimento, codigoDeBarras, codigoDoMercado) 
        VALUES ('${nome}', '${restantes}', '${validade}', '${codigoDeBarras}', '${codigoDoMercado}');
    `);
    } catch (err) {
        console.log(err);
    };
};