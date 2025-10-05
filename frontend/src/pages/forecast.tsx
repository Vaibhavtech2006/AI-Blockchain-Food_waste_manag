// import React, { useState, useEffect } from "react";
// import { ForecastData, Organization } from "@/entities/all";
// import { User } from "@/entities/User";
// import { InvokeLLM } from "@/integrations/Core";
// import { Button } from "@/components/ui/button";
// import { 
//   TrendingUp, 
//   Brain, 
//   AlertCircle,
//   CheckCircle2,
//   Sparkles,
//   Calendar,
//   Cloud,
//   Users as UsersIcon
// } from "lucide-react";
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
// import { format, addDays } from "date-fns";

// export default function Forecast() {
//   const [user, setUser] = useState(null);
//   const [userOrg, setUserOrg] = useState(null);
//   const [forecasts, setForecasts] = useState([]);
//   const [generating, setGenerating] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     setIsLoading(true);
//     const currentUser = await User.me();
//     setUser(currentUser);

//     const orgs = await Organization.list();
//     const myOrg = orgs.find(org => org.created_by === currentUser.email);
//     setUserOrg(myOrg);

//     if (myOrg) {
//       const forecastData = await ForecastData.filter({ organization_id: myOrg.id }, "-date");
//       setForecasts(forecastData);
//     }
//     setIsLoading(false);
//   };

//   const generateForecast = async () => {
//     if (!userOrg) {
//       alert("Please set up your organization profile first");
//       return;
//     }

//     setGenerating(true);
    
//     // Generate forecast for next 7 days using AI
//     const prompt = `Generate a 7-day food surplus forecast for a ${userOrg.type} with daily capacity of ${userOrg.capacity_daily}kg. 
//     Consider typical patterns for this type of establishment. Return predictions with confidence scores and recommendations.`;

//     try {
//       const result = await InvokeLLM({
//         prompt,
//         response_json_schema: {
//           type: "object",
//           properties: {
//             forecasts: {
//               type: "array",
//               items: {
//                 type: "object",
//                 properties: {
//                   day: { type: "number" },
//                   predicted_surplus: { type: "number" },
//                   predicted_demand: { type: "number" },
//                   confidence_score: { type: "number" },
//                   weather: { type: "string" },
//                   day_of_week: { type: "string" }
//                 }
//               }
//             },
//             recommendations: {
//               type: "array",
//               items: { type: "string" }
//             }
//           }
//         }
//       });

//       // Save forecasts to database
//       for (const f of result.forecasts) {
//         const date = format(addDays(new Date(), f.day), "yyyy-MM-dd");
//         await ForecastData.create({
//           organization_id: userOrg.id,
//           date,
//           predicted_surplus: f.predicted_surplus,
//           predicted_demand: f.predicted_demand,
//           confidence_score: f.confidence_score,
//           recommendations: result.recommendations,
//           historical_accuracy: 0.85,
//           factors: {
//             weather: f.weather,
//             day_of_week: f.day_of_week,
//             events: []
//           }
//         });
//       }

//       loadData();
//     } catch (error) {
//       console.error("Error generating forecast:", error);
//     }
//     setGenerating(false);
//   };

//   const chartData = forecasts.slice(0, 7).map(f => ({
//     date: format(new Date(f.date), "MMM d"),
//     surplus: f.predicted_surplus,
//     demand: f.predicted_demand,
//     confidence: f.confidence_score * 100
//   }));

//   const latestForecast = forecasts[0];
//   const avgConfidence = forecasts.length > 0 
//     ? forecasts.reduce((sum, f) => sum + f.confidence_score, 0) / forecasts.length 
//     : 0;

//   return (
//     <div className="min-h-screen bg-[#0a0a0a] p-6">
//       <div className="max-w-[1400px] mx-auto space-y-8">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//           <div>
//             <h1 className="text-4xl font-bold text-white mb-2">AI Forecast</h1>
//             <p className="text-zinc-400 text-lg">Predictive analytics for food surplus management</p>
//           </div>
//           <Button
//             onClick={generateForecast}
//             disabled={generating || !userOrg}
//             className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-bold"
//           >
//             {generating ? (
//               <>
//                 <Brain className="w-5 h-5 mr-2 animate-pulse" />
//                 Generating...
//               </>
//             ) : (
//               <>
//                 <Sparkles className="w-5 h-5 mr-2" />
//                 Generate 7-Day Forecast
//               </>
//             )}
//           </Button>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-500/30 rounded-2xl p-6">
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
//                 <Brain className="w-6 h-6 text-purple-400" />
//               </div>
//               <Sparkles className="w-5 h-5 text-purple-400" />
//             </div>
//             <h3 className="text-3xl font-bold text-white mb-1">
//               {(avgConfidence * 100).toFixed(0)}%
//             </h3>
//             <p className="text-zinc-400">Average Confidence</p>
//           </div>

