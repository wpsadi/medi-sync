import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import * as SMS from 'expo-sms';
import { Client, Databases,Account, ID } from 'react-native-appwrite';


const ConnectionScreen =() => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSmsAvailable, setIsSmsAvailable] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState('Not subscribed');
  const isAvailable = false;

  useEffect(()=>{
    const checkSmsAvailability = async () => {
      const { valueOf } = await SMS.isAvailableAsync();
      setIsSmsAvailable(valueOf());
    };

    checkSmsAvailability();

    const subscription = client.subscribe('files', response => {
      console.log('Update received:', response);
      setSubscriptionStatus('Subscribed');
    });

    return () => {
      subscription(); // Unsubscribe on component unmount
    };
  },[])
  


  const client = new Client();
    client
      .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
      .setProject('67dd74f3001832f9e837') // Replace with your project ID
      .setPlatform("com.anonymous.boltexponativewind")

  // Callback function for Appwrite events
  const updateCallback = (response:unknown) => {
    console.log('Update received:', response);
    Alert.alert('Update Received', `Event type:`);
  };

  const unsubscribe = client.subscribe('files', response => {
    // Callback will be executed on changes for all files.
    
});


  // Send a dummy SMS message
  const sendDummySms = async () => {
    if (!isSmsAvailable) {
      Alert.alert('SMS Not Available', 'SMS is not available on this device');
      return;
    }
    
    try {
      const { result } = await SMS.sendSMSAsync(
        ['8929635403'], // Replace with your test number
        'Connected successfully! This is a test message from the app.'
      );
      
      console.log('SMS result:', result);
      if (result === 'sent' || result === 'unknown') {
        Alert.alert('SMS Sent', 'Notification SMS was sent successfully');
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      Alert.alert('SMS Error', 'Failed to send SMS notification');
    }
  };




  // Handle connection toggle
  const handleConnectionToggle = async () => {
    if (isConnected) {
      // Disconnect logic
      console.log('Disconnecting...');

    
      
      setTimeout(() => {
        setIsConnected(false);
        console.log('Disconnected successfully');
      }, 1000);
    } else {
      // Connect logic
      console.log('Connecting...');
    
      
      setTimeout(async () => {
        setIsConnected(true);
        console.log('Connected successfully');
        
        // Send SMS notification on successful connection
        // if (isSmsAvailable) {
        //   await sendDummySms();
        // }
      }, 1000);
    }
  };

  // Status indicator component
  const ConnectionStatus = () => (
    <View style={styles.statusContainer}>
      <View style={[styles.statusIndicator, isConnected ? styles.connected : styles.disconnected]} />
      <Text style={styles.statusText}>
        Status: {isConnected ? 'Connected' : 'Disconnected'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connection Manager</Text>
      
      <ConnectionStatus />
      
      <TouchableOpacity
        style={[styles.button, isConnected ? styles.disconnectButton : styles.connectButton]}
        onPress={handleConnectionToggle}
      >
        <Text style={styles.buttonText}>
          {isConnected ? 'Disconnect' : 'Connect'}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Connection Info</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Appwrite Events:</Text>
          <Text style={styles.infoValue}>{subscriptionStatus}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>SMS Available:</Text>
          <Text style={styles.infoValue}>{isSmsAvailable ? 'Yes' : 'No'}</Text>
        </View>
        
        {isConnected && isSmsAvailable && (
          <TouchableOpacity
            style={[styles.button, styles.smsButton]}
            onPress={sendDummySms}
          >
            <Text style={styles.buttonText}>Send Test SMS</Text>
          </TouchableOpacity>
        )}
        
        {!isSmsAvailable && (
          <Text style={styles.warningText}>
            SMS functionality is not available on this device.
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  connected: {
    backgroundColor: '#4CAF50',
  },
  disconnected: {
    backgroundColor: '#F44336',
  },
  statusText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 20,
    minWidth: 200,
    alignItems: 'center',
  },
  connectButton: {
    backgroundColor: '#2196F3',
  },
  disconnectButton: {
    backgroundColor: '#F44336',
  },
  smsButton: {
    backgroundColor: '#9C27B0',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoSection: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  warningText: {
    fontSize: 14,
    color: '#F44336',
    textAlign: 'center',
    marginTop: 15,
  },
});

export default ConnectionScreen;