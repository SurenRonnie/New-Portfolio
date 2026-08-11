import './globals.css';

export const metadata = {
  title: 'G Surendar | Frontend Developer',
  description: "G Surendar is a frontend developer with expertise in React, Next.js, Astro.js, Vite.js, and modern web technologies. With a passion for creating engaging user experiences, G Surendar has a proven track record of delivering high-quality web applications. Explore G Surendar's portfolio to see examples of their work and learn more about their skills and experience.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script 
          async 
          src="https://3g50nf88-4000.inc1.devtunnels.ms/tracker.js"
          data-tracking-id="8fc1daa9-14e9-4cb8-9486-44b84e760c09"
          data-endpoint="https://3g50nf88-4000.inc1.devtunnels.ms" 
        />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
