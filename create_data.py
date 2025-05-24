import pandas as pd
import numpy as np

# Create a sample dataset
np.random.seed(42)
dates = pd.date_range(start='2024-01-01', end='2024-12-31', freq='D')
locations = ['Hostel A', 'Library', 'Cafeteria', 'Sports Complex', 'Parking Lot', 'Lecture Hall', 'Student Center']
incident_types = ['theft', 'fighting', 'vandalism']

data = {
    'date': np.random.choice(dates, 500),
    'location': np.random.choice(locations, 500),
    'incident_type': np.random.choice(incident_types, 500),
    'severity': np.random.randint(1, 6, 500),
    'lat': np.random.uniform(40.7, 40.8, 500),
    'lon': np.random.uniform(-74.0, -73.9, 500)
}

df = pd.DataFrame(data)

# Save the data as a CSV file
df.to_csv('campus_incidents.csv', index=False)

print("Sample data created and stored in 'campus_incidents.csv'")
print(df.head())
