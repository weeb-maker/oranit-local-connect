import {
  Building2, Phone, GraduationCap, Trash2, Bus, Home,
  Trophy, Palette, Users, HandHeart,
  type LucideIcon
} from "lucide-react";

export interface NoticePost {
  id: string;
  titleKey: string;
  descKey: string;
  bodyKey: string;
  category: string;
  categoryKey: string;
  date: string;
  contactKey: string;
}

export interface ResidentService {
  slug: string;
  icon: LucideIcon;
  labelKey: string;
  descKey: string;
  phoneKey: string;
  addressKey: string;
  hoursKey: string;
  websiteUrl?: string;
}

export interface Club {
  slug: string;
  icon: LucideIcon;
  nameKey: string;
  descKey: string;
  longDescKey: string;
  category: string;
  categoryKey: string;
  meetingKey: string;
  contactKey: string;
}

export const noticePosts: NoticePost[] = [
  {
    id: "1",
    titleKey: "residents.notices.sample1.title",
    descKey: "residents.notices.sample1.desc",
    bodyKey: "residents.notices.sample1.body",
    category: "Lost & Found",
    categoryKey: "residents.noticeBoard.categories.lostFound",
    date: "2026-04-05",
    contactKey: "residents.notices.sample1.contact",
  },
  {
    id: "2",
    titleKey: "residents.notices.sample2.title",
    descKey: "residents.notices.sample2.desc",
    bodyKey: "residents.notices.sample2.body",
    category: "Services",
    categoryKey: "residents.noticeBoard.categories.services",
    date: "2026-04-03",
    contactKey: "residents.notices.sample2.contact",
  },
  {
    id: "3",
    titleKey: "residents.notices.sample3.title",
    descKey: "residents.notices.sample3.desc",
    bodyKey: "residents.notices.sample3.body",
    category: "Community",
    categoryKey: "residents.noticeBoard.categories.community",
    date: "2026-04-01",
    contactKey: "residents.notices.sample3.contact",
  },
];

export const services: ResidentService[] = [
  { slug: "municipality", icon: Building2, labelKey: "residents.services.municipality", descKey: "residents.serviceDetail.municipality.desc", phoneKey: "residents.serviceDetail.municipality.phone", addressKey: "residents.serviceDetail.municipality.address", hoursKey: "residents.serviceDetail.municipality.hours", websiteUrl: "https://www.oranit.muni.il" },
  { slug: "emergency", icon: Phone, labelKey: "residents.services.emergency", descKey: "residents.serviceDetail.emergency.desc", phoneKey: "residents.serviceDetail.emergency.phone", addressKey: "residents.serviceDetail.emergency.address", hoursKey: "residents.serviceDetail.emergency.hours" },
  { slug: "schools", icon: GraduationCap, labelKey: "residents.services.schools", descKey: "residents.serviceDetail.schools.desc", phoneKey: "residents.serviceDetail.schools.phone", addressKey: "residents.serviceDetail.schools.address", hoursKey: "residents.serviceDetail.schools.hours" },
  { slug: "waste", icon: Trash2, labelKey: "residents.services.waste", descKey: "residents.serviceDetail.waste.desc", phoneKey: "residents.serviceDetail.waste.phone", addressKey: "residents.serviceDetail.waste.address", hoursKey: "residents.serviceDetail.waste.hours" },
  { slug: "transport", icon: Bus, labelKey: "residents.services.transport", descKey: "residents.serviceDetail.transport.desc", phoneKey: "residents.serviceDetail.transport.phone", addressKey: "residents.serviceDetail.transport.address", hoursKey: "residents.serviceDetail.transport.hours" },
  { slug: "facilities", icon: Home, labelKey: "residents.services.facilities", descKey: "residents.serviceDetail.facilities.desc", phoneKey: "residents.serviceDetail.facilities.phone", addressKey: "residents.serviceDetail.facilities.address", hoursKey: "residents.serviceDetail.facilities.hours" },
];

export const clubs: Club[] = [
  {
    slug: "sports",
    icon: Trophy,
    nameKey: "residents.clubs.sports",
    descKey: "residents.clubs.sportsDesc",
    longDescKey: "residents.clubDetail.sports.longDesc",
    category: "Sports",
    categoryKey: "residents.clubDetail.categories.sports",
    meetingKey: "residents.clubDetail.sports.meeting",
    contactKey: "residents.clubDetail.sports.contact",
  },
  {
    slug: "arts",
    icon: Palette,
    nameKey: "residents.clubs.arts",
    descKey: "residents.clubs.artsDesc",
    longDescKey: "residents.clubDetail.arts.longDesc",
    category: "Culture",
    categoryKey: "residents.clubDetail.categories.culture",
    meetingKey: "residents.clubDetail.arts.meeting",
    contactKey: "residents.clubDetail.arts.contact",
  },
  {
    slug: "youth",
    icon: Users,
    nameKey: "residents.clubs.youth",
    descKey: "residents.clubs.youthDesc",
    longDescKey: "residents.clubDetail.youth.longDesc",
    category: "Youth",
    categoryKey: "residents.clubDetail.categories.youth",
    meetingKey: "residents.clubDetail.youth.meeting",
    contactKey: "residents.clubDetail.youth.contact",
  },
  {
    slug: "volunteer",
    icon: HandHeart,
    nameKey: "residents.clubs.volunteer",
    descKey: "residents.clubs.volunteerDesc",
    longDescKey: "residents.clubDetail.volunteer.longDesc",
    category: "Volunteering",
    categoryKey: "residents.clubDetail.categories.volunteering",
    meetingKey: "residents.clubDetail.volunteer.meeting",
    contactKey: "residents.clubDetail.volunteer.contact",
  },
];

export const getNoticeById = (id: string) => noticePosts.find((n) => n.id === id);
export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const getClubBySlug = (slug: string) => clubs.find((c) => c.slug === slug);
