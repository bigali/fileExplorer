import { StackNavigator } from 'react-navigation'
import FilesList from '../Containers/FilesList'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  FilesList: { screen: FilesList }
}, {
  // Default config for all screens
  headerMode: 'float',
  initialRouteName: 'FilesList',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
