import React from 'react';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
const AppStack = createNativeStackNavigator();

export default function AppRoutes(){
  return(
    <AppStack.Navigator initialRouteName="Dashboard">
      <AppStack.Screen 
        name="SignIn" 
        component={SignIn} 
        options={{ 
          title: "Login"
        }}
      />

      <AppStack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown:false
        }}
      />

    </AppStack.Navigator>
  )
}