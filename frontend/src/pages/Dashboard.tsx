import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Package, 
  Clock,
  AlertCircle,
  CheckCircle,
  Eye
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Dashboard: React.FC = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  // ✅ State for form
  const [showForm, setShowForm] = useState(false);
  const [newDonation, setNewDonation] = useState({
    ngo: '',
    items: '',
    status: '',
    time: '',
    impact: ''
  });
  const [recentDonations, setRecentDonations] = useState([
    { id: '1', ngo: 'City Food Bank', items: 'Fresh Vegetables (25kg)', status: 'Completed', time: '2 hours ago', impact: '50 meals provided' },
    { id: '2', ngo: 'Community Kitchen', items: 'Prepared Meals (40 portions)', status: 'In Transit', time: '4 hours ago', impact: '40 meals provided' },
    { id: '3', ngo: 'Hope Center', items: 'Bakery Items (15kg)', status: 'Scheduled', time: '6 hours ago', impact: '75 meals provided' },
  ]);

  const wasteData = [
    { month: 'Jan', saved: 240, wasted: 120 },
    { month: 'Feb', saved: 280, wasted: 100 },
    { month: 'Mar', saved: 320, wasted: 80 },
    { month: 'Apr', saved: 380, wasted: 70 },
    { month: 'May', saved: 420, wasted: 60 },
    { month: 'Jun', saved: 460, wasted: 50 },
  ];

  const categoryData = [
    { name: 'Meals', value: 45, color: '#10b981' },
    { name: 'Produce', value: 25, color: '#0ea5e9' },
    { name: 'Bakery', value: 20, color: '#8b5cf6' },
    { name: 'Dairy', value: 10, color: '#f59e0b' },
  ];

  const quickStats = [
    { label: 'Total Saved Today', value: '1,234', unit: 'kg', change: '+12%', trend: 'up', icon: TrendingUp, color: 'emerald' },
    { label: 'Active Donations', value: '23', unit: 'items', change: '+5%', trend: 'up', icon: Package, color: 'blue' },
    { label: 'Partner NGOs', value: '47', unit: 'connected', change: '+8%', trend: 'up', icon: Users, color: 'purple' },
    { label: 'Waste Reduced', value: '89%', unit: 'efficiency', change: '+3%', trend: 'up', icon: TrendingDown, color: 'orange' },
  ];

  // ✅ Add donation function
  const handleAddDonation = () => {
    if (!newDonation.ngo || !newDonation.items || !newDonation.status) {
      alert("Please fill all required fields");
      return;
    }

    const donation = {
      id: Date.now().toString(),
      ...newDonation
    };

    setRecentDonations([donation, ...recentDonations]);
    setNewDonation({ ngo: '', items: '', status: '', time: '', impact: '' });
    setShowForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'text-emerald-400';
      case 'in transit': return 'text-blue-400';
      case 'scheduled': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return CheckCircle;
      case 'in transit': return Clock;
      case 'scheduled': return AlertCircle;
      default: return Eye;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-400 mb-4">
            Here's what's happening with your food waste reduction efforts today.
          </p>

          {/* Buttons */}
          <motion.div>
            <Button
              variant="solid"
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-6 py-3 rounded-lg"
              onClick={() => navigate('/prediction')}
            >
              Demand Prediction
            </Button>

            <Button
              variant="solid"
              className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-6 py-3 rounded-lg ml-4"
              onClick={() => navigate('/consumption')}
            >
              Consumption Prediction
            </Button>
          </motion.div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.label}
                variant="glass"
                className="p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${stat.color}-500/20 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-400`} />
                  </div>
                  <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.unit}</div>
                <div className="text-xs text-gray-500 mt-2">{stat.label}</div>
              </Card>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Food Waste Reduction Trend */}
          <Card variant="glass" className="p-6">
            <h3 className="text-xl font-bold text-white mb-6">Food Waste Reduction Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={wasteData}>
                  <defs>
                    <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorWasted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Area type="monotone" dataKey="saved" stroke="#10b981" fillOpacity={1} fill="url(#colorSaved)" />
                  <Area type="monotone" dataKey="wasted" stroke="#ef4444" fillOpacity={1} fill="url(#colorWasted)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Donation Categories */}
          <Card variant="glass" className="p-6">
            <h3 className="text-xl font-bold text-white mb-6">Donation Categories</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Recent Donations */}
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Recent Donations</h3>
            <div className="space-x-3">
              <Button variant="outline" size="sm">
                View All
              </Button>
              <Button
                variant="solid"
                size="sm"
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
                onClick={() => setShowForm(true)}
              >
                + Add Donation
              </Button>
            </div>
          </div>

          {/* Donation Form Modal */}
          {showForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold text-white mb-4">Add New Donation</h2>

                <input
                  type="text"
                  placeholder="NGO Name"
                  value={newDonation.ngo}
                  onChange={(e) => setNewDonation({ ...newDonation, ngo: e.target.value })}
                  className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
                />
                <input
                  type="text"
                  placeholder="Items (e.g. Rice 20kg)"
                  value={newDonation.items}
                  onChange={(e) => setNewDonation({ ...newDonation, items: e.target.value })}
                  className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
                />
                <input
                  type="text"
                  placeholder="Status (Completed/In Transit/Scheduled)"
                  value={newDonation.status}
                  onChange={(e) => setNewDonation({ ...newDonation, status: e.target.value })}
                  className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
                />
                <input
                  type="text"
                  placeholder="Time (e.g. 2 hours ago)"
                  value={newDonation.time}
                  onChange={(e) => setNewDonation({ ...newDonation, time: e.target.value })}
                  className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
                />
                <input
                  type="text"
                  placeholder="Impact (e.g. 50 meals provided)"
                  value={newDonation.impact}
                  onChange={(e) => setNewDonation({ ...newDonation, impact: e.target.value })}
                  className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
                />

                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-emerald-500 hover:bg-emerald-600 text-white" onClick={handleAddDonation}>
                    Save Donation
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Recent Donations List */}
          <div className="space-y-4">
            {recentDonations.map((donation, index) => {
              const StatusIcon = getStatusIcon(donation.status);
              return (
                <motion.div
                  key={donation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/50"
                >
                  <div className="flex items-center space-x-4">
                    <StatusIcon className={`w-5 h-5 ${getStatusColor(donation.status)}`} />
                    <div>
                      <h4 className="font-medium text-white">{donation.ngo}</h4>
                      <p className="text-sm text-gray-400">{donation.items}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${getStatusColor(donation.status)}`}>{donation.status}</p>
                    <p className="text-xs text-gray-500">{donation.time}</p>
                  </div>
                  <div className="text-right hidden md:block">
                    <p className="text-sm text-emerald-400 font-medium">{donation.impact}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
