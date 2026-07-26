
// import React, { useState, useEffect } from "react";
// import recommendationService from "../../services/recommendation.service";

// /* ========================= TYPES ========================= */

// interface Recommendation {
//   crop: string;
//   success_rate: number;
//   expected_yield_tons: number;
//   price_per_kg: number;
//   revenue: number;
//   expenses: number;
//   farmer_profit: number;
//   profit_status: "Profit" | "Loss";
//   risk: string;
// }

// /* ========================= COMPONENT ========================= */

// const CropRecommendation = () => {
//   const [landArea, setLandArea] = useState("");
//   const [ph, setPh] = useState("");
//   const [nitrogen, setNitrogen] = useState("");
//   const [phosphorus, setPhosphorus] = useState("");
//   const [potassium, setPotassium] = useState("");

//   const [latitude, setLatitude] = useState<number | null>(null);
//   const [longitude, setLongitude] = useState<number | null>(null);

//   const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showResults, setShowResults] = useState(false);

//   /* ========================= LOCATION ========================= */

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setLatitude(pos.coords.latitude);
//         setLongitude(pos.coords.longitude);
//       },
//       () => {
//         console.log("Location permission denied");
//       }
//     );
//   }, []);

//   /* ========================= API CALL ========================= */

//   const handleGenerate = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const response = await recommendationService.getRecommendations({
//         nitrogen: Number(nitrogen),
//         phosphorus: Number(phosphorus),
//         potassium: Number(potassium),
//         ph: Number(ph),
//         land_area: Number(landArea),
//         workman_cost: 10000,
//         latitude: latitude || undefined,
//         longitude: longitude || undefined,
//       });

//       setRecommendations(response.data.recommendations);
//       setShowResults(true);
//     } catch (err: any) {
//       console.error(err);
//       setError(err.response?.data?.detail || "Backend error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBack = () => {
//     setShowResults(false);
//   };

//   /* ========================= INPUT PAGE ========================= */

//   if (!showResults) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
//         <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 border space-y-4">
//           <h2 className="text-2xl font-bold text-center">
//             🌱 Crop Recommendation
//           </h2>

//           <input
//             type="number"
//             placeholder="Land Area (Acres)"
//             value={landArea}
//             onChange={(e) => setLandArea(e.target.value)}
//             className="w-full px-4 py-3 rounded-xl border"
//           />

//           <input
//             type="number"
//             placeholder="Soil pH"
//             value={ph}
//             onChange={(e) => setPh(e.target.value)}
//             className="w-full px-4 py-3 rounded-xl border"
//           />

//           <input
//             type="number"
//             placeholder="Nitrogen"
//             value={nitrogen}
//             onChange={(e) => setNitrogen(e.target.value)}
//             className="w-full px-4 py-3 rounded-xl border"
//           />

//           <input
//             type="number"
//             placeholder="Phosphorus"
//             value={phosphorus}
//             onChange={(e) => setPhosphorus(e.target.value)}
//             className="w-full px-4 py-3 rounded-xl border"
//           />

//           <input
//             type="number"
//             placeholder="Potassium"
//             value={potassium}
//             onChange={(e) => setPotassium(e.target.value)}
//             className="w-full px-4 py-3 rounded-xl border"
//           />

//           <button
//             onClick={handleGenerate}
//             className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold"
//           >
//             {loading ? "Predicting..." : "Get Recommendation"}
//           </button>

//           {error && <p className="text-red-500 text-center">{error}</p>}
//         </div>
//       </div>
//     );
//   }

//   /* ========================= RESULT PAGE ========================= */

//   return (
//     <div className="min-h-screen bg-green-50 p-8">
//       <div className="max-w-6xl mx-auto">

//         <div className="flex justify-between mb-6">
//           <h2 className="text-2xl font-bold">🌾 Recommended Crops</h2>

//           <button
//             onClick={handleBack}
//             className="bg-white px-4 py-2 rounded border"
//           >
//             ← Back
//           </button>
//         </div>

//         {/* ⭐ BEST CROP */}
//         <h3 className="text-lg text-green-700 mb-4">
//           ⭐ Best Crop: {recommendations[0]?.crop}
//         </h3>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {recommendations.map((crop, index) => {

//             let badge = "⚠️";
//             if (index === 0) badge = "🥇";
//             else if (index === 1) badge = "🥈";

//             const isProfit = crop.profit_status === "Profit";

//             return (
//               <div
//                 key={index}
//                 className="bg-white p-6 rounded-2xl shadow-lg border hover:shadow-xl transition"
//               >
//                 <h3 className="text-xl font-bold mb-2">
//                   {badge} {crop.crop}
//                 </h3>

//                 <p className="text-sm text-gray-600">
//                   Success: {crop.success_rate.toFixed(2)}%
//                 </p>

//                 <p className="text-sm mt-1">
//                   Yield: {crop.expected_yield_tons} tons
//                 </p>

//                 <p className="text-sm">
//                   Price: ₹{crop.price_per_kg}/kg
//                 </p>

