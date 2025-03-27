import produtoCss from '@/customs/produtoCss';
import React, { useState } from 'react';
import { Text, ScrollView, StatusBar, View, Button, TextInput } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import internalDataBase from '@/customs/internalDataBase';
import PreviewProduct from '../elements/PreviewProduct';
import PreviewProductChildren from '../elements/PreviewProductChildren';
import searchForProductUsingWeb from '@/customs/functions/searchForProductUsingWeb';
import UseExistingProductAsModel from '../elements/UseExistingProductAsModel';
import searchProduct from '@/customs/functions/searchProduct';

export default function AdicionarProduto() {
    const [nome, setNome] = useState<any>('');
    const [restantes, setRestantes] = useState<any>(1);
    const [validade, setValidade] = useState<any>('2025-12-31');
    const [codigo, setCodigo] = useState<any>('');
    const [codigoDoMercado, setCodigoDoMercado] = useState<any>('');

    const [foundProducts, setFoundProducts] = useState<any>([]);
    const [useInternalDB, setUseInternalDB] = useState(false);

    // FAZ UMA BUSCA NA BASE DE DADOS INTERNA
    function searchForProductUsingInternalDatabase() {
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


    function clearFields() {
        setNome('');
        setRestantes('');
        setValidade('2025-12-31');
        setCodigo('');
        setCodigoDoMercado('');
        setRestantes(1);
        setUseInternalDB(false);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }} edges={['top']}>
                <ScrollView>
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
                                            searchProduct({ codigo }).then(res => { setFoundProducts(res); })
                                        }} title='Usar produto existente como modelo' />
                                    </View>

                                    {/* BUSCAR PRODUTO NO BANCO DE DADOS INTERNO */}
                                    <View style={{ marginTop: 12, display: useInternalDB ? 'none' : 'flex' }}>
                                        <Button color={'#303030'} onPress={() => {
                                            searchForProductUsingInternalDatabase();
                                        }} title='usar banco de dados interno' />
                                    </View>

                                    {/* BUSCAR PRODUTO USANDO WEB */}
                                    <View style={{ marginTop: 12, display: useInternalDB ? 'none' : 'flex' }}>
                                        <Button onPress={() => {
                                            searchForProductUsingWeb({ codigo, setNome, setCodigo })
                                        }} color={'#206090'} title='Buscar Código na WEB' />
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* PREVIEW DO PRODUTO QUANDO SELECIONADO USAR PRODUTO EXISTENTE COMO MODELO */}
                        <UseExistingProductAsModel
                            foundProducts={foundProducts}
                            setCodigo={setCodigo}
                            setCodigoDoMercado={setCodigoDoMercado}
                            setFoundProducts={setFoundProducts}
                            setNome={setNome}
                            setRestantes={setRestantes}
                            setValidade={setValidade}
                        />

                        {/* PREVIEW DO PRODUTO QUANTO TODOS OS CAMPOS ESTÃO PREENCHIDOS */}
                        <PreviewProduct nome={nome} restantes={restantes} validade={validade} codigoDoMercado={codigoDoMercado} codigoDeBarras={codigo} >
                            <PreviewProductChildren
                                validade={validade}
                                codigoDeBarras={codigo}
                                codigoDoMercado={codigoDoMercado}
                                restantes={restantes}
                                nome={nome}
                                clearFields={clearFields}
                                setRestantes={setRestantes}
                            />
                        </PreviewProduct>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider >
    );
};