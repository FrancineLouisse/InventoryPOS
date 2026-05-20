import React, { useState } from 'react';
import { BiSearch, BiPlus } from 'react-icons/bi';
import './Customer.css';

const initialCustomers = [
  { id: 1, code: 'C-0000001', name: 'John Smith',    address: 'Malolos, Bulacan'  },
  { id: 2, code: 'C-0000001', name: 'Juan Dela Cruz', address: 'Hagonoy, Bulacan' },
];

const TOTAL_PAGES = 68;
const VISIBLE     = 5;

const getPageWindow = (current, total) => {
  let start = current - Math.floor(VISIBLE / 2);
  start = Math.max(1, start);
  start = Math.min(start, total - VISIBLE + 1);
  start = Math.max(1, start);
  return Array.from({ length: Math.min(VISIBLE, total) }, (_, i) => start + i);
};

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch]       = useState('');
  const [page, setPage]           = useState(1);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.address.toLowerCase().includes(search.toLowerCase())
  );

  const goTo       = (p) => setPage(Math.min(TOTAL_PAGES, Math.max(1, p)));
  const pageWindow = getPageWindow(page, TOTAL_PAGES);

  return (
    <div className="customers">
      <h1 className="page-title">Customer</h1>

      {/* ── Toolbar ── */}
      <div className="cust-toolbar">
        <div className="search-box">
          <BiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search Customer"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="add-btn">
          <BiPlus /> Add Customer
        </button>
      </div>

      {/* ── Customer Card ── */}
      <div className="cust-card">
        <div className="table-wrapper">
          <table className="cust-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Customer Name</th>
                <th>Address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="table-row-clickable">
                  <td>{c.code}</td>
                  <td>{c.name}</td>
                  <td>{c.address}</td>
                  <td>
                    <button
                      className="view-orders-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Orders
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="empty-row">No customers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

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

export default Customers;