/*
  Author: Nakshatra Gupta
  Email : ng1308@iastate.edu
  Date  : October 29, 2026
*/
import { useState } from "react";
import ProductsComponent from "./components/Products";
import Sidebar from "./components/Sidebar";

import { Products } from "./data/fashion";
import { Categories } from "./data/categories";

const App = () => {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  // Filtering logic: category chips and search box work together
  const filteredProducts = Products.filter((p) => {
    const matchesCategory = active === "all" || p.category === active;
    const matchesSearch = p.title.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar
        categories={Categories}
        active={active}
        setActive={setActive}
        query={query}
        setQuery={setQuery}
      />

      {/* Products Section */}
      <ProductsComponent products={filteredProducts} />
    </div>
  );
};

export default App;
