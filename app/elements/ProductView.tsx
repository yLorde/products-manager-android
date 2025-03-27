import { IProdutoView } from "@/customs/interfaces/IProduto";
import produtoCss from "@/customs/produtoCss";
import React from "react";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import formatData from "@/customs/functions/formatData";
import removerProduto from "@/customs/crud/removerProduto";
import loadProducts from "@/customs/functions/loadProducts";
import VenceEm from "./VenceEm";

export default function ProductView({ id, nome, restantes, validade, codigoDeBarras, codigoDoMercado }: IProdutoView) {
    const [showDetails, setShowDetails] = React.useState<any>();
    const [products, setProducts] = React.useState<any>([]);
    const [showRemoverProduto, setShowRemoverProduto] = React.useState<any>();

    const styles = StyleSheet.create({
        produtos: {
            padding: 20,
            backgroundColor: '#ccc',
            marginBottom: 12
        },
        text: {
            fontSize: 32,
            padding: 2,
        },
        produtoText: {
            fontSize: 20,
            marginLeft: 5,
            padding: 2,
            color: '#fff'
        },
    });

    return (
        <View>
            <View key={id} style={produtoCss.productWindow}>
                <View style={produtoCss.productContent}>
                    <Text style={styles.produtoText}>Nome: {nome}</Text>
                    <Text style={styles.produtoText}>
                        Vence em: <VenceEm vencimento={validade} />
                    </Text>
                    <Text style={styles.produtoText}>Validade: {formatData({ data: validade })}</Text>

                    <View style={{
                        display: showDetails === id ? 'block' : 'none' as any, padding: 10
                    }}>
                        <View style={{
                            borderColor: '#ccc',
                            borderWidth: 1,
                            padding: 5,
                            backgroundColor: '#212121',
                            borderRadius: 10
                        }}>
                            <Text style={styles.produtoText}>Restantes: {restantes || '0'}</Text>
                            <Text style={styles.produtoText}>Código: {codigoDeBarras}</Text>
                            <Text style={styles.produtoText}>Código MC: {codigoDoMercado}</Text>
                        </View>
                    </View>

                    <View style={{ padding: 5 }}>
                        <Button onPress={() => {
                            setShowDetails(id);
                            if (showDetails === id) {
                                setShowDetails(null);
                            }
                        }} color={showDetails === id ? '#902020' : '#306030'} title={showDetails === id ? 'Ocultar Detalhes' : 'Mostrar Detalhes'} />
                    </View>

                    <View style={{ padding: 5, display: showRemoverProduto === id ? 'none' : 'flex' }}>
                        <Button onPress={() => {
                            setShowRemoverProduto(id);
                        }} color='#206090' title='Remover Produto' />
                    </View>

                    <View style={{
                        padding: 5, display: showRemoverProduto === id ? 'flex' : 'none',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        flexDirection: 'row'
                    }}>
                        <View >
                            <Button onPress={() => {
                                setShowRemoverProduto(null);
                            }} color='#902020' title='Cancelar' />
                        </View>

                        <View >
                            <Button onPress={() => {
                                setShowRemoverProduto(null);
                                removerProduto({ id: id });
                                loadProducts().then(res => setProducts(res));
                            }} color='#206090' title='Confirmar' />
                        </View>
                    </View>

                </View>

            </View>
        </View>
    );
};