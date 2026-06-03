import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  AreaChart,
  Area,
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
  { x: 0, v: 10 },
  { x: 1, v: 30 },
  { x: 2, v: 18 },
  { x: 3, v: 45 },
  { x: 4, v: 28 },
  { x: 5, v: 55 },
  { x: 6, v: 40 },
];

const quarterlyData = [
  { quarter: 'QUARTER 1', sales: 45 },
  { quarter: 'QUARTER 2', sales: 70 },
  { quarter: 'QUARTER 3', sales: 80 },
  { quarter: 'QUARTER 4', sales: 55 },
];

const orderStatusDataProcess = [
  { name: 'Delivered / Picked-up', value: 10000, color: '#E8A838' },
  { name: 'In Process', value: 3982, color: '#3066BE' },
];

const orderStatusDataPayment = [
  { name: 'Paid', value: 10000, color: '#E8A838' },
  { name: 'Unpaid', value: 3982, color: '#3066BE' },
];

const lowStockItems = [
  { name: 'Product 1', qty: 2 },
  { name: 'Product 2', qty: 2 },
  { name: 'Product 3', qty: 2 },
  { name: 'Product 4', qty: 2 },
];

/* ── Stat Card ──────────────────────────────── */

const StatCard = ({
  icon,
  iconBg,
  label,
  value,
  gradId,
  areaColor,
}) => (
  <div className="stat-card">
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={areaColor} stopOpacity={0.5} />
          <stop offset="100%" stopColor={areaColor} stopOpacity={0.02} />
        </linearGradient>
      </defs>
    </svg>

    <div className="stat-top">
      <div className="stat-left">
        <div className="stat-icon" style={{ background: iconBg }}>
          {icon}
        </div>

        <div>
          <p className="stat-label">{label}</p>
          <h2 className="stat-value">{value}</h2>
        </div>
      </div>

      <button className="stat-period">Today ∨</button>
    </div>

    <div className="stat-chart">
      <ResponsiveContainer width="100%" height={65}>
        <AreaChart data={areaData}>
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

/* ── Legends ──────────────────────────────── */

const CustomLegend = ({ data }) => (
  <div className="pie-legend">
    {data.map((entry) => (
      <div key={entry.name} className="pie-legend-row">
        <span
          className="pie-dot"
          style={{ background: entry.color }}
        />
        <span className="pie-legend-name">{entry.name}</span>
        <span className="pie-legend-val">
          {entry.value.toLocaleString()}
        </span>
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

      {/* Stat Cards */}

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

      {/* Dashboard Grid */}

      <div className="bottom-grid">

        {/* Quarterly Sales */}

        <div className="chart-card quarterly">
          <div className="card-header">
            <h3 className="card-title">Quarterly Sales</h3>
            <button className="year-btn">{year} ∨</button>
          </div>

          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={quarterlyData} barSize={44}>
              <XAxis
                dataKey="quarter"
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip />

              <Bar
                dataKey="sales"
                radius={[6, 6, 0, 0]}
              >
                {quarterlyData.map((_, index) => (
                  <Cell
                    key={index}
                    fill="#3066BE"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performers */}

        <div className="chart-card top-performers">
          <div className="card-header">
            <p className="card-title">⭐ Top Performers</p>
            <button className="year-btn">
              This Month ▾
            </button>
          </div>

          <table className="performers-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Units Sold</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <span className="rank-badge rank-1">
                    1
                  </span>{' '}
                  Shimano MT520 Brake
                </td>

                <td style={{ color: '#6B7280' }}>
                  Brakes
                </td>

                <td>
                  <div className="sales-bar-wrap">
                    <div className="sales-bar-bg">
                      <div
                        className="sales-bar-fill"
                        style={{ width: '100%' }}
                      />
                    </div>

                    <span className="sales-count">
                      48
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Low Stock */}

        <div className="chart-card low-stock">
          <div className="card-header">
            <h3 className="card-title">
              Low Stock Items
            </h3>
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

                  <td>
                    <span className="qty-badge">
                      {item.qty}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Status */}

        <div className="chart-card order-status">
          <div className="card-header">
            <h3 className="card-title">
              Order Status
            </h3>
          </div>

          <div className="pie-wrapper">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={orderStatusDataProcess}
                  dataKey="value"
                  outerRadius={90}
                >
                  {orderStatusDataProcess.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.color}
                      />
                    )
                  )}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <CustomLegend
              data={orderStatusDataProcess}
            />
          </div>
        </div>

        {/* Payment Status */}

        <div className="chart-card order-status">
          <div className="card-header">
            <h3 className="card-title">
              Order Payment Status
            </h3>
          </div>

          <div className="pie-wrapper">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={orderStatusDataPayment}
                  dataKey="value"
                  outerRadius={90}
                >
                  {orderStatusDataPayment.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.color}
                      />
                    )
                  )}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <CustomLegend
              data={orderStatusDataPayment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;