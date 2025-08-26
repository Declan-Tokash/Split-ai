import { Fontisto } from '@expo/vector-icons';
import { CameraCapturedPicture } from 'expo-camera';
import React from 'react'
import { TouchableOpacity, SafeAreaView, Image, StyleSheet, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import ActionBar from './ActionBar';

const PhotoPreviewSection = ({
    photo,
    handleRetakePhoto,
    handleParseImage
}: {
    photo: CameraCapturedPicture;
    handleRetakePhoto: () => void;
    handleParseImage: (base64Image?: string) => Promise<void>,
}

) => (
    <SafeAreaView style={styles.container}>
        <View style={styles.box}>
            <Image
                style={styles.previewConatiner}
                source={{uri: 'data:image/jpg;base64,' + photo.base64}}
            />
        </View>

        <ActionBar
            buttons={[
                {
                    text: 'Retake',
                    action: handleRetakePhoto,
                    variant: 'dark',
                    },
                    {
                    text: 'Review',
                    action: handleParseImage,
                    variant: 'light',
                },
            ]}
        />
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f2f2f7',
        alignItems: 'center',
    },
    box: {
        borderRadius: 15,
        width: '95%',
        justifyContent: 'center',
    },
    previewConatiner: {
        width: '100%',
        height: '85%',
        borderRadius: 15
    },
});

export default PhotoPreviewSection;