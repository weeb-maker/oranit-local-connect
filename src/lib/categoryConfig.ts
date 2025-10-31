import {
  ShoppingBag,
  Utensils,
  Briefcase,
  Home,
  Heart,
  Car,
  Users,
  MoreHorizontal,
  Shirt,
  Armchair,
  Monitor,
  BookOpen,
  Sparkles,
  Trophy,
  Store,
  Coffee,
  Package,
  Cake,
  Beer,
  ShoppingCart,
  Truck,
  Scale,
  Calculator,
  Megaphone,
  Code,
  Lightbulb,
  Building,
  UserCheck,
  HardHat,
  Wrench,
  Zap,
  PaintBucket,
  Sparkle,
  Trees,
  Settings,
  Stethoscope,
  Activity,
  Dumbbell,
  Smile,
  Baby,
  Brain,
  Pill,
  KeyRound,
  Bike,
  CarTaxiFront,
  Replace,
  Move,
  Bus,
  GraduationCap,
  PartyPopper,
  Dog,
  Camera,
  Plane,
  HandHeart,
  Layers,
} from "lucide-react";

export interface Subcategory {
  slug: string;
  icon: any;
  titleKey: string;
  descriptionKey: string;
}

export interface Category {
  slug: string;
  icon: any;
  titleKey: string;
  descriptionKey: string;
  subcategories?: Subcategory[];
}

