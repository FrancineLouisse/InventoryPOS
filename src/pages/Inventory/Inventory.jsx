import React, { useState } from 'react';
import { BiSearch, BiPlus, BiTrash } from 'react-icons/bi';
import { BsList, BsGrid } from 'react-icons/bs';
import './Inventory.css';

const initialItems = [
  { id: 1, code: '0000001', name: 'Product 1', brand: 'Brand X', qty: 470, variation: 'size',   unit: 'pc.', price: 150.00 },
  { id: 2, code: '0000002', name: 'Product 2', brand: 'Brand X', qty: 600, variation: 'color',  unit: 'pc.', price: 400.00 },
  { id: 3, code: '0000001', name: 'Product 3', brand: 'Brand X', qty: 64,  variation: '2 var.', unit: 'pc.', price: 60.00  },
  { id: 4, code: '0000002', name: 'Product 4', brand: 'Brand X', qty: 35,  variation: 'size',   unit: 'pc.', price: 80.00  },
];

const TOTAL_PAGES = 68;
const VISIBLE = 5; // always show exactly 5 page numbers

/* Returns an array of 5 page numbers centered on `current` */
const getPageWindow = (current, total) => {
  let start = current - Math.floor(VISIBLE / 2); // center the current page
  start = Math.max(1, start);                     // don't go below 1
  start = Math.min(start, total - VISIBLE + 1);   // don't exceed end
  start = Math.max(1, start);                     // guard if total < VISIBLE
  return Array.from({ length: Math.min(VISIBLE, total) }, (_, i) => start + i);
};

const Inventory = () => {
  const [view, setView]     = useState('list');
  const [search, setSearch] = useState('');
  const [page, setPage]     = useState(1);
  const [items, setItems]   = useState(initialItems);

  const filtered = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.code.includes(search) ||
      item.brand.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const goTo = (p) => setPage(Math.min(TOTAL_PAGES, Math.max(1, p)));

  const pageWindow = getPageWindow(page, TOTAL_PAGES);

  return (
    <div className="inventory">
      <h1 className="page-title">Inventory</h1>

      {/* ── Toolbar ── */}
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
        <button className="add-btn">
          <BiPlus /> Add Item
        </button>
      </div>

      {/* ── Item List Card ── */}
      <div className="inv-card">
        <div className="inv-card-header">
          <h3 className="inv-card-title">Item List</h3>
          <div className="view-toggle">
            <button
              className={`toggle-btn ${view === 'list' ? 'active' : ''}`}
              onClick={() => setView('list')}
              title="List view"
            >
              <BsList />
            </button>
            <button
              className={`toggle-btn ${view === 'grid' ? 'active' : ''}`}
              onClick={() => setView('grid')}
              title="Grid view"
            >
              <BsGrid />
            </button>
          </div>
        </div>

        {/* ── List View ── */}
        {view === 'list' && (
          <div className="table-wrapper">
            <table className="inv-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Code</th>
                  <th>Product Name</th>
                  <th>Brand</th>
                  <th>Qty.</th>
                  <th>Variation</th>
                  <th>Unit</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, idx) => (
                  <tr key={item.id} className="table-row-clickable">
                    <td>{idx + 1}</td>
                    <td>{item.code}</td>
                    <td>{item.name}</td>
                    <td>{item.brand}</td>
                    <td>{item.qty}</td>
                    <td>{item.variation}</td>
                    <td>{item.unit}</td>
                    <td>{item.price.toFixed(2)}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                      >
                        <BiTrash />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={9} className="empty-row">No items found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Grid View ── */}
        {view === 'grid' && (
          <div className="grid-wrapper">
            {filtered.map((item) => (
              <div key={item.id} className="product-card">
                <div className="product-img">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="64" height="64" rx="8" fill="#E5E7EB"/>
                    <path d="M20 44L28 32L34 40L40 32L48 44H20Z" fill="#9CA3AF"/>
                    <circle cx="26" cy="26" r="5" fill="#9CA3AF"/>
                  </svg>
                </div>
                <div className="product-info">
                  <p className="product-name">{item.name}</p>
                  <p className="product-price">${item.price.toFixed(0)}</p>
                  <div className="product-meta">
                    <span>{item.brand} ({item.qty} pcs.)</span>
                    <button
                      className="delete-btn"
                      onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                    >
                      <BiTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="empty-row">No items found.</p>
            )}
          </div>
        )}

        {/* ── Pagination ── */}
        <div className="pagination">
          <button
            className="page-nav"
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
          >
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

          <button
            className="page-nav"
            onClick={() => goTo(page + 1)}
            disabled={page === TOTAL_PAGES}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inventory;