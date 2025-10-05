import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  ExternalLink,
  Calendar,
  MapPin,
  Package,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
  Shield
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const DonationLog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');

  const donations = [
    {
      id: 'D001',
      date: '2024-01-15',
      supplier: 'Green Valley Restaurant',
      ngo: 'City Food Bank',
      items: [
        { name: 'Fresh Vegetables', quantity: 25, unit: 'kg' },
        { name: 'Prepared Salads', quantity: 15, unit: 'portions' }
      ],
      status: 'completed',
      value: 450,
      impact: {
        mealsProvided: 50,
        co2Saved: 12.5,
        costSaved: 180
      },
      blockchainHash: '0x4a2f8c...',
      pickupTime: '14:30',
      location: 'Downtown District'
    },
    {
      id: 'D002',
      date: '2024-01-14',
      supplier: 'Metro Hotel',
      ngo: 'Hope Community Center',
      items: [
        { name: 'Buffet Items', quantity: 40, unit: 'portions' },
        { name: 'Fresh Fruits', quantity: 8, unit: 'kg' }
      ],
      status: 'in-transit',
      value: 680,
      impact: {
        mealsProvided: 65,
        co2Saved: 18.2,
        costSaved: 220
      },
      blockchainHash: '0x7b5e9a...',
      pickupTime: '16:00',
      location: 'Business District'
    },
    {
      id: 'D003',
      date: '2024-01-13',
      supplier: 'Campus Cafeteria',
      ngo: 'Students Food Aid',
      items: [
        { name: 'Bakery Items', quantity: 20, unit: 'kg' },
        { name: 'Dairy Products', quantity: 12, unit: 'liters' }
      ],
      status: 'scheduled',
      value: 320,
      impact: {
        mealsProvided: 75,
        co2Saved: 9.8,
        costSaved: 150
      },
      blockchainHash: '0x1c8f3d...',
      pickupTime: '18:30',
      location: 'University Area'
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return { 
          icon: CheckCircle, 
          color: 'text-emerald-400', 
          bg: 'bg-emerald-500/20',
          label: 'Completed'
        };
      case 'in-transit':
        return { 
          icon: Clock, 
          color: 'text-blue-400', 
          bg: 'bg-blue-500/20',
          label: 'In Transit'
        };
      case 'scheduled':
        return { 
          icon: AlertTriangle, 
          color: 'text-yellow-400', 
          bg: 'bg-yellow-500/20',
          label: 'Scheduled'
        };
      default:
        return { 
          icon: Clock, 
          color: 'text-gray-400', 
          bg: 'bg-gray-500/20',
          label: 'Unknown'
        };
    }
  };

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.ngo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || donation.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Donation Log
          </h1>
          <p className="text-gray-400">
            Track and verify all food donations with blockchain transparency.
          </p>
        </motion.div>

        {/* Filters */}
        <Card variant="glass" className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search donations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in-transit">In Transit</option>
              <option value="scheduled">Scheduled</option>
            </select>

            {/* Date Filter */}
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>

            {/* Export Button */}
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
          </div>
        </Card>

        {/* Donations List */}
        <div className="space-y-6">
          {filteredDonations.map((donation, index) => {
            const statusConfig = getStatusConfig(donation.status);
            const StatusIcon = statusConfig.icon;
            
            return (
              <Card
                key={donation.id}
                variant="glass"
                className="p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {donation.id}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{donation.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{donation.pickupTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{donation.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${statusConfig.bg}`}>
                        <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                        <span className={`text-sm font-medium ${statusConfig.color}`}>
                          {statusConfig.label}
                        </span>
                      </div>
                    </div>

                    {/* Parties */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-800/30 rounded-lg p-3">
                        <div className="text-xs text-gray-400 mb-1">Supplier</div>
                        <div className="text-white font-medium">{donation.supplier}</div>
                      </div>
                      <div className="bg-gray-800/30 rounded-lg p-3">
                        <div className="text-xs text-gray-400 mb-1">NGO Partner</div>
                        <div className="text-white font-medium">{donation.ngo}</div>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Donated Items</h4>
                      <div className="space-y-1">
                        {donation.items.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm">
                            <Package className="w-4 h-4 text-emerald-400" />
                            <span className="text-white">{item.name}</span>
                            <span className="text-gray-400">
                              - {item.quantity} {item.unit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Blockchain */}
                    <div className="flex items-center space-x-2 text-xs text-gray-400 bg-gray-800/30 rounded-lg p-2">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      <span>Blockchain Hash:</span>
                      <code className="text-emerald-400">{donation.blockchainHash}</code>
                      <button className="text-emerald-400 hover:text-emerald-300 transition-colors">
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Impact Metrics */}
                  <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg p-4 border border-emerald-500/20">
                    <h4 className="text-lg font-bold text-white mb-4">Impact Metrics</h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Meals Provided</span>
                        <span className="text-emerald-400 font-bold">
                          {donation.impact.mealsProvided}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">CO₂ Saved</span>
                        <span className="text-blue-400 font-bold">
                          {donation.impact.co2Saved} kg
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Cost Saved</span>
                        <span className="text-yellow-400 font-bold">
                          ${donation.impact.costSaved}
                        </span>
                      </div>
                      
                      <div className="border-t border-gray-700 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 font-medium">Total Value</span>
                          <span className="text-white font-bold text-lg">
                            ${donation.value}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredDonations.length === 0 && (
          <Card variant="glass" className="p-12 text-center">
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">No donations found</h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or filters.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DonationLog;