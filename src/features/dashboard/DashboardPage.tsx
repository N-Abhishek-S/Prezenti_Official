import { motion } from 'framer-motion';
import { KpiCard } from '../../components/ui/Card';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

import {
  Building2, Ticket, Users, BarChart3,
  Plus, ArrowUpRight, Clock
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from 'recharts';

const ticketTrend = [
  { month: 'Jul', resolved: 142, opened: 156 },
  { month: 'Aug', resolved: 168, opened: 149 },
  { month: 'Sep', resolved: 155, opened: 138 },
  { month: 'Oct', resolved: 189, opened: 162 },
  { month: 'Nov', resolved: 176, opened: 151 },
  { month: 'Dec', resolved: 198, opened: 143 },
  { month: 'Jan', resolved: 215, opened: 137 },
];

const attendanceData = [
  { branch: 'HQ', present: 94, absent: 6 },
  { branch: 'Tech Park', present: 91, absent: 9 },
  { branch: 'Medical', present: 96, absent: 4 },
  { branch: 'Warehouse', present: 88, absent: 12 },
  { branch: 'Campus', present: 93, absent: 7 },
];

const recentTickets = [
  { id: 'TKT-4281', title: 'AC not working - Floor 3', branch: 'HQ Tower A', status: 'open', priority: 'high', time: '2h ago' },
  { id: 'TKT-4280', title: 'Restroom deep clean required', branch: 'Tech Park B2', status: 'in-progress', priority: 'medium', time: '3h ago' },
  { id: 'TKT-4279', title: 'Security camera offline', branch: 'Warehouse', status: 'escalated', priority: 'critical', time: '4h ago' },
  { id: 'TKT-4278', title: 'Pest control scheduled visit', branch: 'Campus Main', status: 'resolved', priority: 'low', time: '5h ago' },
  { id: 'TKT-4277', title: 'Elevator maintenance due', branch: 'HQ Tower B', status: 'open', priority: 'medium', time: '6h ago' },
];

const statusConfig: Record<string, { variant: 'success' | 'warning' | 'critical' | 'info'; label: string }> = {
  'open': { variant: 'info', label: 'Open' },
  'in-progress': { variant: 'warning', label: 'In Progress' },
  'resolved': { variant: 'success', label: 'Resolved' },
  'escalated': { variant: 'critical', label: 'Escalated' },
};

const priorityConfig: Record<string, { variant: 'success' | 'warning' | 'critical' | 'info' }> = {
  'low': { variant: 'success' },
  'medium': { variant: 'warning' },
  'high': { variant: 'critical' },
  'critical': { variant: 'critical' },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function DashboardPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
      {/* Page Header */}
      <motion.div variants={fadeUp} className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-neutral-500 mt-1">Welcome back, Rajesh. Here's your operations overview.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Clock size={14} /> Last 30 days
          </Button>
          <Button variant="primary" size="sm">
            <Plus size={14} /> New Ticket
          </Button>
        </div>
      </motion.div>

      {/* KPI Row */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <KpiCard
          label="Active Sites"
          value="247"
          change={12}
          changeLabel="this quarter"
          trend="up"
          icon={<Building2 size={20} />}
          iconBg="bg-primary-50 text-primary-800"
        />
        <KpiCard
          label="Open Tickets"
          value="38"
          change={8}
          changeLabel="vs last week"
          trend="down"
          icon={<Ticket size={20} />}
          iconBg="bg-warning-50 text-warning-600"
        />
        <KpiCard
          label="Attendance Rate"
          value="94.2%"
          change={2.1}
          changeLabel="improvement"
          trend="up"
          icon={<Users size={20} />}
          iconBg="bg-teal-50 text-teal-700"
        />
        <KpiCard
          label="SLA Score"
          value="98.4%"
          change={1.8}
          changeLabel="above target"
          trend="up"
          icon={<BarChart3 size={20} />}
          iconBg="bg-success-50 text-success-600"
        />
      </motion.div>

      {/* Charts Row */}
      <motion.div variants={fadeUp} className="grid lg:grid-cols-2 gap-5 mb-6">
        {/* Ticket Trend */}
        <Card>
          <CardHeader>
            <h3 className="text-base font-semibold">Ticket Resolution Trend</h3>
            <Badge variant="success" dot>Improving</Badge>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={ticketTrend}>
                <defs>
                  <linearGradient id="gradResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2E864C" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#2E864C" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradOpened" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#20B2AA" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#20B2AA" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: 8,
                    fontSize: 13,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  }}
                />
                <Area type="monotone" dataKey="resolved" stroke="#2E864C" strokeWidth={2} fill="url(#gradResolved)" />
                <Area type="monotone" dataKey="opened" stroke="#20B2AA" strokeWidth={2} fill="url(#gradOpened)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Attendance by Branch */}
        <Card>
          <CardHeader>
            <h3 className="text-base font-semibold">Attendance by Branch</h3>
            <Badge variant="info" dot>Today</Badge>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={attendanceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="branch" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} width={80} />
                <Tooltip
                  contentStyle={{
                    background: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: 8,
                    fontSize: 13,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  }}
                />
                <Bar dataKey="present" fill="#2E864C" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </motion.div>

      {/* Recent Tickets Table */}
      <motion.div variants={fadeUp}>
        <Card>
          <CardHeader>
            <h3 className="text-base font-semibold">Recent Tickets</h3>
            <Button variant="ghost" size="sm">
              View All <ArrowUpRight size={14} />
            </Button>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50">
                  <th className="sticky top-0 px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">ID</th>
                  <th className="sticky top-0 px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">Issue</th>
                  <th className="sticky top-0 px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">Branch</th>
                  <th className="sticky top-0 px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">Status</th>
                  <th className="sticky top-0 px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">Priority</th>
                  <th className="sticky top-0 px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentTickets.map(ticket => (
                  <tr key={ticket.id} className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors cursor-pointer">
                    <td className="px-4 py-3 font-medium text-primary-800">{ticket.id}</td>
                    <td className="px-4 py-3 text-neutral-900">{ticket.title}</td>
                    <td className="px-4 py-3 text-neutral-500">{ticket.branch}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusConfig[ticket.status].variant} dot>
                        {statusConfig[ticket.status].label}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={priorityConfig[ticket.priority].variant}>
                        {ticket.priority}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-neutral-400">{ticket.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
