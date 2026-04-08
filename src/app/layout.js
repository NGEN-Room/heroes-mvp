// app/layout.js
import './globals.css';

export const metadata = {
  title: 'Heroes Banquet',
  description: 'Next.js frontend with a Python battle backend',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
