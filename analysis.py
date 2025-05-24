import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import geopandas as gpd
import folium

# Load data from the CSV file
df = pd.read_csv('campus_incidents.csv')
df['date'] = pd.to_datetime(df['date'])

def analyze_trends():
    # Analyze trends over time
    df['month'] = df['date'].dt.to_period('M')
    monthly_incidents = df.groupby(['month', 'incident_type']).size().unstack(fill_value=0)
    
    # Plotting
    plt.figure(figsize=(12, 6))
    monthly_incidents.plot(kind='bar', stacked=True)
    plt.title('Monthly Incident Trends')
    plt.xlabel('Month')
    plt.ylabel('Number of Incidents')
    plt.legend(title='Incident Type')
    plt.tight_layout()
    plt.savefig('monthly_trends.png')
    plt.close()
    
    print("Monthly trend analysis completed. Chart saved as 'monthly_trends.png'")

def create_heatmap():
    # Create a heatmap of incidents
    pivot = df.pivot_table(values='severity', index='location', columns='incident_type', aggfunc='mean')
    plt.figure(figsize=(10, 8))
    sns.heatmap(pivot, annot=True, cmap='YlOrRd')
    plt.title('Incident Severity Heatmap by Location and Type')
    plt.tight_layout()
    plt.savefig('severity_heatmap.png')
    plt.close()
    
    print("Severity heatmap created. Chart saved as 'severity_heatmap.png'")

def predict_hotspots():
    # Prepare data for machine learning
    X = pd.get_dummies(df[['location', 'incident_type']])
    y = df['severity']
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train a Random Forest model
    rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
    rf_model.fit(X_train, y_train)
    
    # Make predictions
    y_pred = rf_model.predict(X_test)
    
    # Print classification report
    print("Random Forest Model Performance:")
    print(classification_report(y_test, y_pred))
    
    # Feature importance
    feature_importance = pd.DataFrame({'feature': X.columns, 'importance': rf_model.feature_importances_})
    feature_importance = feature_importance.sort_values('importance', ascending=False).head(10)
    
    # Plot feature importance
    plt.figure(figsize=(10, 6))
    sns.barplot(x='importance', y='feature', data=feature_importance)
    plt.title('Top 10 Features for Predicting Incident Severity')
    plt.tight_layout()
    plt.savefig('feature_importance.png')
    plt.close()
    
    print("Hotspot prediction completed. Feature importance chart saved as 'feature_importance.png'")

def create_geospatial_visualization():
    # Create a GeoDataFrame
    gdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.lon, df.lat))
    
    # Create a map centered on the mean coordinates
    m = folium.Map(location=[df['lat'].mean(), df['lon'].mean()], zoom_start=14)
    
    # Add incident points to the map
    for idx, row in gdf.iterrows():
        folium.CircleMarker(
            location=[row['lat'], row['lon']],
            radius=5,
            popup=f"Location: {row['location']}<br>Type: {row['incident_type']}<br>Severity: {row['severity']}",
            color='red',
            fill=True,
            fillColor='red'
        ).add_to(m)
    
    # Save the map
    m.save('incident_map.html')
    print("Geospatial visualization created. Map saved as 'incident_map.html'")

# Run all analyses
analyze_trends()
create_heatmap()
predict_hotspots()
create_geospatial_visualization()