//                 {/* 💰 PROFIT / LOSS */}
//                 <p
//                   className={`mt-3 text-lg font-bold ${
//                     isProfit ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {isProfit
//                     ? `Profit ₹${crop.farmer_profit}`
//                     : `Loss ₹${crop.farmer_profit}`}
//                 </p>

//                 <p className="text-sm text-gray-500">
//                   Expenses: ₹{crop.expenses}
//                 </p>

//                 <p className="text-sm mt-2">
//                   Risk:{" "}
//                   <span
//                     className={`font-semibold ${
//                       crop.risk === "Low"
//                         ? "text-green-600"
//                         : crop.risk === "Medium"
//                         ? "text-yellow-600"
//                         : "text-red-600"
//                     }`}
//                   >
//                     {crop.risk}
//                   </span>
//                 </p>
//               </div>
//             );
//           })}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default CropRecommendation;

// version 2

import React, { useState, useEffect } from "react";
import recommendationService from "../../services/recommendation.service";
import { useNavigate } from "react-router-dom";

/* ========================= TYPES ========================= */

interface Recommendation {
  crop: string;
  success_rate: number;
  expected_yield_tons: number;
  price_per_kg: number;
  revenue: number;
  expenses: number;
  farmer_profit: number;
  profit_status: "Profit" | "Loss";
  risk: string;
}

/* ========================= COMPONENT ========================= */

const CropRecommendation = () => {
  const navigate = useNavigate(); // ✅ added

  const [landArea, setLandArea] = useState("");
  const [ph, setPh] = useState("");
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);

  /* ========================= LOCATION ========================= */

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
      },
      () => {
        console.log("Location permission denied");
      }
    );
  }, []);

  /* ========================= API CALL ========================= */

  const handleGenerate = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await recommendationService.getRecommendations({
        nitrogen: Number(nitrogen),
        phosphorus: Number(phosphorus),
        potassium: Number(potassium),
        ph: Number(ph),
        land_area: Number(landArea),
        workman_cost: 10000,
        latitude: latitude || undefined,
        longitude: longitude || undefined,
      });

      setRecommendations(response.data.recommendations);
      setShowResults(true);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || "Backend error");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setShowResults(false);
  };

  /* ========================= INPUT PAGE ========================= */

  if (!showResults) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 border space-y-4">
          <h2 className="text-2xl font-bold text-center">
            🌱 Crop Recommendation
          </h2>

          <input
            type="number"
            placeholder="Land Area (Acres)"
            value={landArea}
            onChange={(e) => setLandArea(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border"
          />

          <input
            type="number"
            placeholder="Soil pH"
            value={ph}
            onChange={(e) => setPh(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border"
          />

          <input
            type="number"
            placeholder="Nitrogen"
            value={nitrogen}
            onChange={(e) => setNitrogen(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border"
          />

          <input
            type="number"
            placeholder="Phosphorus"
            value={phosphorus}
            onChange={(e) => setPhosphorus(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border"
          />

          <input
            type="number"
            placeholder="Potassium"
            value={potassium}
            onChange={(e) => setPotassium(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border"
          />

          <button
            onClick={handleGenerate}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Predicting..." : "Get Recommendation"}
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
      </div>
    );
  }

  /* ========================= RESULT PAGE ========================= */

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">🌾 Recommended Crops</h2>

          <button
            onClick={handleBack}
            className="bg-white px-4 py-2 rounded border"
          >
            ← Back
          </button>
        </div>

        <h3 className="text-lg text-green-700 mb-4">
          ⭐ Best Crop: {recommendations[0]?.crop}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((crop, index) => {

            let badge = "⚠️";
            if (index === 0) badge = "🥇";
            else if (index === 1) badge = "🥈";

            const isProfit = crop.profit_status === "Profit";

            return (
              <div
                key={index}
                onClick={() =>
                  navigate(`/farmer/crop/${crop.crop}`, { state: crop })
                } // ✅ IMPORTANT
                className="bg-white p-6 rounded-2xl shadow-lg border hover:shadow-xl transition cursor-pointer"
              >
                <h3 className="text-xl font-bold mb-2">
                  {badge} {crop.crop}
                </h3>

                <p className="text-sm text-gray-600">
                  Success: {crop.success_rate.toFixed(2)}%
                </p>

                <p className="text-sm mt-1">
                  Yield: {crop.expected_yield_tons} tons
                </p>

                <p className="text-sm">
                  Price: ₹{crop.price_per_kg}/kg
                </p>

                <p
                  className={`mt-3 text-lg font-bold ${
                    isProfit ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isProfit
                    ? `Profit ₹${crop.farmer_profit}`
                    : `Loss ₹${crop.farmer_profit}`}
                </p>

                <p className="text-sm text-gray-500">
                  Expenses: ₹{crop.expenses}
                </p>

                <p className="text-sm mt-2">
                  Risk:{" "}
                  <span
                    className={`font-semibold ${
                      crop.risk === "Low"
                        ? "text-green-600"
                        : crop.risk === "Medium"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {crop.risk}
                  </span>
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default CropRecommendation;