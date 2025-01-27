import axios from "axios";

// Function to fetch locations from the API
export const fetchLocations = async () => {
  try {
    console.log("Fetching locations...");
    const response = await axios.get(
      "http://127.0.0.1:5000/get_location_names"
    );
    console.log("Got response for get_location_names request");
    return response.data.locations || [];
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
};

export const getPriceEstimate = async (area, bhk, bath, location) => {
  try {
    // const payload = {
    //   total_sqft: area,
    //   location: location,
    //   bhk: bhk,
    //   bath: bath,
    // };
    const payload = {
      total_sqft: parseFloat(area), // Ensure this is a valid number
      location: location, // Ensure this is a valid string
      bhk: parseInt(bhk), // Ensure this is a valid integer
      bath: parseInt(bath), // Ensure this is a valid integer
    };
    console.log("Sending payload:", payload);

    const response = await axios.post(
      "http://127.0.0.1:5000/predict_home_price",
      payload
    );
    console.log("Got response for predict_home_price request");
    console.log(response.data.estimated_price);
    return response.data.estimated_price;
  } catch (error) {
    console.error("Error estimating price:", error);
    return null;
  }
};
