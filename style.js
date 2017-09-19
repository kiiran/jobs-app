import { Constants } from 'expo';
import { Dimensions, Platform } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
// const SCREEN_HEIGHT = Dimensions.get('window').height;

// ~~~COLOURS~~~
const white = '#fff';
const grey = '#333';
const darkGrey = '#222';
const primaryBlue = '#56D2C7';
const dangerRed = '#e24c4c';

export default {
  // ~~~GENERAL STYLE~~~
  flexOne: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: darkGrey,
    justifyContent: 'center',
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0
  },
  white,
  grey,
  darkGrey,
  primaryBlue,
  dangerRed,

  // ~~~CARD STYLE~~~
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  companyText: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 17,
    color: grey
  },
  daysText: {
    fontStyle: 'italic',
    fontSize: 14,
    color: grey
  },
  jobDescription: {
    marginBottom: 15
  },
  swipeInstructionsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  swipeInstruction: {
    color: '#666'
  },

  // ~~~MAP STYLE~~~
  mapButtonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  mapSearchContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0
  },

  // ~~~SLIDES STYLE~~~
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    padding: 30
  },
  slideText: {
    fontSize: 28,
    color: 'white',
    marginBottom: 15,
    textAlign: 'center'
  },
  smallInstructionText: {
    textAlign: 'center',
    fontSize: 14,
    color: white
  },

  // ~~~BUTTONS STYLE~~~
  buttonStyle: {
    backgroundColor: primaryBlue
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 10,
    right: 10
  },

  // ~~~REVIEW SCREEN~~~
  reviewScreenIconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between"
  },

  // ~~~SCREEN STYLE~~~
  flexOneDarkBG: {
    flex: 1,
    backgroundColor: darkGrey
  }
};
