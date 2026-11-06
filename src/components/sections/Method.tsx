"use client";

import TypewriterTitle from "@/components/kokonutui/type-writer";

const STEPS = [
  {
    tag: "Diagnóstico",
    deliverable: "El mapa de cómo trabajáis hoy: cada tarea, quién la hace y cuánto tarda, cronometrado.",
    title: "Nos sentamos contigo",
    text: "Miramos cómo trabajáis de verdad, no cómo dice el manual que trabajáis. Cronometramos las tareas y anotamos quién hace qué.",
  },
  {
    tag: "Números",
    deliverable: "Un informe con las horas y el coste anual de cada proceso, qué atacar primero y un presupuesto cerrado.",
    title: "Te damos los números",
    text: "Las horas que se van en cada proceso, cuánto cuestan al año y qué conviene automatizar primero, con presupuesto cerrado para lo que decidas hacer.",
  },
  {
    tag: "Construcción",
    deliverable: "Piezas funcionando en tu entorno y con tus datos desde las primeras entregas, no una demo al final.",
    title: "Construimos y lo pones a correr",
    text: "Entregas continuas, en tu entorno real y con tus datos. Ves cómo avanza desde el principio, no cuando ya está todo hecho.",
  },
  {
    tag: "Mantenimiento",
    deliverable: "Soporte y ajustes cuando el proceso cambie. Sin permanencia.",
    title: "Lo mantenemos vivo",
    text: "Los procesos cambian y el sistema tiene que cambiar con ellos. Soporte y ajustes, sin contratos que te aten de por vida.",
  },
];

export default function Method() {
  return (
    <section
      id="metodo"
      className="py-20 lg:py-28"
      style={{ background: "var(--paper-warm)", borderTop: "1px solid var(--line)" }}
    >
      <div className="mx-auto w-[min(1180px,92vw)]">
        <h2 className="font-display max-w-[20ch] text-[clamp(2rem,4vw,3.1rem)] font-extrabold leading-[1.06] tracking-[-0.038em]">
          De la primera llamada a que funcione solo
        </h2>
        <div
          className="mono mt-6 flex items-center gap-2"
          style={{ color: "var(--ink-soft)" }}
        >
          <span style={{ color: "var(--signal)" }}>&gt;</span>
          <TypewriterTitle
            sequences={[
              { text: "cronometrando el proceso", deleteAfter: true },
              { text: "midiendo horas perdidas", deleteAfter: true },
              { text: "calculando el coste anual", deleteAfter: true },
            ]}
            typingSpeed={48}
            deleteSpeed={26}
            loopDelay={900}
          />
        </div>

        <ol className="mt-14" style={{ borderBottom: "1px solid var(--line)" }}>
          {STEPS.map((step) => (
            <li
              key={step.tag}
              className="grid gap-x-10 gap-y-4 py-9 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,20rem)]"
              style={{ borderTop: "1px solid var(--line)" }}
            >
              <div>
                <span className="mono" style={{ color: "var(--blue)" }}>
                  {step.tag}
                </span>
                <h3 className="font-display mt-3 text-[1.3rem] font-bold leading-[1.2] tracking-[-0.025em]">
                  {step.title}
                </h3>
              </div>
              <p className="text-[0.98rem] leading-[1.7] lg:pt-7" style={{ color: "var(--ink-soft)" }}>
                {step.text}
              </p>
              <div className="pl-5 lg:mt-7" style={{ borderLeft: "2px solid var(--signal)" }}>
                <span className="mono" style={{ color: "var(--signal)" }}>
                  Te llevas
                </span>
                <p className="mt-2 text-[0.98rem] font-medium leading-[1.55]" style={{ color: "var(--ink)" }}>
                  {step.deliverable}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
