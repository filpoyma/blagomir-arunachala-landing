export type TBookingTariff = "twin" | "single";

export type TBookingStatus = "new" | "contacted" | "confirmed" | "rejected";

export interface INavLink {
  readonly label: string;
  readonly href: string;
}

export interface IImages {
  readonly hero: string;
  readonly temple: string;
  readonly ashram: string;
  readonly girivalam: string;
  readonly virupakshaCaves: string;
  readonly hotel: string;
  readonly varanasi: string;
  readonly shreeGaneshaPalace: string;
  readonly aarti: string;
  readonly leader: string;
}

export interface IForWhomItem {
  readonly title: string;
  readonly desc: string;
}

export interface IPillar {
  readonly num: string;
  readonly name: string;
  readonly desc: string;
}

export interface ILeader {
  readonly name: string;
  readonly role: string;
  readonly bio: string;
  readonly principles: readonly string[];
}

export interface IDayTimeSlot {
  readonly t: string;
  readonly x: string;
}

export type TDayScheduleEntry = string | IDayTimeSlot;

export interface IDaySchedule {
  readonly date: string;
  readonly weekday?: string;
  readonly title: string;
  readonly theme?: string;
  readonly items: readonly TDayScheduleEntry[];
  readonly note?: string;
}

export interface IPlace {
  readonly name: string;
  readonly desc: string;
  readonly img: string;
}

export interface IHotel {
  readonly city: string;
  readonly name: string;
  readonly desc: string;
  readonly img: string;
  readonly href: string;
}

export interface ITariff {
  readonly id: TBookingTariff;
  readonly type: string;
  readonly title: string;
  readonly price: string;
  readonly prepay: string;
  readonly desc: string;
}

export interface IPricing {
  readonly tariffs: readonly ITariff[];
  readonly included: readonly string[];
  readonly excluded: readonly string[];
  readonly packages: string;
}

export interface IKashiModule {
  readonly badge: string;
  readonly title: string;
  readonly price: string;
  readonly intro: string;
  readonly transfer: string;
  readonly days: readonly IDaySchedule[];
  readonly included: string;
  readonly excluded: string;
}

export interface IFaqBulletLink {
  readonly prefix: string;
  readonly label: string;
  readonly href: string;
}

export type TFaqBullet = string | IFaqBulletLink;

export interface IFaqSection {
  readonly title: string;
  readonly bullets: readonly string[];
}

export interface IFaqExternalLink {
  readonly href: string;
  readonly label: string;
}

export interface IFaqItem {
  readonly q: string;
  readonly a?: string;
  readonly paragraphs?: readonly string[];
  readonly bullets?: readonly TFaqBullet[];
  readonly afterBullets?: string;
  readonly link?: IFaqExternalLink;
  readonly sections?: readonly IFaqSection[];
}

export interface IBookingFormState {
  readonly name: string;
  readonly contact: string;
  readonly tariff: TBookingTariff;
  readonly kashi: boolean;
  readonly comment: string;
  readonly consent: boolean;
  readonly website: string;
}

export interface IBookingFormErrors {
  name?: string;
  contact?: string;
  consent?: string;
}

export interface IBookingRecord {
  readonly id: string;
  readonly name: string;
  readonly contact: string;
  readonly tariff: TBookingTariff;
  readonly kashi: boolean;
  readonly comment?: string;
  readonly status: TBookingStatus;
  readonly created_at: string;
}
