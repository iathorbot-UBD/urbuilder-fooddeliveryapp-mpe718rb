import React from 'react';
import {
  View, Text, Image, ScrollView,
  TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';

const USER = {
  name: 'Alexandre Dupont',
  email: 'alexandre.dupont@email.com',
  avatar: 'https://picsum.photos/seed/avatar/200',
  memberSince: 'Membre depuis Jan 2023',
};

const STATS = [
  { label: 'Commandes', value: '47', icon: '🛍️' },
  { label: 'Restaurants', value: '12', icon: '🍽️' },
  { label: 'Économisé', value: '23€', icon: '💰' },
];

const MENU_ITEMS = [
  { icon: '📍', label: 'Mes adresses' },
  { icon: '💳', label: 'Moyens de paiement' },
  { icon: '🔔', label: 'Notifications' },
  { icon: '❤️', label: 'Favoris' },
  { icon: '🎟️', label: 'Mes coupons' },
  { icon: '⚙️', label: 'Paramètres' },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={s.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={s.title}>Mon Profil</Text>

        <View style={s.avatarSection}>
          <View style={s.avatarWrapper}>
            <Image source={{ uri: USER.avatar }} style={s.avatar} />
            <TouchableOpacity style={s.editBadge}>
              <Text style={s.editBadgeTxt}>✏️</Text>
            </TouchableOpacity>
          </View>
          <Text style={s.name}>{USER.name}</Text>
          <Text style={s.email}>{USER.email}</Text>
          <Text style={s.member}>{USER.memberSince}</Text>
        </View>

        <View style={s.statsRow}>
          {STATS.map((stat) => (
            <View key={stat.label} style={s.statCard}>
              <Text style={s.statIcon}>{stat.icon}</Text>
              <Text style={s.statValue}>{stat.value}</Text>
              <Text style={s.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={s.menuSection}>
          {MENU_ITEMS.map((item, idx) => (
            <TouchableOpacity key={item.label} style={[
              s.menuRow,
              idx < MENU_ITEMS.length - 1 && s.menuRowBorder,
            ]}>
              <Text style={s.menuIcon}>{item.icon}</Text>
              <Text style={s.menuLabel}>{item.label}</Text>
              <Text style={s.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={s.logoutBtn}>
          <Text style={s.logoutTxt}>🚪 Se déconnecter</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F0F0F' },
  title: { color: '#FFF', fontSize: 26, fontWeight: '700', marginTop: 16, marginLeft: 16, marginBottom: 20 },
  avatarSection: { alignItems: 'center', paddingBottom: 24 },
  avatarWrapper: { position: 'relative', marginBottom: 12 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#FF6B35' },
  editBadge: {
    position: 'absolute', bottom: 0, right: 0,
    backgroundColor: '#FF6B35', borderRadius: 12, width: 24, height: 24,
    alignItems: 'center', justifyContent: 'center',
  },
  editBadgeTxt: { fontSize: 11 },
  name: { color: '#FFF', fontSize: 20, fontWeight: '700' },
  email: { color: '#888', fontSize: 13, marginTop: 4 },
  member: { color: '#555', fontSize: 12, marginTop: 4 },
  statsRow: { flexDirection: 'row', marginHorizontal: 16, gap: 10, marginBottom: 24 },
  statCard: {
    flex: 1, backgroundColor: '#1E1E1E', borderRadius: 14,
    alignItems: 'center', paddingVertical: 16,
  },
  statIcon: { fontSize: 22, marginBottom: 6 },
  statValue: { color: '#FF6B35', fontSize: 18, fontWeight: '700' },
  statLabel: { color: '#888', fontSize: 11, marginTop: 2 },
  menuSection: { backgroundColor: '#1E1E1E', marginHorizontal: 16, borderRadius: 16, marginBottom: 16 },
  menuRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 15 },
  menuRowBorder: { borderBottomWidth: 1, borderBottomColor: '#2A2A2A' },
  menuIcon: { fontSize: 18, marginRight: 14 },
  menuLabel: { flex: 1, color: '#FFF', fontSize: 15 },
  menuArrow: { color: '#555', fontSize: 22, fontWeight: '300' },
  logoutBtn: {
    marginHorizontal: 16, backgroundColor: '#1E1E1E', borderRadius: 14,
    paddingVertical: 15, alignItems: 'center', borderWidth: 1, borderColor: '#FF3B30',
  },
  logoutTxt: { color: '#FF3B30', fontSize: 15, fontWeight: '600' },
});