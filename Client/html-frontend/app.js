function onPageLoad() {
  console.log("Page loaded!");

  // API URL to fetch locations
  var url = "http://127.0.0.1:5000/get_location_names";

  // Fetch locations from API
  $.get(url, function (data, status) {
    console.log("Got response for get_location_names request");

    if (data) {
      var locations = data.locations; // Assuming response contains { locations: [...] }
      var uiLocations = document.getElementById("uiLocations");

      // Clear existing options
      $("#uiLocations").empty();

      // Add a default "Choose a Location" option
      var defaultOption = new Option("Choose a Location", "");
      defaultOption.disabled = true;
      defaultOption.selected = true;
      uiLocations.appendChild(defaultOption);

      // Populate dropdown with locations
      for (var i in locations) {
        var opt = new Option(locations[i]); // Create new option
        uiLocations.appendChild(opt); // Add option to the dropdown
      }
    }
  }).fail(function () {
    console.error("Failed to fetch location data.");
  });
}

function getBathValue() {
  // Use getElementsByName (plural)
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (var i = 0; i < uiBathrooms.length; i++) {
    if (uiBathrooms[i].checked) {
      return parseInt(uiBathrooms[i].value);
    }
  }
  return -1; // Invalid value
}

function getBHKValue() {
  // Use getElementsByName (plural)
  var uiBHK = document.getElementsByName("uiBHK");
  for (var i = 0; i < uiBHK.length; i++) {
    if (uiBHK[i].checked) {
      return parseInt(uiBHK[i].value);
    }
  }
  return -1; // Invalid value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");

  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

  console.log("Inputs: ", sqft.value, bhk, bathrooms, location.value);

  var url = "http://127.0.0.1:5000/predict_home_price";
  $.post(
    url,
    {
      total_sqft: parseInt(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value,
    },
    function (data, status) {
      console.log("Response: ", data.estimated_price);
      estPrice.innerHTML = data.estimated_price.toString() + " Lakh";
      estPrice.classList.remove("hidden");
      estPrice.classList.add("visible");
    }
  ).fail(function () {
    console.error("Failed to get price estimate.");
    estPrice.innerHTML = "Could not fetch price. Try again later.";
    estPrice.classList.remove("hidden");
    estPrice.classList.add("visible");
  });
}

function onClickedEstimatePriceHTML() {
  console.log("Estimate price button clicked");

  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

  console.log("Inputs: ", sqft.value, bhk, bathrooms, location.value);

  var url = "http://127.0.0.1:5000/predict_home_price_html_frontend";
  $.post(
    url,
    {
      total_sqft: parseInt(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value,
    },
    function (data, status) {
      console.log("Response: ", data.estimated_price);
      estPrice.innerHTML = data.estimated_price.toString() + " Lakh";
      estPrice.classList.remove("hidden");
      estPrice.classList.add("visible");
    }
  ).fail(function () {
    console.error("Failed to get price estimate.");
    estPrice.innerHTML = "Could not fetch price. Try again later.";
    estPrice.classList.remove("hidden");
    estPrice.classList.add("visible");
  });
}

// Execute the function on page load
window.onload = onPageLoad;
