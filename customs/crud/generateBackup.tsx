import * as SQLite from 'expo-sqlite';
import { StorageAccessFramework } from 'expo-file-system';
import { router } from 'expo-router';

export default async function generateBackup() {
    try {
        const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();

        if (permissions.granted) {
            const uri = permissions.directoryUri;

            await StorageAccessFramework.readDirectoryAsync(uri).then(async (data) => {
                if (data.length > 0) {
                    console.log('Backup existente')
                    await StorageAccessFramework.deleteAsync(data[0]).then(r => { console.log('backup apagado!') })
                };

                const files = await StorageAccessFramework.createFileAsync(uri, 'backup.json', 'application/json');

                const db = await SQLite.openDatabaseAsync('produtos');
                const allRows = await db.getAllAsync(`SELECT * FROM produtos;`);

                const backup = JSON.stringify(allRows, null, 2);

                await StorageAccessFramework.writeAsStringAsync(files, backup).finally(() => {
                    alert('Backup gerado com sucesso!');
                    router.navigate('/(tabs)/meusProdutos');
                });
            });
        } else {
            alert('Erro ao gerar backup, verifique se o aplicativo possui a permissão de Ler/Escrever arquivos internos.');
            router.navigate('/(tabs)');
        };
    } catch (err) {
        console.log(err);
    };
};