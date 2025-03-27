import * as SQLite from 'expo-sqlite';

async function loadProducts() {
    const db = await SQLite.openDatabaseAsync('produtos');
    const produtos = await db.getAllAsync('SELECT * FROM produtos;');
    const produtosOrdenados = produtos.sort((a: any, b: any) => new Date(a.dataDeVencimento).getTime() - new Date(b.dataDeVencimento).getTime());

    return produtosOrdenados;
};

export default loadProducts;