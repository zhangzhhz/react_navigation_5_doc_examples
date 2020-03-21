import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('@expo/snack-static/react-native-logo.png')}
    />
  );
}

function HomeScreen({ navigation }) {
  const [count, setCount] = React.useState(0);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={ () => setCount(c => c + 1)}
          title='Update count'
          color='#00cc00'
        />
      )
    })
  }, [navigation, setCount]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Text>Count: {count}</Text>
      <Button
        title="Go to Details"
        /* 1. Navigate to the Details route with params */
        onPress={() => navigation.navigate('Details', {
          itemId: 86,
          otherParam: 'anything you want here'
        })}
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  /* 2. get the params */
  const { itemId, otherParam } = route.params;
  // React.useEffect(() => {
  //   console.log(route);
  //   for (let v in navigation) {
  //     console.log("Navigation member: " + v);
  //   }
  //   for (let v in route) {
  //     console.log("Route member: " + v);
  //   }
  // });
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Text>itemID: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title='Go to Details... again'
        onPress={() => navigation.push('Details')}
      />
      <Button
        title='Go to Home'
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title='Go back'
        onPress={() => navigation.goBack()}
      />
      <Button
        title="setParams (otherParam)"
        onPress={() => {
          navigation.setParams({
            otherParam: 'HELLO',
          });

          }
        }
      />
      <Button
        title="setOption (title)"
        onPress={() => navigation.setOptions({
          // title: navigation.options.title + ' (updated)',
          title: ' (updated)',
        })}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          // headerTitleAlign: 'center',
          title: 'My Home',
          headerStyle: {
            backgroundColor: '#f4511e'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: props => <LogoTitle {...props} />,
            /*
            To be able to interact with the screen component,
            we need to use navigation.setOptions to define our button instead of the options prop.
            By using navigation.setOptions inside the screen component,
            we get access to screen's props, state, context etc.
            */
            // headerRight: () => (
            //   <Button
            //     onPress={ () => (alert("This is a button!"))}
            //     title='Info'
            //     color='#00cc00'
            //   />
            // )
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          /* In order to use parameters passed in as part of the tile of the screen,
             we need to make `option` a function
          */
          // options={{
          //   title: "Overview"
          // }}
          options={({ route }) => ({
            title: "Overview" + ' '  + (route.params.itemId || '')
          })}
          initialParams={{
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
