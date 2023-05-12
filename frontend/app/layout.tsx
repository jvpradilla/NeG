import "./globals.css";
import NavigationBar from "../components/NavigationBar";

export const metadata = {
  title: "Nacer en la Guerra",
  description: "Nacer en la Guerra"
};

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
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
