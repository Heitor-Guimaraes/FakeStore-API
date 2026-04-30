import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import api from '../services/api';
import { getFavorites, toggleFavorite } from '../services/storage';
import theme from '../styles/theme';

export default function DetailsScreen({ route }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState([]);

  const loadDetails = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const [productResponse, favoritesResponse] = await Promise.all([
        api.get(`/products/${productId}`),
        getFavorites(),
      ]);

      setProduct(productResponse.data);
      setFavorites(favoritesResponse);
    } catch (err) {
      setError('Não foi possível carregar os detalhes do produto.');
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    loadDetails();
  }, [loadDetails]);

  const handleToggleFavorite = useCallback(async () => {
    const next = await toggleFavorite(productId);
    setFavorites(next);
  }, [productId]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={{ marginTop: 12, color: theme.colors.textMuted }}>
            Carregando detalhes...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <Text style={{ fontSize: 22, fontWeight: '900', color: theme.colors.text }}>
            Erro ao abrir
          </Text>
          <Text style={{ marginTop: 8, textAlign: 'center', color: theme.colors.textMuted }}>
            {error}
          </Text>
          <Pressable
            onPress={loadDetails}
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

  const favorite = favorites.includes(product.id);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View
          style={{
            margin: 16,
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.lg,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <Image
            source={{ uri: product.image }}
            resizeMode="contain"
            style={{ width: '100%', height: 280, backgroundColor: '#F1F5F9' }}
          />

          <View style={{ padding: 16, gap: 12 }}>
            <Text style={{ fontSize: 22, fontWeight: '900', color: theme.colors.text }}>
              {product.title}
            </Text>

            <Text
              style={{
                color: theme.colors.textMuted,
                textTransform: 'capitalize',
                fontSize: 14,
              }}
            >
              {product.category}
            </Text>

            <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
              <View
                style={{
                  backgroundColor: theme.colors.softBlue,
                  borderRadius: theme.radius.pill,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                }}
              >
                <Text style={{ color: theme.colors.primaryDark, fontWeight: '800' }}>
                  ⭐ {product.rating?.rate ?? '-'}
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: '#ECFDF5',
                  borderRadius: theme.radius.pill,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                }}
              >
                <Text style={{ color: theme.colors.success, fontWeight: '800' }}>
                  {product.rating?.count ?? 0} avaliações
                </Text>
              </View>
            </View>

            <Text style={{ fontSize: 28, fontWeight: '900', color: theme.colors.primaryDark }}>
              R$ {Number(product.price).toFixed(2)}
            </Text>

            <Text style={{ fontSize: 15, lineHeight: 24, color: theme.colors.textMuted }}>
              {product.description}
            </Text>

            <Pressable
              onPress={handleToggleFavorite}
              style={({ pressed }) => ({
                marginTop: 4,
                backgroundColor: favorite ? '#FEF2F2' : theme.colors.primary,
                borderRadius: theme.radius.md,
                paddingVertical: 14,
                alignItems: 'center',
                opacity: pressed ? 0.9 : 1,
              })}
            >
              <Text
                style={{
                  color: favorite ? theme.colors.danger : '#FFFFFF',
                  fontWeight: '900',
                  fontSize: 15,
                }}
              >
                {favorite ? 'Remover dos favoritos' : 'Favoritar produto'}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}