import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const location = useLocation();

  // Check if the current page is the Home page
  const isHomePage = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {isHomePage && <Hero />}
      {isHomePage && (
        <div className="container mx-auto">
          <SearchBar />
        </div>
      )}
      <div className="container mx-auto py-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
