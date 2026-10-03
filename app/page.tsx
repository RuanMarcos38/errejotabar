import ReservationForm from "@/components/ReservationForm";
import { site } from "@/lib/site";

const highlights = [
  ["01", "Clima carioca", "Um pedaço do Rio no Centro de Jaraguá: leve, vibrante e feito para reunir."],
  ["02", "Música ao vivo", "Samba, pagode e noites temáticas que transformam a mesa em ponto de encontro."],
  ["03", "Experiência completa", "Bar, gastronomia, eventos e espaço para viver a noite do seu jeito."],
  ["04", "Reserva sem atrito", "Escolha data, horário e tamanho do grupo. Sua mesa fica organizada em poucos passos."]
];

const moods = [
  { title: "Perto do palco", text: "Para quem quer sentir a energia da música de perto." },
  { title: "Mesa para a resenha", text: "Conforto para grupos, aniversários e encontros com amigos." },
  { title: "Família", text: "Uma experiência mais tranquila para quem vem em família." }
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Errejota Bar",
    description: site.description,
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.errejotabar.com.br",
    sameAs: [site.instagram],
    telephone: site.whatsappLabel,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Josef Fontana, 45",
      addressLocality: "Jaraguá do Sul",
      addressRegion: "SC",
      postalCode: "89251-710",
      addressCountry: "BR"
    },
    servesCuisine: ["Brasileira", "Bar", "Gastronomia de boteco"],
    priceRange: "$$",
    acceptsReservations: true
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Errejota Bar">
          <span>ERRE</span><strong>JOTA</strong>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#experiencia">Experiência</a>
          <a href="#agenda">Agenda</a>
          <a href="#reserva">Reservas</a>
          <a href="#local">Local</a>
        </nav>
        <a className="button button-small button-gold" href="#reserva">Reservar mesa</a>
      </header>

      <section className="hero" id="inicio">
        <video className="hero-video" autoPlay muted loop playsInline aria-hidden="true">
          <source src="/videos/hero-errejota.mp4" type="video/mp4" />
        </video>
        <div className="hero-fallback" />
        <div className="hero-noise" />
        <div className="hero-content">
          <p className="kicker">{site.eyebrow}</p>
          <h1>O RIO<br /><span>MORA AQUI.</span></h1>
          <p className="hero-copy">
            Samba, pagode, música ao vivo e aquele clima de resenha que faz a noite virar história.
          </p>
          <div className="hero-actions">
            <a className="button button-red" href="#reserva">Quero minha mesa</a>
            <a className="text-link" href={site.instagram} target="_blank" rel="noreferrer">
              Ver programação no Instagram ↗
            </a>
          </div>
        </div>
        <div className="hero-stamp">
          <strong>RESERVA<br />ONLINE</strong>
          <span>rápida • simples • direta</span>
        </div>
      </section>

      <section className="ticker" aria-label="Destaques">
        <span>SAMBA</span><i>•</i><span>PAGODE</span><i>•</i><span>RESENHA</span><i>•</i>
        <span>CHOPP GELADO</span><i>•</i><span>JARAGUÁ DO SUL</span>
      </section>

      <section className="section cream" id="experiencia">
        <div className="section-heading">
          <p className="kicker dark">ERREJOTA EXPERIENCE</p>
          <h2>Mais que uma mesa.<br /><span>Um lugar para acontecer.</span></h2>
          <p>
            A referência visual enviada foi traduzida em contraste alto, tipografia condensada,
            base escura, creme, amarelo e vermelho, sem copiar os produtos do modelo.
          </p>
        </div>
        <div className="feature-grid">
          {highlights.map(([number, title, text]) => (
            <article className="feature" key={number}>
              <span className="feature-number">{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section dark-block" id="agenda">
        <div className="agenda-copy">
          <p className="kicker">A CASA MUDA. A ENERGIA NÃO.</p>
          <h2>Tem noite que pede<br /><span>Errejota.</span></h2>
          <p>
            Programação com música ao vivo, samba, pagode, futebol e eventos especiais.
            A agenda oficial é atualizada no Instagram da casa.
          </p>
          <a className="button button-gold" href={site.instagram} target="_blank" rel="noreferrer">
            Abrir {site.instagramHandle}
          </a>
        </div>
        <div className="poster-stack" aria-label="Experiências do Errejota">
          <div className="poster poster-red"><small>QUINTA</small><strong>ESQUENTA<br />DA CASA</strong></div>
          <div className="poster poster-gold"><small>SEXTA</small><strong>NOITE<br />DE RESENHA</strong></div>
          <div className="poster poster-cream"><small>FIM DE SEMANA</small><strong>SAMBA<br />NO ERREJOTA</strong></div>
        </div>
      </section>

      <section className="section cream choose-section">
        <div className="section-heading compact">
          <p className="kicker dark">ESCOLHA O SEU CLIMA</p>
          <h2>Seu rolê,<br /><span>do seu jeito.</span></h2>
        </div>
        <div className="mood-grid">
          {moods.map((mood, i) => (
            <article className="mood-card" key={mood.title}>
              <span>0{i + 1}</span>
              <h3>{mood.title}</h3>
              <p>{mood.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="reservation-section" id="reserva">
        <div className="reservation-intro">
          <p className="kicker">RESERVA INTELIGENTE</p>
          <h2>Sua mesa em<br /><span>menos de 1 minuto.</span></h2>
          <p>
            Informe os dados, escolha o horário e receba seu código de reserva na hora.
            O sistema controla a capacidade por faixa de horário para evitar overbooking.
          </p>
          <div className="reservation-points">
            <span>✓ Confirmação imediata</span>
            <span>✓ Controle de capacidade</span>
            <span>✓ Painel administrativo</span>
          </div>
        </div>
        <ReservationForm />
      </section>

      <section className="section location" id="local">
        <div>
          <p className="kicker dark">NO CENTRO DE JARAGUÁ</p>
          <h2>Fácil de chegar.<br /><span>Difícil querer ir embora.</span></h2>
        </div>
        <div className="location-card">
          <p>ERREJOTA BAR</p>
          <strong>{site.address}</strong>
          <div className="location-links">
            <a href={site.maps} target="_blank" rel="noreferrer">Abrir no mapa ↗</a>
            <a href={site.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="brand footer-brand"><span>ERRE</span><strong>JOTA</strong></div>
        <p>{site.address}</p>
        <a href={site.instagram} target="_blank" rel="noreferrer">{site.instagramHandle}</a>
        <a className="admin-link" href="/admin">Painel de reservas</a>
      </footer>

      <a className="floating-book" href="#reserva" aria-label="Reservar mesa no Errejota Bar">
        RESERVAR
      </a>
    </main>
  );
}
