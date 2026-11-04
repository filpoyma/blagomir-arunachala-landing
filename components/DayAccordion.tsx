"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { IDaySchedule, TDayScheduleEntry } from "@/types/content";

interface IDayItemProps {
  readonly item: TDayScheduleEntry;
}

const DayItem = ({ item }: IDayItemProps) => (
  <li className="flex gap-3 text-sm leading-relaxed text-paper/65">
    <span className="mt-[9px] w-4 h-px bg-saffron shrink-0" />
    <span>
      {typeof item === "string" ? (
        item
      ) : (
        <>
          <span className="font-mono text-[12px] text-saffron-2 mr-2 whitespace-nowrap">
            {item.t}
          </span>
          {item.x}
        </>
      )}
    </span>
  </li>
);

export interface IDayAccordionProps {
  readonly days: readonly IDaySchedule[];
  readonly prefix: string;
}

export const DayAccordion = ({ days, prefix }: IDayAccordionProps) => (
  <Accordion type="single" collapsible data-testid={`${prefix}-accordion`}>
    {days.map((d, i) => (
      <AccordionItem
        key={`${prefix}-${i}`}
        value={`day-${i}`}
        className="border-b border-paper/10"
        data-testid={`${prefix}-day-${i + 1}`}
      >
        <AccordionTrigger className="group py-6 hover:no-underline text-left [&>svg]:text-saffron">
          <div className="flex items-baseline gap-4 sm:gap-8 w-full pr-2">
            <span className="font-mono text-xs sm:text-sm text-saffron tracking-widest shrink-0 w-14">
              {d.date}
            </span>
            <div className="flex-1 min-w-0">
              <span className="block font-serif text-lg sm:text-2xl text-paper group-hover:text-saffron-2 transition-colors duration-300 leading-snug">
                {d.title}
              </span>
              {d.weekday && (
                <span className="block mt-1 font-mono text-[10px] tracking-[0.25em] uppercase text-paper/40">
                  {d.weekday}
                </span>
              )}
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="pl-0 sm:pl-[96px] pb-2 pr-2 sm:pr-4">
            {d.theme && (
              <p className="mb-4 text-sm italic leading-relaxed text-paper/75">
                {d.theme}
              </p>
            )}
            <ul className="space-y-3">
              {d.items.map((item, j) => (
                <DayItem key={j} item={item} />
              ))}
            </ul>
            {d.note && (
              <p className="mt-4 text-[13px] italic text-saffron-2 border-l-2 border-saffron/40 pl-4">
                {d.note}
              </p>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);
