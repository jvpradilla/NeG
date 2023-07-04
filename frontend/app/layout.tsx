import "./globals.css";
import NavigationBar from "../components/NavigationBar";

export const metadata = {
  title: "Nacer en la Guerra",
  description: "Nacer en la Guerra"
};

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <main>
          {children}
        </main>
        <footer>
          <NavigationBar />
        </footer>
      </body>
    </html>
  );
}
