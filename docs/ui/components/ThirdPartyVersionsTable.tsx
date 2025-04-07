import { useState } from 'react';

import { usePageApiVersion } from '~/providers/page-api-version';

import { Cell, HeaderCell, Row, Table, TableHead } from './Table';
import { H3 } from './Text';

const INCLUDED_PACKAGES = [
  '@react-native-async-storage/async-storage',
  '@react-native-community/datetimepicker',
  '@react-native-community/netinfo',
  '@react-native-masked-view/masked-view',
  '@react-native-picker/picker',
  '@shopify/flash-list',
  '@shopify/react-native-skia',
  '@stripe/stripe-react-native',
  'lottie-react-native',
  'react-native-gesture-handler',
  'react-native-maps',
  'react-native-pager-view',
  'react-native-reanimated',
  'react-native-safe-area-context',
  'react-native-screens',
  'react-native-svg',
  'react-native-view-shot',
  'react-native-webview',
];

export function ThirdPartyVersionsTable() {
  const { version } = usePageApiVersion();
  const { versions } = require(`~/public/static/schemas/${version}/native-modules.json`);

  const [bundledVersions] = useState<Record<string, string>[]>(versions);

  const bundledPackageData = bundledVersions
    .filter(pkg => INCLUDED_PACKAGES.includes(pkg.npmPackage))
    .sort((a, b) => a.npmPackage.localeCompare(b.npmPackage));

  if (bundledPackageData.length === 0) {
    return null;
  }

  return (
    <>
      <H3>Included third-party libraries versions</H3>
      <Table>
        <TableHead>
          <Row>
            <HeaderCell size="sm">Package name</HeaderCell>
            <HeaderCell size="sm">Version</HeaderCell>
          </Row>
        </TableHead>
        <tbody>
          {bundledPackageData.map(pkg => {
            return (
              <Row key={pkg.npmPackage}>
                <Cell className="py-2.5">{pkg.npmPackage}</Cell>
                <Cell className="py-2.5">{pkg.versionRange}</Cell>
              </Row>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
