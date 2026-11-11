import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/lib/site-config";

const TITLE = "Automatización de procesos para empresas en Asturias · BlueDebug";
const OG_TITLE = "Automatización de procesos para empresas en Asturias";
const DESCRIPTION =
  "Facturas, altas de cliente, informes y avisos que se hacen a mano, pasados a un sistema que funciona solo. Desde Gijón, sobre las herramientas que ya usas.";
const PATH = "/automatizacion-de-procesos";
const URL = `${site.domain}${PATH}`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  robots: { index: true, follow: true },
  openGraph: {
    title: OG_TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: site.name,
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: DESCRIPTION,
  },
};

const TASKS = [
  {
    title: "Facturas",
    text: "Facturas que llegan por correo, se revisan a ojo y se pasan a mano a otro programa. El sistema las recoge, extrae los datos y los deja donde tienen que ir. Si algo no cuadra, avisa a una persona en vez de seguir.",
  },
  {
    title: "Altas de cliente",
    text: "El mismo dato escrito tres veces: en el formulario, en la hoja de cálculo y en el programa de gestión. Se escribe una vez y llega solo a todos los sitios.",
  },
  {
    title: "Informes",
    text: "El informe que alguien monta cada lunes copiando y pegando de varios Excel. Se genera solo, con los mismos números de siempre, y llega a quien lo tiene que leer.",
  },
  {
    title: "Avisos",
    text: "Vencimientos, pedidos sin confirmar, documentos que faltan. En lugar de depender de que alguien se acuerde, el sistema avisa a quien toca.",
  },
];

const STEPS = [
  {
    title: "Diagnóstico",
    text: "Nos sentamos con quien hace el trabajo y miramos cómo se hace de verdad, no cómo dice el manual. Observamos el proceso real, lo cronometramos y anotamos quién hace qué.",
  },
  {
    title: "Números",
    text: "Te damos las horas que se van en cada proceso, lo que cuestan al año y qué conviene automatizar primero. Con eso, un presupuesto cerrado para lo que decidas hacer.",
  },
  {
    title: "Construcción",
    text: "Entregas continuas en tu entorno real y con tus datos. Ves cómo avanza desde el principio, no cuando ya está todo hecho.",
  },
  {
    title: "Mantenimiento",
    text: "Los procesos cambian y el sistema tiene que cambiar con ellos. Nos encargamos del soporte y de los ajustes.",
  },
];

