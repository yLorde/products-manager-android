import { IProductView } from "@/customs/interfaces/IProduct";
import produtoCss from "@/customs/produtoCss";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import formatDate from "@/customs/functions/formatDate";
import loadProducts from "@/customs/functions/loadProducts";
import ExpireOn from "./ExpireOn";
import removeProduct from "@/customs/crud/removeProduct";

export default function ProductView({ id, nome, restantes, validade, codigoDeBarras, codigoDoMercado }: IProductView) {
    const [showDetails, setShowDetails] = React.useState<any>();
    const [products, setProducts] = React.useState<any>([]);
    const [showRemoveProduct, setShowRemoveProdut] = React.useState<any>();

    const styles = StyleSheet.create({
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
                        Vence em: <ExpireOn vencimento={validade} />
                    </Text>
                    <Text style={styles.produtoText}>Validade: {formatDate({ data: validade })}</Text>

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

                    <View style={{ padding: 5, display: showRemoveProduct === id ? 'none' : 'flex' }}>
                        <Button onPress={() => {
                            setShowRemoveProdut(id);
                        }} color='#206090' title='Remover Produto' />
                    </View>

                    <View style={{
                        padding: 5, display: showRemoveProduct === id ? 'flex' : 'none',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        flexDirection: 'row'
                    }}>
                        <View >
                            <Button onPress={() => {
                                setShowRemoveProdut(null);
                            }} color='#902020' title='Cancelar' />
                        </View>

                        <View >
                            <Button onPress={() => {
                                setShowRemoveProdut(null);
                                removeProduct({ id: id });
                                loadProducts().then(res => setProducts(res));
                            }} color='#206090' title='Confirmar' />
                        </View>
                    </View>

                </View>

            </View>
        </View>
    );
};