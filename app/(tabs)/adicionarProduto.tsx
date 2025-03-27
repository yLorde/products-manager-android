import produtoCss from '@/customs/produtoCss';
import axios from 'axios';
import { DarkTheme, DefaultTheme, ThemeProvider, useLocale } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, StatusBar, View, Button, useColorScheme, TextInput } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite';
import addProduto from '@/customs/crud/addProduto';
import formatData from '@/customs/functions/formatData';
import { router, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import internalDataBase from '@/customs/internalDataBase';

export default function AdicionarProduto() {
    const [nome, setNome] = useState<any>('');
    const [restantes, setRestantes] = useState<any>(1);
    const [validade, setValidade] = useState<any>('2025-12-31');
    const [codigo, setCodigo] = useState<any>('');
    const [codigoDoMercado, setCodigoDoMercado] = useState<any>('');
    const [foundProducts, setFoundProducts] = useState<any>([]);

    // CONTROLE DE BOTÕES
    const [useInternalDB, setUseInternalDB] = useState(false);

    //const params = useGlobalSearchParams();

    // if (String(codigo).length < 1 && String(nome).length < 1 && params?.codigo != undefined) {
    //     setCodigo(params.codigo);
    //     router.replace(`/(tabs)/adicionarProduto`);
    //     router.setParams({})
    // };

    function buscarProdutoUsandoBandoInternal() {
        const produtoInterno = internalDataBase.filter((x) => {
            return x.codigoDeBarras === codigo ||
                x.codigoDeBarras.startsWith(codigo) ||
                x.codigoDeBarras.includes(codigo)
        });

        if (produtoInterno.length > 0) {
            setUseInternalDB(true);
            setNome(produtoInterno[0].nome);
            setCodigoDoMercado(produtoInterno[0].codigoMc);
            setCodigo(produtoInterno[0].codigoDeBarras);
        };
    };

    function limparCampos() {
        setNome('');
        setRestantes('');
        setValidade('2025-12-31');
        setCodigo('');
        setCodigoDoMercado('');
        setRestantes(1);
        setUseInternalDB(false);
    };

    async function cadProduto() {
        console.log('INFORMAÇÕES DO PRODUTO: ', nome, restantes, validade, codigo, codigoDoMercado);

        addProduto({
            nome: nome,
            restantes: restantes,
            validade: validade,
            codigoDeBarras: codigo,
            codigoDoMercado: codigoDoMercado
        });

        limparCampos();
    };

    async function apagarProduto() {
        try {
            const db = await SQLite.openDatabaseAsync('produtos');
            await db.runAsync(`DELETE FROM produtos WHERE codigoDeBarras == '${codigo}';`);
            limparCampos();
        } catch (err) {
            console.log(err);
        };
    };

    async function procurarProduto() {
        try {
            const db = await SQLite.openDatabaseAsync('produtos');
            const produtoEncontrado = await db.getAllAsync(`SELECT * FROM produtos WHERE codigoDeBarras == '${codigo}' LIMIT 1;`);
            setFoundProducts(produtoEncontrado);
        } catch (err) {
            console.log(err);
        };
    };

    const vencimento = ({ vencimento }: { vencimento: string }) => {
        const data = Math.ceil((new Date(vencimento).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
        if (data <= 0) {
            return <Text style={{ color: '#ffaa00' }}>Vencido</Text>
        } else {
            return <Text style={{ color: 'lightgreen' }}>Vence em {data} dias</Text>;
        };
    };

    function ProdutoViaCodigo() {
        return (
            <View>
                {foundProducts.map((products: any) => {
                    return (
                        <View key={products.codigoDeBarras} style={produtoCss.productWindow}>
                            <View style={produtoCss.productContent}>
                                <Text style={{ display: 'flex', fontSize: 20, padding: 4, textAlign: 'center', color: 'lightgreen' }}>PRODUTO ENCONTRADO</Text>

                                <View style={{ padding: 10 }}>
                                    <View style={{
                                        borderColor: '#ccc',
                                        borderWidth: 1,
                                        padding: 5,
                                        backgroundColor: '#212121',
                                        borderRadius: 10
                                    }}>
                                        <Text style={produtoCss.textContent}>Nome: {products.nome}</Text>
                                        <Text style={produtoCss.textContent}>Restantes: {products.restantes || '0'}</Text>
                                        <Text style={produtoCss.textContent}>Vencimento: {formatData({ data: products.dataDeVencimento })}</Text>
                                        <Text style={produtoCss.textContent}>Código MC: {products.codigoDoMercado}</Text>
                                    </View>
                                </View>
                                <View style={produtoCss.buttons}>
                                    <Button onPress={() => { setFoundProducts([]) }} color='#206090' title='Cancelar modelo' />
                                    <Button onPress={() => {
                                        setNome(products.nome);
                                        setRestantes(products.restantes || 0);
                                        setValidade(products.dataDeVencimento);
                                        setCodigo(products.codigoDeBarras);
                                        setCodigoDoMercado(products.codigoDoMercado);
                                        setFoundProducts([]);
                                    }} color='#309030' title='Usar como modelo' />
                                </View>
                            </View>
                        </View>
                    )
                })}
            </View>
        );
    };

    function PreviewProduto() {
        //verificando se possui algo nos campos
        if (!nome || !validade || !codigo || !codigoDoMercado) return;

        //Verificando se modificou os campos;
        if (nome == 'Produto') return;
        if (codigo == '12345678') return;

        //Verificando a estrutura da data de validade;
        if (String(validade).split('-').length < 3) return;
        if (String(validade).split('-')[0].length < 4) return;
        if (String(validade).split('-')[1].length < 2) return;
        if (String(validade).split('-')[2].length < 2) return;

        return (
            <View style={produtoCss.productWindow}>
                <View style={produtoCss.productContent}>

                    <Text style={{ color: 'lightgreen', fontSize: 20, padding: 4, textAlign: 'center' }}>NOVO PRODUTO</Text>
                    <View>
                        <Text style={produtoCss.textContent}>Nome: {nome}</Text>
                        <Text style={produtoCss.textContent}>Validade: {formatData({ data: validade })}</Text>
                        <Text style={produtoCss.textContent}>
                            Vence em: {vencimento({ vencimento: validade })}
                        </Text>
                        <View style={{ padding: 10 }}>
                            <View style={{
                                borderColor: '#ccc',
                                borderWidth: 1,
                                padding: 5,
                                backgroundColor: '#212121',
                                borderRadius: 10
                            }}>
                                <Text style={produtoCss.textContent}>Restantes: {restantes}</Text>
                                <Text style={produtoCss.textContent}>Código: {codigo}</Text>
                                <Text style={produtoCss.textContent}>Código MC: {codigoDoMercado}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={produtoCss.productContent}>
                        <View>
                            <Button color={'#309030'} onPress={() => {
                                cadProduto()
                            }} title={'Adicionar Produto'} />
                        </View>

                        {/* CONTROLE USE BANCO DE DADOS INTERNO */}
                        <View style={{
                            display: 'flex',
                            marginTop: 12,
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}>

                            <View style={{ width: 50 }}>
                                <Button color={'#206090'} title='-10' onPress={() => {
                                    if (Number(restantes) > 0) {
                                        setRestantes(Number(restantes) - 10 > 0 ? Number(restantes) - 10 : 0);
                                    };
                                }} />
                            </View>

                            <View style={{ width: 50 }}>
                                <Button color={'#206090'} title='-1' onPress={() => {
                                    if (Number(restantes) > 0) {
                                        setRestantes(Number(restantes) - 1);
                                    };
                                }} />
                            </View>

                            <View style={{ width: 100 }}>
                                <Button color={'#902020'} title='RESTANTES' disabled onPress={() => {

                                }} />
                            </View>

                            <View style={{ width: 50 }}>
                                <Button color={'#206090'} title='+1' onPress={() => {
                                    setRestantes(Number(restantes + 1))
                                }} />
                            </View>

                            <View style={{ width: 50 }}>
                                <Button color={'#206090'} title='+10' onPress={() => {
                                    setRestantes(Number(restantes + 10))
                                }} />
                            </View>
                        </View>

                        <View style={{ marginTop: 10, marginBottom: 5 }}>
                            <Button color={'#902020'} onPress={() => {
                                limparCampos();
                            }} title='Limpar Campos' />
                        </View>
                    </View>

                </View>
            </View>
        );

    };

    return (
        <ThemeProvider value={useColorScheme() === 'dark' ? DarkTheme : DefaultTheme}>
            <SafeAreaProvider>
                <SafeAreaView style={styles.container} edges={['top']}>
                    <ScrollView style={styles.scrollView}>
                        <View>
                            <View style={produtoCss.productWindow}>
                                <View style={produtoCss.productContent}>
                                    <Text style={{ color: 'lightgreen', fontSize: 20, padding: 4, textAlign: 'center' }}>NOVO PRODUTO</Text>
                                    <View style={{}}>
                                        <View style={{ display: 'flex', justifyContent: 'space-around' }}>
                                            <Text style={produtoCss.textContent}>Nome:</Text>
                                            <TextInput
                                                keyboardType='default'
                                                style={produtoCss.input}
                                                defaultValue={nome}
                                                onChangeText={setNome}
                                                placeholder='Nome do produto'
                                                id='nome'
                                            />
                                        </View>

                                        {/* <View>
                                            <Text style={produtoCss.textContent}>Restantes: </Text>
                                            <TextInput
                                                keyboardType='default'
                                                style={produtoCss.input}
                                                placeholder='Restantes'
                                                onChangeText={setRestantes}
                                                defaultValue={restantes}
                                                id='restantes'
                                            />
                                        </View> */}

                                        <View>
                                            <Text style={produtoCss.textContent}>Validade: <Text style={produtoCss.textDesc}>AAAA-MM-DD</Text></Text>
                                            <TextInput
                                                keyboardType='default'
                                                style={produtoCss.input}
                                                placeholder='Validade'
                                                onChangeText={setValidade}
                                                defaultValue={validade}
                                                id='dataDeVencimento'
                                            />
                                        </View>

                                        <View>
                                            <Text style={produtoCss.textContent}>Código de barra:</Text>
                                            <TextInput
                                                keyboardType='default'
                                                style={produtoCss.input}
                                                defaultValue={codigo}
                                                onChangeText={setCodigo}
                                                placeholder='Código'
                                                id='codigoDeBarras'
                                            />
                                        </View>

                                        <View>
                                            <Text style={produtoCss.textContent}>Código do mercado: { }</Text>
                                            <TextInput
                                                keyboardType='default'
                                                style={produtoCss.input}
                                                placeholder='Código do mercado'
                                                onChangeText={setCodigoDoMercado}
                                                defaultValue={codigoDoMercado}
                                                id='codigoDoMercado'
                                            />
                                        </View>


                                    </View>

                                    <View style={produtoCss.productContent}>

                                        {/* USAR PRODUTO EXISTENTE COMO MODELO */}
                                        <View style={{ display: useInternalDB ? 'none' : 'flex' }}>
                                            <Button color={'#309030'} onPress={() => {
                                                procurarProduto();
                                            }} title='Usar produto existente como modelo' />
                                        </View>

                                        {/* BUSCAR PRODUTO NO BANCO DE DADOS INTERNO */}
                                        <View style={{ marginTop: 12, display: useInternalDB ? 'none' : 'flex' }}>
                                            <Button color={'#303030'} onPress={() => {
                                                buscarProdutoUsandoBandoInternal();
                                            }} title='usar banco de dados interno' />
                                        </View>

                                        {/* BUSCAR PRODUTO USANDO WEB */}
                                        <View style={{ marginTop: 12, display: useInternalDB ? 'none' : 'flex' }}>
                                            <Button onPress={async () => {
                                                console.log(codigo);
                                                await axios.get(`https://world.openfoodfacts.org/api/v2/product/${codigo}.json`).then((response) => {
                                                    if (response.status == 200 && response.data) {
                                                        const foundProduct = response.data.product;

                                                        let name;
                                                        if (foundProduct.brands) {
                                                            name = `${foundProduct.brands} - ${foundProduct.product_name}`
                                                        } else {
                                                            name = foundProduct.product_name;
                                                        };
                                                        // console.log(foundProduct);
                                                        if (name) {
                                                            setNome(name);
                                                        }
                                                    };
                                                }).catch(err => {
                                                    if (err) {
                                                        setNome('Produto não encontrado!');
                                                        setTimeout(() => {
                                                            setNome('');
                                                            setCodigo('');
                                                        }, 3000);
                                                        return;
                                                    };
                                                });
                                            }} color={'#206090'} title='Buscar Código na WEB' />
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <ProdutoViaCodigo />
                            <PreviewProduto />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaProvider >
        </ThemeProvider>
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
        marginBottom: 12
    },
    text: {
        textAlign: 'center',
        fontSize: 32,
        padding: 2,
    },
    text2: {
        textAlign: 'left',
        fontSize: 20,
        padding: 2,
    },
    buttonContainer: {
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1,
        right: 20,
        top: 20,
    },
    button: {
        backgroundColor: '#FFF', // Button background color
        borderRadius: 50, // Make it round (half of the width and height)
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonImage: {
        width: 25, // Adjust the width and height of the image as needed
        height: 25,
    },
});