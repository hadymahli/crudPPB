import React from 'react';
import { View, StyleSheet } from 'react-native';

const UI2 = () => {
  return (
    <View style={styles.container}>
      {/* Bar Atas (Hitam dan Merah) */}
      <View style={styles.topBars}>
        <View style={styles.blackBar1} />
        <View style={styles.redBar} />
        <View style={styles.blackBar2} />
      </View>

      {/* Donut Chart Style */}
      <View style={styles.donutOuter}>
        <View style={styles.donutMiddle}>
          <View style={styles.donutInner} />
        </View>
      </View>

      {/* Bar Chart */}
      <View style={styles.barChart}>
        <View style={styles.column}>
          <View style={[styles.bar, { height: 100, backgroundColor: '#f9caca' }]} />
          <View style={[styles.bar, { height: 40, backgroundColor: '#90ee90' }]} />
        </View>
        <View style={styles.column}>
          <View style={[styles.bar, { height: 80, backgroundColor: '#d3d3d3' }]} />
          <View style={[styles.bar, { height: 50, backgroundColor: '#a9a9a9' }]} />
        </View>
        <View style={styles.column}>
          <View style={[styles.bar, { height: 60, backgroundColor: '#c0a080' }]} />
          <View style={[styles.bar, { height: 30, backgroundColor: '#c0a080' }]} />
        </View>
        <View style={styles.column}>
          <View style={[styles.bar, { height: 40, backgroundColor: '#90ee90' }]} />
          <View style={[styles.bar, { height: 110, backgroundColor: '#f9caca' }]} />
        </View>
      </View>
    </View>
  );
};

export default UI2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  topBars: {
    width: '100%',
    marginBottom: 20,
  },
  blackBar1: {
    height: 15,
    width: 80,
    backgroundColor: '#000',
    marginBottom: 10,
    borderRadius: 4,
  },
  redBar: {
    height: 15,
    width: 60,
    backgroundColor: '#fc2a0d',
    marginBottom: 10,
    borderRadius: 4,
  },
  blackBar2: {
    height: 15,
    width: 30,
    backgroundColor: '#000',
    borderRadius: 4,
  },
  donutOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fcd93d',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  donutMiddle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fc2a0d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fce697',
  },
  barChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  column: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 150,
    flex: 1,
  },
  bar: {
    width: 30,
    margin: 4,
    borderRadius: 6,
  },
});
