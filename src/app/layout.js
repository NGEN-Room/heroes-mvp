// app/layout.js
import './globals.css';

export const metadata = {
  title: 'Heroes Banquet',
  description: 'MVP Bot Battle',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}