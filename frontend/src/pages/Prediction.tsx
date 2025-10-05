import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

interface PredictionInputs {
  dayOfWeek: string;
  pastConsumption: number | '';
  weather: string;
  eventType: string;
}

interface PredictionResult {
  demandedFood: number;
  leftFoodForNGO: number;
}

const Prediction: React.FC = () => {
  const [inputs, setInputs] = useState<PredictionInputs>({
    dayOfWeek: '',
    pastConsumption: '',
    weather: '',
    eventType: ''
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: name === 'pastConsumption' ? Number(value) : value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null); // Clear old prediction

    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs)
      });

      if (!response.ok) throw new Error('Failed to fetch');

      const data: PredictionResult = await response.json();
      setPrediction(data);
    } catch (err) {
      console.error(err);
      alert('Error fetching prediction. Check server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
          Food Demand Prediction
        </h1>

        <Card variant="glass" className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-300">Day of the Week</label>
              <input
                type="text"
                name="dayOfWeek"
                value={inputs.dayOfWeek}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded-lg bg-gray-800 text-white"
                placeholder="e.g., Monday"
                required
              />
            </div>

            <div>
              <label className="text-gray-300">Past Consumption (kg)</label>
              <input
                type="number"
                name="pastConsumption"
                value={inputs.pastConsumption}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded-lg bg-gray-800 text-white"
                placeholder="e.g., 120"
                required
              />
            </div>

            <div>
              <label className="text-gray-300">Weather</label>
              <input
                type="text"
                name="weather"
                value={inputs.weather}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded-lg bg-gray-800 text-white"
                placeholder="e.g., Rainy"
                required
              />
            </div>

            <div>
              <label className="text-gray-300">Event Type</label>
              <input
                type="text"
                name="eventType"
                value={inputs.eventType}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded-lg bg-gray-800 text-white"
                placeholder="e.g., Wedding"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-6 py-3 rounded-lg"
            >
              {loading ? 'Predicting...' : 'Predict'}
            </Button>
          </form>

          {prediction && (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full bg-gray-800 text-white rounded-lg">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-2 px-4 text-left">Prediction Type</th>
                    <th className="py-2 px-4 text-left">Value (kg)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-4">Predicted Food Demand</td>
                    <td className="py-2 px-4 font-bold">{prediction.demandedFood}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">Predicted Left Food for NGO</td>
                    <td className="py-2 px-4 font-bold">{prediction.leftFoodForNGO}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default Prediction;
