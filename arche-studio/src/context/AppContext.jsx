
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("arche-wishlist")) || [];
    } catch {
      return [];
    }
  });

  const [compareList, setCompareList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("arche-compare")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("arche-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("arche-compare", JSON.stringify(compareList));
  }, [compareList]);

  const toggleWishlist = (design) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === design.id)
        ? prev.filter((item) => item.id !== design.id)
        : [...prev, design]
    );
  };

  const addToCompare = (design) => {
    if (compareList.some((item) => item.id === design.id)) {
      return { success: false, message: "Already added!" };
    }

    if (compareList.length >= 3) {
      return { success: false, message: "Maximum 3 designs allowed." };
    }

    setCompareList((prev) => [...prev, design]);

    return { success: true, message: "Added to compare!" };
  };

  const removeFromCompare = (id) => {
    setCompareList((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <AppContext.Provider
      value={{
        wishlist,
        compareList,
        toggleWishlist,
        addToCompare,
        removeFromCompare,
        removeFromWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
}
