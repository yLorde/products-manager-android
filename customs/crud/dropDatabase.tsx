import { router } from 'expo-router';
import * as SQLite from 'expo-sqlite';

export default async function dropDatabase() {
    try {
        const db = await SQLite.openDatabaseAsync('produtos');
        await db.runAsync('DROP TABLE IF EXISTS produtos;').then(() => {
            alert('Banco de dados apagado com sucesso!');
            router.navigate('/(tabs)');
        });
        return true;
    } catch (err) {
        console.log(err);
    };
};