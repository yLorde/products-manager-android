import addProduct from "@/customs/crud/addProduct";
import { IProductPreviewChildren } from "@/customs/interfaces/IProduct";
import produtoCss from "@/customs/produtoCss";
import { Button, View } from "react-native";

export default function PreviewProductChildren({
    nome, restantes, validade, codigoDeBarras, codigoDoMercado,
    clearFields, setRestantes
}: IProductPreviewChildren) {
    return (
        <View style={produtoCss.productContent}>
            <View>
                <Button color={'#309030'} onPress={() => {
                    addProduct({
                        nome: nome,
                        restantes: restantes,
                        validade: validade,
                        codigoDeBarras: codigoDeBarras,
                        codigoDoMercado: codigoDoMercado
                    });
                    clearFields();
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
                    <Button color={'#902020'} title='RESTANTES' disabled />
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
                    clearFields();
                }} title='Limpar Campos' />
            </View>
        </View>
    );
};