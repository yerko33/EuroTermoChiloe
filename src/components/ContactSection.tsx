import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import {
  BUSINESS_INFO,
  HERO_WHATSAPP_MESSAGE,
  buildWhatsAppUrl,
} from '../constants/business';

type InquiryType = 'fabricacion' | 'instalacion' | 'reparacion' | 'otra';
type SubmitStatus = 'idle' | 'submitting' | 'sent' | 'fallback';

interface FormState {
  name: string;
  phone: string;
  inquiryType: InquiryType;
  message: string;
  website: string; // honeypot
}

interface FormErrors {
  name?: string;
  phone?: string;
  message?: string;
}

const INQUIRY_LABELS: Record<InquiryType, string> = {
  fabricacion: 'Fabricación',
  instalacion: 'Instalación',
  reparacion: 'Reparación',
  otra: 'Otra consulta',
};

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    inquiryType: 'fabricacion',
    message: '',
    website: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [lastSubmittedCopy, setLastSubmittedCopy] = useState<FormState | null>(null);

  const directWhatsappUrl = buildWhatsAppUrl(HERO_WHATSAPP_MESSAGE);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (form.name.trim().length < 2) {
      nextErrors.name = 'Ingresa tu nombre para identificar la consulta.';
    }
    const cleanDigits = form.phone.replace(/\D/g, '');
    if (cleanDigits.length < 8) {
      nextErrors.phone = 'Ingresa un teléfono o WhatsApp válido (mínimo 8 dígitos).';
    }
    if (form.message.trim().length < 10) {
      nextErrors.message = 'Describe brevemente tu proyecto o consulta (mínimo 10 caracteres).';
    }
    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle');
      return;
    }

    setStatus('submitting');
    setFeedbackMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          inquiryType: form.inquiryType,
          message: form.message.trim(),
          website: form.website,
        }),
      });

      if (response.ok) {
        setLastSubmittedCopy({ ...form });
        setStatus('sent');
        setFeedbackMessage(
          `Tu consulta fue enviada por correo a ${BUSINESS_INFO.name}. Nos pondremos en contacto contigo.`
        );
        setForm({
          name: '',
          phone: '',
          inquiryType: 'fabricacion',
          message: '',
          website: '',
        });
        return;
      }

      let serverError = '';
      try {
        const data = (await response.json()) as { error?: string; code?: string };
        serverError = data.error ?? '';
      } catch {
        // Ignore non-JSON bodies (e.g., 404 in static preview)
      }

      setLastSubmittedCopy({ ...form });
      setStatus('fallback');
      setFeedbackMessage(
        response.status === 404 || response.status === 503
          ? 'El envío automático por correo requiere desplegar el sitio en Vercel con RESEND_API_KEY configurado. Mientras tanto, puedes enviar esta misma consulta directamente por WhatsApp:'
          : serverError || 'No se pudo completar el envío por correo. Puedes enviarnos tu consulta directamente por WhatsApp:'
      );
    } catch {
      setLastSubmittedCopy({ ...form });
      setStatus('fallback');
      setFeedbackMessage(
        'No hubo conexión con el servidor de correo. Puedes enviar esta consulta directamente por WhatsApp:'
      );
    }
  };

  const whatsappSource = lastSubmittedCopy ?? form;
  const composedFormWhatsAppUrl = buildWhatsAppUrl(
    [
      `Hola, soy ${whatsappSource.name.trim()}.`,
      `Teléfono / WhatsApp: ${whatsappSource.phone.trim()}.`,
      `Tipo de consulta: ${INQUIRY_LABELS[whatsappSource.inquiryType]}.`,
      `Mensaje: ${whatsappSource.message.trim()}`,
    ].join('\n')
  );

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-heading"
      className="py-16 md:py-24 bg-white border-t border-[#1E1B18]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct Contact Channels */}
          <div className="lg:col-span-5">
            <p className="text-sm font-medium text-[#8C4325] mb-2">Contacto</p>
            <h2
              id="contacto-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1E1B18]"
            >
              Conversemos sobre tu proyecto
            </h2>
            <p className="mt-4 text-base text-[#1E1B18]/80 leading-relaxed">
              Escríbenos directamente por WhatsApp o envíanos tu consulta mediante el formulario para
              coordinar una visita de revisión en Chiloé.
            </p>

            <div className="mt-7">
              <a
                href={directWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#145A36] hover:bg-[#1B7547] text-white text-sm sm:text-base font-semibold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145A36]"
              >
                <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Escribir por WhatsApp</span>
              </a>
            </div>

            <dl className="mt-8 space-y-4 pt-6 border-t border-[#1E1B18]/12 text-sm">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-[#145A36] shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <dt className="text-xs text-[#1E1B18]/60">WhatsApp</dt>
                  <dd className="font-semibold text-[#1E1B18] tabular-nums">
                    <a
                      href={directWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#145A36] underline decoration-[#145A36]/30 underline-offset-4"
                    >
                      {BUSINESS_INFO.whatsappDisplay}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#145A36] shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <dt className="text-xs text-[#1E1B18]/60">Correo electrónico</dt>
                  <dd className="font-semibold text-[#1E1B18]">
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="hover:text-[#145A36] underline decoration-[#145A36]/30 underline-offset-4"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#145A36] shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <dt className="text-xs text-[#1E1B18]/60">Ubicación y cobertura</dt>
                  <dd className="font-semibold text-[#1E1B18]">
                    Castro, Chiloé · Cobertura en toda la isla de Chiloé
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          {/* Right Column: Email Form connected to /api/contact */}
          <div className="lg:col-span-7 bg-[#E8F5E9]/35 border border-[#1E1B18]/12 rounded-xl p-5 sm:p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Campo oculto antispam */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-website">Sitio web</label>
                <input
                  id="contact-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-[#1E1B18] mb-1.5">
                    Nombre
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      if (status !== 'idle') setStatus('idle');
                    }}
                    placeholder="Tu nombre"
                    aria-invalid={Boolean(errors.name)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#1E1B18]/20 text-sm text-[#1E1B18] focus:outline-2 focus:outline-[#145A36]"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-[#8C4325] font-medium">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#1E1B18] mb-1.5">
                    Teléfono o WhatsApp
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => {
                      setForm({ ...form, phone: e.target.value });
                      if (status !== 'idle') setStatus('idle');
                    }}
                    placeholder="+56 9 ..."
                    aria-invalid={Boolean(errors.phone)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#1E1B18]/20 text-sm text-[#1E1B18] focus:outline-2 focus:outline-[#145A36]"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-[#8C4325] font-medium">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="contact-type" className="block text-xs font-semibold text-[#1E1B18] mb-1.5">
                  Tipo de consulta
                </label>
                <select
                  id="contact-type"
                  value={form.inquiryType}
                  onChange={(e) => {
                    setForm({ ...form, inquiryType: e.target.value as InquiryType });
                    if (status !== 'idle') setStatus('idle');
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#1E1B18]/20 text-sm text-[#1E1B18] focus:outline-2 focus:outline-[#145A36]"
                >
                  <option value="fabricacion">Fabricación</option>
                  <option value="instalacion">Instalación</option>
                  <option value="reparacion">Reparación</option>
                  <option value="otra">Otra</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-[#1E1B18] mb-1.5">
                  Mensaje
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => {
                    setForm({ ...form, message: e.target.value });
                    if (status !== 'idle') setStatus('idle');
                  }}
                  placeholder="Cuéntanos medidas aproximadas, tipo de ventana o sector en Chiloé..."
                  aria-invalid={Boolean(errors.message)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#1E1B18]/20 text-sm text-[#1E1B18] focus:outline-2 focus:outline-[#145A36]"
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-[#8C4325] font-medium">{errors.message}</p>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#145A36] hover:bg-[#1B7547] disabled:opacity-60 text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145A36]"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
                      <span>Enviando consulta...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Enviar consulta por correo</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {status === 'sent' && (
              <div
                role="status"
                className="mt-5 p-4 rounded-lg bg-white border border-[#145A36]/35 flex items-start gap-2.5 text-xs sm:text-sm text-[#1E1B18]"
              >
                <CheckCircle2 className="w-5 h-5 text-[#145A36] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold">Consulta enviada</p>
                  <p className="text-[#1E1B18]/75 mt-0.5">{feedbackMessage}</p>
                </div>
              </div>
            )}

            {status === 'fallback' && (
              <div
                role="status"
                className="mt-5 p-4 rounded-lg bg-white border border-[#8C4325]/35 space-y-3"
              >
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1E1B18]">
                  <AlertCircle className="w-5 h-5 text-[#8C4325] shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-[#1E1B18]/85">{feedbackMessage}</p>
                </div>
                <a
                  href={composedFormWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#145A36] hover:bg-[#1B7547] text-white text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Enviar esta consulta por WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
