import pandas as pd
import numpy as np

try:
    df = pd.read_csv('spotify-tracks.csv')
    

    df_small = df.head(1000).copy()

    emotions = ['Happy', 'Sad', 'Stressed', 'Energetic', 'Calm', 'Angry', 'Excited']
    activities = ['Party', 'Resting', 'Studying', 'Gym', 'Meditation']

    df_small['Emotion'] = [np.random.choice(emotions) for _ in range(1000)]
    df_small['Activity'] = [np.random.choice(activities) for _ in range(1000)]

    df_small.to_csv('music_dataset_mock.csv', index=False)
    print("music_dataset_mock.csv has been created!")

except FileNotFoundError:
    print("Input file not found.")





