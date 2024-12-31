// src/screens/DetailScreen.js
import React, {useEffect} from 'react'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native'
import {useRoute} from '@react-navigation/native'
import {useDispatch, useSelector} from 'react-redux'
import {fetchItemDetail} from '../store/actions/itemActions'

const DetailScreen = () => {
  const dispatch = useDispatch()
  const {params} = useRoute()

  // Access item details, loading and error state from Redux store
  const {item, loading, error} = useSelector(state => state.items)

  useEffect(() => {
    if (params.itemId) {
      dispatch(fetchItemDetail(params.itemId))
    }
  }, [dispatch, params.itemId])

  // Loading State
  const renderLoading = () => (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='#3498db' />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  )

  // Error State
  const renderError = () => (
    <View style={styles.container}>
      <Text style={styles.errorText}>
        {error ? `Error: ${error}` : 'Item not found'}
      </Text>
    </View>
  )

  // No Item found state
  const renderNoItemFound = () => (
    <View style={styles.container}>
      <Text style={styles.errorText}>Item not found</Text>
    </View>
  )

  // When the item is successfully fetched
  const renderItemDetails = () => (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </ScrollView>
  )

  // Return the appropriate view based on the current state
  if (loading) return renderLoading()
  if (error || !item) return renderError()
  return renderItemDetails()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  body: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  loadingText: {
    fontSize: 18,
    color: '#3498db',
    marginTop: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
})

export default DetailScreen
