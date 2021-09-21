import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/color';
import STYLES from '../../styles';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

function SignUpScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  if(loading){
    return <ActivityIndicator size="small" color="#0000ff" />
  }

  const userSignUp = async () =>{
    setLoading(true)
    if(!email || !password ||!name){
      Alert.alert("Please enter required field..")
      return
    }

   try{
    const result = await auth().createUserWithEmailAndPassword(email,password);
    firestore().collection('users').doc(result.user.uid).set({
      userId: result.user.uid,
      email: result.user.email,
      password:password,
      name: name
    })
    setLoading(false)
   }
   catch{
      Alert.alert("Something Went wrong...")
   }
   
  }

  return (
    <SafeAreaView
      style={{paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', marginTop: 40}}>
          <Text style={{fontWeight: 'bold', fontSize: 22, color: COLORS.dark}}>
            Bit
          </Text>
          <Text
            style={{fontWeight: 'bold', fontSize: 22, color: COLORS.secondary}}>
            Brothers
          </Text>
        </View>
        <View style={{marginTop: 70}}>
          <Text style={{fontSize: 27, fontWeight: 'bold', color: COLORS.dark}}>
            Welcome,
          </Text>
          <Text style={{fontSize: 19, fontWeight: 'bold', color: COLORS.light}}>
            Sign up to continue
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <View style={STYLES.inputContainer}>
            <Icon
              name="person-outline"
              color={COLORS.light}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput
              placeholder="Email"
              style={STYLES.input}
              onChangeText={text => setEmail(text)}
              value={email}
            />
          </View>
          <View style={STYLES.inputContainer}>
            <Icon
              name="mail-outline"
              color={COLORS.light}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput
              placeholder="Password"
              style={STYLES.input}
              onChangeText={text => setPassword(text)}
              value={password}
            />
          </View>
          <View style={STYLES.inputContainer}>
            <Icon
              name="lock-outline"
              color={COLORS.light}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput
              placeholder="Name"
              style={STYLES.input}
              secureTextEntry
              onChangeText={text => setName(text)}
              value={name}
            />
          </View>
          <TouchableOpacity
            onPress={()=>userSignUp()}>
            <View style={STYLES.btnPrimary}>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
                Sign Up
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={STYLES.line}></View>
            <Text style={{marginHorizontal: 5, fontWeight: 'bold'}}>OR</Text>
            <View style={STYLES.line}></View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={STYLES.btnSecondary}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                Sign up with
              </Text>
              <Image
                style={STYLES.btnImage}
                source={require('../../assests/facebook.png')}
              />
            </View>
            <View style={{width: 10}}></View>
            <View style={STYLES.btnSecondary}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                Sign up with
              </Text>
              <Image
                style={STYLES.btnImage}
                source={require('../../assests/google.png')}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginTop: 40,
            marginBottom: 20,
          }}>
          <Text style={{color: COLORS.light, fontWeight: 'bold'}}>
            Already have an account ?
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: COLORS.pink, fontWeight: 'bold'}}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignUpScreen;
