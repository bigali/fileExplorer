import React, {Component} from 'react'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import {Dimensions, Text, View} from 'react-native'
import {connect} from 'react-redux'
// Styles
import styles from './Styles/DocumentViewScreenStyle'
import Colors from '../Themes/Colors'
import {COLOR, Toolbar} from 'react-native-material-ui'
import Image from 'react-native-scalable-image'
import Video from 'react-native-video'
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls'
import ImageZoom from 'react-native-image-pan-zoom'
class DocumentViewScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params

    return {
      header: null
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING
    }
  }

  onSeek = seek => {
    this.videoPlayer.seek(seek)
  };

  onPaused = playerState => {
    this.setState({
      paused: !this.state.paused,
      playerState
    })
  };

  onReplay = () => {
    this.setState({playerState: PLAYER_STATES.PLAYING})
    this.videoPlayer.seek(0)
  };

  onProgress = data => {
    const {isLoading, playerState} = this.state
    // Video Player will continue progress even if the video already ended
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({currentTime: data.currentTime})
    }
  };

  onLoad = data => this.setState({duration: data.duration, isLoading: false});

  onLoadStart = data => this.setState({isLoading: true});

  onEnd = () => this.setState({playerState: PLAYER_STATES.ENDED});

  onError = () => alert('Oh! ', error);

  exitFullScreen = () => {
  };

  enterFullScreen = () => {
  };

  onFullScreen = () => {
  };
  renderToolbar = () => (
    <View style={styles.toolbar}>
      <Text>I'm a custom toolbar </Text>
    </View>
  );

  render () {
    const params = this.props.navigation.state.params
    let content = null
    if (params.mimetype.includes('image/')) {
      content = (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -56 }}>
          <ImageZoom
            cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={Dimensions.get('window').width}
            imageHeight={Dimensions.get('window').width}
            enableSwipeDown
          >
            <Image
              width={Dimensions.get('window').width} // height will be calculated automatically
              source={{uri: params.url}}
          />
          </ImageZoom>
        </View>
      )
    } else if (params.mimetype.includes('video/') || params.mimetype.includes('audio/')) {
      content =
        <View style={{flex: 1}}>
          <Video
            resizeMode='cover'
            source={{uri: params.url}}
            onEnd={this.onEnd}
            onLoad={this.onLoad}
            onLoadStart={this.onLoadStart}
            onProgress={this.onProgress}
            paused={this.state.paused}
            style={styles.mediaPlayer}
            ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          />
          <MediaControls
            duration={this.state.duration}
            isLoading={this.state.isLoading}
            mainColor='orange'
            onFullScreen={this.onFullScreen}
            onPaused={this.onPaused}
            onReplay={this.onReplay}
            onSeek={this.onSeek}
            onSeeking={this.onSeeking}
            playerState={this.state.playerState}
            progress={this.state.currentTime}
          />
        </View>
    }

    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        {content}
        <Toolbar
          leftElement='arrow-back'
          onLeftElementPress={() => {
            this.onPaused()
            this.props.navigation.goBack()
          }}
          centerElement={
            <View>
              <Text style={{color: Colors.snow, fontWeight: 'bold', fontSize: 18}}>
                {params.name}
              </Text>
            </View>}
          style={{
            container: {backgroundColor: COLOR.transparent, position: 'absolute', top:0, left:0},
            leftElement: {color: COLOR.white},
            titleText: {color: COLOR.white},
            rightElement: {color: COLOR.white}
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentViewScreen)
