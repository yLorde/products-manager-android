import produtoCss from '@/customs/produtoCss';
import React from 'react';
import { StyleSheet, Text, ScrollView, StatusBar, View, Button, TextInput } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite'
import removerProduto from '@/customs/crud/removerProduto';
import formatData from '@/customs/functions/formatData';

export default function BuscarProduto() {

    const [number, onChangeNumber] = React.useState('0');
    const [products, setProducts] = React.useState<any>([]);

    const vencimento = ({ vencimento }: { vencimento: string }) => {
        const data = Math.ceil((new Date(vencimento).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
        if (data <= 0) {
            return <Text style={{ color: '#ffaa00' }}>Vencido</Text>
        } else {
            return <Text style={{ color: 'lightgreen' }}>Vence em {data} dias</Text>;
        };
    };

    async function procurarProduto({ tipo, codigo }: { tipo: 'codigoDoMercado' | 'codigoDeBarras', codigo: string }) {
        try {
            const db = await SQLite.openDatabaseAsync('produtos');
            const products = await db.getAllAsync(`SELECT * FROM produtos WHERE ${tipo} == '${codigo}';`);
            const produtosOrdenados = products.sort((a: any, b: any) => new Date(a.dataDeVencimento).getTime() - new Date(b.dataDeVencimento).getTime());
            setProducts(produtosOrdenados);
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['top']}>
                <ScrollView style={styles.scrollView}>
                    <View>
                        {/* <View style={produtoCss.productWindow}>
                            <View style={produtoCss.productContent}>
                                <Text style={produtoCss.textTitle}>Buscar produto</Text>
                            </View>
                        </View> */}

                        <View style={produtoCss.productWindow}>
                            <View style={produtoCss.productContent}>
                                <Text style={produtoCss.textContent}>Encontrado: {products.length} produtos</Text>
                                <View style={produtoCss.productContent}>
                                    <Text style={produtoCss.textDesc}>BR Código de barras</Text>
                                    <Text style={produtoCss.textDesc}>MC Código do mercado</Text>
                                </View>
                                <TextInput
                                    style={produtoCss.input}
                                    onChangeText={onChangeNumber}
                                    value={number}
                                    placeholder="Digite o código do mercado"
                                    keyboardType="default"
                                // defaultValue='0'
                                />

                                <Button onPress={() => {
                                    if (number == '0') return setProducts([]);

                                    const seperator = String(number.split(' ')[0]).toLowerCase();
                                    const filter = number.split(' ')[1];

                                    switch (seperator) {
                                        case 'br':
                                            return procurarProduto({ tipo: 'codigoDeBarras', codigo: filter });
                                        case 'mc':
                                            return procurarProduto({ tipo: 'codigoDoMercado', codigo: filter });
                                    };
                                }} color={'#306030'} title='Buscar'></Button>
                            </View>
                        </View>
                        <View>
                            {products?.map((produto: any) => (
                                <View key={produto.id} style={produtoCss.productWindow}>
                                    <View style={produtoCss.productContent}>
                                        <Text style={produtoCss.textContent}>Nome: {produto.nome}</Text>
                                        <Text style={produtoCss.textContent}>
                                            Vence em: {vencimento({ vencimento: produto.dataDeVencimento })}
                                        </Text>
                                        <Text style={produtoCss.textContent}>Vencimento: {formatData({ data: produto.dataDeVencimento })}</Text>
                                        <View style={{ padding: 10 }}>
                                            <View style={{
                                                borderColor: '#ccc',
                                                borderWidth: 1,
                                                padding: 5,
                                                backgroundColor: '#212121',
                                                borderRadius: 10
                                            }}>
                                                <Text style={produtoCss.textContent}>Restantes: {produto.restantes || '0'}</Text>
                                                <Text style={produtoCss.textContent}>Código: {produto.codigoDeBarras}</Text>
                                                <Text style={produtoCss.textContent}>Código MC: {produto.codigoDoMercado}</Text>
                                            </View>
                                        </View>
                                        <View style={{ padding: 5 }}>
                                            <Button onPress={() => {
                                                removerProduto({ id: produto.id })
                                            }} color={'#902020'} title='Remover Produto' />
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {

    },
    produtos: {
        padding: 20,
        backgroundColor: '#ccc',
        marginBottom: 12,
    },
    text: {
        fontSize: 32,
        padding: 2,
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 12,
        fontSize: 20,
    },
});