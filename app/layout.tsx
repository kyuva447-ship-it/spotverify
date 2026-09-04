import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Spotverify | Zero-Trust Field Verification',
  description: 'Hardware GPS anti-spoofing and SHA-256 digital seals for field workforce audits.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#070b14', color: '#f8fafc' }}>
        {children}
      </body>
    </html>
  );
}
