import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth()

  if (isSignedIn) {
    if(!isLoaded) return null;
    
    return <Redirect href={"/(tabs)"} />
  }

  return <Stack screenOptions={{headerShown:false}}/>
}