import React from 'react';
import {
  View, Text, FlatList, Image,
  TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import { useCart } from './CartContext';

function CartItemRow({ item }: { item: any }) {
  const { dispatch } = useCart();
  return (
    <View style={s.row}>
      <Image source={{ uri: item.image }} style={s.img} />
      <View style={s.info}>
        <Text style={s.itemName}>{item.name}</Text>
        <Text style={s.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
      </View>
      <View style={s.stepper}>
        <TouchableOpacity style={s.stepBtn} onPress={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })}>
          <Text style={s.stepTxt}>−</Text>
        </TouchableOpacity>
        <Text style={s.qty}>{item.quantity}</Text>
        <TouchableOpacity style={s.stepBtn} onPress={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}>
          <Text style={s.stepTxt}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function CartScreen() {
  const { state } = useCart();
  const subtotal = state.total;
  const delivery = 1.99;
  const total = subtotal + delivery;

  return (
    <SafeAreaView style={s.safe}>
      <Text style={s.title}>Your Cart</Text>
      {state.items.length === 0
        ? <View style={s.empty}><Text style={s.emptyTxt}>Your cart is empty 🛒</Text></View>
        : <>
            <FlatList data={state.items} keyExtractor={i => i.id} renderItem={({ item }) => <CartItemRow item={item} />}
              contentContainerStyle={{ paddingHorizontal: 16 }} />
            <View style={s.summary}>
              <View style={s.summaryRow}><Text style={s.label}>Subtotal</Text><Text style={s.value}>${subtotal.toFixed(2)}</Text></View>
              <View style={s.summaryRow}><Text style={s.label}>Delivery</Text><Text style={s.value}>${delivery.toFixed(2)}</Text></View>
              <View style={[s.summaryRow, s.totalRow]}><Text style={s.totalLabel}>Total</Text><Text style={s.totalValue}>${total.toFixed(2)}</Text></View>
              <TouchableOpacity style={s.cta}><Text style={s.ctaTxt}>Proceed to Checkout</Text></TouchableOpacity>
            </View>
          </>}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#121212' },
  title: { color: '#FFFFFF', fontSize: 24, fontWeight: '700', padding: 16 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyTxt: { color: '#666', fontSize: 16 },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E', borderRadius: 12, marginBottom: 12, padding: 10 },
  img: { width: 64, height: 64, borderRadius: 10 },
  info: { flex: 1, marginLeft: 12 },
  itemName: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
  itemPrice: { color: '#FF6B00', fontSize: 14, marginTop: 4 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  stepBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#2A2A2A', alignItems: 'center', justifyContent: 'center' },
  stepTxt: { color: '#FF6B00', fontSize: 18, lineHeight: 20 },
  qty: { color: '#FFFFFF', fontSize: 15, fontWeight: '700', minWidth: 20, textAlign: 'center' },
  summary: { backgroundColor: '#1E1E1E', margin: 16, borderRadius: 16, padding: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  label: { color: '#AAAAAA', fontSize: 14 },
  value: { color: '#FFFFFF', fontSize: 14 },
  totalRow: { borderTopWidth: 1, borderTopColor: '#2A2A2A', paddingTop: 10, marginTop: 4 },
  totalLabel: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  totalValue: { color: '#FF6B00', fontSize: 16, fontWeight: '700' },
  cta: { backgroundColor: '#FF6B00', borderRadius: 14, paddingVertical: 14, alignItems: 'center', marginTop: 12 },
  ctaTxt: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});