import * as SQLite from 'expo-sqlite';

export default async function removeProduct({ id}: { id: string}) {
    try {
        const db = await SQLite.openDatabaseAsync('produtos');
        await db.runAsync(`DELETE FROM produtos WHERE id == '${id}';`);

        return true;
    } catch (err) {
        console.log(err);
        return 'denied';
    };
};