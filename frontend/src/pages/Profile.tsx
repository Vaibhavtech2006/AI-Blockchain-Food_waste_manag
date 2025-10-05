import { motion } from 'framer-motion';
import { useState } from 'react';
import { User, Mail, Phone, MapPin, Building, Shield, Bell, Moon, Sun, Key, Download, Upload, Settings, CheckCircle, AlertCircle, CreditCard as Edit3, Save, X } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAppContext } from '../App';

const Profile = () => {
  const { user, theme, setTheme } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    organization: user?.organization || '',
    phone: '+1 (555) 123-4567',
    address: '123 Business District, New York, NY 10001',
    description: 'Committed to reducing food waste and supporting local communities through sustainable practices.'
  });

  const [notifications, setNotifications] = useState({
    newDonations: true,
    pickupReminders: true,
    marketingEmails: false,
    weeklyReports: true,
    emergencyAlerts: true
  });

  const [apiKeys, setApiKeys] = useState([
    { name: 'Blockchain API', key: 'sk_live_...7a9b', status: 'active' },
    { name: 'Analytics API', key: 'pk_test_...3f2d', status: 'active' },
    { name: 'Notifications API', key: 'wh_sec_...8c1e', status: 'inactive' }
  ]);

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: user?.name || '',
      email: user?.email || '',
      organization: user?.organization || '',
      phone: '+1 (555) 123-4567',
      address: '123 Business District, New York, NY 10001',
      description: 'Committed to reducing food waste and supporting local communities through sustainable practices.'
    });
    setIsEditing(false);
  };

  const stats = [
    { label: 'Total Donations', value: '342', change: '+23 this month' },
    { label: 'Food Saved', value: '12.4K kg', change: '+1.2K this month' },
    { label: 'CO₂ Reduced', value: '28.6 tons', change: '+3.1 tons this month' },
    { label: 'Impact Score', value: '94%', change: '+2% this month' }
  ];

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
            Profile & Settings
          </h1>
          <p className="text-gray-400">
            Manage your account information and preferences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <Card variant="glass" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Basic Information</span>
                </h2>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit</span>
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleSave}
                      className="flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancel}
                      className="flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex items-start space-x-6 mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                  {user?.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-2xl font-bold text-white">{user?.name}</h3>
                    {user?.verified && (
                      <CheckCircle className="w-6 h-6 text-emerald-400" />
                    )}
                  </div>
                  <p className="text-emerald-400 font-medium capitalize mb-1">{user?.role}</p>
                  <p className="text-gray-400">Member since {user?.joinedAt.toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  ) : (
                    <p className="text-white">{editForm.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  ) : (
                    <p className="text-white">{editForm.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Organization
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.organization}
                      onChange={(e) => setEditForm({ ...editForm, organization: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  ) : (
                    <p className="text-white">{editForm.organization}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  ) : (
                    <p className="text-white">{editForm.phone}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Address
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.address}
                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                ) : (
                  <p className="text-white">{editForm.address}</p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                {isEditing ? (
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                ) : (
                  <p className="text-white">{editForm.description}</p>
                )}
              </div>
            </Card>

            {/* Notification Preferences */}
            <Card variant="glass" className="p-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2 mb-6">
                <Bell className="w-5 h-5" />
                <span>Notification Preferences</span>
              </h2>

              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {key === 'newDonations' && 'Get notified when new food donations become available'}
                        {key === 'pickupReminders' && 'Receive reminders about scheduled pickups'}
                        {key === 'marketingEmails' && 'Receive promotional content and feature updates'}
                        {key === 'weeklyReports' && 'Get weekly summary of your impact and activities'}
                        {key === 'emergencyAlerts' && 'Critical alerts for urgent food surplus situations'}
                      </p>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, [key]: !value })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-emerald-500' : 'bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            {/* API Management */}
            <Card variant="glass" className="p-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2 mb-6">
                <Key className="w-5 h-5" />
                <span>API Keys</span>
              </h2>

              <div className="space-y-4">
                {apiKeys.map((api, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">{api.name}</h4>
                      <code className="text-sm text-gray-400">{api.key}</code>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        api.status === 'active' 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {api.status}
                      </span>
                      <Button variant="outline" size="sm">
                        Regenerate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="primary" className="mt-4">
                Generate New API Key
              </Button>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Stats */}
            <Card variant="glass" className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">Your Impact</h3>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="border-b border-gray-700/50 pb-3 last:border-0">
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                    <div className="text-xs text-emerald-400">{stat.change}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Theme Toggle */}
            <Card variant="glass" className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">Appearance</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {theme === 'dark' ? <Moon className="w-5 h-5 text-gray-400" /> : <Sun className="w-5 h-5 text-gray-400" />}
                  <span className="text-white">
                    {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                  </span>
                </div>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    theme === 'dark' ? 'bg-emerald-500' : 'bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </Card>

            {/* Actions */}
            <Card variant="glass" className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">Data Management</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export Data</span>
                </Button>
                <Button variant="outline" className="w-full flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Import Data</span>
                </Button>
                <Button variant="outline" className="w-full flex items-center space-x-2 text-red-400 border-red-500/50 hover:bg-red-500/10">
                  <AlertCircle className="w-4 h-4" />
                  <span>Delete Account</span>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;