import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { RESTAURANTS, Restaurant } from '../data/restaurants';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function RestaurantListScreen() {
  const navigation = useNavigation<Nav>();
  const [query, setQuery] = useState('');

  const filtered = RESTAURANTS.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase()) ||
    r.category.toLowerCase().includes(query.toLowerCase())
  );

  const renderItem = ({ item }: { item: Restaurant }) => (
    <TouchableOpacity style={styles.card}
      onPress={() => navigation.navigate('RestaurantDetail', { restaurantId: item.id })}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{item.category}</Text>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.row}>
          <Text style={styles.cardName}>{item.name}</Text>
          <Text style={styles.cardRating}>⭐ {item.rating}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cardMeta}>🚴 {item.deliveryFee}€ livraison</Text>
          <Text style={styles.cardMeta}>⏱ {item.deliveryTime} min</Text>
        </View>
        {item.promo && (
          <View style={styles.promoTag}>
            <Text style={styles.promoText}>🔥 {item.promo}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurants</Text>
      <View style={styles.searchBar}>
        <Text>🔍</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Pizza, Sushi, Burger..."
          placeholderTextColor="#555"
          style={styles.searchInput}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>Aucun restaurant trouvé 😕</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0F0F', paddingHorizontal: 16 },
  title: { color: '#FFF', fontSize: 26, fontWeight: '700', marginTop: 60, marginBottom: 16 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E',
    borderRadius: 12, paddingHorizontal: 14, marginBottom: 16, height: 48, gap: 8 },
  searchInput: { flex: 1, color: '#FFF', fontSize: 14 },
  list: { paddingBottom: 80 },
  card: { backgroundColor: '#1A1A1A', borderRadius: 16, marginBottom: 16, overflow: 'hidden' },
  cardImage: { width: '100%', height: 140 },
  badge: { position: 'absolute', top: 12, left: 12, backgroundColor: '#FF6B35',
    borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
  cardBody: { padding: 12, gap: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardName: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  cardRating: { color: '#FFD700', fontSize: 13 },
  cardMeta: { color: '#888', fontSize: 13 },
  promoTag: { backgroundColor: '#2C1A0E', borderRadius: 8, paddingHorizontal: 10,
    paddingVertical: 4, alignSelf: 'flex-start' },
  promoText: { color: '#FF6B35', fontSize: 12, fontWeight: '600' },
  empty: { color: '#555', textAlign: 'center', marginTop: 60, fontSize: 16 },
});