import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

function AnimePage({ route }) {
  const { anime } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{anime.title}</Text>
            <View style={styles.imageAndTextContainer}>
                <Image style={styles.image} source={{ uri: anime.coverImagePath }} />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Type: {anime.type}</Text>
                    <Text style={styles.text}>Episodes: {anime.episodes}</Text>
                    <Text style={styles.text}>Duration: {anime.duration}</Text>
                    <Text style={styles.text}>Release Date: {new Date(anime.releaseDate).toLocaleDateString('en-GB')}</Text>
                    <Text style={styles.text}>Upload Date: {new Date(anime.uploadDate).toLocaleDateString('en-GB')}</Text>
                </View>
            </View>
            <Text style={styles.text}>Status: {anime.status}</Text>
            <Text style={styles.text}>Rating: {anime.rating}</Text>
            <Text style={styles.text}>Description: {anime.description}</Text>
            <Text style={styles.text}>Source: {anime.source}</Text>
            <Text style={styles.text}>External Link: {anime.externalLink}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,

    },
    imageAndTextContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'flex-start',
    },
    image: {
        width: 160,
        height: 240,
    },
    textContainer: {
        marginLeft: 16,
        flex: 1,
        justifyContent: 'flex-start',
    },
    text: {
      fontSize: 18,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 30
    },
});

export default AnimePage;
