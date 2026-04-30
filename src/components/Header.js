import { Text, View } from 'react-native';

import theme from '../styles/theme';

export default function Header({ title, subtitle, rightContent }) {
  return (
    <View
      style={{
        paddingHorizontal: theme.spacing.xl,
        paddingTop: theme.spacing.lg,
        paddingBottom: theme.spacing.md,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: theme.spacing.md,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: theme.typography.title,
            fontWeight: '800',
            color: theme.colors.text,
          }}
        >
          {title}
        </Text>
        {!!subtitle && (
          <Text
            style={{
              marginTop: 4,
              fontSize: theme.typography.body,
              color: theme.colors.textMuted,
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {rightContent}
    </View>
  );
}