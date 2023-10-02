# Import necessary modules
from flask import Flask, render_template

# Initialize Flask app
app = Flask(__name__)

# Route for serving React app

# Route for API data
@app.route('/data1')
def get_time():
    return {
        'Name': "geek",
        "Age": "25",
        "Date": "some date",
        "programming": "python"
    }

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
