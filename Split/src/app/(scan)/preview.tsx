import React, { useState } from 'react'
import { SafeAreaView, Image, StyleSheet, View } from 'react-native';
import ActionBar from '../../components/ActionBar';
import { usePhotoStore } from '../../stores/usePhotoStore';
import { analyzeImage } from '../../services/AnalyzeImageService';
import { router } from 'expo-router';
import Loading from '../../components/Loading';
import { useReceiptStore } from '../../stores/useOrderStore';

const Preview = () => {

    const photo = usePhotoStore((state) => state.photo);
    const clearPhoto = usePhotoStore((state) => state.clearPhoto);
    const [loading, setLoading] = useState<boolean>();

    const handleClearPhoto = () => {
        clearPhoto();
        router.back();
    }

    const handleCalculateTotal = (items: any) => {
        let total = 0;
        for (const item of items) {
          total += item.price;
        }
        return total;
    };

    const handleParseImage = async () => {
        try {
          setLoading(true);
          if (!photo?.base64) {
            return "No image selected";
          }else {
            const data = await analyzeImage(photo?.base64);
            useReceiptStore.getState().setStoreName(data.store)
            useReceiptStore.getState().setDate(data.date)
            useReceiptStore.getState().setItems(data.items)
            useReceiptStore.getState().setTotal(handleCalculateTotal(data.items))
            router.push('(scan)/review');
          }
        } catch (err) {
          console.error('Failed to analyze image:', err);
        } finally {
          setLoading(false);
        }
    };

    if(loading) return <Loading/>

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.box}>
                <Image
                    style={styles.previewConatiner}
                    source={{uri: 'data:image/jpg;base64,' + photo?.base64}}
                />
            </View>

            <ActionBar
                buttons={[
                    {
                        text: 'Retake',
                        action: handleClearPhoto,
                        variant: 'dark',
                        },
                        {
                        text: 'Analyze',
                        action: handleParseImage,
                        variant: 'light',
                    },
                ]}
            />
        </SafeAreaView>
    )
};

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

export default Preview;