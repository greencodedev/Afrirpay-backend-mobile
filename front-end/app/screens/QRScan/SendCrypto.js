import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {LineChart} from 'react-native-chart-kit';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ChevronLeft, IconlyProvider} from 'react-native-iconly';
import {LinearGradient} from 'react-native-linear-gradient';

import {getCoinMarket} from '../stores/market/marketActions';
import * as helper from '../helpers/helperFunctions';
import TextButton from '../components/TextButton';
import {constants, COLORS, FONTS, SIZES, icons} from '../constants';

const Tabs = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      {/* Tabs */}
      {constants.marketTabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`MarketTab-${index}`}
            style={{
              flex: 1,
            }}>
            <View
              ref={item.ref}
              style={{
                paddingHorizontal: 15,
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
              }}>
              <Text style={{color: COLORS.black, ...FONTS.h3}}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Market = ({getCoinMarket, coins}) => {
  //const scrollX = React.useRef(new Animated.value(0)).current;

  React.useEffect(() => {
    getCoinMarket();
  }, []);

  function backButton() {
    return (
      <TouchableOpacity
        style={{
          padding: 15,
          paddingLeft: 20,
        }}
        // onPress={() => {
        //     helper.navigateTo('Market', 'Home');
        // }}
      >
        {' '}
        <IconlyProvider
          set="light"
          primaryColor={COLORS.primary}
          secondaryColor="blue"
          stroke="bold"
          size="small">
          <ChevronLeft set="bold" primaryColor={COLORS.primary} />
        </IconlyProvider>
      </TouchableOpacity>
    );
  }

  function cryptoDB() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#8B16FF', 'purple']}
          locations={[0.4, 1]}
          style={styles.gradientContainer}>
          <View style={styles.header}>
            <Text
              style={{
                color: COLORS.white,
                marginLeft: 16,
                fontWeight: 700,
                marginBottom: 7,
              }}>
              Portfolio
            </Text>
          </View>
          <View style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              <View style={{flex: 1, marginLeft: 17, height: 50, width: 100}}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontWeight: 'bold',
                    fontSize: 9,
                  }}>
                  Holding value
                </Text>
                <Text
                  style={{
                    color: COLORS.white,
                    fontWeight: 'bold',
                    fontSize: 18,
                    ...FONTS.h3,
                  }}>
                  $1,000,000
                </Text>
              </View>
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: 'bold',
                  fontSize: 9,
                  position: 'absolute',

                  marginLeft: 90,
                  marginTop: 20,
                }}>
                {' '}
                12.5%
              </Text>{' '}
            </View>
            <View
              style={{flex: 1, flexDirection: 'row', alignContent: 'flex-end'}}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  borderRightColor: COLORS.white,
                  maxWidth: 150,
                  borderColor: 'transparent',
                  borderWidth: 1,
                }}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 10,
                    fontWeight: 200,
                    marginLeft: 17,
                    marginBottom: 5,
                  }}>
                  {' '}
                  Investment value{' '}
                </Text>
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 17,
                    fontWeight: 400,
                    marginLeft: 17,
                    marginBottom: 5,
                  }}>
                  {' '}
                  $1,618.75{' '}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'baseline',
                  justifyContent: 'baseline',
                }}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 10,
                    fontWeight: 200,
                    marginLeft: 17,
                    marginBottom: 5,
                  }}>
                  {' '}
                  Investment value{' '}
                </Text>
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 17,
                    fontWeight: 400,
                    marginLeft: 17,
                    marginBottom: 5,
                  }}>
                  {' '}
                  $1589{' '}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }

  function renderText() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            marginTop: 20,
            marginLeft: 10,
            fontSize: 16,
            color: 'black',
          }}>
          {' '}
          Your Coins
        </Text>
      </View>
    );
  }

  function renderList() {
    return (
      <View
        style={{
          flex: 1,
          width: SIZES.width,
          marginTop: 20,
        }}>
        <FlatList
          data={coins}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            let priceColor =
              item.price_change_percentage_7d_in_currency == 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red;

            return (
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: SIZES.padding,
                  marginBottom: SIZES.radius,
                }}>
                {/* Coins */}
                <View
                  style={{
                    flex: 1.5,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />

                  <Text
                    style={{
                      marginLeft: SIZES.radius,
                      color: COLORS.black,
                      ...FONTS.h3,
                    }}>
                    {item.name}
                  </Text>
                </View>

                {/* Line Chart */}
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <LineChart
                    withVerticalLabels={false}
                    withHorizontalLabels={false}
                    withDots={false}
                    withOuterLines={false}
                    withInnerLines={false}
                    withVerticalLines={false}
                    data={{
                      datasets: [
                        {
                          data: item.sparkline_in_7d.price,
                        },
                      ],
                    }}
                    width={100}
                    height={60}
                    chartConfig={{
                      backgroundGradientFrom: 'transparent',
                      backgroundGradientTo: 'transparent',
                      color: (opacity = 1) => `green`,
                    }}
                    bezier
                    style={{
                      paddingRight: 0,
                      backgroundColor: 'transparent',
                    }}></LineChart>
                </View>

                {/* Figures */}
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      ...FONTS.h4,
                    }}>
                    $ {helper.formatToCurrency(item.current_price)}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    {item.price_change_percentage_7d_in_currency != 0 && (
                      <Image
                        source={icons.upArrow}
                        style={{
                          height: 10,
                          width: 10,
                          tintColor: priceColor,
                          transform:
                            item.price_change_percentage_7d_in_currency > 0
                              ? [
                                  {
                                    rotate: '0deg',
                                  },
                                ]
                              : [
                                  {
                                    rotate: '180deg',
                                  },
                                ],
                        }}
                      />
                    )}

                    <Text
                      style={{
                        marginLeft: 5,
                        color: priceColor,
                        ...FONTS.body5,
                      }}>
                      {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        {backButton()}

        {/* Portfolio something */}
        {cryptoDB()}

        {/* your coins Text */}
        {renderText()}

        {/* Market List */}
        {renderList()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
  },
  gradientContainer: {
    borderRadius: 6,
    paddingVertical: 15,
    height: 160,
    borderRadius: 5,
  },
});

function mapStateToProps(state) {
  return {
    coins: state.coins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCoinMarket: () => {
      return dispatch(getCoinMarket());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Market);
