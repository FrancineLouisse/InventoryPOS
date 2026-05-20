import React, { useState } from 'react';
import { BiSearch, BiTrash } from 'react-icons/bi';
import './Purchase.css';

const initialItems = [
  { id: 1, code: '0000001', name: 'Product 1', brand: 'Brand X', price: 150.00 },
  { id: 2, code: '0000002', name: 'Product 2', brand: 'Brand X', price: 400.00 },
  { id: 3, code: '0000001', name: 'Product 3', brand: 'Brand X', price: 60.00  },
  { id: 4, code: '0000002', name: 'Product 4', brand: 'Brand X', price: 80.00  },
];

const TOTAL_PAGES = 68;
const VISIBLE = 5;

const getPageWindow = (current, total) => {
  let start = current - Math.floor(VISIBLE / 2);
  start = Math.max(1, start);
  start = Math.min(start, total - VISIBLE + 1);
  start = Math.max(1, start);
  return Array.from({ length: Math.min(VISIBLE, total) }, (_, i) => start + i);
};

const Purchase = () => {
  const [search, setSearch] = useState('');
  const [page, setPage]     = useState(1);
  const [cart, setCart]     = useState([]);
  // cart item shape: { id, name, brand, color, size, qty, unitPrice }

  const filtered = initialItems.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.code.includes(search) ||
      item.brand.toLowerCase().includes(search.toLowerCase())
  );

  const goTo = (p) => setPage(Math.min(TOTAL_PAGES, Math.max(1, p)));
  const pageWindow = getPageWindow(page, TOTAL_PAGES);

  const handleBuy = (item) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, qty: c.qty + 1, total: (c.qty + 1) * c.unitPrice } : c
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          brand: item.brand,
          color: 'Red',
          size: 2,
          qty: 2,
          unitPrice: item.price,
          total: item.price * 2,
        },
      ];
    });
  };

  const handleRemove = (id) => setCart((prev) => prev.filter((c) => c.id !== id));

  const grandTotal = cart.reduce((sum, c) => sum + c.total, 0);

  return (
    <div className="purchase">
      <h1 className="page-title">Purchase</h1>

      <div className="purchase-layout">

        {/* ── Left: Item List ── */}
        <div className="left-panel">
          {/* Toolbar — outside the card */}
          <div className="inv-toolbar">
            <div className="search-box">
              <BiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search Item"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="inv-card">
          <div className="inv-card-header">
            <h3 className="inv-card-title">Item List</h3>
          </div>

          <div className="table-wrapper">
            <table className="inv-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Product Name</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="table-row-clickable">
                    <td>{item.code}</td>
                    <td>{item.name}</td>
                    <td>{item.brand}</td>
                    <td>{item.price.toFixed(2)}</td>
                    <td>
                      <button
                        className="buy-btn"
                        onClick={(e) => { e.stopPropagation(); handleBuy(item); }}
                      >
                        BUY
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="empty-row">No items found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button className="page-nav" onClick={() => goTo(page - 1)} disabled={page === 1}>
              ← Previous
            </button>
            {pageWindow.map((p) => (
              <button
                key={p}
                className={`page-num ${page === p ? 'active' : ''}`}
                onClick={() => goTo(p)}
              >
                {p}
              </button>
            ))}
            <button className="page-nav" onClick={() => goTo(page + 1)} disabled={page === TOTAL_PAGES}>
              Next →
            </button>
          </div>
          </div>{/* end inv-card */}
        </div>{/* end left-panel */}

        {/* ── Right: Purchase Summary ── */}
        <div className="summary-panel">
          <div className="summary-body">
            <h3 className="summary-title">Purchase Summary Preview</h3>

            <div className="summary-items">
              {cart.length === 0 && (
                <p className="summary-empty">No items added yet. Click BUY to add.</p>
              )}
              {cart.map((c) => (
                <div key={c.id} className="summary-item">
                  <div className="summary-item-top">
                    <div>
                      <p className="summary-item-name">
                        {c.name} <span className="summary-item-brand">({c.brand})</span>
                      </p>
                      <p className="summary-item-meta">
                        Color: {c.color} | Size: {c.size}
                      </p>
                    </div>
                    <div className="summary-item-right">
                      <p className="summary-item-total">{c.total.toFixed(0)}</p>
                      <p className="summary-item-detail">Qty: {c.qty} | Php. {c.unitPrice.toFixed(0)}</p>
                    </div>
                  </div>
                  <button
                    className="summary-remove"
                    onClick={() => handleRemove(c.id)}
                    title="Remove"
                    aria-label="Remove item"
                  >
                    <BiTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="summary-footer">
            <div className="summary-footer-row">
              <span className="summary-selected">Selected Item: {cart.length}</span>
            </div>
            <div className="summary-total-row">
              <span className="summary-total-label">Total</span>
              <span className="summary-total-value">P {grandTotal.toFixed(0)}</span>
            </div>
          </div>

          <button className="purchase-btn" disabled={cart.length === 0}>
            Purchase
          </button>
        </div>

      </div>
    </div>
  );
};

export default Purchase;