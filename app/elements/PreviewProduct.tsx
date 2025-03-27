import { IProductPreview } from "@/customs/interfaces/IProduct";
import produtoCss from "@/customs/produtoCss";
import { Text, View } from "react-native";
import formatDate from "@/customs/functions/formatDate";
import ExpireOn from "./ExpireOn";

export default function PreviewProduct({ nome, codigoDeBarras, restantes, validade, codigoDoMercado, children }: IProductPreview) {
    if (!nome || !validade || !codigoDeBarras || !codigoDoMercado) return;

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
                    <Text style={produtoCss.textContent}>Validade: {formatDate({ data: validade })}</Text>
                    <Text style={produtoCss.textContent}>
                        Vence em: <ExpireOn vencimento={validade} />
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
                            <Text style={produtoCss.textContent}>Código: {codigoDeBarras}</Text>
                            <Text style={produtoCss.textContent}>Código MC: {codigoDoMercado}</Text>
                        </View>
                    </View>
                </View>

                {children}
            </View>
        </View>
    );
};