import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie,
  AreaChart, Area,
} from 'recharts';
import {
  BiSolidCoinStack,
  BiDollarCircle,
  BiCart,
  BiSolidUser,
} from 'react-icons/bi';
import './Dashboard.css';

/* ── Mock Data ──────────────────────────────── */
const areaData = [
  { x: 0, v: 10 }, { x: 1, v: 30 }, { x: 2, v: 18 }, { x: 3, v: 45 },
  { x: 4, v: 28 }, { x: 5, v: 55 }, { x: 6, v: 40 },
];

const quarterlyData = [
  { quarter: 'QUARTER 1', sales: 45 },
  { quarter: 'QUARTER 2', sales: 70 },
  { quarter: 'QUARTER 3', sales: 80 },
  { quarter: 'QUARTER 4', sales: 55 },
];

const orderStatusData = [
  { name: 'Delivered / Picked-up', value: 10000, color: '#E8A838' },
  { name: 'In Process',            value: 3982,  color: '#3066BE' },
  { name: 'Paid',                  value: 1467,  color: '#8BADD6' },
  { name: 'Unpaid',                value: 1467,  color: '#6B7280' },
];

const lowStockItems = [
  { name: 'Product 1', qty: 2 },
  { name: 'Product 2', qty: 2 },
  { name: 'Product 3', qty: 2 },
  { name: 'Product 4', qty: 2 },
];

/* ── Stat Card ──────────────────────────────── */
// gradId must be a short string with NO spaces — SVG id attribute can't have spaces
const StatCard = ({ icon, iconBg, label, value, gradId, areaColor }) => (
  <div className="stat-card">
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={areaColor} stopOpacity={0.5} />
          <stop offset="100%" stopColor={areaColor} stopOpacity={0.02} />
        </linearGradient>
      </defs>
    </svg>

    <div className="stat-top">
      <div className="stat-left">
        <div className="stat-icon" style={{ background: iconBg }}>{icon}</div>
        <div>
          <p className="stat-label">{label}</p>
          <h2 className="stat-value">{value}</h2>
        </div>
      </div>
      <button className="stat-period">Today ∨</button>
    </div>

    <div className="stat-chart">
      <ResponsiveContainer width="100%" height={65}>
        <AreaChart data={areaData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <Area
            type="monotone"
            dataKey="v"
            stroke={areaColor}
            strokeWidth={2.5}
            fill={`url(#${gradId})`}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

/* ── Custom Pie Legend ──────────────────────── */
const CustomLegend = () => (
  <div className="pie-legend">
    {orderStatusData.map((entry) => (
      <div key={entry.name} className="pie-legend-row">
        <span className="pie-dot" style={{ background: entry.color }} />
        <span className="pie-legend-name">{entry.name}</span>
        <span className="pie-legend-val">{entry.value.toLocaleString()}</span>
      </div>
    ))}
  </div>
);

/* ── Dashboard ──────────────────────────────── */
const Dashboard = () => {
  const [year] = useState(2026);

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>

      {/* ── Stat Cards ── */}
      <div className="stats-grid">
        <StatCard
          gradId="grad-sold"
          icon={<BiSolidCoinStack />}
          iconBg="#3066BE"
          label="ITEMS SOLD"
          value="102"
          areaColor="#3066BE"
        />
        <StatCard
          gradId="grad-revenue"
          icon={<BiDollarCircle />}
          iconBg="#E8A838"
          label="TOTAL REVENUE"
          value="2,098"
          areaColor="#E8A838"
        />
        <StatCard
          gradId="grad-orders"
          icon={<BiCart />}
          iconBg="#6B7280"
          label="TOTAL ORDERS"
          value="23"
          areaColor="#6B7280"
        />
        <StatCard
          gradId="grad-customers"
          icon={<BiSolidUser />}
          iconBg="#3B82F6"
          label="CUSTOMERS"
          value="76"
          areaColor="#3B82F6"
        />
      </div>

      {/* ── Bottom Grid ── */}
      <div className="bottom-grid">

        {/* Quarterly Sales — 1 bar per quarter */}
        <div className="chart-card quarterly">
          <div className="card-header">
            <h3 className="card-title">Quarterly Sales</h3>
            <button className="year-btn">{year} ∨</button>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={quarterlyData}
              barSize={44}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <XAxis
                dataKey="quarter"
                tick={{ fontSize: 9, fill: '#9CA3AF', fontFamily: 'Barlow, sans-serif' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: 'rgba(48,102,190,0.06)' }}
                contentStyle={{ borderRadius: 8, border: 'none', fontSize: 12 }}
              />
              <Bar dataKey="sales" radius={[6, 6, 0, 0]} name="Sales">
                {quarterlyData.map((_, i) => (
                  <Cell key={i} fill="#3066BE" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status */}
        <div className="chart-card order-status">
          <div className="card-header">
            <h3 className="card-title">Order Status</h3>
          </div>
          <div className="pie-wrapper">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  stroke="none"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <CustomLegend />
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="chart-card low-stock">
          <div className="card-header">
            <h3 className="card-title">Low Stock Items</h3>
            <span className="alert-icon">⚠</span>
          </div>
          <table className="stock-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>QTY</th>
              </tr>
            </thead>
            <tbody>
              {lowStockItems.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td><span className="qty-badge">{item.qty}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;