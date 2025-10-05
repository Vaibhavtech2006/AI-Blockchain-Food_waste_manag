import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  TrendingUp, 
  Brain, 
  Calendar,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const FoodForecast = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [category, setCategory] = useState('all');

  // initial data
  const initialForecastData = [
    { day: 'Mon', predicted: 120, actual: 115, confidence: 92, surplus: 15, demand: 100 },
    { day: 'Tue', predicted: 95, actual: 98, confidence: 88, surplus: 12, demand: 86 },
    { day: 'Wed', predicted: 140, actual: 135, confidence: 94, surplus: 20, demand: 120 },
    { day: 'Thu', predicted: 160, actual: null, confidence: 85, surplus: 25, demand: 135 },
    { day: 'Fri', predicted: 180, actual: null, confidence: 90, surplus: 30, demand: 150 },
    { day: 'Sat', predicted: 200, actual: null, confidence: 87, surplus: 35, demand: 165 },
    { day: 'Sun', predicted: 110, actual: null, confidence: 93, surplus: 18, demand: 92 },
  ];

  const [forecastData, setForecastData] = useState(initialForecastData);

  // regenerate logic
  const regenerateForecast = () => {
    const newData = forecastData.map((item) => ({
      ...item,
      predicted: Math.floor(Math.random() * 100) + 100, // random 100-200
      actual: Math.random() > 0.5 ? Math.floor(Math.random() * 100) + 90 : null, // sometimes null
      confidence: Math.floor(Math.random() * 20) + 80, // random 80-100
      surplus: Math.floor(Math.random() * 30) + 10,
      demand: Math.floor(Math.random() * 100) + 80
    }));
    setForecastData(newData);
  };

  const categoryBreakdown = [
    { name: 'Meals', current: 45, predicted: 52, growth: '+15%' },
    { name: 'Produce', current: 30, predicted: 25, growth: '-17%' },
    { name: 'Bakery', current: 25, predicted: 30, growth: '+20%' },
    { name: 'Dairy', current: 20, predicted: 18, growth: '-10%' },
  ];

  const aiInsights = [
    {
      type: 'opportunity',
      icon: TrendingUp,
      title: 'High Surplus Expected',
      message: 'Friday shows 30% higher surplus than usual. Consider reaching out to additional NGOs.',
      confidence: 90,
      color: 'emerald'
    },
    {
      type: 'warning',
      icon: AlertTriangle,
      title: 'Low Demand Forecast',
      message: 'Sunday demand is predicted to drop by 25%. Plan accordingly to avoid waste.',
      confidence: 85,
      color: 'yellow'
    },
    {
      type: 'success',
      icon: CheckCircle,
      title: 'Optimal Match Rate',
      message: 'Tuesday-Thursday shows perfect supply-demand balance. Great efficiency expected.',
      confidence: 95,
      color: 'blue'
    },
  ];

  const metrics = [
    { label: 'Forecast Accuracy', value: '91.5%', change: '+2.3%', icon: Brain, color: 'emerald' },
    { label: 'Predicted Surplus', value: '155 kg', change: '+8%', icon: TrendingUp, color: 'blue' },
    { label: 'Match Rate', value: '87%', change: '+5%', icon: Zap, color: 'purple' },
    { label: 'Confidence Level', value: '89%', change: '+1%', icon: CheckCircle, color: 'orange' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">AI Food Forecast</h1>
              <p className="text-gray-400">Predictive analytics for optimal food waste reduction</p>
            </div>
          </div>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.label} variant="glass" className="p-6"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${metric.color}-500/20 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${metric.color}-400`} />
                  </div>
                  <span className="text-sm font-medium text-emerald-400">{metric.change}</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-sm text-gray-400">{metric.label}</div>
              </Card>
            );
          })}
        </div>

        {/* Controls */}
        <Card variant="glass" className="p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-gray-400" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Categories</option>
                  <option value="meals">Prepared Meals</option>
                  <option value="produce">Fresh Produce</option>
                  <option value="bakery">Bakery Items</option>
                  <option value="dairy">Dairy Products</option>
                </select>
              </div>
            </div>
            <Button variant="primary" size="sm" onClick={regenerateForecast}>
              Regenerate Forecast
            </Button>
          </div>
        </Card>

        {/* Main Forecast Chart */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <Card variant="glass" className="lg:col-span-2 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Food Surplus Prediction vs Reality</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Line type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={3}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }} name="Predicted" />
                  <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }} name="Actual" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card variant="glass" className="p-6">
            <h3 className="text-xl font-bold text-white mb-6">Confidence Levels</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" domain={[0, 100]} />
                  <Bar dataKey="confidence" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FoodForecast;
