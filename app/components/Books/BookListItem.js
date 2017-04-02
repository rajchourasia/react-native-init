import React from 'react';
import { View, Text, Image } from 'react-native';

const BookListItem = (props) => {
  return (
    <View>
      { props.book.image
        && <Image style={{ width: 90, flex: 1, resizeMode: 'contain' }} source={{ url: props.book.image.default }} /> }
    </View>
  );
};

export default BookListItem;