const FAQS = [
  {
    q: "¿Qué proceso conviene automatizar primero?",
    a: "El que se repite más y siempre sigue los mismos pasos. En el diagnóstico lo vemos juntos con los números delante y decides tú por dónde empezar.",
  },
  {
    q: "¿Tengo que cambiar de programas?",
    a: "Casi nunca. Trabajamos sobre lo que ya usas. Cambiar de sistema es la última opción.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "La primera consultoría no se cobra: nos sentamos contigo, miramos cómo trabajáis y te decimos dónde se te van las horas. Lo único que se presupuesta es el desarrollo, y siempre a precio cerrado antes de empezar.",
  },
  {
    q: "¿Qué pasa si un día dejamos de trabajar juntos?",
    a: "El código es tuyo y está en tu repositorio, documentado. Puede seguir con él quien tú quieras.",
  },
  {
    q: "¿Esto va de meter IA en la empresa?",
    a: "No necesariamente. La usamos solo cuando aporta; muchas veces basta con que los datos viajen solos de un sitio a otro.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${URL}#service`,
      name: "Automatización de procesos",
      serviceType: "Automatización de procesos",
      description:
        "Automatización de tareas repetitivas: facturas, altas de cliente, informes y avisos, sobre las herramientas que ya usa la empresa.",
      url: URL,
      provider: { "@id": `${site.domain}#organization` },
      areaServed: [
        { "@type": "City", name: "Gijón" },
        { "@type": "AdministrativeArea", name: "Asturias" },
        { "@type": "Country", name: "España" },
      ],
      inLanguage: "es-ES",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: site.domain },
        { "@type": "ListItem", position: 2, name: "Automatización de procesos", item: URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const H2 =
  "font-display max-w-[24ch] text-[clamp(1.8rem,3.6vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-0.038em]";
const BODY = "text-[1rem] leading-[1.75]";
const LINK = "font-semibold underline underline-offset-4 hover:no-underline";

export default function AutomatizacionDeProcesos() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-[132px] pb-16 lg:pb-24">
          <div className="mx-auto w-[min(1180px,92vw)]">
            <div className="mono" style={{ color: "var(--blue)" }}>
              S-01 / automatización de procesos — Gijón, Asturias
            </div>
            <h1 className="font-display mt-6 max-w-[18ch] text-[clamp(2.3rem,5.2vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.042em]">
              Automatización de procesos para empresas en Asturias
            </h1>
            <p className={`${BODY} mt-6 max-w-[42rem] text-[1.08rem]`} style={{ color: "var(--ink-soft)" }}>
              Auditamos el trabajo manual que hace tu equipo, lo medimos en horas y construimos el
              sistema que lo sustituye. Sin cambiarte de programas y con el código a tu nombre.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                href="/#contacto"
                className="inline-flex items-center gap-2.5 text-[0.9rem] font-semibold text-white transition-transform duration-150 hover:translate-x-[3px] hover:translate-y-[3px]"
                style={{ background: "var(--ink)", padding: "16px 30px", boxShadow: "var(--shadow-hard)" }}
              >
                Cuéntanos qué se hace a mano ⟶
              </Link>
              <a
                href="#como-trabajamos"
                className="text-[0.9rem] font-medium underline-offset-4 hover:underline"
                style={{ color: "var(--ink-soft)" }}
              >
                Ver cómo trabajamos
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24" style={{ borderTop: "1px solid var(--line)" }}>
          <div className="mx-auto w-[min(1180px,92vw)]">
            <h2 className={H2}>Qué tareas se pueden automatizar</h2>
            <p className={`${BODY} mt-5 max-w-[46rem]`} style={{ color: "var(--ink-soft)" }}>
              Todo lo que alguien hace cada semana siguiendo siempre los mismos pasos es candidato.
              Lo replicamos en un sistema que corre solo y avisa cuando algo se sale del guion.
            </p>
            <div className="mt-12 grid gap-px sm:grid-cols-2" style={{ background: "var(--line)" }}>
              {TASKS.map((t, i) => (
                <article key={t.title} className="p-8" style={{ background: "var(--surface)" }}>
                  <span className="mono" style={{ color: "var(--blue)" }}>
                    T-0{i + 1}
                  </span>
                  <h3 className="font-display mt-4 text-[1.32rem] font-bold leading-[1.2] tracking-[-0.025em]">
                    {t.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-[1.65]" style={{ color: "var(--ink-soft)" }}>
                    {t.text}
                  </p>
                </article>
              ))}
            </div>
            <p className={`${BODY} mt-8 max-w-[46rem]`} style={{ color: "var(--ink-soft)" }}>
              Casi nunca es una tarea suelta: suelen ser dos o tres que van encadenadas. Por eso
              empezamos por mirar el proceso entero.
            </p>
          </div>
        </section>

        <section
          id="como-trabajamos"
          className="scroll-mt-20 py-16 lg:py-24"
          style={{ borderTop: "1px solid var(--line)", background: "var(--paper-warm)" }}
        >
          <div className="mx-auto w-[min(1180px,92vw)]">
            <h2 className={H2}>Cómo trabajamos</h2>
            <ol className="mt-12" style={{ borderBottom: "1px solid var(--line)" }}>
              {STEPS.map((s, i) => (
                <li
                  key={s.title}
                  className="grid gap-x-10 gap-y-3 py-8 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]"
                  style={{ borderTop: "1px solid var(--line)" }}
                >
                  <div>
                    <span className="mono" style={{ color: "var(--blue)" }}>
                      Paso 0{i + 1}
                    </span>
                    <h3 className="font-display mt-3 text-[1.3rem] font-bold leading-[1.2] tracking-[-0.025em]">
                      {s.title}
                    </h3>
                  </div>
                  <p className={BODY} style={{ color: "var(--ink-soft)" }}>
                    {s.text}
                  </p>
                </li>
              ))}
            </ol>
            <p className={`${BODY} mt-8`}>
              ¿Quieres hacerte una idea antes de hablar?{" "}
              <Link href="/#calculadora" className={LINK} style={{ color: "var(--blue)" }}>
                Prueba la calculadora del trabajo manual ⟶
              </Link>
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-24" style={{ borderTop: "1px solid var(--line)" }}>
          <div className="mx-auto grid w-[min(1180px,92vw)] gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <h2 className={H2}>Sobre las herramientas que ya usas</h2>
            <div>
              <p className={BODY} style={{ color: "var(--ink-soft)" }}>
                Trabajamos encima de lo que ya tienes: tu programa de gestión, tu hoja de cálculo,
                tu correo, tu CRM. Si tienen una vía para conectarse, la usamos; si no, buscamos
                otra. Cambiar de programa es el último recurso, no el primero.
              </p>
              <p className={`${BODY} mt-5`}>
                <Link href="/#servicios" className={LINK} style={{ color: "var(--blue)" }}>
                  Si lo que necesitas es que dos programas se hablen, mira cómo trabajamos la
                  integración entre sistemas ⟶
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24" style={{ borderTop: "1px solid var(--line)" }}>
          <div className="mx-auto grid w-[min(1180px,92vw)] gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <h2 className={H2}>El código es tuyo</h2>
            <div>
              <p className={BODY} style={{ color: "var(--ink-soft)" }}>
                Lo que construimos queda en tu repositorio, documentado. No hay licencias nuestras ni
                plataformas que te aten: si mañana quieres que lo lleve otro equipo, puede hacerlo.
              </p>
              <p className={`${BODY} mt-5`} style={{ color: "var(--ink-soft)" }}>
                Usamos IA solo cuando aporta. La mayoría de las tareas que quitan horas no la
                necesitan: necesitan que dos sistemas se hablen y que nadie copie nada a mano.
              </p>
            </div>
          </div>
        </section>

        <section
          className="py-16 lg:py-24"
          style={{ borderTop: "1px solid var(--line)", background: "var(--paper-warm)" }}
        >
          <div className="mx-auto w-[min(1180px,92vw)]">
            <h2 className={H2}>Un ejemplo: RefMe, asignación de árbitros</h2>
            <div
              className="mt-10 max-w-[48rem] p-8"
              style={{ background: "var(--surface)", border: "1px solid var(--line)" }}
            >
              <span
                className="mono inline-block px-2.5 py-1.5"
                style={{ border: "1px solid var(--signal)", color: "var(--signal)" }}
              >
                Prototipo funcional
              </span>
              <p className={`${BODY} mt-5`} style={{ color: "var(--ink-soft)" }}>
                Repartir árbitros entre los partidos de una jornada se hacía a mano, con una hoja de
                cálculo y mucha paciencia. RefMe parte de ese mismo Excel y propone la asignación
                teniendo en cuenta la disponibilidad y el nivel de cada árbitro, los partidos que se
                solapan, los conflictos de interés, el coche compartido, los kilómetros y que el
                reparto sea equitativo.
              </p>
              <p className={`${BODY} mt-4`} style={{ color: "var(--ink-soft)" }}>
                Es un prototipo funcional pensado para el arbitraje de voleibol en Asturias. El
                mismo motor sirve para otros repartos con reglas parecidas: cuadrillas, máquinas o
                rutas.
              </p>
            </div>
            <p className={`${BODY} mt-8 max-w-[48rem]`}>
              <Link href="/portfolio/club-voleibol-oviedo" className={LINK} style={{ color: "var(--blue)" }}>
                Otro ejemplo, ya en producción: la web del Club Voleibol Oviedo actualiza sola el
                calendario, los resultados y las clasificaciones desde las federaciones ⟶
              </Link>
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-24" style={{ borderTop: "1px solid var(--line)" }}>
          <div className="mx-auto grid w-[min(1180px,92vw)] gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <h2 className={H2}>Desde Gijón, para empresas de Asturias</h2>
            <p className={BODY} style={{ color: "var(--ink-soft)" }}>
              BlueDebug es un estudio de software a medida y automatización de procesos de Gijón.
              Trabajamos con empresas, clubes y federaciones de Asturias y del resto de España. Para
              el diagnóstico nos gusta ver el proceso de cerca, con quien lo hace cada día.
            </p>
          </div>
        </section>

        <section
          className="py-16 lg:py-24"
          style={{ borderTop: "1px solid var(--line)", background: "var(--paper-warm)" }}
        >
          <div className="mx-auto grid w-[min(1180px,92vw)] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <h2 className={H2}>Preguntas frecuentes</h2>
            <div style={{ borderTop: "1px solid var(--line-strong)" }}>
              {FAQS.map((f) => (
                <details key={f.q} className="group" style={{ borderBottom: "1px solid var(--line)" }}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                    <span className="font-display text-[1.06rem] font-bold tracking-[-0.02em]">{f.q}</span>
                    <span
                      className="mono shrink-0 transition-transform duration-200 group-open:rotate-45"
                      style={{ color: "var(--signal)" }}
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-[60ch] pb-6 text-[0.96rem] leading-[1.7]" style={{ color: "var(--ink-soft)" }}>
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24" style={{ borderTop: "1px solid var(--line)" }}>
          <div className="mx-auto w-[min(1180px,92vw)]">
            <h2 className={H2}>Cuéntanos qué se hace a mano en tu empresa</h2>
            <p className={`${BODY} mt-5 max-w-[42rem]`} style={{ color: "var(--ink-soft)" }}>
              Una llamada para ver tu caso. Salimos de ahí sabiendo los dos si tiene sentido
              automatizarlo o no.
            </p>
            <Link
              href="/#contacto"
              className="mt-9 inline-flex items-center gap-2.5 text-[0.9rem] font-semibold text-white transition-transform duration-150 hover:translate-x-[3px] hover:translate-y-[3px]"
              style={{ background: "var(--ink)", padding: "16px 30px", boxShadow: "var(--shadow-hard)" }}
            >
              Agendar llamada ⟶
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
