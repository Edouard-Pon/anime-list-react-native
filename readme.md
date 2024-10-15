# Anime List React Native App

## WIP Migration to TypeScript

## Introduction

This is a University project created for educational purposes. The goal of this project is to create a mobile application.  
This app requires a backend server to work properly. The backend source code can be found here [anime-list-api](https://github.com/Edouard-Pon/anime-list-api).

## Installation

1. Clone the repository
2. Run `yarn install` to install the dependencies
3. Create a `.env` file in the root directory and add the following content:
    ```env
    EXPO_PUBLIC_API_URL=<API_URL>
    EXPO_PUBLIC_API_KEY=<API_KEY>
    ```
4. Run `yarn start` to start the application

## Technologies

- React Native
- Expo
- Redux
- Axios

## Features

1. User
    - Register
    - Login
    - Logout
    - View profile (User)
    - View anime list (favorites/~~watched/to watch/abandoned~~) (User)
2. Anime
    - View a list of anime
    - View details of an anime
    - Search for an anime
    - Create an anime (Admin)
    - Delete an anime (Admin)
3. Character
    - View a list of characters
    - View details of a character
    - Search for a character
    - Create a character (Admin)
    - Delete a character (Admin)
4. Anime List
    - Add an anime to favorites (User)
