import React, { useEffect, useState } from "react";
import { Input, Radio, Select, Button, Form, notification } from "antd";
import { fetchLocations, getPriceEstimate } from "../APIs/GetPriceApi";
import image from "../assets/bg.jpg";

const { Option } = Select;

const PricePredictor = () => {
  const [area, setArea] = useState("1000");
  const [bhk, setBhk] = useState("2");
  const [bath, setBath] = useState("2");
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(null);

  // Fetch locations when the component loads
  useEffect(() => {
    const getLocations = async () => {
      const fetchedLocations = await fetchLocations();
      setLocations(fetchedLocations);
    };
    getLocations();
  }, []); // Empty dependency array ensures it runs only once on mount

  const onFormSubmit = async () => {
    if (!area || !bhk || !bath || !location) {
      notification.error({
        message: "Missing Inputs",
        description: "Please fill out all fields to estimate the price.",
      });
      return;
    }

    setLoading(true);
    try {
      console.log("Estimating price...");
      console.log(
        "Area:",
        area,
        "BHK:",
        bhk,
        "Bath:",
        bath,
        "Location:",
        location
      );
      const estimatedPrice = await getPriceEstimate(
        parseFloat(area),
        parseInt(bhk),
        parseInt(bath),
        location
      );
      setEstimatedPrice(estimatedPrice);
      console.log("Estimated Price:", estimatedPrice);
      if (estimatedPrice !== null) {
        notification.success({
          message: "Price Estimated",
          description: `The estimated price for the selected property is ₹${estimatedPrice}`,
        });
      } else {
        notification.error({
          message: "Error",
          description: "Unable to estimate the price. Please try again.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description:
          "An error occurred while estimating the price. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: `url(${image})`, // Replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Form
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "300px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Banglore Home Price Predictor</h2>
        <Form.Item label="Area (Square Feet)" style={{ marginBottom: "16px" }}>
          <Input
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Enter Area"
          />
        </Form.Item>

        <Form.Item label="BHK" style={{ marginBottom: "16px" }}>
          <Radio.Group
            value={bhk}
            onChange={(e) => setBhk(e.target.value)}
            buttonStyle="solid"
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <Radio.Button key={value} value={`${value}`}>
                {value}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Bath" style={{ marginBottom: "16px" }}>
          <Radio.Group
            value={bath}
            onChange={(e) => setBath(e.target.value)}
            buttonStyle="solid"
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <Radio.Button key={value} value={`${value}`}>
                {value}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Location" style={{ marginBottom: "16px" }}>
          <Select
            value={location}
            onChange={(value) => setLocation(value)}
            placeholder="Choose a Location"
          >
            {locations.map((loc, index) => (
              <Option key={index} value={loc}>
                {loc}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Button
          type="primary"
          block
          style={{ marginTop: "20px" }}
          onClick={onFormSubmit}
        >
          Estimate Price
        </Button>

        {/* New section to display the estimated price */}
        {estimatedPrice && (
          <div
            style={{
              marginTop: "20px",
              textAlign: "center",
              fontSize: "18px",
              color: "green",
              fontWeight: "bold",
              border: "1px solid green",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Estimated Price: {estimatedPrice}
          </div>
        )}
      </Form>
    </div>
  );
};

export default PricePredictor;
