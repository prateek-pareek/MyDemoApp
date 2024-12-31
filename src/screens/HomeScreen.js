import React, {useEffect, useState} from 'react'
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {fetchItems} from '../store/actions/itemActions'

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch()
  const {data: items, loading} = useSelector(state => state.items)

  // State for managing the visible items and pagination
  const [visibleItems, setVisibleItems] = useState([])
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

  useEffect(() => {
    if (items.length > 0) {
      // Update visible items when data is fetched and page changes
      setVisibleItems(items.slice(0, page * itemsPerPage))
    }
  }, [items, page])

  const loadMoreItems = () => {
    // Increment the page to load more items
    setPage(prevPage => prevPage + 1)
  }

  // If loading, show loading text
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size='large' color='#007BFF' />
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    )
  }

  // If no items, display a "No items available" message
  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.noItemsText}>No items available</Text>
      </SafeAreaView>
    )
  }

  // Regular renderItem function
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detail', {itemId: item.id})}>
      <View style={styles.cardContent}>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={visibleItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        initialNumToRender={10} // Show only 10 items initially
        maxToRenderPerBatch={10} // Render 10 items per batch
        windowSize={10} // Keep 10 items on each side
        removeClippedSubviews={true} // Improve performance
        onEndReached={loadMoreItems} // Load more items when user scrolls to the end
        onEndReachedThreshold={0.5} // Trigger onEndReached when halfway through the list
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
  },
  loadingText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 50,
    color: '#007BFF',
  },
  noItemsText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 50,
    color: '#FF5733',
  },
  list: {
    paddingTop: 20,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3, // For Android shadow
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
})

export default HomeScreen
