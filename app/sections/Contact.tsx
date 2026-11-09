"use client";

import { useForm } from 'react-hook-form';
import { Button } from '@/components/Button';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { siteContent } from '@/app/content/siteContent';
import { trackEvent } from '@/app/lib/analytics';

interface FormData {
  name: string;
  phone: string;
  message: string;
  website: string;
  formStartedAt: string;
}

const contactCopy = siteContent.contact;

export function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: {
      website: '',
      formStartedAt: String(Date.now()),
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      trackEvent('contact_form_submit', {
        event_category: 'lead',
        event_label: 'contact_form',
        form_location: 'contact_section',
        submission_status: 'submit',
      });

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          message: data.message,
          website: data.website,
          formStartedAt: data.formStartedAt,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null) as { errorCode?: string } | null;

        if (response.status === 429 || errorData?.errorCode === 'RATE_LIMITED') {
          trackEvent('contact_form_rate_limited', {
            event_category: 'lead',
            event_label: 'contact_form',
            form_location: 'contact_section',
            submission_status: 'rate_limited',
          });
          toast.error(contactCopy.form.rateLimited);
          return;
        }

        throw new Error(errorData?.errorCode ?? 'CONTACT_SUBMIT_FAILED');
      }

      trackEvent('contact_form_success', {
        event_category: 'lead',
        event_label: 'contact_form',
        form_location: 'contact_section',
        submission_status: 'success',
      });

      toast.success(contactCopy.form.success);
      reset({
        name: '',
        phone: '',
        message: '',
        website: '',
        formStartedAt: String(Date.now()),
      });
    } catch (error) {
      trackEvent('contact_form_error', {
        event_category: 'lead',
        event_label: 'contact_form',
        form_location: 'contact_section',
        submission_status: 'error',
      });
      console.error('Formspree submit error:', error);
      toast.error(contactCopy.form.error);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  return (
    <section id="contact" className="py-24 bg-[#1A1A1A]">
      <Toaster position="top-right" theme="dark" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#C4976A] text-xl font-medium mb-4 uppercase tracking-wider">{contactCopy.eyebrow}</p>
          <h2 className="text-white !text-4xl !font-bold mb-4">
            {contactCopy.heading}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {contactCopy.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-white mb-6 !text-2xl !font-bold">{siteContent.company.name}</h3>
              <p className="text-gray-400 text-lg mb-8">
                Profesionalni zemljani radovi i logistika<br />
                {siteContent.company.region}
              </p>
            </div>

            <div className="space-y-6">
              {contactCopy.details.map((detail) => {
                const Icon = detail.type === 'phone' ? Phone : detail.type === 'email' ? Mail : MapPin;

                return (
                  <div key={detail.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#C4976A] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#0F0F0F]" />
                    </div>
                    <div>
                      <h4 className="text-white mb-1">{detail.label}</h4>
                      {detail.type === 'email' ? (
                        <a
                          href={`mailto:${detail.value}`}
                          className="text-gray-400 hover:text-[#C4976A] transition-colors"
                          onClick={() =>
                            trackEvent('contact_email_click', {
                              event_category: 'engagement',
                              event_label: 'contact_email',
                              form_location: 'contact_section',
                            })
                          }
                        >
                          {detail.value}
                        </a>
                      ) : detail.type === 'phone' ? (
                        <a
                          href="tel:+385911546041"
                          className="text-gray-400 hover:text-[#C4976A] transition-colors"
                          onClick={() =>
                            trackEvent('contact_phone_click', {
                              event_category: 'engagement',
                              event_label: 'contact_phone',
                              form_location: 'contact_section',
                            })
                          }
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="text-gray-400">{detail.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2">
                  {contactCopy.form.fieldLabels.name}
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  {...register('name', {
                    required: contactCopy.form.nameRequired,
                    minLength: {
                      value: 2,
                      message: contactCopy.form.nameInvalid,
                    },
                    maxLength: {
                      value: 80,
                      message: contactCopy.form.nameInvalid,
                    },
                  })}
                  className="w-full px-4 py-3 bg-[#2C2C2C] text-white border border-gray-700 rounded-lg focus:outline-none focus:border-[#C4976A] transition-colors"
                  placeholder={contactCopy.form.placeholders.name}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-white mb-2">
                  {contactCopy.form.fieldLabels.phone}
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  {...register('phone', {
                    required: contactCopy.form.phoneRequired,
                    maxLength: {
                      value: 25,
                      message: contactCopy.form.phoneInvalid,
                    },
                    pattern: {
                      value: /^[+0-9][0-9\s/().-]{5,24}$/,
                      message: contactCopy.form.phoneInvalid,
                    },
                    validate: (value) => {
                      const digitsOnly = value.replace(/\D/g, '');
                      return digitsOnly.length >= 6 || contactCopy.form.phoneInvalid;
                    },
                  })}
                  className="w-full px-4 py-3 bg-[#2C2C2C] text-white border border-gray-700 rounded-lg focus:outline-none focus:border-[#C4976A] transition-colors"
                  placeholder={contactCopy.form.placeholders.phone}
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-white mb-2">
                  {contactCopy.form.fieldLabels.message}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  autoComplete="off"
                  {...register('message', {
                    required: contactCopy.form.messageRequired,
                    minLength: {
                      value: 10,
                      message: contactCopy.form.messageMin,
                    },
                    maxLength: {
                      value: 2000,
                      message: contactCopy.form.messageMax,
                    },
                  })}
                  className="w-full px-4 py-3 bg-[#2C2C2C] text-white border border-gray-700 rounded-lg focus:outline-none focus:border-[#C4976A] transition-colors resize-none"
                  placeholder={contactCopy.form.placeholders.message}
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
                {...register('website')}
              />
              <input type="hidden" {...register('formStartedAt')} />

              <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                {contactCopy.form.submit}
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
