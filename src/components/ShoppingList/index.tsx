import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import { styles } from './styles';
import { Product, ProductProps } from '../Product';

import { shoppingListExample } from '../../utils/shopping.list.data';
 import firestore from '@react-native-firebase/firestore'

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    firestore()
    .collection('product')
    .get()
    .then(response => {
      const data = response.docs.map(doc => {
        return{
          id: doc.id,
          ...doc.data()
        }
      }) as ProductProps[];
      setProducts(data);
      console.log('sucesso carregamento');
      
    })
    .catch(error => console.log(error));
  }, [])


  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
