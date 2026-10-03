# Errejota Bar — Site + Reservas

Site oficial com landing page imersiva, hero em vídeo, SEO local, reserva de mesas e painel operacional.

## Conceito visual
A direção usa somente a linguagem visual da referência enviada: preto/café, creme, amarelo queimado e vermelho, tipografia condensada, blocos de alto contraste e composição editorial. Os produtos da referência não foram copiados.

## Conteúdo público usado como base
- Errejota Bar, Rua Josef Fontana, 45, Centro, Jaraguá do Sul/SC.
- Perfil oficial: @errejotabaroficial.
- Posicionamento público: clima carioca, música ao vivo, samba/pagode e eventos.
- Telefone padrão configurado: (47) 98920-3781. Antes de publicar, confirme se este continua sendo o WhatsApp oficial.

## Configuração
1. Rode `npm install`.
2. Copie `.env.example` para `.env.local`.
3. Crie um projeto Supabase exclusivo para o Errejota.
4. Execute `supabase/schema.sql` no SQL Editor.
5. Preencha as variáveis:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_DASHBOARD_KEY`
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_WHATSAPP`
6. Adicione `public/videos/hero-errejota.mp4`.
7. Rode `npm run dev`.

## SEO incluído
- Title, description e keywords locais.
- Canonical.
- Open Graph e Twitter Card.
- robots.txt.
- sitemap.xml.
- JSON-LD de Restaurant.
- Headings semânticos e conteúdo local focado em Jaraguá do Sul.

## Reservas
- Confirmação instantânea por capacidade de horário.
- Antiduplicidade por WhatsApp/data/horário.
- Código único de reserva.
- Preferência de área e ocasião.
- Consentimento LGPD.
- Painel em `/admin`.
- Status: confirmada, chegou, cancelada e no-show.

## Hero em vídeo
O site já está preparado para vídeo em autoplay, muted e loop. Coloque o arquivo oficial em:
`public/videos/hero-errejota.mp4`.

Sem esse arquivo o layout continua funcionando com um fundo visual de fallback.

## Próxima evolução recomendada
- Confirmação automática via WhatsApp Business API.
- Bloqueio de horários por evento.
- Mapa real do salão e mesas individuais.
- Lista de espera.
- Eventos dinâmicos pelo painel.
- PIX/sinal para datas especiais.
- Relatório de ocupação e no-show.
