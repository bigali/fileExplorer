import React from 'react'
import {ActivityIndicator, FlatList, SafeAreaView, Text, View} from 'react-native'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RNFS from 'react-native-fs'
import FileViewer from 'react-native-file-viewer'
// Styles
import styles from './Styles/FilesListStyle'
import {ActionButton, ListItem, Toolbar} from 'react-native-material-ui'
import Colors from '../Themes/Colors'
// More info here: https://facebook.github.io/react-native/docs/flatlist.html
import FileSystemActions from '../Redux/FileSystemRedux'
import _ from 'lodash'

const TypesIcon = {
  'inode/directory': 'folder',
  'image/jpg': 'file-image',
  'image/jpeg': 'file-image',
  'image/png': 'file-image',
  'image/gif': 'file-image',
  'video/mp4': 'file-video',
  'audio/mpeg': 'file-music',
  'text/plain': 'file-document',
  'application/pdf': 'file-pdf',
  'application/vnd.ms-powerpoint': 'file-powerpoint',
  'application/vnd.ms-excel': 'file-excel'
}

class FilesList extends React.Component {
  static navigationOptions = {
    header: null
  }

  renderAppHeader = () => {
    const params = this.props.navigation.state.params
    if (params) {
      return (<Toolbar
        leftElement='arrow-back'
        onLeftElementPress={() => this.props.navigation.navigate('FilesList', null)}
        centerElement={
          <View>
            <Text style={{color: Colors.snow, fontWeight: 'bold', fontSize: 18}}>
              {params.name}
            </Text>
            <Text style={{color: Colors.snow}}>
              {params.path}
            </Text>
          </View>}
        searchable={{
          autoFocus: true,
          placeholder: 'Search',
          onChangeText: value => this.setState({searchText: value, dataObjects: this.searchFiles(value)}),
          onSearchClosed: () => this.setState({searchText: '', dataObjects: this.props.files})
        }}
      />)
    } else {
      return (<Toolbar
        centerElement={
          <View>
            <Text style={{color: Colors.snow, fontWeight: 'bold', fontSize: 18}}>
                My drive
              </Text>
            <Text style={{color: Colors.snow}}>
                /
              </Text>
          </View>}
        searchable={{
          autoFocus: true,
          placeholder: 'Search',
          onChangeText: value => this.setState({searchText: value, dataObjects: this.searchFiles(value)}),
          onSearchClosed: () => this.setState({searchText: '', dataObjects: this.props.files})
        }}
        />
      )
    }
  }

  searchFiles = (filter) => {
    return _.filter(this.props.files, (o) => {
      console.log('files name: ', o)
      return o.name.includes(filter)
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      dataObjects: [],
      selectedItem: '',
      swipeToClose: true,
      modalOpen: false,
      visible: false,
      refreshing: false
    }
  }

  _handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this._getData()
    })
  }

  _getData = () => {
    const {navigation, fileSystemRequest} = this.props
    const params = navigation.state.params

    const node = params ? params.path : ''
    fileSystemRequest(node)
  }

  componentWillReceiveProps (nextProps) {
    console.log('received props: ', nextProps)
    this.setState({
      dataObjects: nextProps.files,
      refreshing: false
    })
  }

  componentWillMount () {
    console.log('will mount')
    this._getData()
  }

  componentDidMount () {
    console.log('did mount')
  }

  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/

  getLocalPath = (url) => {
    const filename = url.split('/').pop()
    // feel free to change main path according to your requirements
    return `${RNFS.DocumentDirectoryPath}/${filename}`
  }

  openfile = (url) => {
    const localFile = this.getLocalPath(url)

    const options = {
      fromUrl: url,
      toFile: localFile
    }
    this.setState({
      visible: true
    })
    RNFS.downloadFile(options).promise
      .then(() => FileViewer.open(localFile))
      .then(() => {
        // success
        console.log('sucess')
        this.setState({
          visible: false
        })
      })
      .catch(error => {
        // error
        console.log('false', error)
        this.setState({
          visible: false
        })
      })
  }

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow = ({item}) => {
    const {navigation} = this.props
    const time = item.modification_time * 1000
    const date = new Date(time)
    const myIcon = (<Icon name={TypesIcon[item.mimetype]} size={30} />)

    const formatedDate = date.toLocaleDateString('fr-FR', {year: 'numeric', month: 'long', day: 'numeric'})
    return (
      <ListItem
        onPress={() => {
          if (item.mimetype === 'inode/directory') {
            navigation.navigate('FilesList', item)
          } else if (item.mimetype.includes('image/') || item.mimetype.includes('video/') || item.mimetype.includes('audio/')) {
            navigation.navigate('DocumentViewScreen', item)
          } else {
            console.log('open fillesss')
            this.openfile(item.url)
          }
        }}
        divider
        leftElement={myIcon}
        centerElement={{
          primaryText: item.name,
          secondaryText: `modifié: ${formatedDate}`
        }}
      />
    )
  }

  renderHea
  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> - Nothing to See Here - </Text>
  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  render () {
    console.log(this.props)
    return (
      <SafeAreaView style={styles.container}>
        {this.renderAppHeader()}
        {(this.props.fetching && !this.state.refreshing)
          ? <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <ActivityIndicator size='large' color={Colors.primary} />
          </View>
          : <View style={{flex: 1}}>
            <FlatList
              contentContainerStyle={styles.listContent}
              data={this.state.dataObjects}
              renderItem={this.renderRow}
              keyExtractor={this.keyExtractor}
              initialNumToRender={this.oneScreensWorth}
              ListEmptyComponent={this.renderEmpty}
              refreshing={this.state.refreshing}
              onRefresh={this._handleRefresh}
            />
            <ActionButton
              actions={[{icon: 'file-upload', label: 'file upload'}, {
                icon: 'create-new-folder',
                label: 'create new folder'
              }]}
              icon='add'
              transition='speedDial'
            />
          </View>
        }

      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    nav: state.nav,
    files: state.filesystem.payload,
    fetching: state.filesystem.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fileSystemRequest: (node) => dispatch(FileSystemActions.fileSystemRequest(node))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilesList)
