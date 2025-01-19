import { AuthProvider } from "../components/hook/useAuth";
import "./globals.css";

export const metadata = {
  title: "Children's House School - Early Childhood Education in Lagos",
  description:
    "Children's House School - A nurturing environment for children aged 3 months to 5 years. Join our family and watch your little ones thrive in Lagos, Nigeria.",
  keywords:
    "children school, preschool, nursery, creche, Lagos, early childhood education",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" sizes="256x256" />
        <link rel="icon" type="image/svg+xml" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
