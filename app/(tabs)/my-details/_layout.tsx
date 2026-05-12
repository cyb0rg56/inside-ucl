import { Stack } from 'expo-router';

export default function MyDetailsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#F2F2F7' },
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
      <Stack.Screen name="employment" options={{ title: 'Employment Details' }} />
      <Stack.Screen name="other" options={{ title: 'Other Details' }} />
    </Stack>
  );
}
