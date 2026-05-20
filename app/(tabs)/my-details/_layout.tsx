import { Stack } from 'expo-router';

import { useThemeColor } from '@/hooks/use-theme-color';

export default function MyDetailsLayout() {
  const backgroundColor = useThemeColor({}, 'groupedBackground');
  const headerTintColor = useThemeColor({}, 'text');

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor },
        headerTintColor,
        headerTitleStyle: { fontWeight: '600' },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'My Details' }} />
      <Stack.Screen name="personal/index" options={{ title: 'Personal Details' }} />
      <Stack.Screen
        name="personal/basic-details"
        options={{ title: 'Basic Details' }}
      />
      <Stack.Screen
        name="personal/contact-details"
        options={{ title: 'Contact Details' }}
      />
      <Stack.Screen
        name="personal/emergency-contact-details"
        options={{ title: 'Emergency Contact' }}
      />
      <Stack.Screen name="personal/edi" options={{ title: 'EDI' }} />
      <Stack.Screen
        name="personal/education-and-qualifications"
        options={{ title: 'Education' }}
      />
      <Stack.Screen
        name="personal/disability"
        options={{ title: 'Disability' }}
      />
      <Stack.Screen name="employment/index" options={{ title: 'Employment Details' }} />
      <Stack.Screen
        name="employment/payslips"
        options={{ title: 'Payslips' }}
      />
      <Stack.Screen
        name="employment/contract-details"
        options={{ title: 'Contract Details' }}
      />
      <Stack.Screen
        name="employment/bank-details"
        options={{ title: 'Bank Details' }}
      />
      <Stack.Screen
        name="employment/my-appraisal"
        options={{ title: 'My Appraisal' }}
      />
      <Stack.Screen name="other" options={{ title: 'Other Details' }} />
    </Stack>
  );
}
