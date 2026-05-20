import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from './CartContext';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

export default function MenuItemCard({ item }: { item: MenuItem }) {
  const { dispatch } = useCart();

  const handleAdd = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { id: item.id, name: item.name, price: item.price, image: item.image },
    });
  };

  return (
    <View style={s.card}>
      <Image source={{ uri: item.image }} style={s.image} />
      <View style={s.body}>
        <Text style={s.name} numberOfLines={1}>{item.name}</Text>
        <Text style={s.desc} numberOfLines={2}>{item.description}</Text>
        <View style={s.footer}>
          <Text style={s.price}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity style={s.addBtn} onPress={handleAdd} activeOpacity={0.75}>
            <Text style={s.addTxt}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    flexDirection: 'row', backgroundColor: '#1E1E1E', borderRadius: 14,
    marginHorizontal: 16, marginTop: 12, overflow: 'hidden',
  },
  image: { width: 100, height: 100 },
  body: { flex: 1, padding: 12, justifyContent: 'space-between' },
  name: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  desc: { color: '#888888', fontSize: 12, marginTop: 4, lineHeight: 17 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  price: { color: '#FF6B00', fontSize: 15, fontWeight: '700' },
  addBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#FF6B00', alignItems: 'center', justifyContent: 'center',
  },
  addTxt: { color: '#FFFFFF', fontSize: 22, lineHeight: 26, fontWeight: '700' },
});