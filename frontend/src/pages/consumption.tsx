import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

interface ConsumptionInputs {
  predictedFood: number | '';
  numberOfPeople: number | '';
  eventTiming: string;
}

interface ConsumptionResult {
  consumedFood: number;
  leftoverFood: number;
}

const ConsumptionPrediction: React.FC = () => {
  const [inputs, setInputs] = useState<ConsumptionInputs>({
    predictedFood: '',
    numberOfPeople: '',
    eventTiming: ''
  });

  const [prediction, setPrediction] = useState<ConsumptionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: name === 'predictedFood' || name === 'numberOfPeople' ? Number(value) : value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);

    try {
      const response = await fetch('http://127.0.0.1:5001/api/predict_consumption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          predictedFood: inputs.predictedFood,
          numberOfPeople: inputs.numberOfPeople,
          eventTiming: inputs.eventTiming
        })
      });

      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();

      // Map backend response to frontend state
      setPrediction({
        consumedFood: data.actualConsumption,
        leftoverFood: data.leftFoodForNGO
      });
    } catch (err) {
      console.error(err);
      alert('Error fetching consumption prediction. Check server.');
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
          Food Consumption Prediction
        </h1>

        <Card variant="glass" className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-300">Predicted Food (kg)</label>
              <input
                type="number"
                name="predictedFood"
                value={inputs.predictedFood}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded-lg bg-gray-800 text-white"
                placeholder="e.g., 1200"
                required
              />
            </div>

            <div>
              <label className="text-gray-300">Number of People</label>
              <input
                type="number"
                name="numberOfPeople"
                value={inputs.numberOfPeople}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded-lg bg-gray-800 text-white"
                placeholder="e.g., 300"
                required
              />
            </div>

            <div>
              <label className="text-gray-300">Event Timing</label>
              <select
                name="eventTiming"
                value={inputs.eventTiming}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded-lg bg-gray-800 text-white"
                required
              >
                <option value="">Select</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg px-6 py-3 rounded-lg"
            >
              {loading ? 'Predicting...' : 'Predict Consumption'}
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
                    <td className="py-2 px-4">Predicted Consumed Food</td>
                    <td className="py-2 px-4 font-bold">{prediction.consumedFood}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">Predicted Leftover Food</td>
                    <td className="py-2 px-4 font-bold">{prediction.leftoverFood}</td>
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

export default ConsumptionPrediction;
