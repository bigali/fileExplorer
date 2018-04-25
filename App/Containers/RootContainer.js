import React, { Component } from 'react'
import {View, StatusBar, SafeAreaView} from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentDidMount () {
    this.props.startup()
  }

  render () {
    return (
      <SafeAreaView style={styles.applicationView}>
        <StatusBar
          barStyle='light-content'
          backgroundColor='#ecf0f1'
        />
        <ReduxNavigation />
      </SafeAreaView>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
