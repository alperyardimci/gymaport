import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ConsentRecord, ConsentDocumentType } from '@/types';

const CONSENT_KEY = '@gymaport_consents';

const REQUIRED_CONSENTS: ConsentDocumentType[] = [
  'membership_terms',
  'kvkk_notice',
  'health_data_consent',
];

interface ConsentState {
  records: Partial<Record<ConsentDocumentType, ConsentRecord>>;
  hasCompletedRequiredConsents: boolean;

  recordConsent: (type: ConsentDocumentType, status: 'accepted' | 'declined') => void;
  withdrawConsent: (type: ConsentDocumentType) => void;
  checkRequired: () => boolean;
  loadFromStorage: () => Promise<void>;
  clearConsents: () => void;
}

export const useConsentStore = create<ConsentState>((set, get) => ({
  records: {},
  hasCompletedRequiredConsents: false,

  recordConsent: (type, status) => {
    const record: ConsentRecord = {
      id: `${type}_${Date.now()}`,
      userId: '',
      documentType: type,
      documentVersion: '1.0.0',
      status,
      acceptedAt: status === 'accepted' ? new Date().toISOString() : undefined,
      declinedAt: status === 'declined' ? new Date().toISOString() : undefined,
      method: 'checkbox',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => {
      const updated = { ...state.records, [type]: record };
      AsyncStorage.setItem(CONSENT_KEY, JSON.stringify(updated));
      const allRequired = REQUIRED_CONSENTS.every((r) => updated[r]?.status === 'accepted');
      return { records: updated, hasCompletedRequiredConsents: allRequired };
    });
  },

  withdrawConsent: (type) => {
    set((state) => {
      const existing = state.records[type];
      if (!existing) return state;
      const updated = {
        ...state.records,
        [type]: { ...existing, status: 'withdrawn' as const, withdrawnAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      };
      AsyncStorage.setItem(CONSENT_KEY, JSON.stringify(updated));
      const allRequired = REQUIRED_CONSENTS.every((r) => updated[r]?.status === 'accepted');
      return { records: updated, hasCompletedRequiredConsents: allRequired };
    });
  },

  checkRequired: () => {
    const { records } = get();
    return REQUIRED_CONSENTS.every((r) => records[r]?.status === 'accepted');
  },

  loadFromStorage: async () => {
    try {
      const str = await AsyncStorage.getItem(CONSENT_KEY);
      if (str) {
        const records = JSON.parse(str);
        const allRequired = REQUIRED_CONSENTS.every((r: ConsentDocumentType) => records[r]?.status === 'accepted');
        set({ records, hasCompletedRequiredConsents: allRequired });
      }
    } catch {
      // Silently fail
    }
  },

  clearConsents: () => {
    set({ records: {}, hasCompletedRequiredConsents: false });
    AsyncStorage.removeItem(CONSENT_KEY);
  },
}));
