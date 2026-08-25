import { useSyncExternalStore } from "react";

/* ------------------------------------------------------------------ */
/*  Emergency-contact store (persisted, shared across the app)         */
/* ------------------------------------------------------------------ */

export interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  note: string;
  sms: boolean;
}

export const MAX_CONTACTS = 8;
export const PRIMARY_SLOTS = 3;
const KEY = "safeher.guardians.v1";

export const RELATIONS = [
  { id: "mother", label: "Mother", group: "family" },
  { id: "father", label: "Father", group: "family" },
  { id: "sister", label: "Sister", group: "family" },
  { id: "brother", label: "Brother", group: "family" },
  { id: "partner", label: "Partner / Spouse", group: "partner" },
  { id: "friend", label: "Friend", group: "friend" },
  { id: "neighbor", label: "Neighbor", group: "other" },
  { id: "colleague", label: "Colleague", group: "other" },
  { id: "other", label: "Other family / contact", group: "other" },
] as const;

export const GROUP_CHIP: Record<string, string> = {
  family: "border-flare/40 bg-flare/10 text-flare",
  partner: "border-tide/40 bg-tide/10 text-tide",
  friend: "border-gold/40 bg-gold/10 text-gold",
  other: "border-mist/40 bg-mist/10 text-mist",
};

export function relationLabel(id: string): string {
  return RELATIONS.find((r) => r.id === id)?.label ?? id;
}

export const SAMPLE_CIRCLE = [
  {
    name: "Meera — Sister",
    relation: "sister",
    phone: "+91 98200 11223",
    note: "Lives 10 minutes away, has a car",
    sms: true,
  },
  {
    name: "Aunty Kavita",
    relation: "neighbor",
    phone: "+91 98333 44556",
    note: "Next door, home most of the day",
    sms: true,
  },
  {
    name: "Riya — College friend",
    relation: "friend",
    phone: "+91 90040 77889",
    note: "Night owl, always picks up",
    sms: true,
  },
];

function makeId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `c-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }
}

function load(): EmergencyContact[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as EmergencyContact[]) : [];
  } catch {
    return [];
  }
}

let contacts: EmergencyContact[] = typeof window !== "undefined" ? load() : [];
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((fn) => fn());
}

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(contacts));
  } catch {
    /* private mode — keep in memory only */
  }
}

export const contactStore = {
  getAll: (): EmergencyContact[] => contacts,
  subscribe(fn: () => void): () => void {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
  add(input: Omit<EmergencyContact, "id">) {
    if (contacts.length >= MAX_CONTACTS) return;
    contacts = [...contacts, { ...input, id: makeId() }];
    persist();
    emit();
  },
  update(id: string, patch: Partial<Omit<EmergencyContact, "id">>) {
    contacts = contacts.map((c) => (c.id === id ? { ...c, ...patch } : c));
    persist();
    emit();
  },
  remove(id: string) {
    contacts = contacts.filter((c) => c.id !== id);
    persist();
    emit();
  },
  move(id: string, dir: -1 | 1) {
    const i = contacts.findIndex((c) => c.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= contacts.length) return;
    const next = [...contacts];
    [next[i], next[j]] = [next[j], next[i]];
    contacts = next;
    persist();
    emit();
  },
  loadSamples() {
    contacts = SAMPLE_CIRCLE.map((s) => ({ ...s, id: makeId() }));
    persist();
    emit();
  },
  clearAll() {
    contacts = [];
    persist();
    emit();
  },
};

export function useContacts(): EmergencyContact[] {
  return useSyncExternalStore(contactStore.subscribe, contactStore.getAll);
}
