import { TextInput, View } from 'react-native';

import theme from '../styles/theme';

export default function SearchBar({ value, onChangeText, placeholder }) {
  return (
    <View
      style={{
        marginHorizontal: theme.spacing.xl,
        marginBottom: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
        borderWidth: 1,
        borderRadius: theme.radius.lg,
        paddingHorizontal: theme.spacing.md,
      }}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        autoCapitalize="none"
        autoCorrect={false}
        style={{
          paddingVertical: 12,
          fontSize: theme.typography.body,
          color: theme.colors.text,
        }}
      />
    </View>
  );
}