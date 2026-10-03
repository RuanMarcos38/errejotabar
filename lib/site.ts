export const site = {
  name: "Errejota Bar",
  eyebrow: "Jaraguá do Sul • SC",
  title: "Errejota Bar | Samba, Pagode e Reservas em Jaraguá do Sul",
  description:
    "Viva o clima carioca no coração de Jaraguá do Sul. Samba, pagode, música ao vivo e reservas de mesa online no Errejota Bar.",
  address: "Rua Josef Fontana, 45 - Centro, Jaraguá do Sul - SC",
  instagram: "https://www.instagram.com/errejotabaroficial/",
  instagramHandle: "@errejotabaroficial",
  maps:
    "https://www.google.com/maps/search/?api=1&query=Rua%20Josef%20Fontana%2045%20Jaragua%20do%20Sul%20SC",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "5547989203781",
  whatsappLabel: "(47) 98920-3781"
} as const;
