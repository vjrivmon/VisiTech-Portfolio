"use client";

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Linkedin, Sparkles } from 'lucide-react';

export default function CallToAction() {
  const { locale } = useLanguage();

  return (
    <section className="section relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Icon with animation */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6"
          >
            <Sparkles className="h-8 w-8 text-primary" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {locale === 'es' ? 'Trabajemos Juntos' : "Let's Work Together"}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {locale === 'es'
              ? 'Siempre estoy abierto a discutir nuevos proyectos, ideas creativas u oportunidades para formar parte de tus visiones. ¡No dudes en contactarme!'
              : "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out!"
            }
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href={`mailto:vicenterivasmonferrer12@gmail.com?subject=${encodeURIComponent(
                locale === 'es'
                  ? 'Hola Vicente - Me gustaría contactarte'
                  : 'Hello Vicente - I would like to get in touch'
              )}&body=${encodeURIComponent(
                locale === 'es'
                  ? `Hola Vicente,

Me llamo [Tu nombre] y me gustaría ponerme en contacto contigo para discutir [describe brevemente tu propósito].

Puedes contactarme en:
- Email: [Tu email]
- Teléfono: [Tu teléfono]
- LinkedIn: [Tu perfil de LinkedIn]

Espero tu respuesta.

Saludos cordiales,
[Tu nombre]`
                  : `Hello Vicente,

My name is [Your name] and I would like to get in touch with you to discuss [briefly describe your purpose].

You can reach me at:
- Email: [Your email]
- Phone: [Your phone]
- LinkedIn: [Your LinkedIn profile]

Looking forward to hearing from you.

Best regards,
[Your name]`
              )}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
            >
              <Mail className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              {locale === 'es' ? 'Contactar' : 'Get In Touch'}
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/vicente-rivas-monferrer"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl border-2 border-primary/30 bg-background hover:bg-primary/10 hover:border-primary transition-all"
            >
              <Linkedin className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              {locale === 'es' ? 'Conectar en LinkedIn' : 'Connect on LinkedIn'}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}