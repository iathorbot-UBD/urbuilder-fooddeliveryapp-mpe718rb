import React, { useState } from 'react';
import {
  View, Text, Image, ScrollView,
  TouchableOpacity, FlatList, StyleSheet, SafeAreaView,
} from 'react-native';
import MenuItemCard from './MenuItemCard';

const CATEGORIES = ['All', 'Starters', 'Mains', 'Sides', 'Drinks', 'Desserts'];

const MENU_ITEMS = [
  { id: '1', name: 'Crispy Wings', description: 'Spicy buffalo wings with ranch dip', price: 9.99, category: 'Starters', image: 'https://picsum.photos/seed/wings/200' },
  { id: '2', name: 'Smash Burger', description: 'Double patty, cheddar, pickles, special sauce', price: 13.99, category: 'Mains', image: 'https://picsum.photos/seed/burger/200' },
  { id: '3', name: 'Truffle Fries', description: 'Crispy fries with truffle oil and parmesan', price: 6.99, category: 'Sides', image: 'https://picsum.photos/seed/fries/200' },
  { id: '4', name: 'Lemonade', description: 'Freshly squeezed with mint', price: 3.99, category: 'Drinks', image: 'https://picsum.photos/seed/lemon/200' },
  { id: '5', name: 'Brownie Sundae', description: 'Warm brownie with vanilla ice cream', price: 7.49, category: 'Desserts', image: 'https://picsum.photos/seed/brownie/200' },
  { id: '6', name: 'Caesar Salad', description: 'Romaine, croutons, parmesan, caesar dressing', price: 8.49, category: 'Starters', image: 'https://picsum.photos/seed/caesar/200' },
];

export default function RestaurantDetailScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? MENU_ITEMS : MENU_ITEMS.filter(i => i.category === activeCategory);

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView style={s.container} stickyHeaderIndices={[1]}>
        <Image source={{ uri: 'https://picsum.photos/seed/restaurant/800/400' }} style={s.hero} />
        <View style={s.infoHeader}>
          <Text style={s.name}>The Golden Fork</Text>
          <View style={s.meta}>
            <Text style={s.badge}>⭐ 4.8</Text>
            <Text style={s.badge}>🕒 25–35 min</Text>
            <Text style={s.badge}>🚚 $1.99 delivery</Text>
          </View>
        </View>
        <View style={s.tabsWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.tabs}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity key={cat} onPress={() => setActiveCategory(cat)} style={[s.tab, activeCategory === cat && s.tabActive]}>
                <Text style={[s.tabText, activeCategory === cat && s.tabTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {filtered.map(item => <MenuItemCard key={item.id} item={item} />)}
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#121212' },
  container: { flex: 1, backgroundColor: '#121212' },
  hero: { width: '100%', height: 220 },
  infoHeader: { backgroundColor: '#1E1E1E', padding: 16 },
  name: { color: '#FFFFFF', fontSize: 22, fontWeight: '700', marginBottom: 8 },
  meta: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  badge: { color: '#AAAAAA', fontSize: 13, backgroundColor: '#2A2A2A', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  tabsWrapper: { backgroundColor: '#1E1E1E', paddingBottom: 8 },
  tabs: { paddingHorizontal: 12, paddingTop: 8 },
  tab: { paddingHorizontal: 16, paddingVertical: 8, marginRight: 8, borderRadius: 20, backgroundColor: '#2A2A2A' },
  tabActive: { backgroundColor: '#FF6B00' },
  tabText: { color: '#AAAAAA', fontSize: 13, fontWeight: '600' },
  tabTextActive: { color: '#FFFFFF' },
});