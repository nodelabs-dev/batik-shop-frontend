import {ImageSourcePropType} from 'react-native';

interface Images {
  'batik-1.png': ImageSourcePropType;
  'batik-2.png': ImageSourcePropType;
  'batik-3.png': ImageSourcePropType;
  'batik-4.png': ImageSourcePropType;
  'batik-5.png': ImageSourcePropType;
}

const images: Images = {
  'batik-1.png': require('./batik-1.png'),
  'batik-2.png': require('./batik-2.png'),
  'batik-3.png': require('./batik-3.png'),
  'batik-4.png': require('./batik-4.png'),
  'batik-5.png': require('./batik-5.png'),
};

export default images;
