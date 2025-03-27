import * as SQLite from 'expo-sqlite';

export default async function allRows() {
    try {
        const db = await SQLite.openDatabaseAsync('produtos');

        const allRolls = await db.getAllAsync('SELECT * FROM produtos;');

        console.log(allRolls);

        return allRolls;
    } catch (err) {
        console.log(err);
    };
};