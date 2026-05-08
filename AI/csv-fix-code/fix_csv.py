import pandas as pd

df = pd.read_csv('music_dataset_mock.csv')

def assign_genre(emotion):
    emotion = str(emotion).upper()
    if emotion == 'HAPPY': return 'POP'
    if emotion == 'SAD': return 'BLUES'
    if emotion == 'ENERGETIC': return 'ROCK'
    if emotion == 'STRESSED': return 'LO-FI'
    if emotion == 'CALM': return 'AMBIENT'
    if emotion == 'ANGRY': return 'METAL'
    return 'ACOUSTIC' 


df['track_genre'] = df['Emotion'].apply(assign_genre)

df.to_csv('music_dataset_mock.csv', index=False)
print("Success!")
