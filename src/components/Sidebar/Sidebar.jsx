import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BiSolidDashboard,
  BiSolidCoinStack,
  BiCartDownload,
  BiDollarCircle,
  BiSolidUser,
  BiLogOut
} from "react-icons/bi";
import { FaHouseUser } from "react-icons/fa";

import './Sidebar.css';

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: <BiSolidDashboard className="sidebar-icon" /> },
  { name: 'Inventory',  path: '/inventory', icon: <BiSolidCoinStack  className="sidebar-icon" /> },
  { name: 'Purchase',   path: '/purchase',  icon: <BiCartDownload    className="sidebar-icon" /> },
  { name: 'Sales',      path: '/sales',     icon: <BiDollarCircle    className="sidebar-icon" /> },
  { name: 'Customers',  path: '/customers', icon: <BiSolidUser       className="sidebar-icon" /> },
  { name: 'Employees',  path: '/employees', icon: <FaHouseUser       className="sidebar-icon" /> },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sidebar-container ${collapsed ? 'collapsed' : ''}`}>

      {/* ── Logo / Header ─────────────────────────────── */}
      <div className="logo">
        {!collapsed && (
          <div className="logo-text">
            <h1 className="logo-title">ANILAO</h1>
            <p className="logo-sub">BIKESHOP</p>
          </div>
        )}
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      <hr className="sidebar-divider" />

      {/* ── Navigation ────────────────────────────────── */}
      <nav className="menu-items">
        {menuItems.map(({ name, path, icon }) => (
          <NavLink
            key={name}
            to={path}
            title={collapsed ? name : undefined}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? 'active' : ''}`
            }
          >
            {icon}
            {!collapsed && <span className="item-label">{name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* ── User Footer ───────────────────────────────── */}
      <div className="sidebar-user">
        <div className="user-info">
          <div className="avatar">
            <BiSolidUser className="avatar-icon" />
          </div>
          {!collapsed && (
            <div className="user-text">
              <p className="user-name">Juan Dela Cruz</p>
              <span className="user-role">Admin</span>
            </div>
          )}
        </div>
        {!collapsed && (
          <button className="logout-btn" aria-label="Log out">
            <BiLogOut className="logout-icon" />
          </button>
        )}
      </div>

    </div>
  );
};

export default Sidebar;