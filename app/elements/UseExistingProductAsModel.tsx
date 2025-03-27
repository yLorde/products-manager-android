import formatDate from "@/customs/functions/formatDate";
import { IUseExistingProductAsModel } from "@/customs/interfaces/IProduct";
import produtoCss from "@/customs/produtoCss";
import React from "react";
import { Button, Text, View } from "react-native";

export default function UseExistingProductAsModel({
    foundProducts, setNome, setRestantes, setValidade, setCodigo, setCodigoDoMercado, setFoundProducts
}: IUseExistingProductAsModel) {
    return (
        foundProducts.map((product: any) => {
            return (
                <View key={product.codigoDeBarras} style={produtoCss.productWindow}>
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
                                <Text style={produtoCss.textContent}>Nome: {product.nome}</Text>
                                <Text style={produtoCss.textContent}>Restantes: {product.restantes || '0'}</Text>
                                <Text style={produtoCss.textContent}>Vencimento: {formatDate({ data: product.dataDeVencimento })}</Text>
                                <Text style={produtoCss.textContent}>Código MC: {product.codigoDoMercado}</Text>
                            </View>
                        </View>
                        <View style={produtoCss.buttons}>
                            <Button onPress={() => { setFoundProducts([]) }} color='#206090' title='Cancelar modelo' />
                            <Button onPress={() => {
                                setNome(product.nome);
                                setRestantes(product.restantes || 0);
                                setValidade(product.dataDeVencimento);
                                setCodigo(product.codigoDeBarras);
                                setCodigoDoMercado(product.codigoDoMercado);
                                setFoundProducts([]);
                            }} color='#309030' title='Usar como modelo' />
                        </View>
                    </View>
                </View>
            )
        })
    );
};