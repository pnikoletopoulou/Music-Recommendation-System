# Dataset Preparation

This part of the project focuses on preparing and improving the dataset used for the music recommendation system.

## 1. fix_dataset.py
A Python script was used to extract the first 1000 records from the original Spotify dataset. Since the dataset did not include Emotion and Activity labels, these were added randomly.

## 2. fix_csv.py
The original data was heavily biased towards acoustic tracks, which could negatively affect model performance. To solve this, a mapping function was applied to assign music genres based on Emotion values.
