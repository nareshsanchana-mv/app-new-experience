import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { allCollections, ALL_COLLECTIONS_PRICE } from '../data/manifestingCollection';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface CollectionUpsellProps {
  visible: boolean;
  onClose: () => void;
  triggerCollection?: string; // Which collection triggered this (e.g., 'longevity')
}

export default function CollectionUpsell({ visible, onClose, triggerCollection }: CollectionUpsellProps) {
  const ownedCount = allCollections.filter(c => c.owned).length;
  const showUpgradeOnly = ownedCount >= 2;

  const triggerCol = triggerCollection
    ? allCollections.find(c => c.id === triggerCollection)
    : null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {showUpgradeOnly ? 'Upgrade to All Collections' : 'Get Access'}
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {showUpgradeOnly ? (
            // Show upgrade-to-all only
            <View style={styles.upgradeCard}>
              <View style={styles.upgradeIcon}>
                <Ionicons name="diamond" size={32} color={colors.primary} />
              </View>
              <Text style={styles.upgradeTitle}>All 5 Collections</Text>
              <Text style={styles.upgradeSubtitle}>
                Access every program on Mindvalley
              </Text>
              <Text style={styles.upgradePrice}>${ALL_COLLECTIONS_PRICE}/year</Text>
              <Text style={styles.upgradeSaving}>
                Save ${allCollections.length * 299 - ALL_COLLECTIONS_PRICE} vs buying separately
              </Text>
              <TouchableOpacity style={styles.ctaButton}>
                <Text style={styles.ctaButtonText}>Upgrade Now</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {/* Show triggered collection first */}
              {triggerCol && !triggerCol.owned && (
                <View style={styles.collectionCard}>
                  <View style={styles.collectionHeader}>
                    <View style={styles.collectionIconWrapper}>
                      <Ionicons name="albums-outline" size={24} color={colors.primary} />
                    </View>
                    <View style={styles.collectionInfo}>
                      <Text style={styles.collectionName}>{triggerCol.name}</Text>
                      <Text style={styles.collectionMeta}>
                        {triggerCol.programCount} programs
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.collectionPrice}>${triggerCol.price}/year</Text>
                  <TouchableOpacity style={styles.ctaButton}>
                    <Text style={styles.ctaButtonText}>Get This Collection</Text>
                  </TouchableOpacity>
                </View>
              )}

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* All collections upgrade */}
              <View style={[styles.collectionCard, styles.allCollectionsCard]}>
                <View style={styles.bestValueBadge}>
                  <Text style={styles.bestValueText}>BEST VALUE</Text>
                </View>
                <View style={styles.collectionHeader}>
                  <View style={[styles.collectionIconWrapper, { backgroundColor: `${colors.primary}20` }]}>
                    <Ionicons name="diamond" size={24} color={colors.primary} />
                  </View>
                  <View style={styles.collectionInfo}>
                    <Text style={styles.collectionName}>All 5 Collections</Text>
                    <Text style={styles.collectionMeta}>
                      {allCollections.reduce((sum, c) => sum + c.programCount, 0)}+ programs
                    </Text>
                  </View>
                </View>
                <Text style={styles.collectionPrice}>${ALL_COLLECTIONS_PRICE}/year</Text>
                <TouchableOpacity style={[styles.ctaButton, styles.ctaButtonPrimary]}>
                  <Text style={styles.ctaButtonText}>Get All Collections</Text>
                </TouchableOpacity>
              </View>

              {/* List all collections */}
              <Text style={styles.includesTitle}>Includes:</Text>
              {allCollections.map((col) => (
                <View key={col.id} style={styles.collectionListItem}>
                  <Ionicons
                    name={col.owned ? 'checkmark-circle' : 'ellipse-outline'}
                    size={20}
                    color={col.owned ? '#28a745' : colors.textMuted}
                  />
                  <Text style={[styles.collectionListName, col.owned && styles.collectionListOwned]}>
                    {col.name}
                  </Text>
                  <Text style={styles.collectionListCount}>{col.programCount} programs</Text>
                  {col.owned && (
                    <View style={styles.ownedBadge}>
                      <Text style={styles.ownedBadgeText}>Owned</Text>
                    </View>
                  )}
                </View>
              ))}
            </>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  collectionCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  allCollectionsCard: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  bestValueBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: colors.primary,
    borderRadius: 12,
    marginBottom: 12,
  },
  bestValueText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
  },
  collectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  collectionIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  collectionInfo: {
    flex: 1,
  },
  collectionName: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  collectionMeta: {
    ...typography.caption,
    color: colors.textMuted,
  },
  collectionPrice: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaButtonPrimary: {
    backgroundColor: colors.primary,
  },
  ctaButtonText: {
    ...typography.label,
    color: '#fff',
    fontWeight: '700',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  includesTitle: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: 12,
    marginTop: 8,
  },
  collectionListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  collectionListName: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
  },
  collectionListOwned: {
    color: colors.textSecondary,
  },
  collectionListCount: {
    ...typography.caption,
    color: colors.textMuted,
  },
  ownedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#d4edda',
    borderRadius: 8,
  },
  ownedBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#155724',
  },
  upgradeCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  upgradeIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  upgradeTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  upgradeSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  upgradePrice: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: 4,
  },
  upgradeSaving: {
    ...typography.caption,
    color: '#28a745',
    marginBottom: 20,
  },
});