//           <div className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 border border-emerald-500/30 rounded-2xl p-6">
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
//                 <TrendingUp className="w-6 h-6 text-emerald-400" />
//               </div>
//               <CheckCircle2 className="w-5 h-5 text-emerald-400" />
//             </div>
//             <h3 className="text-3xl font-bold text-white mb-1">
//               {latestForecast?.predicted_surplus?.toFixed(1) || '0'} kg
//             </h3>
//             <p className="text-zinc-400">Predicted Surplus Today</p>
//           </div>

//           <div className="bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 border border-cyan-500/30 rounded-2xl p-6">
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
//                 <UsersIcon className="w-6 h-6 text-cyan-400" />
//               </div>
//             </div>
//             <h3 className="text-3xl font-bold text-white mb-1">
//               {latestForecast?.predicted_demand?.toFixed(1) || '0'} kg
//             </h3>
//             <p className="text-zinc-400">Predicted Demand</p>
//           </div>
//         </div>

//         {/* Main Charts */}
//         <div className="grid lg:grid-cols-2 gap-6">
//           {/* Surplus Forecast Chart */}
//           <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6">
//             <h2 className="text-xl font-bold text-white mb-6">7-Day Surplus Forecast</h2>
//             {chartData.length > 0 ? (
//               <ResponsiveContainer width="100%" height={300}>
//                 <AreaChart data={chartData}>
//                   <defs>
//                     <linearGradient id="surplusGradient" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
//                       <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
//                   <XAxis dataKey="date" stroke="#71717a" />
//                   <YAxis stroke="#71717a" />
//                   <Tooltip 
//                     contentStyle={{ 
//                       backgroundColor: '#18181b', 
//                       border: '1px solid #27272a',
//                       borderRadius: '8px'
//                     }}
//                   />
//                   <Area 
//                     type="monotone" 
//                     dataKey="surplus" 
//                     stroke="#10b981" 
//                     fillOpacity={1}
//                     fill="url(#surplusGradient)"
//                     strokeWidth={2}
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="h-[300px] flex items-center justify-center text-zinc-500">
//                 No forecast data available
//               </div>
//             )}
//           </div>

//           {/* Confidence Score Chart */}
//           <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6">
//             <h2 className="text-xl font-bold text-white mb-6">Prediction Confidence</h2>
//             {chartData.length > 0 ? (
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
//                   <XAxis dataKey="date" stroke="#71717a" />
//                   <YAxis stroke="#71717a" />
//                   <Tooltip 
//                     contentStyle={{ 
//                       backgroundColor: '#18181b', 
//                       border: '1px solid #27272a',
//                       borderRadius: '8px'
//                     }}
//                   />
//                   <Bar dataKey="confidence" fill="#06b6d4" radius={[8, 8, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="h-[300px] flex items-center justify-center text-zinc-500">
//                 No forecast data available
//               </div>
//             )}
//           </div>
//         </div>

//         {/* AI Recommendations */}
//         {latestForecast?.recommendations && (
//           <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 border border-amber-500/30 rounded-2xl p-6">
//             <div className="flex items-start gap-4 mb-6">
//               <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
//                 <Brain className="w-6 h-6 text-amber-400" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-white mb-2">AI Recommendations</h2>
//                 <p className="text-zinc-400">Optimized strategies for waste reduction</p>
//               </div>
//             </div>
//             <div className="grid md:grid-cols-2 gap-4">
//               {latestForecast.recommendations.map((rec, index) => (
//                 <div 
//                   key={index}
//                   className="flex items-start gap-3 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50"
//                 >
//                   <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
//                   <p className="text-zinc-300 text-sm">{rec}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }