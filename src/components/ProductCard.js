import { Image, Pressable, Text, View } from 'react-native';

import theme from '../styles/theme';

export default function ProductCard({ item, onPress, onToggleFavorite, favorite }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.lg,
          marginHorizontal: theme.spacing.xl,
          marginBottom: theme.spacing.lg,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: theme.colors.border,
          opacity: pressed ? 0.96 : 1,
          shadowColor: '#0F172A',
          shadowOpacity: 0.06,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 2,
        },
      ]}
    >
      <Image
        source={{ uri: item.image }}
        resizeMode="contain"
        style={{
          width: '100%',
          height: 190,
          backgroundColor: '#F1F5F9',
        }}
      />

      <View style={{ padding: theme.spacing.md, gap: 8 }}>
        <Text
          numberOfLines={2}
          style={{
            fontSize: theme.typography.body,
            fontWeight: '800',
            color: theme.colors.text,
          }}
        >
          {item.title}
        </Text>

        <Text
          numberOfLines={1}
          style={{
            fontSize: theme.typography.caption,
            color: theme.colors.textMuted,
            textTransform: 'capitalize',
          }}
        >
          {item.category}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: theme.spacing.sm,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '900',
              color: theme.colors.primaryDark,
            }}
          >
            R$ {Number(item.price).toFixed(2)}
          </Text>

          <View
            style={{
              backgroundColor: theme.colors.softBlue,
              borderColor: '#BFDBFE',
              borderWidth: 1,
              borderRadius: theme.radius.pill,
              paddingVertical: 4,
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.small,
                fontWeight: '700',
                color: theme.colors.primaryDark,
              }}
            >
              ⭐ {item.rating?.rate ?? '-'}
            </Text>
          </View>
        </View>

        <Pressable
          onPress={onToggleFavorite}
          style={({ pressed }) => ({
            marginTop: 4,
            alignSelf: 'flex-start',
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: theme.radius.pill,
            backgroundColor: favorite ? '#FEF2F2' : '#F8FAFC',
            opacity: pressed ? 0.85 : 1,
            borderWidth: 1,
            borderColor: favorite ? '#FECACA' : theme.colors.border,
          })}
        >
          <Text
            style={{
              fontSize: theme.typography.small,
              fontWeight: '800',
              color: favorite ? theme.colors.danger : theme.colors.textMuted,
            }}
          >
            {favorite ? 'Favorito ♥' : 'Favoritar ♡'}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}