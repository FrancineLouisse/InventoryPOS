import React, { useState } from 'react';
import { BiSearch, BiPlus } from 'react-icons/bi';
import './Employees.css';

const initialEmployees = [
  { id: 1, code: 'EMP-001', name: 'Sophia Marie Pizaña',    role: 'Secretary', blocked: false },
  { id: 2, code: 'EMP-002', name: 'Francine Louisse Miranda', role: 'Finance',   blocked: true  },
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

const Employees = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch]       = useState('');
  const [page, setPage]           = useState(1);
  const [selected, setSelected]   = useState(null); // id of highlighted row

  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.code.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase())
  );

  const goTo       = (p) => setPage(Math.min(TOTAL_PAGES, Math.max(1, p)));
  const pageWindow = getPageWindow(page, TOTAL_PAGES);

  const toggleBlock = (id) =>
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? { ...e, blocked: !e.blocked } : e))
    );

  return (
    <div className="employees">
      <h1 className="page-title">Employees</h1>

      {/* ── Toolbar ── */}
      <div className="emp-toolbar">
        <div className="search-box">
          <BiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search Employee"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="add-btn">
          <BiPlus /> Add Employee
        </button>
      </div>

      {/* ── Employee Card ── */}
      <div className="emp-card">

        <div className="emp-list">
          {filtered.map((emp) => (
            <div
              key={emp.id}
              className={`emp-row ${selected === emp.id ? 'selected' : ''}`}
              onClick={() => setSelected(emp.id === selected ? null : emp.id)}
            >
              <span className="emp-name">{emp.name}</span>
              <span className="emp-code">{emp.code}</span>
              <span className="emp-role">{emp.role}</span>

              <div className="emp-actions" onClick={(e) => e.stopPropagation()}>
                <button
                  className={`block-btn ${emp.blocked ? 'unblock' : ''}`}
                  onClick={() => toggleBlock(emp.id)}
                >
                  {emp.blocked ? 'UNBLOCK' : 'BLOCK'}
                </button>
                <button className="view-btn">VIEW</button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="empty-row">No employees found.</p>
          )}
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

export default Employees;