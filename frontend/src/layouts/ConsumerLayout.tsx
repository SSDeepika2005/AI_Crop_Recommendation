
import { Outlet, Link, Navigate } from "react-router-dom";
import { ShoppingCart, Search, User, Sprout, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import AuthService from "../services/auth.service";

const ConsumerLayout = () => {
  const user = AuthService.getCurrentUser();

  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [openCart, setOpenCart] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  if (!user || !user.roles.includes("ROLE_CONSUMER")) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    AuthService.logout();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ✅ NAVBAR */}
      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            {/* LOGO */}
            <Link to="/consumer/home" className="flex items-center">
              <Sprout className="h-8 w-8 text-green-600 mr-2" />
              <span className="text-2xl font-bold">
                THALIR <span className="text-green-600">Fresh</span>
              </span>
            </Link>

            {/* ✅ CENTER SEARCH */}
            <div className="flex-1 flex justify-center px-6">
              <div className="w-full max-w-xl relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search fruits, vegetables, grains..."
                  className="w-full pl-10 pr-3 py-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center space-x-4">

              {/* CART */}
              <button
                onClick={() => setOpenCart(true)}
                className="relative p-2 rounded-full hover:bg-gray-100"
              >
                <ShoppingCart className="h-6 w-6" />

                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-green-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* PROFILE */}
              <div className="relative">
                <button
                  onClick={() => setOpenProfile(!openProfile)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <User className="h-6 w-6" />
                </button>

                {openProfile && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border p-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg text-sm"
                    >
                      <Settings size={16} />
                      Settings
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg text-sm w-full text-left text-red-600"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ✅ CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <Outlet
          context={{
            search,
            cartCount,
            setCartCount,
            openCart,
            setOpenCart,
          }}
        />
      </main>
    </div>
  );
};

export default ConsumerLayout;