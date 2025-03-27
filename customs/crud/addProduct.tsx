import * as SQLite from 'expo-sqlite';
import { IProduct } from '../interfaces/IProduct';

export default async function addProduct({ nome, restantes, validade, codigoDeBarras, codigoDoMercado }: IProduct) {
    try {
        const db = await SQLite.openDatabaseAsync('produtos');
        await db.runAsync(`
        INSERT INTO produtos (nome, restantes, dataDeVencimento, codigoDeBarras, codigoDoMercado) 
        VALUES ('${nome}', '${restantes}', '${validade}', '${codigoDeBarras}', '${codigoDoMercado}');
    `);

    return true;
    } catch (err) {
        console.log(err);
    };
};