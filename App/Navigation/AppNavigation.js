import { StackNavigator } from 'react-navigation'
import DocumentViewScreen from '../Containers/DocumentViewScreen'
import FilesList from '../Containers/FilesList'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'
import Colors from '../Themes/Colors'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  DocumentViewScreen: { screen: DocumentViewScreen },
  FilesList: { screen: FilesList }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'FilesList',
  navigationOptions: {
    headerStyle: styles.header,
    headerTintColor: Colors.snow
  }
})

export default PrimaryNav
