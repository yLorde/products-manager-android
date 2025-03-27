import produtoCss from '@/customs/produtoCss';
import React from 'react';
import { Text, ScrollView, StatusBar, View, Button, TextInput } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite'
import ProductView from '../elements/ProductView';

export default function BuscarProduto() {

    const [number, setNumber] = React.useState('');
    const [products, setProducts] = React.useState<any>([]);

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
            <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }} edges={['top']}>
                <ScrollView>
                    <View>
                        <View style={produtoCss.productWindow}>
                            <View style={produtoCss.productContent}>
                                <Text style={{ display: 'flex', fontSize: 20, padding: 4, textAlign: 'center', color: 'lightgreen' }}>{products.length} PRODUTOS ENCONTRADOS</Text>
                                <View style={produtoCss.productContent}>
                                    <Text style={produtoCss.textDesc}>BR - Código de barras</Text>
                                    <Text style={produtoCss.textDesc}>MC - Código do mercado</Text>
                                </View>
                                <TextInput
                                    style={produtoCss.input}
                                    onChangeText={setNumber}
                                    value={number}
                                    placeholder="Insira o código"
                                    keyboardType="default"
                                />
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                    flexDirection: 'row'
                                }}>
                                    <View style={{ width: '40%' }}>
                                        <Button onPress={() => {
                                            setNumber('')
                                            setProducts([]);
                                        }} title='Limpar' color={'#902020'} />
                                    </View>
                                    <View style={{ width: '40%'}}>
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
                                        }} color={'#306030'} title='Buscar' />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View>
                            {products?.map((produto: any) => (
                                <ProductView
                                    key={produto.id}
                                    codigoDeBarras={produto.codigoDeBarras}
                                    id={produto.id}
                                    nome={produto.nome}
                                    restantes={produto.restantes}
                                    codigoDoMercado={produto.codigoDoMercado}
                                    validade={produto.dataDeVencimento}
                                />
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider >
    );
};