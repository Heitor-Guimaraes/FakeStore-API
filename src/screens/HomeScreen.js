import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import api from '../services/api';
import { getFavorites, saveFavorites, toggleFavorite } from '../services/storage';
import theme from '../styles/theme';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState([]);

  const loadProducts = useCallback(async (isRefresh = false) => {
    setError('');
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const [productsResponse, favoritesResponse] = await Promise.all([
        api.get('/products'),
        getFavorites(),
      ]);

      setProducts(productsResponse.data);
      setFavorites(favoritesResponse);
    } catch (err) {
      setError('Não foi possível carregar os produtos. Verifique a conexão.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) {
      return products;
    }

    return products.filter((product) => {
      return (
        product.title.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
      );
    });
  }, [products, search]);

  const handleToggleFavorite = useCallback(async (id) => {
    const next = await toggleFavorite(id);
    setFavorites(next);
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <ProductCard
        item={item}
        favorite={favorites.includes(item.id)}
        onPress={() => navigation.navigate('Details', { productId: item.id })}
        onToggleFavorite={() => handleToggleFavorite(item.id)}
      />
    ),
    [favorites, handleToggleFavorite, navigation],
  );

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={{ marginTop: 12, color: theme.colors.textMuted }}>
            Carregando produtos...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <Text style={{ fontSize: 26, fontWeight: '900', color: theme.colors.text }}>
            Ops!
          </Text>
          <Text style={{ marginTop: 8, textAlign: 'center', color: theme.colors.textMuted }}>
            {error}
          </Text>
          <Pressable
            onPress={() => loadProducts()}
            style={{
              marginTop: 16,
              backgroundColor: theme.colors.primary,
              paddingVertical: 12,
              paddingHorizontal: 18,
              borderRadius: theme.radius.md,
            }}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: '800' }}>Tentar novamente</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header
        title="FakeStore"
        subtitle={`${filteredProducts.length} itens encontrados`}
        rightContent={
          <View
            style={{
              backgroundColor: theme.colors.surface,
              borderRadius: theme.radius.pill,
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: '800', color: theme.colors.primaryDark }}>
              ♥ {favorites.length}
            </Text>
          </View>
        }
      />

      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar por nome ou categoria"
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={() => loadProducts(true)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={
          <View style={{ paddingHorizontal: 24, paddingTop: 48, alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: '800', color: theme.colors.text }}>
              Nenhum item encontrado
            </Text>
            <Text style={{ marginTop: 8, color: theme.colors.textMuted, textAlign: 'center' }}>
              Tente ajustar o termo de busca.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}