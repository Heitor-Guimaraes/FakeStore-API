import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@FakeStoreAPI:favorites';

export async function getFavorites() {
  const value = await AsyncStorage.getItem(FAVORITES_KEY);
  return value ? JSON.parse(value) : [];
}

export async function saveFavorites(favorites) {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export async function toggleFavorite(id) {
  const current = await getFavorites();
  const next = current.includes(id)
    ? current.filter((item) => item !== id)
    : [...current, id];

  await saveFavorites(next);
  return next;
}
