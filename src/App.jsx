import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';

// Main App component - this is the root component that wraps everything
function App() {
  return (
    // CartProvider wraps the entire app to provide cart context to all components
    <CartProvider>
      {/* Router enables navigation between pages */}
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* Header is shown on every page */}
          <Header />
          
          {/* Main content area */}
          <main>
            {/* Routes define what component to show for each URL */}
            <Routes>
              {/* Home page route - shows product listing */}
              <Route path="/" element={<Home />} />
              
              {/* Cart page route - shows cart contents */}
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
