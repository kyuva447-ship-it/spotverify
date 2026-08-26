import React from 'react';

export const metadata = {
  title: 'Spotverify',
  description: 'Collateral Audit Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#020617', color: '#fff' }}>
        {children}
      </body>
    </html>
  );
}
