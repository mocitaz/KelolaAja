// WhatsApp utility functions

export interface WhatsAppConfig {
  number: string;
  message: string;
}

// Get WhatsApp configuration from environment or database
export function getWhatsAppConfig(): WhatsAppConfig {
  return {
    number: process.env.WHATSAPP_NUMBER || '6281234567890',
    message: process.env.WHATSAPP_MESSAGE || 'Halo! Saya tertarik dengan layanan Anda.',
  };
}

// Generate WhatsApp URL
export function generateWhatsAppURL(number: string, message: string): string {
  const encodedMessage = encodeURIComponent(message);
  const cleanNumber = number.replace(/[^0-9]/g, ''); // Remove non-numeric characters
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}

// Create WhatsApp link component data
export function createWhatsAppLink(customMessage?: string): string {
  const config = getWhatsAppConfig();
  const message = customMessage || config.message;
  return generateWhatsAppURL(config.number, message);
}

