from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import google.generativeai as genai
from sqlalchemy import create_engine, text

import os

# Configuring flask app
app = Flask(__name__)
app.config['DATABASE_URI'] = os.getenv('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Configuring gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Configuring database
SQL_URL = os.getenv('DATABASE_URI')
engine = create_engine(SQL_URL)
connection = engine.connect()

# Function to provide SQL query 
def get_gemini_response(question, prompt):
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content([prompt, question])

    return response.text

def clean_string(str):
   return str.replace('\n', ' ')

# Function to retrieve data from SQL database
def read_sql_query(query):
    # Execute the query
    result = connection.execute(query)

    # Fetch all rows from the result
    rows = result.fetchall()

    return rows

prompt = """
You are an expert English to SQL Query converter! You will be asked an english question and have to have to respond with an SQL Query that would be useful to fetch required data. \n\n

The SQL Schema Looks something like this: \n
Database name: Projects\n
Columns: \n
link (VARCHAR) \n
monthly_rank (INT) \n
project_name (VARCHAR) \n
project_subheading (VARCHAR) \n
description (VARCHAR)\n
year (INT)\n
month (VARCHAR) ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] \n
number_of_upvotes (INT) \n

Here are some Examples:  \n
\n
Example 1: \n
Question: Which project has the most number of upvotes?\n
Response: SELECT project_name, description, link, number_of_upvotes FROM Projects ORDER BY number_of_upvotes DESC LIMIT 1;\n

Example 2:\n
Question 2: Give me top 3 projects built with typescript\n
Response: SELECT project_name, description, link, number_of_upvotes FROM Projects WHERE description LIKE '%Typescript%' ORDER BY number_of_upvotes DESC LIMIT 3;\n

Example 3: \n
Question 3: 
Response: SELECT project_name, description, link, number_of_upvotes FROM Projects WHERE month = 'Aug' AND year = 2023 ORDER BY number_of_upvotes DESC LIMIT 10;


No matter what the user asks for always retrun the project_name, description, link and number_of_upvotes.
NOTE: also the sql code should not have ``` in beginning or end and sql word in output. 
"""

@app.route('/query', methods=['POST'])
def query():
    # 1. Get the Question from the user
    data = request.json
    question = data.get('input')

    # 2. Convert it to a query
    query = get_gemini_response(question, prompt)

    # 3. Get the response 
    response = read_sql_query(text(query))

    if response:
        return jsonify(response)
    else:
        return jsonify("Error fetching the project"), 404

if __name__ == '__main__':
    app.run(debug=True)
