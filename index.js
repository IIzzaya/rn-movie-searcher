import { AppRegistry } from 'react-native';
import {StackNavigator} from "react-navigation";
import Main from "./src/components/main";

const App = StackNavigator({
  Main: { screen: Main },
});

AppRegistry.registerComponent('rn-movie-searcher', () => App);