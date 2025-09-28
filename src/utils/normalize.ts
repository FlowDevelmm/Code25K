
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const scale = width / 375;

export const normalize = (size: number) => size * scale;
