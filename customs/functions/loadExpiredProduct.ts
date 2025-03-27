import * as SQLite from 'expo-sqlite';
import { IExpiredProduct } from '../interfaces/IProduct';

export default async function loadExpiredProduct({ setProducts, setShowRemoveProduct }: IExpiredProduct) {
    try {
        const db = await SQLite.openDatabaseAsync('produtos');
        const products = await db.getAllAsync('SELECT * FROM produtos;');
        const expiredProducts = products.filter((produto: any) => produto.dataDeVencimento < new Date().toISOString());

        setProducts(expiredProducts);
        if (expiredProducts.length > 0) setShowRemoveProduct(true);

        if (expiredProducts.length < 1) {
            setShowRemoveProduct(false);
            setProducts([{
                id: 'IDTotalmenteAleatorio',
                nome: 'Nenhum produto está vencido!',
                restantes: '0.00',
                dataDeVencimento: '2099-12-31',
                codigoDeBarras: '0000000000000',
                codigoDoMercado: '1'
            }])
        };
    } catch (err) {
        console.log(err);
    };
};