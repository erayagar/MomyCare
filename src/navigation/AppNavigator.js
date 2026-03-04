import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import FormsScreen from '../screens/FormsScreen';
import BloodSugarScreen from '../screens/BloodSugarScreen';
import PhysicalActivityScreen from '../screens/PhysicalActivityScreen';
import NutritionScreen from '../screens/NutritionScreen';
import FoodSelectionScreen from '../screens/FoodSelectionScreen';
import EducationScreen from '../screens/EducationScreen';
import DailyGoalsScreen from '../screens/DailyGoalsScreen';
import FAQScreen from '../screens/FAQScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import SurveyScreen from '../screens/SurveyScreen';
import WhatsappEmergencyScreen from '../screens/WhatsappEmergencyScreen';
import AddBloodSugarScreen from '../screens/AddBloodSugarScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen 
          name="Forms" 
          component={FormsScreen}
        />
        <Stack.Screen 
          name="BloodSugar" 
          component={BloodSugarScreen}
        />
        <Stack.Screen 
          name="PhysicalActivity" 
          component={PhysicalActivityScreen}
        />
        <Stack.Screen 
          name="Nutrition" 
          component={NutritionScreen}
        />
        <Stack.Screen 
          name="FoodSelection" 
          component={FoodSelectionScreen}
        />
        <Stack.Screen 
          name="Education" 
          component={EducationScreen}
        />
        <Stack.Screen 
          name="DailyGoals" 
          component={DailyGoalsScreen}
        />
        <Stack.Screen 
          name="FAQ" 
          component={FAQScreen}
        />
        <Stack.Screen 
          name="Notifications" 
          component={NotificationsScreen}
        />
        <Stack.Screen 
          name="Survey" 
          component={SurveyScreen}
        />
        <Stack.Screen 
          name="WhatsappEmergency" 
          component={WhatsappEmergencyScreen}
        />
        <Stack.Screen 
          name="AddBloodSugar" 
          component={AddBloodSugarScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
