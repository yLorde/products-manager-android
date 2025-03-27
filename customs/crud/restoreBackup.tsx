import * as SQLite from 'expo-sqlite';
import { StorageAccessFramework } from 'expo-file-system';
import addProduto from './addProduto';
import { router } from 'expo-router';

export default async function restoreBackup() {
    try {
        const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();

        if (permissions.granted) {
            const uri = permissions.directoryUri;

            await StorageAccessFramework.readDirectoryAsync(uri).then(async (data) => {
                const backup = await StorageAccessFramework.readAsStringAsync(data[0]);
                const backupJson = JSON.parse(backup);

                backupJson.map(async (row: any) => {
                    const db = await SQLite.openDatabaseAsync('produtos');
                    const prt = await db.getAllAsync(`SELECT * FROM produtos WHERE codigoDeBarras == '${row.codigoDeBarras}' LIMIT 1;`);
                    if (prt.length < 1) {
                        addProduto({
                            codigoDeBarras: row.codigoDeBarras,
                            codigoDoMercado: row.codigoDoMercado,
                            validade: row.dataDeVencimento,
                            restantes: row.restantes,
                            nome: row.nome
                        });
                    };
                });
            }).finally(() => {
                alert('Backup restaurado com sucesso!');
                router.navigate('/(tabs)/meusProdutos');
            });

        } else {
            alert('Dê permissão de acesso ao armazenamento para usar esta função!');
        };
    } catch (err) {
        console.log(err);
    };
};