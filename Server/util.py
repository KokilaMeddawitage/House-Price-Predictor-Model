import json
import pickle
import joblib
import numpy as np
import pandas as pd

#creating global variables
__locations = None
__data_columns = None
model = None

#get estimated price
# def get_estimated_price(location,total_sqf,bath,bhk):

#     try:
#         loc_index = __data_columns.index(location.lower())
#     except:
#         loc_index = -1
#     x = np.zeros(len(__data_columns))
#     x[0] = total_sqf
#     x[1] = bath
#     x[2] = bhk
#     if loc_index >= 0:
#         x[loc_index] = 1

#     return round(model.predict([x])[0],2)


def get_estimated_price(location, total_sqft, bath, bhk):
    try:
        loc_index = __data_columns.index(location.lower())
    except ValueError:
        loc_index = -1

    # Create a dictionary of feature names with default values
    feature_dict = {col: 0 for col in __data_columns}
    feature_dict['total_sqft'] = total_sqft
    feature_dict['bath'] = bath
    feature_dict['bhk'] = bhk

    # If the location is valid, set its value to 1
    if loc_index >= 0:
        feature_dict[__data_columns[loc_index]] = 1

    # Convert the dictionary to a DataFrame
    x_df = pd.DataFrame([feature_dict])

    # Predict using the model
    return round(model.predict(x_df)[0], 2)




#function to get all locations in the dataset
def get_location_names():
    return __locations

#load saved artifatcs json file and home prices  
def load_saved_artifacts():
    global __data_columns
    global __locations
#data_columns from 3rd onwards are locations,
    with open("Server/artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']  #load all data to datacolumns global variable
        __locations = __data_columns[3:] #get only locations

    # with open("./artifacts/banglore_home_prices_model.pickle", "wb") as f:
    #     __model = pickle.load(f)

    # Load the model
    global model
    model = joblib.load('Server/artifacts/banglore_home_prices_model.joblib')
    print("Model loaded successfully:", model)


    print("Loading saved artifacts...done")


if __name__ == "__main__":
    load_saved_artifacts()  #loading artifacts into memory
    print(get_location_names()) #get all locationss
    print(get_estimated_price('1st Phase JP Nagar',1000, 3, 3)) #get estimated price
    print(get_estimated_price('1st Phase JP Nagar',1000, 2, 2)) #get estimated price
    print(get_estimated_price('Anjanapura',1000, 2, 2)) #get estimated price
    print(get_estimated_price('Gunjur',1000, 3, 3)) #get estimated price