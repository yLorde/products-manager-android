import internalDataBase from '@/customs/internalDataBase';
import produtoCss from '@/customs/produtoCss';
import { useState } from 'react';
import { StyleSheet, Text, ScrollView, StatusBar, View, Button } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite';
import dropDatabase from '@/customs/crud/dropDatabase';
import loadDataBase from '@/customs/crud/loadDataBase';
import generateBackup from '@/customs/crud/generateBackup';
import restoreBackup from '@/customs/crud/restoreBackup';

export default function bancoDeDados() {
    const [db, setDB] = useState<string>('loading...');

    async function loadDB() {
        const db = await SQLite.openDatabaseAsync('produtos');
        const all = await db.getAllAsync(`SELECT * FROM produtos;`);
        setDB(all.length as any);
    };
    if (db === 'loading...') loadDB();

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }} edges={['top']}>
                <ScrollView>

                    {/* QUANTIDADE TOTAL DE PRODUTOS EXISTENTES NA BASE DE DADOS */}
                    <View style={{ marginTop: 10 }}>
                        <View style={produtoCss.productWindow}>
                            <View style={produtoCss.productContent}>
                                <Text style={{ color: 'lightgreen', fontSize: 20, padding: 4, textAlign: 'center' }}>BASE DE DADOS</Text>
                                <Text style={{ color: 'yellow', fontSize: 18, textAlign: 'center' }}>Quantidade total: {internalDataBase.length} produtos </Text>
                            </View>
                        </View>
                    </View>

                    {/* QUANTIDADE TOTAL DE PRODUTOS CADASTRADOS */}
                    <View style={{ marginTop: 5 }}>
                        <View style={produtoCss.productWindow}>
                            <View style={produtoCss.productContent}>
                                <Text style={{ color: 'lightgreen', fontSize: 20, padding: 4, textAlign: 'center' }}>TOTAL DE PRODUTOS</Text>
                                <Text style={{ color: 'yellow', fontSize: 18, textAlign: 'center' }}>{db} produtos registrados no total</Text>
                            </View>
                        </View>
                    </View>

                    {/* LIMPAR BANCO DE DADOS (DROP DATABASE) */}
                    <View style={{ marginTop: 5 }}>
                        <View style={produtoCss.productWindow}>
                            <View style={produtoCss.productContent}>
                                <Text style={{ color: 'lightgreen', fontSize: 20, padding: 4, textAlign: 'center' }}>LIMPAR BANCO DE DADOS</Text>
                                <View style={{ padding: 5 }}>
                                    <Button onPress={() => {
                                        dropDatabase();
                                        loadDataBase();
                                    }} color={'#306090'} title='APAGAR BANCO DE DADOS' />
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* GERA UM ARQUIVO DE BACKUP PARA GARANTIR QUE OS PRODUTOS NÃO SERÃO PERDIDOS */}
                    <View style={{ marginTop: 5 }}>
                        <View style={produtoCss.productWindow}>
                            <View style={produtoCss.productContent}>
                                <Text style={{ color: 'lightgreen', fontSize: 20, padding: 4, textAlign: 'center' }}>GERAR BACKUP</Text>
                                <View style={{ padding: 5 }}>
                                    <Button onPress={() => {
                                        generateBackup();
                                    }} color={'#306090'} title='GERAR BACKUP' />
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* RESTAURA O ARQUIVO DE BACKUP */}
                    <View style={{ marginTop: 5 }}>
                        <View style={produtoCss.productWindow}>
                            <View style={produtoCss.productContent}>
                                <Text style={{ color: 'lightgreen', fontSize: 20, padding: 4, textAlign: 'center' }}>RESTAURAR BACKUP</Text>
                                <View style={{ padding: 5 }}>
                                    <Button onPress={() => {
                                        restoreBackup();
                                    }} color={'#306090'} title='RESTAURAR BACKUP' />
                                </View>
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};