import React from 'react';
import PropTypes from 'prop-types';
import { SectionList, Image, StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';

const RenderSectionHeader = ({ section }) => <SectionHeader title={section.title} />;
RenderSectionHeader.propTypes = { section: PropTypes.string.isRequired };

const RenderItem = ({ item }) =>
  item.type === 'color' ? (
    <SectionContent>{item.value && <Color value={item.value} />}</SectionContent>
  ) : (
    <SectionContent>
      <Text style={styles.sectionContentText}>{item.value}</Text>
    </SectionContent>
  );
RenderItem.propTypes = { item: PropTypes.shape({ type: PropTypes.string }).isRequired };

const Settings = ({ connected }) => {
  const { manifest } = Constants;
  const sections = [
    { data: [{ value: connected ? 'yes' : 'no' }], title: 'connected?' },
    { data: [{ value: manifest.version }], title: 'version' },
    { data: [{ value: manifest.orientation }], title: 'orientation' },
    {
      data: [{ value: manifest.primaryColor, type: 'color' }],
      title: 'primaryColor'
    },
    {
      data: [{ value: manifest.splash && manifest.splash.image }],
      title: 'splash.image'
    },
    {
      data: [
        {
          value: manifest.splash && manifest.splash.backgroundColor,
          type: 'color'
        }
      ],
      title: 'splash.backgroundColor'
    },
    {
      data: [
        {
          value: manifest.splash && manifest.splash.resizeMode
        }
      ],
      title: 'splash.resizeMode'
    }
  ];

  return (
    <SectionList
      style={styles.container}
      renderItem={RenderItem}
      renderSectionHeader={RenderSectionHeader}
      stickySectionHeadersEnabled={true}
      keyExtractor={(item, index) => index}
      ListHeaderComponent={ListHeader}
      sections={sections}
    />
  );
};

Settings.propTypes = { connected: PropTypes.bool };
Settings.defaultProps = { connected: false };

export default Settings;

const ListHeader = () => {
  const { manifest } = Constants;

  return (
    <View style={styles.titleContainer}>
      <View style={styles.titleIconContainer}>
        <AppIconPreview iconUrl={manifest.iconUrl} />
      </View>

      <View style={styles.titleTextContainer}>
        <Text style={styles.nameText} numberOfLines={1}>
          {manifest.slug}
        </Text>

        <Text style={styles.descriptionText}>{manifest.description}</Text>
      </View>
    </View>
  );
};

const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeaderContainer}>
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </View>
);
SectionHeader.propTypes = { title: PropTypes.string.isRequired };

const SectionContent = ({ children }) => (
  <View style={styles.sectionContentContainer}>{children}</View>
);
SectionContent.propTypes = { children: PropTypes.node.isRequired };

const AppIconPreview = ({ iconUrl }) => (
  <Image source={{ uri: iconUrl }} style={styles.appIcon} resizeMode="cover" />
);
AppIconPreview.propTypes = { iconUrl: PropTypes.string.isRequired };

const Color = ({ value }) =>
  value ? (
    <View style={styles.colorContainer}>
      <View style={[styles.colorPreview, { backgroundColor: value }]} />
      <View style={styles.colorTextContainer}>
        <Text style={styles.sectionContentText}>{value}</Text>
      </View>
    </View>
  ) : (
    <View />
  );
Color.propTypes = { value: PropTypes.string };
Color.defaultProps = { value: undefined };

const styles = StyleSheet.create({
  appIcon: {
    height: 64,
    width: 64
  },
  colorContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  colorPreview: {
    borderColor: '#ccc',
    borderRadius: 2,
    borderWidth: StyleSheet.hairlineWidth,
    height: 17,
    marginRight: 6,
    width: 17
  },
  colorTextContainer: {
    flex: 1
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    marginTop: 30
  },
  descriptionText: {
    color: '#4d4d4d',
    fontSize: 14,
    marginTop: 6
  },
  nameText: {
    fontSize: 18,
    fontWeight: '600'
  },
  sectionContentContainer: {
    paddingBottom: 12,
    paddingHorizontal: 15,
    paddingTop: 8
  },
  sectionContentText: {
    color: '#808080',
    fontSize: 14
  },
  sectionHeaderContainer: {
    backgroundColor: '#fbfbfb',
    borderColor: '#ededed',
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 15,
    paddingVertical: 8
  },
  sectionHeaderText: {
    fontSize: 14
  },
  titleContainer: {
    flexDirection: 'row',
    paddingBottom: 15,
    paddingHorizontal: 15,
    paddingTop: 15
  },
  titleIconContainer: {
    marginRight: 15,
    paddingTop: 2
  }
});
