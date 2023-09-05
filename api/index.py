from flask import Flask, request
from flask_restful import reqparse, Api, Resource
from flask_cors import CORS,cross_origin
from summarizer_sentiment import get_sentiment, tfidf_summarize
from finance_data import get_news_link
app = Flask(__name__)
api = CORS(app)

parser = reqparse.RequestParser()
parser.add_argument('task')

@app.route('/api/backend/', methods=['GET', 'POST'])
def index():
    return 'THIS IS THE THE PYTHON SERVER FOR THE API AND MACHINE LEARNING '

@app.route('/api/', methods=['GET', 'POST'])
@cross_origin()
def predict():
    args = parser.parse_args()
    body = request.json
    body = dict(body)
    print(body["sentence"])
    try:
        summary = tfidf_summarize(body["sentence"])
        sentiment = get_sentiment(body["sentence"])
    except ZeroDivisionError:
        summary = "PLEASE ENTER A VALID SENTENCE"
        sentiment = "Error"
    return {"summary": summary, "sentiment": sentiment}


@app.route('/api/finance/', methods=['GET', 'POST'])
@cross_origin()
def predict_finance():
    args = parser.parse_args()
    body = request.json
    body = dict(body)
    print(body["date"], body["company"])
    try:
        news_links = get_news_link(body["company"])
    except Exception as e:
        news_links = "Error"
    return {"news_links": news_links}


if __name__ == '__main__':
    app.run(debug=True)