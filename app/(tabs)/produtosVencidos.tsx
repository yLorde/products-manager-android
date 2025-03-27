import React from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import ProductView from '../elements/ProductView';
import loadExpiredProduct from '@/customs/functions/loadExpiredProduct';

export default function ProdutosVencidos() {

  const [products, setProducts] = React.useState<any>([]);
  const [showRemoteProduct, setShowRemoveProduct] = React.useState(false);

  loadExpiredProduct({ setProducts, setShowRemoveProduct });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }} edges={['top']}>
        <ScrollView>
          <View>
            <View>
              {products?.map((product: any) => (

                <ProductView
                  codigoDeBarras={product.codigoDeBarras}
                  id={product.id}
                  codigoDoMercado={product.codigoDoMercado}
                  key={product.id}
                  nome={product.nome}
                  restantes={product.restantes}
                  validade={product.dataDeVencimento}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider >
  );
};