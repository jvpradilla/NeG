import "./globals.css";
import NavigationBar from "../components/NavigationBar";

export const metadata = {
  title: "Nacer en la Guerra",
  description: "Nacer en la Guerra"
};

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <header>
          <NavigationBar />
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
