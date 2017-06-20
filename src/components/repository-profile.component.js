import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

import { colors } from 'config';

type Props = {
  repository: Object,
  starred: boolean,
  navigation: Object
};

export const RepositoryProfile = ({
  repository,
  starred,
  navigation
}: Props) => (
  <View style={styles.container}>
    {repository &&
      <View>
        <View style={styles.profile}>
          <Icon
            containerStyle={[
              styles.icon,
              repository.fork ? { marginLeft: 17 } : { marginLeft: 13 }
            ]}
            name={repository.fork ? 'repo-forked' : 'repo'}
            type="octicon"
            size={45}
            color={colors.greyLight}
          />

          <Text style={styles.title}>{repository.name}</Text>

          <Text style={[styles.subtitle, styles.subtitleDescription]}>
            {repository.description}
          </Text>

          {repository.fork &&
            <Text style={[styles.subtitle, styles.subtitleFork]}>

              {repository.parent &&
                <Text>
                  <Text>forked from</Text>
                  <Text
                    style={{ fontWeight: 'bold' }}
                    onPress={() =>
                      navigation.navigate('Repository', {
                        repository: repository.parent
                      })}
                  >
                    {' '}{repository.parent.full_name}
                  </Text>
                </Text>}

            </Text>}
        </View>

        <View style={styles.details}>

          <View style={styles.unit}>
            <Text style={[styles.unitNumber, starred && styles.green]}>
              {repository.stargazers_count}
            </Text>
            <Text style={styles.unitText}>
              Stars
            </Text>
          </View>

          <View style={styles.unit}>
            <Text style={styles.unitNumber}>
              {repository.forks}
            </Text>
            <Text style={styles.unitText}>Forks</Text>
          </View>
        </View>
      </View>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  darkenContainer: {
    backgroundColor: 'rgba(0,0,0,.6)'
  },
  profile: {
    flex: 2,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: colors.white,
    fontFamily: 'AvenirNext-Bold',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
    backgroundColor: 'transparent'
  },
  subtitle: {
    color: colors.white,
    fontFamily: 'AvenirNext-Medium',
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'transparent'
  },
  subtitleDescription: {
    textAlign: 'center'
  },
  subtitleFork: {
    marginTop: 20,
    fontSize: 12
  },
  details: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    minWidth: 300
  },
  unit: {
    flex: 1
  },
  unitNumber: {
    textAlign: 'center',
    color: colors.white,
    fontFamily: 'AvenirNext-Bold',
    fontSize: 18,
    fontWeight: 'bold'
  },
  unitText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 12,
    fontFamily: 'AvenirNext-Medium'
  },
  green: {
    color: colors.lightGreen
  },
  icon: {
    paddingBottom: 20
  }
});
