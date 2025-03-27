import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import loadProducts from '@/customs/functions/loadProducts';
import ProductView from '../elements/ProductView';

export default function MeusProdutos() {
  const [products, setProducts] = React.useState<any>([]);

  loadProducts().then((produtos: any) => setProducts(produtos));

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }} edges={['top']}>
        <ScrollView>
          {
            products.map((produto: any) => (
              <ProductView
                codigoDeBarras={produto.codigoDeBarras}
                id={produto.id}
                codigoDoMercado={produto.codigoDoMercado}
                key={produto.id}
                nome={produto.nome}
                restantes={produto.restantes}
                validade={produto.dataDeVencimento}
              />
            ))
          }
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider >
  );
};