import pickle

file_path = '/home/kokila-meddawitage/Desktop/ML Projects/Price Predictor/House-Price-Predictor-Model/Server/artifacts/banglore_home_prices_model.pickle'

try:
    with open(file_path, 'rb') as file:
        data = pickle.load(file)
    print("Pickle file loaded successfully.")
except Exception as e:
    print(f"Error loading pickle file: {e}")