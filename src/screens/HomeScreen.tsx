import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { RESTAURANTS } from '../data/restaurants';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const CATEGORIES = ['🍕 Pizza', '🍣 Sushi', '🍔 Burgers', '🌮 Tacos', '🍜 Noodles'];

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Bonsoir 👋</Text>
        <Text style={styles.title}>Que voulez-vous{`\n`}manger ce soir ?</Text>
      </View>
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          placeholder="Rechercher un plat ou restaurant..."
          placeholderTextColor="#555"
          style={styles.searchInput}
        />
      </View>
      <Text style={styles.sectionTitle}>Catégories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity key={cat} style={styles.categoryChip}>
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.sectionTitle}>⭐ Populaires près de vous</Text>
      {RESTAURANTS.slice(0, 3).map((r) => (
        <TouchableOpacity key={r.id} style={styles.card}
          onPress={() => navigation.navigate('RestaurantDetail', { restaurantId: r.id })}>
          <Image source={{ uri: r.image }} style={styles.cardImage} />
          <View style={styles.cardBody}>
            <Text style={styles.cardName}>{r.name}</Text>
            <Text style={styles.cardMeta}>{r.category} • {r.deliveryTime} min</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.cardRating}>⭐ {r.rating}</Text>
              <Text style={styles.cardDelivery}>🚴 {r.deliveryFee}€</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0F0F', paddingHorizontal: 16 },
  header: { marginTop: 60, marginBottom: 20 },
  greeting: { color: '#888', fontSize: 14 },
  title: { color: '#FFF', fontSize: 26, fontWeight: '700', marginTop: 4, lineHeight: 34 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E',
    borderRadius: 12, paddingHorizontal: 14, marginBottom: 24, height: 48 },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, color: '#FFF', fontSize: 14 },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: '700', marginBottom: 12 },
  categoryList: { marginBottom: 24 },
  categoryChip: { backgroundColor: '#1E1E1E', borderRadius: 20, paddingHorizontal: 16,
    paddingVertical: 8, marginRight: 10, borderWidth: 1, borderColor: '#2C2C2C' },
  categoryText: { color: '#FFF', fontSize: 13 },
  card: { backgroundColor: '#1A1A1A', borderRadius: 16, marginBottom: 16, overflow: 'hidden' },
  cardImage: { width: '100%', height: 150 },
  cardBody: { padding: 12 },
  cardName: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  cardMeta: { color: '#888', fontSize: 13, marginTop: 4 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  cardRating: { color: '#FFD700', fontSize: 13 },
  cardDelivery: { color: '#FF6B35', fontSize: 13 },
});