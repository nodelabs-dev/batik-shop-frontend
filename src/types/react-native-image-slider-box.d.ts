declare module 'react-native-image-slider-box' {
  import {Component} from 'react';
  import {ImageProps, StyleProp, ViewStyle} from 'react-native';

  interface SliderBoxProps {
    images: string[];
    onCurrentImagePressed?: (index: number) => void;
    onCurrentImagePressed?: (index: number) => void;
    currentImageEmitter?: (index: number) => void;
    parentWidth?: number;
    sliderBoxHeight?: number;
    dotColor?: string;
    inactiveDotColor?: string;
    dotStyle?: StyleProp<ViewStyle>;
    imageLoadingColor?: string;
    ImageComponent?: React.ComponentType<ImageProps>;
    firstItem?: number;
    loopClonesPerSide?: number;
    autoplay?: boolean;
    circleLoop?: boolean;
    autoplayInterval?: number;
    paginationBoxVerticalPadding?: number;
    paginationBoxStyle?: StyleProp<ViewStyle>;
    dotContainerStyle?: StyleProp<ViewStyle>;
    ImageComponentStyle?: StyleProp<ViewStyle>;
    imageLoadingStyle?: StyleProp<ViewStyle>;
    disableOnPress?: boolean;
    resizeMethod?: string;
    resizeMode?: string;
  }

  class SliderBox extends Component<SliderBoxProps> {}

  export {SliderBox};
}
