export type ConsentDocumentType =
  | 'membership_terms'
  | 'kvkk_notice'
  | 'health_data_consent'
  | 'body_photo_consent'
  | 'ai_analysis_consent'
  | 'transformation_simulation_consent'
  | 'marketing_email'
  | 'marketing_sms'
  | 'marketing_push'
  | 'third_party_sharing'
  | 'public_sharing'
  | 'research_analytics';

export type ConsentStatus = 'pending' | 'accepted' | 'declined' | 'withdrawn';

export interface ConsentDocument {
  type: ConsentDocumentType;
  version: string;
  title: string;
  titleTr?: string;
  content: string;
  contentTr?: string;
  isRequired: boolean;
  isOptional: boolean;
  relatedTo?: ConsentDocumentType[];
  effectiveDate: string;
  language: string;
}

export interface ConsentRecord {
  id: string;
  userId: string;
  documentType: ConsentDocumentType;
  documentVersion: string;
  status: ConsentStatus;
  acceptedAt?: string;
  declinedAt?: string;
  withdrawnAt?: string;
  ipAddress?: string;
  userAgent?: string;
  method: 'checkbox' | 'button' | 'biometric';
  auditHash?: string; // tamper-resistant hash
  createdAt: string;
  updatedAt: string;
}

export interface ConsentBundle {
  required: ConsentDocumentType[];
  optional: ConsentDocumentType[];
  all: ConsentDocumentType[];
}

export interface ConsentState {
  records: Record<ConsentDocumentType, ConsentRecord | null>;
  hasCompletedRequiredConsents: boolean;
  lastUpdated: string;
}
