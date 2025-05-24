from flask import Flask, jsonify, send_file
import pandas as pd

app = Flask(__name__)

@app.route('/api/incidents', methods=['GET'])
def get_incidents():
    df = pd.read_csv('campus_incidents.csv')
    return jsonify(df.to_dict(orient='records'))

@app.route('/api/trends', methods=['GET'])
def get_trends():
    df = pd.read_csv('campus_incidents.csv')
    df['date'] = pd.to_datetime(df['date'])
    df['month'] = df['date'].dt.to_period('M')
    monthly_incidents = df.groupby(['month', 'incident_type']).size().unstack(fill_value=0)
    return jsonify(monthly_incidents.to_dict())

@app.route('/api/heatmap', methods=['GET'])
def get_heatmap():
    return send_file('severity_heatmap.png', mimetype='image/png')

@app.route('/api/feature_importance', methods=['GET'])
def get_feature_importance():
    return send_file('feature_importance.png', mimetype='image/png')

@app.route('/api/incident_map', methods=['GET'])
def get_incident_map():
    return send_file('incident_map.html', mimetype='text/html')

if __name__ == '__main__':
    app.run(debug=True)

print("Flask API is ready to run. Execute 'flask run' to start the server.")
