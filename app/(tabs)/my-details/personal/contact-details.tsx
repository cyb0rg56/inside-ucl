import { DetailFieldGroup, type DetailSection } from '@/components/native/detail-field-group';
import { ScreenError } from '@/components/screen-error';
import { ScreenLoader } from '@/components/screen-loader';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useContactDetails } from '@/hooks/use-contact-details';
import { formatCodeName, formatDate, formatList, formatText } from '@/lib/format';
import type { Address, Phone } from '@/types/person';

type Row = {
  key: string;
  label: string;
  value: string;
};

function buildAddressRows(address: Address, index: number): Row[] {
  const prefix = `addr_${index}`;
  return [
    { key: `${prefix}_type`, label: 'Address Type', value: formatCodeName(address.type) },
    { key: `${prefix}_line`, label: 'Address', value: formatList(address.line) },
    { key: `${prefix}_town`, label: 'Town or City', value: formatText(address.town_or_city) },
    { key: `${prefix}_county`, label: 'County', value: formatCodeName(address.county) },
    { key: `${prefix}_postcode`, label: 'Postcode', value: formatText(address.postcode) },
    { key: `${prefix}_country`, label: 'Country', value: formatCodeName(address.country) },
    { key: `${prefix}_from`, label: 'Date From', value: formatDate(address.date_from) },
    { key: `${prefix}_to`, label: 'Date To', value: formatDate(address.date_to) },
  ];
}

function buildPhoneRows(phone: Phone, index: number): Row[] {
  const prefix = `phone_${index}`;
  return [
    { key: `${prefix}_type`, label: 'Phone Type', value: formatCodeName(phone.type) },
    { key: `${prefix}_number`, label: 'Phone Number', value: formatText(phone.phone_number) },
    { key: `${prefix}_from`, label: 'Date From', value: formatDate(phone.date_from) },
    { key: `${prefix}_to`, label: 'Date To', value: formatDate(phone.date_to) },
  ];
}

export default function ContactDetailsScreen() {
  const { data, isLoading, error, reload } = useContactDetails();
  const backgroundColor = useThemeColor({}, 'groupedBackground');

  if (isLoading) {
    return <ScreenLoader label="Loading contact details..." />;
  }

  if (error || !data) {
    return (
      <ScreenError
        title="Could not load details"
        message={error?.message ?? 'Contact details are unavailable.'}
        onRetry={() => void reload()}
      />
    );
  }

  const addresses = data.address_collection?.address ?? [];
  const phones = data.phone_collection?.phone ?? [];

  const sections: DetailSection[] = [
    {
      title: 'Email',
      rows: [{ key: 'email', label: 'Email', value: formatText(data.email) }],
    },
    ...addresses.map((address, index) => ({
      title: address.is_primary_address ? 'Primary Address' : `Address ${index + 1}`,
      rows: buildAddressRows(address, index),
    })),
    ...phones.map((phone, index) => ({
      title: phones.length > 1 ? `Phone ${index + 1}` : 'Phone',
      rows: buildPhoneRows(phone, index),
    })),
  ];

  return <DetailFieldGroup style={{ backgroundColor }} sections={sections} />;
}