export const categoryConfig: Record<string, Category> = {
  "shops-retail": {
    slug: "shops-retail",
    icon: ShoppingBag,
    titleKey: "categories.shopsRetail.title",
    descriptionKey: "categories.shopsRetail.description",
    subcategories: [
      {
        slug: "clothing-fashion",
        icon: Shirt,
        titleKey: "categories.shopsRetail.subcategories.clothingFashion.title",
        descriptionKey: "categories.shopsRetail.subcategories.clothingFashion.description",
      },
      {
        slug: "home-goods-furniture",
        icon: Armchair,
        titleKey: "categories.shopsRetail.subcategories.homeGoodsFurniture.title",
        descriptionKey: "categories.shopsRetail.subcategories.homeGoodsFurniture.description",
      },
      {
        slug: "electronics-appliances",
        icon: Monitor,
        titleKey: "categories.shopsRetail.subcategories.electronicsAppliances.title",
        descriptionKey: "categories.shopsRetail.subcategories.electronicsAppliances.description",
      },
      {
        slug: "books-stationery-gifts",
        icon: BookOpen,
        titleKey: "categories.shopsRetail.subcategories.booksStationeryGifts.title",
        descriptionKey: "categories.shopsRetail.subcategories.booksStationeryGifts.description",
      },
      {
        slug: "beauty-cosmetics",
        icon: Sparkles,
        titleKey: "categories.shopsRetail.subcategories.beautyCosmetics.title",
        descriptionKey: "categories.shopsRetail.subcategories.beautyCosmetics.description",
      },
      {
        slug: "sports-outdoor-equipment",
        icon: Trophy,
        titleKey: "categories.shopsRetail.subcategories.sportsOutdoorEquipment.title",
        descriptionKey: "categories.shopsRetail.subcategories.sportsOutdoorEquipment.description",
      },
      {
        slug: "specialty-boutique-stores",
        icon: Store,
        titleKey: "categories.shopsRetail.subcategories.specialtyBoutiqueStores.title",
        descriptionKey: "categories.shopsRetail.subcategories.specialtyBoutiqueStores.description",
      },
    ],
  },
  "food-drink": {
    slug: "food-drink",
    icon: Utensils,
    titleKey: "categories.foodDrink.title",
    descriptionKey: "categories.foodDrink.description",
    subcategories: [
      {
        slug: "restaurants",
        icon: Utensils,
        titleKey: "categories.foodDrink.subcategories.restaurants.title",
        descriptionKey: "categories.foodDrink.subcategories.restaurants.description",
      },
      {
        slug: "cafes-coffee-shops",
        icon: Coffee,
        titleKey: "categories.foodDrink.subcategories.cafesCoffeeShops.title",
        descriptionKey: "categories.foodDrink.subcategories.cafesCoffeeShops.description",
      },
      {
        slug: "takeaway-delivery",
        icon: Package,
        titleKey: "categories.foodDrink.subcategories.takeawayDelivery.title",
        descriptionKey: "categories.foodDrink.subcategories.takeawayDelivery.description",
      },
      {
        slug: "bakeries-patisseries",
        icon: Cake,
        titleKey: "categories.foodDrink.subcategories.bakeriesPatisseries.title",
        descriptionKey: "categories.foodDrink.subcategories.bakeriesPatisseries.description",
      },
      {
        slug: "bars-pubs",
        icon: Beer,
        titleKey: "categories.foodDrink.subcategories.barsPubs.title",
        descriptionKey: "categories.foodDrink.subcategories.barsPubs.description",
      },
      {
        slug: "grocery-stores-markets",
        icon: ShoppingCart,
        titleKey: "categories.foodDrink.subcategories.groceryStoresMarkets.title",
        descriptionKey: "categories.foodDrink.subcategories.groceryStoresMarkets.description",
      },
      {
        slug: "food-trucks-street-food",
        icon: Truck,
        titleKey: "categories.foodDrink.subcategories.foodTrucksStreetFood.title",
        descriptionKey: "categories.foodDrink.subcategories.foodTrucksStreetFood.description",
      },
    ],
  },
  "professional-services": {
    slug: "professional-services",
    icon: Briefcase,
    titleKey: "categories.professionalServices.title",
    descriptionKey: "categories.professionalServices.description",
    subcategories: [
      {
        slug: "legal-notary",
        icon: Scale,
        titleKey: "categories.professionalServices.subcategories.legalNotary.title",
        descriptionKey: "categories.professionalServices.subcategories.legalNotary.description",
      },
      {
        slug: "accounting-tax-services",
        icon: Calculator,
        titleKey: "categories.professionalServices.subcategories.accountingTaxServices.title",
        descriptionKey: "categories.professionalServices.subcategories.accountingTaxServices.description",
      },
      {
        slug: "marketing-digital-agencies",
        icon: Megaphone,
        titleKey: "categories.professionalServices.subcategories.marketingDigitalAgencies.title",
        descriptionKey: "categories.professionalServices.subcategories.marketingDigitalAgencies.description",
      },
      {
        slug: "it-software-services",
        icon: Code,
        titleKey: "categories.professionalServices.subcategories.itSoftwareServices.title",
        descriptionKey: "categories.professionalServices.subcategories.itSoftwareServices.description",
      },
      {
        slug: "consulting-advisory",
        icon: Lightbulb,
        titleKey: "categories.professionalServices.subcategories.consultingAdvisory.title",
        descriptionKey: "categories.professionalServices.subcategories.consultingAdvisory.description",
      },
      {
        slug: "architecture-engineering",
        icon: Building,
        titleKey: "categories.professionalServices.subcategories.architectureEngineering.title",
        descriptionKey: "categories.professionalServices.subcategories.architectureEngineering.description",
      },
      {
        slug: "recruitment-hr",
        icon: UserCheck,
        titleKey: "categories.professionalServices.subcategories.recruitmentHr.title",
        descriptionKey: "categories.professionalServices.subcategories.recruitmentHr.description",
      },
    ],
  },
  "home-repairs": {
    slug: "home-repairs",
    icon: Home,
    titleKey: "categories.homeRepairs.title",
    descriptionKey: "categories.homeRepairs.description",
    subcategories: [
      {
        slug: "general-contractors-builders",
        icon: HardHat,
        titleKey: "categories.homeRepairs.subcategories.generalContractorsBuilders.title",
        descriptionKey: "categories.homeRepairs.subcategories.generalContractorsBuilders.description",
      },
      {
        slug: "plumbing-heating",
        icon: Wrench,
        titleKey: "categories.homeRepairs.subcategories.plumbingHeating.title",
        descriptionKey: "categories.homeRepairs.subcategories.plumbingHeating.description",
      },
      {
        slug: "electrical-services",
        icon: Zap,
        titleKey: "categories.homeRepairs.subcategories.electricalServices.title",
        descriptionKey: "categories.homeRepairs.subcategories.electricalServices.description",
      },
      {
        slug: "painting-decorating",
        icon: PaintBucket,
        titleKey: "categories.homeRepairs.subcategories.paintingDecorating.title",
        descriptionKey: "categories.homeRepairs.subcategories.paintingDecorating.description",
      },
      {
        slug: "home-cleaning-maintenance",
        icon: Sparkle,
        titleKey: "categories.homeRepairs.subcategories.homeCleaningMaintenance.title",
        descriptionKey: "categories.homeRepairs.subcategories.homeCleaningMaintenance.description",
      },
      {
        slug: "landscaping-garden-services",
        icon: Trees,
        titleKey: "categories.homeRepairs.subcategories.landscapingGardenServices.title",
        descriptionKey: "categories.homeRepairs.subcategories.landscapingGardenServices.description",
      },
      {
        slug: "handyman-odd-jobs",
        icon: Settings,
        titleKey: "categories.homeRepairs.subcategories.handymanOddJobs.title",
        descriptionKey: "categories.homeRepairs.subcategories.handymanOddJobs.description",
      },
    ],
  },
  "wellness-care": {
    slug: "wellness-care",
    icon: Heart,
    titleKey: "categories.wellnessCare.title",
    descriptionKey: "categories.wellnessCare.description",
    subcategories: [
      {
        slug: "medical-clinics-specialists",
        icon: Stethoscope,
        titleKey: "categories.wellnessCare.subcategories.medicalClinicsSpecialists.title",
        descriptionKey: "categories.wellnessCare.subcategories.medicalClinicsSpecialists.description",
      },
      {
        slug: "dental-services",
        icon: Pill,
        titleKey: "categories.wellnessCare.subcategories.dentalServices.title",
        descriptionKey: "categories.wellnessCare.subcategories.dentalServices.description",
      },
      {
        slug: "physical-therapy-rehabilitation",
        icon: Activity,
        titleKey: "categories.wellnessCare.subcategories.physicalTherapyRehabilitation.title",
        descriptionKey: "categories.wellnessCare.subcategories.physicalTherapyRehabilitation.description",
      },
      {
        slug: "fitness-personal-training",
        icon: Dumbbell,
        titleKey: "categories.wellnessCare.subcategories.fitnessPersonalTraining.title",
        descriptionKey: "categories.wellnessCare.subcategories.fitnessPersonalTraining.description",
      },
      {
        slug: "beauty-spa",
        icon: Smile,
        titleKey: "categories.wellnessCare.subcategories.beautySpa.title",
        descriptionKey: "categories.wellnessCare.subcategories.beautySpa.description",
      },
      {
        slug: "childcare-elder-care",
        icon: Baby,
        titleKey: "categories.wellnessCare.subcategories.childcareElderCare.title",
        descriptionKey: "categories.wellnessCare.subcategories.childcareElderCare.description",
      },
      {
        slug: "mental-health-counselling",
        icon: Brain,
        titleKey: "categories.wellnessCare.subcategories.mentalHealthCounselling.title",
        descriptionKey: "categories.wellnessCare.subcategories.mentalHealthCounselling.description",
      },
    ],
  },
  "mobility-transport": {
    slug: "mobility-transport",
    icon: Car,
    titleKey: "categories.mobilityTransport.title",
    descriptionKey: "categories.mobilityTransport.description",
    subcategories: [
      {
        slug: "car-rental-sharing",
        icon: KeyRound,
        titleKey: "categories.mobilityTransport.subcategories.carRentalSharing.title",
        descriptionKey: "categories.mobilityTransport.subcategories.carRentalSharing.description",
      },
      {
        slug: "taxi-private-hire",
        icon: CarTaxiFront,
        titleKey: "categories.mobilityTransport.subcategories.taxiPrivateHire.title",
        descriptionKey: "categories.mobilityTransport.subcategories.taxiPrivateHire.description",
      },
      {
        slug: "bike-scooter-rental",
        icon: Bike,
        titleKey: "categories.mobilityTransport.subcategories.bikeScooterRental.title",
        descriptionKey: "categories.mobilityTransport.subcategories.bikeScooterRental.description",
      },
      {
        slug: "auto-repair-servicing",
        icon: Replace,
        titleKey: "categories.mobilityTransport.subcategories.autoRepairServicing.title",
        descriptionKey: "categories.mobilityTransport.subcategories.autoRepairServicing.description",
      },
      {
        slug: "moving-relocation-services",
        icon: Move,
        titleKey: "categories.mobilityTransport.subcategories.movingRelocationServices.title",
        descriptionKey: "categories.mobilityTransport.subcategories.movingRelocationServices.description",
      },
      {
        slug: "public-transport-shuttle",
        icon: Bus,
        titleKey: "categories.mobilityTransport.subcategories.publicTransportShuttle.title",
        descriptionKey: "categories.mobilityTransport.subcategories.publicTransportShuttle.description",
      },
    ],
  },
  "youth-services": {
    slug: "youth-services",
    icon: Users,
    titleKey: "categories.youthServices.title",
    descriptionKey: "categories.youthServices.description",
    subcategories: [
      {
        slug: "after-school-activities-clubs",
        icon: Users,
        titleKey: "categories.youthServices.subcategories.afterSchoolActivitiesClubs.title",
        descriptionKey: "categories.youthServices.subcategories.afterSchoolActivitiesClubs.description",
      },
      {
        slug: "youth-sports-recreation",
        icon: Trophy,
        titleKey: "categories.youthServices.subcategories.youthSportsRecreation.title",
        descriptionKey: "categories.youthServices.subcategories.youthSportsRecreation.description",
      },
      {
        slug: "tutors-learning-centres",
        icon: GraduationCap,
        titleKey: "categories.youthServices.subcategories.tutorsLearningCentres.title",
        descriptionKey: "categories.youthServices.subcategories.tutorsLearningCentres.description",
      },
      {
        slug: "childcare-playgroups",
        icon: Baby,
        titleKey: "categories.youthServices.subcategories.childcarePlaygroups.title",
        descriptionKey: "categories.youthServices.subcategories.childcarePlaygroups.description",
      },
      {
        slug: "youth-counselling-support",
        icon: Brain,
        titleKey: "categories.youthServices.subcategories.youthCounsellingSupport.title",
        descriptionKey: "categories.youthServices.subcategories.youthCounsellingSupport.description",
      },
      {
        slug: "kids-parties-events",
        icon: PartyPopper,
        titleKey: "categories.youthServices.subcategories.kidsPartiesEvents.title",
        descriptionKey: "categories.youthServices.subcategories.kidsPartiesEvents.description",
      },
    ],
  },
  "other-services": {
    slug: "other-services",
    icon: MoreHorizontal,
    titleKey: "categories.otherServices.title",
    descriptionKey: "categories.otherServices.description",
    subcategories: [
      {
        slug: "event-planning-catering",
        icon: PartyPopper,
        titleKey: "categories.otherServices.subcategories.eventPlanningCatering.title",
        descriptionKey: "categories.otherServices.subcategories.eventPlanningCatering.description",
      },
      {
        slug: "photography-videography",
        icon: Camera,
        titleKey: "categories.otherServices.subcategories.photographyVideography.title",
        descriptionKey: "categories.otherServices.subcategories.photographyVideography.description",
      },
      {
        slug: "pet-services-grooming",
        icon: Dog,
        titleKey: "categories.otherServices.subcategories.petServicesGrooming.title",
        descriptionKey: "categories.otherServices.subcategories.petServicesGrooming.description",
      },
      {
        slug: "travel-tourism-services",
        icon: Plane,
        titleKey: "categories.otherServices.subcategories.travelTourismServices.title",
        descriptionKey: "categories.otherServices.subcategories.travelTourismServices.description",
      },
      {
        slug: "nonprofit-community-organisations",
        icon: HandHeart,
        titleKey: "categories.otherServices.subcategories.nonprofitCommunityOrganisations.title",
        descriptionKey: "categories.otherServices.subcategories.nonprofitCommunityOrganisations.description",
      },
      {
        slug: "miscellaneous-general-services",
        icon: Layers,
        titleKey: "categories.otherServices.subcategories.miscellaneousGeneralServices.title",
        descriptionKey: "categories.otherServices.subcategories.miscellaneousGeneralServices.description",
      },
    ],
  },
};

export type CategorySlug = keyof typeof categoryConfig;

export const getCategoryConfig = (slug: string): Category => {
  return categoryConfig[slug as CategorySlug] || categoryConfig["other-services"];
};

export const getSubcategoryConfig = (categorySlug: string, subcategorySlug: string): Subcategory | null => {
  const category = getCategoryConfig(categorySlug);
  return category.subcategories?.find(sub => sub.slug === subcategorySlug) || null;
};

// Community Help & Youth Jobs tags
export const communityHelpTags = {
  titleKey: "tags.communityHelp.title",
  tags: [
    { slug: "babysitting", titleKey: "tags.communityHelp.babysitting" },
    { slug: "dog-walking", titleKey: "tags.communityHelp.dogWalking" },
    { slug: "tutoring", titleKey: "tags.communityHelp.tutoring" },
    { slug: "lawn-mowing", titleKey: "tags.communityHelp.lawnMowing" },
    { slug: "errands", titleKey: "tags.communityHelp.errands" },
  ],
};
