import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';
import { Image } from 'expo-image';
import slide1 from '@/assets/slide-1.jpg';
import slide2 from '@/assets/slide-2.jpg';
import slide3 from '@/assets/slide-3.jpg';
import slide4 from '@/assets/slide-4.jpg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const slides = [slide1, slide2, slide3, slide4];
const CARD_WIDTH = SCREEN_WIDTH - 32;

export const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * CARD_WIDTH,
        animated: true,
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToPrevious = () => {
    const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    scrollViewRef.current?.scrollTo({
      x: prevIndex * CARD_WIDTH,
      animated: true,
    });
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(nextIndex);
    scrollViewRef.current?.scrollTo({
      x: nextIndex * CARD_WIDTH,
      animated: true,
    });
  };

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / CARD_WIDTH);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {slides.map((slide, index) => (
          <Image
            key={index}
            source={slide}
            style={styles.slide}
            contentFit="cover"
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[styles.navButton, styles.leftButton]}
        onPress={goToPrevious}
      >
        <Ionicons name="chevron-back" size={24} color={colors.foreground} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navButton, styles.rightButton]}
        onPress={goToNext}
      >
        <Ionicons name="chevron-forward" size={24} color={colors.foreground} />
      </TouchableOpacity>

      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              index === currentIndex && styles.dotActive,
            ]}
            onPress={() => {
              setCurrentIndex(index);
              scrollViewRef.current?.scrollTo({
                x: index * CARD_WIDTH,
                animated: true,
              });
            }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 256,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  scrollView: {
    height: '100%',
  },
  scrollContent: {
    alignItems: 'center',
  },
  slide: {
    width: CARD_WIDTH,
    height: '100%',
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  leftButton: {
    left: 8,
  },
  rightButton: {
    right: 8,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 16,
    left: '50%',
    flexDirection: 'row',
    gap: 8,
    transform: [{ translateX: -40 }],
    zIndex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  dotActive: {
    width: 32,
    backgroundColor: colors.primary,
  },
});
