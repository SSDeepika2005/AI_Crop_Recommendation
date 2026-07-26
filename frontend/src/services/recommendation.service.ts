// // import axios from "axios";

// // const ML_API_URL = "http://localhost:8000";

// // export interface RecommendationRequest {
// //     soil_type: string;
// //     land_area: number;
// //     location: string;
// // }

// // export interface WeatherSummary {
// //     avg_temp: number;
// //     humidity: number;
// //     rainfall_forecast: number;
// // }

// // export interface Recommendation {
// //     crop: string;
// //     success_rate: number;
// //     expected_yield_tons: number;
// //     estimated_cost: number;
// //     predicted_profit: number;
// //     risk: string;
// // }

// // export interface RecommendationResponse {
// //     location: string;
// //     weather_summary: WeatherSummary;
// //     recommendations: Recommendation[];
// // }

// // class RecommendationService {
// //     getRecommendations(data: RecommendationRequest) {
// //         return axios.post<RecommendationResponse>(`${ML_API_URL}/recommend`, data);
// //     }
// // }

// // export default new RecommendationService();


// // below is working code 26/2/26

// // import axios from "axios";

// // const ML_API_URL = "http://localhost:8000";

// // export interface RecommendationRequest {
// //   soil_type: string;
// //   land_area: number;
// //   location: string;
// // }

// // export interface WeatherSummary {
// //   avg_temp: number;
// //   humidity: number;
// //   rainfall_forecast: number;
// // }

// // export interface Recommendation {
// //   crop: string;
// //   success_rate: number;
// //   expected_yield_tons: number;
// //   estimated_cost: number;
// //   predicted_profit: number;
// //   risk: string;
// // }

// // export interface RecommendationResponse {
// //   location: string;
// //   weather_summary: WeatherSummary;
// //   recommendations: Recommendation[];
// // }

// // class RecommendationService {
// //   getRecommendations(data: RecommendationRequest) {
// //     return axios.post<RecommendationResponse>(
// //       `${ML_API_URL}/recommend`,
// //       data
// //     );
// //   }
// // }

// // export default new RecommendationService();
// // import axios from "axios";

// // const ML_API_URL = "http://localhost:8000"; // ML backend URL

// // export interface RecommendationRequest {
// //   soil_type: string;
// //   land_area: number;
// //   location: string; // e.g., "Coimbatore, TN"
// // }

// // export interface WeatherSummary {
// //   avg_temp: number;
// //   humidity: number;
// //   rainfall_forecast: number;
// // }

// // export interface Recommendation {
// //   crop: string;
// //   success_rate: number;
// //   expected_yield_tons: number;
// //   estimated_cost: number;
// //   predicted_profit: number;
// //   risk: string;
// // }

// // export interface RecommendationResponse {
// //   location: string;
// //   weather_summary: WeatherSummary;
// //   recommendations: Recommendation[];
// // }

// // class RecommendationService {
// //   getRecommendations(data: RecommendationRequest) {
// //     // split location into district and state
// //     const [district, state] = data.location.split(",").map(s => s.trim());

// //     // Call backend GET /predict with query params
// //     return axios.get<RecommendationResponse>(`${ML_API_URL}/predict`, {
// //       params: {
// //         soil: data.soil_type,
// //         area: data.land_area,
// //         district,
// //         state,
// //       },
// //     });
// //   }
// // }

// // export default new RecommendationService();




// //below is new fresh input
// import axios from "axios";

// const ML_API_URL = "http://localhost:8000";

// export interface RecommendationRequest {
//   soil_type: string;
//   land_area: number;
//   latitude: number;
//   longitude: number;
//   irrigation_type: string;
//   water_level: string;
//   ph: number;
//   nitrogen: number;
//   phosphorus: number;
//   potassium: number;
//   previous_crop: string;
//   budget: string;
//   risk_level: string;
//   farming_type: string;
  
// }

// export interface Recommendation {
//   crop: string;
//   success_rate: number;
//   expected_yield_tons: number;
//   estimated_cost: number;
//   predicted_profit: number;
//   risk: string;
// }

// export interface RecommendationResponse {
//   recommendations: Recommendation[];
// }

// class RecommendationService {
//   getRecommendations(data: RecommendationRequest) {
//     return axios.post<RecommendationResponse>(
//       `${ML_API_URL}/predict`,
//       data
//     );
//   }
// }

// export default new RecommendationService();



// 23/3/26
import axios from "axios";

const ML_API_URL = "http://localhost:8000";

export interface RecommendationRequest {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  land_area: number;
  workman_cost: number;
  latitude?: number;
  longitude?: number;
}

// export interface Recommendation {
//   crop: string;
//   success_rate: number;
//   expected_yield_tons: number;
//   revenue: number;
//   overall_profit: number;
//   risk: string;
// }

export interface Recommendation {
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

export interface RecommendationResponse {
  location: string;
  season: string;
  recommendations: Recommendation[];
}

class RecommendationService {
  getRecommendations(data: RecommendationRequest) {
    return axios.post<RecommendationResponse>(
      `${ML_API_URL}/predict`,
      data
    );
  }
}

export default new RecommendationService();