import React from 'react'
import {View, Text, FlatList, SafeAreaView} from 'react-native'
import { connect } from 'react-redux'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/FilesListStyle'
import {Toolbar, ListItem} from 'react-native-material-ui'

class FilesList extends React.PureComponent {
  static navigationOptions = {
    header: <Toolbar
      centerElement='/'
      searchable={{
        autoFocus: true,
        placeholder: 'Search'
      }}
    />
  }

  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
  state = {
    dataObjects: [
      {
        'id': 1,
        'name': 'Wallpapers',
        'mimetype': 'inode/directory',
        'size': 1,
        'modification_time': 1515444952,
        'path': '/wallpapers'
      },
      {
        'id': 2,
        'name': 'Starry Night',
        'mimetype': 'image/jpg',
        'size': 263752,
        'modification_time': 1515622647,
        'url': 'https://images.unsplash.com/photo-1518239295416-eca75302abb7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b48d0ef09fb418165e1d234551c4b0b1&auto=format&fit=crop&w=1307&q=80'
      },
      {
        'id': 3,
        'name': 'Cheers',
        'mimetype': 'image/png',
        'size': 204009,
        'modification_time': 1515628374,
        'url': 'https://cdn.dribbble.com/users/327319/screenshots/4453188/cheers.png'
      },
      {
        'id': 4,
        'name': 'Big Buck Bunny',
        'mimetype': 'video/mp4',
        'size': 64592281,
        'modification_time': 1515617899,
        'url': 'http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4'
      },
      {
        'id': 5,
        'name': 'Sounds',
        'mimetype': 'inode/directory',
        'size': 1,
        'modification_time': 1515454922,
        'path': '/sounds'
      },
      {
        'id': 6,
        'name': 'Fluent Design System',
        'mimetype': 'image/png',
        'size': 220092,
        'modification_time': 1515617887,
        'url': 'https://cdn.dribbble.com/users/1766682/screenshots/4441315/fluent_dribbble_post_800x600.png'
      },
      {
        'id': 7,
        'name': 'Night City',
        'mimetype': 'image/png',
        'size': 356867,
        'modification_time': 1515613211,
        'url': 'https://cdn.dribbble.com/users/646147/screenshots/4454375/city-night.png'
      },
      {
        'id': 8,
        'name': 'Daydreaming',
        'mimetype': 'audio/mpeg',
        'size': 347222,
        'modification_time': 1515613211,
        'url': 'http://soundbible.com/mp3/Tinkle-Lisa_Redfern-1916445296.mp3'
      },
      {
        'id': 9,
        'name': 'Documents',
        'mimetype': 'inode/directory',
        'size': 1,
        'modification_time': 1515446539,
        'path': '/documents'
      },
      {
        'id': 10,
        'name': 'Cat',
        'mimetype': 'image/gif',
        'size': 454763,
        'modification_time': 1515448463,
        'url': 'https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif'
      }

    ]
  }

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow ({item}) {
    return (
      <ListItem
        divider
        leftElement='folder'
        centerElement={{
          primaryText: item.name,
          secondaryText: `modifié: ${item.modification_time}`
        }}
      />
    )
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?
  renderHeader = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Header - </Text>

  // Render a footer?
  renderFooter = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> - Nothing to See Here - </Text>

  renderSeparator = () =>
    <Text style={styles.label}> - ~~~~~ - </Text>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListEmptyComponent={this.renderEmpty}
        />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilesList)
