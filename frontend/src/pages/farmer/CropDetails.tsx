import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const CropDetails = () => {
  const { name } = useParams();
  const location = useLocation();
  const crop = location.state;

  const handleStartPlan = async () => {
    try {
      await axios.post("http://localhost:8080/api/start-plan", {
        farmerName: "Rajesh",
        cropName: crop.crop,
        profit: crop.farmer_profit,
        expenses: crop.expenses,
      });

      alert("Plan saved successfully!");
    } catch (err) {
      alert("Error saving plan");
    }
  };

  if (!crop) return <div>No data</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{name}</h1>

      <p>Yield: {crop.expected_yield_tons}</p>
      <p>Price: ₹{crop.price_per_kg}</p>
      <p>Profit: ₹{crop.farmer_profit}</p>
      <p>Expenses: ₹{crop.expenses}</p>

      <button
        onClick={handleStartPlan}
        className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
      >
        Start Plan
      </button>
    </div>
  );
};

export default CropDetails;