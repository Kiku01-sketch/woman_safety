import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  GROUP_CHIP,
  MAX_CONTACTS,
  PRIMARY_SLOTS,
  RELATIONS,
  contactStore,
  relationLabel,
  useContacts,
  type EmergencyContact,
} from "../contacts";
import {
  IconChevron,
  IconPencil,
  IconPhone,
  IconPlus,
  IconTrash,
  IconUsers,
  Reveal,
  SectionHeading,
} from "../ui";

/* custom message-bubble icon (not in the base set) */
function IconSms({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" strokeWidth="2.4" />
    </svg>
  );
}

const TILTS = ["-1.4deg", "1.1deg", "-0.7deg", "1.6deg", "-1.1deg", "0.8deg", "-1.6deg", "1.3deg"];

interface FormState {
  name: string;
  relation: string;
  phone: string;
  note: string;
  sms: boolean;
}

const EMPTY_FORM: FormState = { name: "", relation: "mother", phone: "", note: "", sms: true };

export function GuardianSection() {
  const contacts = useContacts();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [flash, setFlash] = useState("");
  const [armedDelete, setArmedDelete] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);
  const flashTimer = useRef(0);
  const armTimer = useRef(0);

  useEffect(
    () => () => {
      window.clearTimeout(flashTimer.current);
      window.clearTimeout(armTimer.current);
    },
    [],
  );

  const showFlash = (msg: string) => {
    setFlash(msg);
    window.clearTimeout(flashTimer.current);
    flashTimer.current = window.setTimeout(() => setFlash(""), 2800);
  };

  const validPhone = (p: string) => {
    const digits = p.replace(/\D/g, "");
    return /^[+()\d][\d\s().-]{5,19}$/.test(p.trim()) && digits.length >= 7 && digits.length <= 15;
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: { name?: string; phone?: string } = {};
    if (form.name.trim().length < 2) next.name = "Please enter a name.";
    if (!validPhone(form.phone)) next.phone = "Enter a valid number (7–15 digits, + allowed).";
    setErrors(next);
    if (next.name || next.phone) return;

    if (editingId) {
      contactStore.update(editingId, {
        name: form.name.trim(),
        relation: form.relation,
        phone: form.phone.trim(),
        note: form.note.trim(),
        sms: form.sms,
      });
      showFlash(`${form.name.trim()} updated in your circle.`);
    } else {
      contactStore.add({
        name: form.name.trim(),
        relation: form.relation,
        phone: form.phone.trim(),
        note: form.note.trim(),
        sms: form.sms,
      });
      const slot = contacts.length + 1;
      showFlash(
        slot <= PRIMARY_SLOTS
          ? `${form.name.trim()} saved as SOS guardian #${slot}.`
          : `${form.name.trim()} saved as backup contact.`,
      );
    }
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const startEdit = (c: EmergencyContact) => {
    setEditingId(c.id);
    setForm({ name: c.name, relation: c.relation, phone: c.phone, note: c.note, sms: c.sms });
    setErrors({});
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setErrors({});
  };

  const askDelete = (id: string) => {
    if (armedDelete === id) {
      contactStore.remove(id);
      setArmedDelete(null);
      if (editingId === id) cancelEdit();
      showFlash("Contact removed from your circle.");
      return;
    }
    setArmedDelete(id);
    window.clearTimeout(armTimer.current);
    armTimer.current = window.setTimeout(() => setArmedDelete(null), 3000);
  };

  const full = contacts.length >= MAX_CONTACTS;
  const smsCount = contacts.filter((c) => c.sms).length;

  const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;
  const smsHref = (phone: string) =>
    `sms:${phone.replace(/[^+\d]/g, "")}?&body=${encodeURIComponent(
      "It's me — sending this from my SafeHer safety app. If you get my SOS alert, call me or come to my live location immediately.",
    )}`;

  const inputCls =
    "w-full rounded-xl border border-wine/70 bg-ink/70 px-4 py-3 text-[15px] text-petal placeholder:text-shell/25 transition-colors focus:border-gold focus:outline-none";

  return (
    <section id="circle" className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -right-40 top-16 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(239,163,60,0.13),transparent_65%)]" />
        <div className="absolute -left-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(247,92,126,0.14),transparent_65%)]" />
        <div className="dot-grid-light absolute inset-0 opacity-30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            tone="dark"
            kicker="Act now — Your guardian circle"
            title={
              <>
                Who answers at 3 a.m.?
                <em className="text-flare"> Put their numbers here.</em>
              </>
            }
            lead="Save the family members and friends who'd come running. The first three become your SOS guardians — when the beacon fires, they're the ones alerted with your live location."
          />
          <Reveal delay={200}>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-2xl border border-wine/60 bg-plum/70 px-5 py-4">
                <p className="font-display text-3xl font-black text-petal">
                  {contacts.length}
                  <span className="text-lg text-shell/40">/{MAX_CONTACTS}</span>
                </p>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-mist">Saved contacts</p>
              </div>
              <div className="rounded-2xl border border-flare/40 bg-plum/70 px-5 py-4">
                <p className="font-display text-3xl font-black text-flare">
                  {Math.min(contacts.length, PRIMARY_SLOTS)}
                  <span className="text-lg text-shell/40">/{PRIMARY_SLOTS}</span>
                </p>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-mist">SOS guardians</p>
              </div>
              <div className="rounded-2xl border border-tide/40 bg-plum/70 px-5 py-4">
                <p className="font-display text-3xl font-black text-tide">{smsCount}</p>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-mist">In SMS alerts</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* ---------------- form rail ---------------- */}
          <div className="lg:sticky lg:top-28 lg:self-start" ref={formRef}>
            <Reveal>
              <form
                onSubmit={submit}
                className="rounded-3xl border border-wine/60 bg-plum/80 p-7 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)] sm:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display flex items-center gap-3 text-2xl font-black text-petal">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-flare/15 text-flare">
                      {editingId ? <IconPencil className="h-5 w-5" /> : <IconPlus className="h-5 w-5" />}
                    </span>
                    {editingId ? "Edit contact" : "Add a contact"}
                  </h3>
                  {editingId && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="text-xs font-bold uppercase tracking-[0.16em] text-shell/50 transition-colors hover:text-flare"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="gc-name" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                      Name
                    </label>
                    <input
                      id="gc-name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Meera — Sister"
                      className={inputCls}
                      disabled={full && !editingId}
                    />
                    {errors.name && <p className="mt-1.5 text-xs font-semibold text-flare">{errors.name}</p>}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="gc-relation" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                        Relationship
                      </label>
                      <div className="relative">
                        <select
                          id="gc-relation"
                          value={form.relation}
                          onChange={(e) => setForm({ ...form, relation: e.target.value })}
                          className={`${inputCls} appearance-none pr-10 [&>option]:bg-plum`}
                          disabled={full && !editingId}
                        >
                          {RELATIONS.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.label}
                            </option>
                          ))}
                        </select>
                        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-mist">
                          <IconChevron className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="gc-phone" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                        Phone number
                      </label>
                      <input
                        id="gc-phone"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 98XXX XXXXX"
                        inputMode="tel"
                        className={inputCls}
                        disabled={full && !editingId}
                      />
                      {errors.phone && <p className="mt-1.5 text-xs font-semibold text-flare">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="gc-note" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                      Note <span className="normal-case tracking-normal text-shell/35">(optional)</span>
                    </label>
                    <input
                      id="gc-note"
                      value={form.note}
                      onChange={(e) => setForm({ ...form, note: e.target.value })}
                      placeholder="e.g. Lives 10 min away, has a car"
                      className={inputCls}
                      disabled={full && !editingId}
                    />
                  </div>

                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-wine/50 bg-ink/50 px-4 py-3.5 transition-colors hover:border-gold/50">
                    <input
                      type="checkbox"
                      checked={form.sms}
                      onChange={(e) => setForm({ ...form, sms: e.target.checked })}
                      className="mt-0.5 h-4 w-4 accent-flare"
                    />
                    <span className="text-sm leading-snug text-shell/70">
                      <span className="font-bold text-petal">Include in SMS blast.</span> During an SOS, this contact also
                      receives a text with your live location.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={full && !editingId}
                    className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-flare px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                  >
                    {editingId ? "Save changes" : "Add to my circle"}
                    {!editingId && (
                      <IconPlus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                    )}
                  </button>

                  {full && !editingId && (
                    <p className="text-center text-xs text-shell/50">
                      Circle is full ({MAX_CONTACTS}). Remove someone to add a new contact.
                    </p>
                  )}
                  {flash && (
                    <p className="text-center text-sm font-bold text-tide" role="status">
                      {flash}
                    </p>
                  )}
                </div>
              </form>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-6 rounded-2xl border border-wine/40 bg-plum/40 p-5 text-xs leading-relaxed text-shell/50">
                <p className="font-bold uppercase tracking-[0.2em] text-mist">Private by design</p>
                <p className="mt-1.5">
                  Contacts live only in this browser's storage — never uploaded anywhere. Use{" "}
                  <a href="#digital" className="text-gold underline decoration-gold/40 underline-offset-2 transition-colors hover:text-flare">
                    safe browsing
                  </a>{" "}
                  if someone monitors your device.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ---------------- contact cards ---------------- */}
          <div>
            {contacts.length === 0 ? (
              <Reveal>
                <div className="flex h-full min-h-[22rem] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-wine/70 bg-plum/30 px-8 py-14 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-flare/40 bg-flare/10 text-flare">
                    <IconUsers className="h-8 w-8" />
                  </span>
                  <h3 className="font-display mt-6 text-3xl font-black text-petal">Your circle is empty</h3>
                  <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-shell/60">
                    Add the first person who'd pick up at 3 a.m. — a parent, sibling, partner,
                    neighbor or friend. Three is the magic number for SOS coverage.
                  </p>
                  <button
                    onClick={() => {
                      contactStore.loadSamples();
                      showFlash("Sample circle loaded — replace with your real people.");
                    }}
                    className="mt-7 inline-flex items-center gap-2 rounded-full border border-gold/60 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-ink"
                  >
                    <IconPlus className="h-4 w-4" /> Load a sample circle
                  </button>
                </div>
              </Reveal>
            ) : (
              <>
                <ul className="grid gap-5 sm:grid-cols-2">
                  {contacts.map((c, i) => {
                    const primary = i < PRIMARY_SLOTS;
                    return (
                      <Reveal key={c.id} delay={(i % 4) * 80} className={i === 0 ? "sm:col-span-2" : ""}>
                        <li
                          className="postcard group relative rounded-3xl border border-wine/70 bg-plum/85 p-6"
                          style={{ ["--tilt" as never]: TILTS[i % TILTS.length] }}
                        >
                          <span
                            className={`absolute inset-y-4 left-0 w-1.5 rounded-r-full ${primary ? "bg-flare" : "bg-wine"}`}
                            aria-hidden="true"
                          />
                          <div className="flex items-start justify-between gap-4 pl-3">
                            <div className="flex items-start gap-4">
                              <span className={`font-display text-4xl font-black leading-none ${primary ? "text-flare" : "text-shell/25"}`}>
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <div>
                                <h4 className="font-display text-xl font-black leading-tight text-petal">{c.name}</h4>
                                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] ${GROUP_CHIP[RELATIONS.find((r) => r.id === c.relation)?.group ?? "other"]}`}>
                                    {relationLabel(c.relation)}
                                  </span>
                                  {c.sms && (
                                    <span className="rounded-full border border-tide/40 bg-tide/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-tide">
                                      SMS alerts
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <span
                              className={`shrink-0 rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] ${
                                primary ? "bg-flare text-ink" : "bg-wine text-shell/70"
                              }`}
                            >
                              {primary ? "SOS primary" : "Backup"}
                            </span>
                          </div>

                          <p className="mt-4 pl-3 text-xl font-bold tracking-wide text-shell/85">{c.phone}</p>
                          {c.note && <p className="mt-1.5 pl-3 text-sm italic leading-relaxed text-shell/45">{c.note}</p>}

                          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-wine/50 pt-4 pl-3">
                            <a
                              href={telHref(c.phone)}
                              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-petal transition-all duration-300 hover:bg-flare hover:text-ink"
                            >
                              <IconPhone className="h-3.5 w-3.5" /> Call
                            </a>
                            <a
                              href={smsHref(c.phone)}
                              className="inline-flex items-center gap-1.5 rounded-full border border-wine/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-shell/70 transition-all duration-300 hover:border-tide hover:text-tide"
                            >
                              <IconSms className="h-3.5 w-3.5" /> Message
                            </a>
                            <span className="flex-1" />
                            <button
                              onClick={() => contactStore.move(c.id, -1)}
                              disabled={i === 0}
                              aria-label={`Move ${c.name} up in priority`}
                              className="rounded-full border border-wine/60 p-2 text-shell/60 transition-colors hover:border-gold hover:text-gold disabled:opacity-25"
                            >
                              <IconChevron className="h-3.5 w-3.5 rotate-180" />
                            </button>
                            <button
                              onClick={() => contactStore.move(c.id, 1)}
                              disabled={i === contacts.length - 1}
                              aria-label={`Move ${c.name} down in priority`}
                              className="rounded-full border border-wine/60 p-2 text-shell/60 transition-colors hover:border-gold hover:text-gold disabled:opacity-25"
                            >
                              <IconChevron className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => startEdit(c)}
                              aria-label={`Edit ${c.name}`}
                              className="rounded-full border border-wine/60 p-2 text-shell/60 transition-colors hover:border-gold hover:text-gold"
                            >
                              <IconPencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => askDelete(c.id)}
                              aria-label={`Remove ${c.name}`}
                              className={`rounded-full border p-2 transition-all duration-300 ${
                                armedDelete === c.id
                                  ? "border-flare bg-flare px-3 text-ink"
                                  : "border-wine/60 text-shell/60 hover:border-flare hover:text-flare"
                              }`}
                            >
                              {armedDelete === c.id ? (
                                <span className="text-[10px] font-bold uppercase tracking-[0.1em]">Sure?</span>
                              ) : (
                                <IconTrash className="h-3.5 w-3.5" />
                              )}
                            </button>
                          </div>
                        </li>
                      </Reveal>
                    );
                  })}
                </ul>
                <Reveal delay={200}>
                  <p className="mt-7 text-xs leading-relaxed text-shell/40">
                    Tip: the first three contacts are your <span className="font-bold text-flare">SOS primaries</span> —
                    use the arrows to keep the fastest responders on top.
                  </p>
                </Reveal>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
