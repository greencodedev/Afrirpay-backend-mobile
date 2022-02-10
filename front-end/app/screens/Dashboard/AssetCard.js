import React, {useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SpikeImg from '../../assets/images/Spike.png';
import SendImg from '../../assets/images/F_Send.png';
import ReceiveImg from '../../assets/images/F_Receive.png';
import DepositImg from '../../assets/images/F_Deposit.png';
import WithDrawImg from '../../assets/images/F_WithDraw.png';
import DividerImg from '../../assets/images/Divider.png';

const lists = [
  {
    id: 1,
    title: 'Send',
    image: SendImg,
  },
  {
    id: 2,
    title: 'Receive',
    image: ReceiveImg,
  },
  {
    id: 3,
    title: 'Deposit',
    image: DepositImg,
  },
  {
    id: 4,
    title: 'Withdraw',
    image: WithDrawImg,
  },
];

const AssetCard = () => {
  const [selectedTab, setTab] = useState(1);
  const label = selectedTab === 1 ? 'Current Balance' : 'Total Assets Value';
  const value = selectedTab === 1 ? '76.451,00' : '3.123';
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#8B16FF', '#125FD2']}
        locations={[0.4, 1]}
        style={styles.gradientContainer}>
        <ImageBackground
          source={SpikeImg}
          style={styles.bgImage}
          resizeMode="contain">
          <View style={styles.rowContent}>
            <TouchableOpacity
              onPress={() => setTab(1)}
              style={[
                styles.tab,
                {backgroundColor: selectedTab === 1 ? 'black' : 'transparent'},
              ]}>
              <Text style={styles.tabText}>USD</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTab(2)}
              style={[
                styles.tab,
                {backgroundColor: selectedTab === 2 ? 'black' : 'transparent'},
              ]}>
              <Text style={styles.tabText}>CRY</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.labelText}>{label}</Text>
          <Text style={styles.valueText}>{value}</Text>
          <Image
            source={DividerImg}
            resizeMode="cover"
            style={styles.dividerImg}
          />
        </ImageBackground>
      </LinearGradient>
      <View style={styles.functionCardsContainer}>
        {lists.map(item => (
          <View key={item.id} style={styles.functionCard}>
            <Image source={item.image} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default AssetCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
  },
  gradientContainer: {
    borderRadius: 6,
    paddingVertical: 15,
  },
  bgImage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    justifyContent: 'center',
  },
  rowContent: {
    display: 'flex',
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 10,
    width: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
    lineHeight: 14,
  },
  labelText: {
    fontSize: 12,
    color: '#D4EFFF',
  },
  valueText: {
    fontSize: 34,
    letterSpacing: 0.01,
    color: 'white',
    fontWeight: '700',
  },
  dividerImg: {
    marginVertical: 10,
  },
  functionCardsContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  functionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 28,
    height: 28,
  },
  title: {
    fontSize: 12,
    color: '#4E5C80',
    marginTop: 10,
  },
});
