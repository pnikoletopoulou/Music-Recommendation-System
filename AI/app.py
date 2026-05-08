from flask import Flask, request, jsonify
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)

df = pd.read_csv('music_dataset_mock.csv')

emotion = LabelEncoder()
activity = LabelEncoder()
genre = LabelEncoder()


df['emotion_n'] = emotion.fit_transform(df['Emotion'])
df['activity_n'] = activity.fit_transform(df['Activity'])
df['genre_n'] = genre.fit_transform(df['track_genre'])

X = df[['emotion_n', 'activity_n']]
y = df['genre_n']

model = DecisionTreeClassifier(
    criterion='entropy', 
    max_depth=None,     
    min_samples_leaf=1,  
    random_state=48
)
model.fit(X, y)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    return response

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    try:
        user_emo = data['emotion']
        user_act = data['activity']
        
        emo_enc = emotion.transform([user_emo])[0]
        act_enc = activity.transform([user_act])[0]
        
        pred = model.predict([[emo_enc, act_enc]])[0]
        result_genre = genre.inverse_transform([pred])[0]
        
        return jsonify({"genre": result_genre})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(port=5000, debug=True)