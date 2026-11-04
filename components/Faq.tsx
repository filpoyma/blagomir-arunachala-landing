"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, SectionHead } from "@/components/Reveal";
import { FAQ } from "@/data/content";
import type { IFaqItem, TFaqBullet } from "@/types/content";

const answerCls = "text-sm sm:text-[15px] leading-relaxed text-jade-ink/70 pr-8 pb-2 space-y-3";

const linkCls = "text-saffron-2 underline underline-offset-4 hover:text-saffron transition-colors";

interface IFaqBulletProps {
  readonly line: TFaqBullet;
}

const FaqBullet = ({ line }: IFaqBulletProps) => {
  if (typeof line === "string") return <>{line}</>;
  const external = line.href.startsWith("http");
  return (
    <>
      {line.prefix}
      <a
        href={line.href}
        className={linkCls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {line.label}
      </a>
    </>
  );
};

interface IFaqAnswerProps {
  readonly item: IFaqItem;
}

const FaqAnswer = ({ item }: IFaqAnswerProps) => {
  if (item.a && !item.paragraphs && !item.bullets && !item.sections) {
    return <p className={answerCls}>{item.a}</p>;
  }

  const paragraphs = item.paragraphs ?? (item.a ? [item.a] : []);

  return (
    <div className={answerCls}>
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      {item.bullets && item.bullets.length > 0 && (
        <ul className="list-disc pl-5 space-y-1.5">
          {item.bullets.map((line, i) => (
            <li key={i}>
              <FaqBullet line={line} />
            </li>
          ))}
        </ul>
      )}
      {item.afterBullets && item.link ? (
        <p>
          {item.afterBullets}{" "}
          <a
            href={item.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkCls}
          >
            {item.link.label}
          </a>
        </p>
      ) : (
        <>
          {item.afterBullets && <p>{item.afterBullets}</p>}
          {item.link && (
            <p>
              <a
                href={item.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkCls} break-all`}
              >
                {item.link.label}
              </a>
            </p>
          )}
        </>
      )}
      {item.sections?.map((section, i) => (
        <div key={i} className="space-y-2">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-jade-ink/55">
            {section.title}
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            {section.bullets.map((line, j) => (
              <li key={j}>{line}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const Faq = () => (
  <section id="faq" data-testid="faq-section" className="bg-paper py-24 sm:py-36">
    <div className="max-w-4xl mx-auto px-5 sm:px-8">
      <SectionHead eyebrow="Ответы на вопросы" title="Частые вопросы" />

      <Reveal delay={0.1} className="mt-14">
        <Accordion type="single" collapsible data-testid="faq-accordion">
          {FAQ.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-b border-jade/12"
              data-testid={`faq-item-${i + 1}`}
            >
              <AccordionTrigger className="group py-6 hover:no-underline text-left [&>svg]:text-saffron">
                <span className="font-serif text-lg sm:text-xl text-jade-ink group-hover:text-saffron transition-colors duration-300 pr-4 leading-snug">
                  {item.q}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <FaqAnswer item={item} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </div>
  </section>
);

export default Faq;
