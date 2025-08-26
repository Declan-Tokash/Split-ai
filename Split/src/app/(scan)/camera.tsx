import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { usePhotoStore } from '../../stores/usePhotoStore';

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const router = useRouter();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleTakePhoto =  async () => {
    if (cameraRef.current) {
        const options = {
            quality: 1,
            base64: true,
            exif: false,
        };
        const photo = await cameraRef.current.takePictureAsync(options);
        usePhotoStore.getState().setPhoto(photo);
        router.push('/(scan)/preview');
    }
  }; 

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => router.push('/home')} style={styles.button}>
                <MaterialIcons name="arrow-back-ios" size={50} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
                <Entypo name="circle" size={75} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                <MaterialCommunityIcons name="camera-flip" size={50} color="white" />
            </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});



  // const handleParseImage = async (base64Image: string) => {
  //   const response = await fetch(`https://daxteyqkthlxbqyfzgjw.supabase.co/functions/v1/analyze-image`, {
  //       method: 'POST',
  //       headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRheHRleXFrdGhseGJxeWZ6Z2p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1ODkyMzMsImV4cCI6MjA2NzE2NTIzM30._08V8BcE50GKclCn_-ppw3CE-sYokBrZqck_DRkjq8Y`, // or use user token if logged in
  //       },
  //       body: JSON.stringify({ image: "Declan" })
  //   });

  //   if (!response.ok) {
  //       const error = await response.text();
  //       throw new Error(`Error from edge function: ${error}`);
  //   }
  //   const data = await response.json();
  //   console.log(data.parsed)
  //   setItems(data);
  //   router.push('(scan)/items')
  // };