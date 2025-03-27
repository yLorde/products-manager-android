import * as SQLite from 'expo-sqlite';
import { IProduto } from '../interfaces/IProduto';

export default async function addProduto({ nome, restantes, validade, codigoDeBarras, codigoDoMercado }: IProduto) {
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