import { Column, FieldGroup, Host, Text } from '@expo/ui';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

export type DetailRow = {
  key: string;
  label: string;
  value: string;
};

export type DetailSection = {
  title?: string;
  rows: DetailRow[];
};

type DetailFieldGroupProps = {
  sections: DetailSection[];
  style?: StyleProp<ViewStyle>;
};

export function DetailFieldGroup({ sections, style }: DetailFieldGroupProps) {
  return (
    <View style={[styles.container, style]}>
      <Host style={styles.host} useViewportSizeMeasurement>
        <FieldGroup>
          {sections.map((section, index) => (
            <FieldGroup.Section
              key={section.title ?? `section-${index}`}
              title={section.title}
            >
              {section.rows.map((row) => (
                <Column key={row.key} spacing={4}>
                  <Text textStyle={{ fontSize: 13 }}>{row.label}</Text>
                  <Text>{row.value}</Text>
                </Column>
              ))}
            </FieldGroup.Section>
          ))}
        </FieldGroup>
      </Host>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  host: {
    flex: 1,
  },
});
