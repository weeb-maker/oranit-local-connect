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
    titleKey: "shopsRetail.title",
    descriptionKey: "shopsRetail.description",
    subcategories: [
      {
        slug: "clothing-fashion",
        icon: Shirt,
        titleKey: "shopsRetail.subcategories.clothingFashion.title",
        descriptionKey: "shopsRetail.subcategories.clothingFashion.description",
      },
      {
        slug: "home-goods-furniture",
        icon: Armchair,
        titleKey: "shopsRetail.subcategories.homeGoodsFurniture.title",
        descriptionKey: "shopsRetail.subcategories.homeGoodsFurniture.description",
      },
      {
        slug: "electronics-appliances",
        icon: Monitor,
        titleKey: "shopsRetail.subcategories.electronicsAppliances.title",
        descriptionKey: "shopsRetail.subcategories.electronicsAppliances.description",
      },
      {
        slug: "books-stationery-gifts",
        icon: BookOpen,
        titleKey: "shopsRetail.subcategories.booksStationeryGifts.title",
        descriptionKey: "shopsRetail.subcategories.booksStationeryGifts.description",
      },
      {
        slug: "beauty-cosmetics",
        icon: Sparkles,
        titleKey: "shopsRetail.subcategories.beautyCosmetics.title",
        descriptionKey: "shopsRetail.subcategories.beautyCosmetics.description",
      },
      {
        slug: "sports-outdoor-equipment",
        icon: Trophy,
        titleKey: "shopsRetail.subcategories.sportsOutdoorEquipment.title",
        descriptionKey: "shopsRetail.subcategories.sportsOutdoorEquipment.description",
      },
      {
        slug: "specialty-boutique-stores",
        icon: Store,
        titleKey: "shopsRetail.subcategories.specialtyBoutiqueStores.title",
        descriptionKey: "shopsRetail.subcategories.specialtyBoutiqueStores.description",
      },
    ],
  },
  "food-drink": {
    slug: "food-drink",
    icon: Utensils,
    titleKey: "foodDrink.title",
    descriptionKey: "foodDrink.description",
    subcategories: [
      {
        slug: "restaurants",
        icon: Utensils,
        titleKey: "foodDrink.subcategories.restaurants.title",
        descriptionKey: "foodDrink.subcategories.restaurants.description",
      },
      {
        slug: "cafes-coffee-shops",
        icon: Coffee,
        titleKey: "foodDrink.subcategories.cafesCoffeeShops.title",
        descriptionKey: "foodDrink.subcategories.cafesCoffeeShops.description",
      },
      {
        slug: "takeaway-delivery",
        icon: Package,
        titleKey: "foodDrink.subcategories.takeawayDelivery.title",
        descriptionKey: "foodDrink.subcategories.takeawayDelivery.description",
      },
      {
        slug: "bakeries-patisseries",
        icon: Cake,
        titleKey: "foodDrink.subcategories.bakeriesPatisseries.title",
        descriptionKey: "foodDrink.subcategories.bakeriesPatisseries.description",
      },
      {
        slug: "bars-pubs",
        icon: Beer,
        titleKey: "foodDrink.subcategories.barsPubs.title",
        descriptionKey: "foodDrink.subcategories.barsPubs.description",
      },
      {
        slug: "grocery-stores-markets",
        icon: ShoppingCart,
        titleKey: "foodDrink.subcategories.groceryStoresMarkets.title",
        descriptionKey: "foodDrink.subcategories.groceryStoresMarkets.description",
      },
      {
        slug: "food-trucks-street-food",
        icon: Truck,
        titleKey: "foodDrink.subcategories.foodTrucksStreetFood.title",
        descriptionKey: "foodDrink.subcategories.foodTrucksStreetFood.description",
      },
    ],
  },
  "professional-services": {
    slug: "professional-services",
    icon: Briefcase,
    titleKey: "professionalServices.title",
    descriptionKey: "professionalServices.description",
    subcategories: [
      {
        slug: "legal-notary",
        icon: Scale,
        titleKey: "professionalServices.subcategories.legalNotary.title",
        descriptionKey: "professionalServices.subcategories.legalNotary.description",
      },
      {
        slug: "accounting-tax-services",
        icon: Calculator,
        titleKey: "professionalServices.subcategories.accountingTaxServices.title",
        descriptionKey: "professionalServices.subcategories.accountingTaxServices.description",
      },
      {
        slug: "marketing-digital-agencies",
        icon: Megaphone,
        titleKey: "professionalServices.subcategories.marketingDigitalAgencies.title",
        descriptionKey: "professionalServices.subcategories.marketingDigitalAgencies.description",
      },
      {
        slug: "it-software-services",
        icon: Code,
        titleKey: "professionalServices.subcategories.itSoftwareServices.title",
        descriptionKey: "professionalServices.subcategories.itSoftwareServices.description",
      },
      {
        slug: "consulting-advisory",
        icon: Lightbulb,
        titleKey: "professionalServices.subcategories.consultingAdvisory.title",
        descriptionKey: "professionalServices.subcategories.consultingAdvisory.description",
      },
      {
        slug: "architecture-engineering",
        icon: Building,
        titleKey: "professionalServices.subcategories.architectureEngineering.title",
        descriptionKey: "professionalServices.subcategories.architectureEngineering.description",
      },
      {
        slug: "recruitment-hr",
        icon: UserCheck,
        titleKey: "professionalServices.subcategories.recruitmentHr.title",
        descriptionKey: "professionalServices.subcategories.recruitmentHr.description",
      },
    ],
  },
  "home-repairs": {
    slug: "home-repairs",
    icon: Home,
    titleKey: "homeRepairs.title",
    descriptionKey: "homeRepairs.description",
    subcategories: [
      {
        slug: "general-contractors-builders",
        icon: HardHat,
        titleKey: "homeRepairs.subcategories.generalContractorsBuilders.title",
        descriptionKey: "homeRepairs.subcategories.generalContractorsBuilders.description",
      },
      {
        slug: "plumbing-heating",
        icon: Wrench,
        titleKey: "homeRepairs.subcategories.plumbingHeating.title",
        descriptionKey: "homeRepairs.subcategories.plumbingHeating.description",
      },
      {
        slug: "electrical-services",
        icon: Zap,
        titleKey: "homeRepairs.subcategories.electricalServices.title",
        descriptionKey: "homeRepairs.subcategories.electricalServices.description",
      },
      {
        slug: "painting-decorating",
        icon: PaintBucket,
        titleKey: "homeRepairs.subcategories.paintingDecorating.title",
        descriptionKey: "homeRepairs.subcategories.paintingDecorating.description",
      },
      {
        slug: "home-cleaning-maintenance",
        icon: Sparkle,
        titleKey: "homeRepairs.subcategories.homeCleaningMaintenance.title",
        descriptionKey: "homeRepairs.subcategories.homeCleaningMaintenance.description",
      },
      {
        slug: "landscaping-garden-services",
        icon: Trees,
        titleKey: "homeRepairs.subcategories.landscapingGardenServices.title",
        descriptionKey: "homeRepairs.subcategories.landscapingGardenServices.description",
      },
      {
        slug: "handyman-odd-jobs",
        icon: Settings,
        titleKey: "homeRepairs.subcategories.handymanOddJobs.title",
        descriptionKey: "homeRepairs.subcategories.handymanOddJobs.description",
      },
    ],
  },
  "wellness-care": {
    slug: "wellness-care",
    icon: Heart,
    titleKey: "wellnessCare.title",
    descriptionKey: "wellnessCare.description",
    subcategories: [
      {
        slug: "medical-clinics-specialists",
        icon: Stethoscope,
        titleKey: "wellnessCare.subcategories.medicalClinicsSpecialists.title",
        descriptionKey: "wellnessCare.subcategories.medicalClinicsSpecialists.description",
      },
      {
        slug: "dental-services",
        icon: Pill,
        titleKey: "wellnessCare.subcategories.dentalServices.title",
        descriptionKey: "wellnessCare.subcategories.dentalServices.description",
      },
      {
        slug: "physical-therapy-rehabilitation",
        icon: Activity,
        titleKey: "wellnessCare.subcategories.physicalTherapyRehabilitation.title",
        descriptionKey: "wellnessCare.subcategories.physicalTherapyRehabilitation.description",
      },
      {
        slug: "fitness-personal-training",
        icon: Dumbbell,
        titleKey: "wellnessCare.subcategories.fitnessPersonalTraining.title",
        descriptionKey: "wellnessCare.subcategories.fitnessPersonalTraining.description",
      },
      {
        slug: "beauty-spa",
        icon: Smile,
        titleKey: "wellnessCare.subcategories.beautySpa.title",
        descriptionKey: "wellnessCare.subcategories.beautySpa.description",
      },
      {
        slug: "childcare-elder-care",
        icon: Baby,
        titleKey: "wellnessCare.subcategories.childcareElderCare.title",
        descriptionKey: "wellnessCare.subcategories.childcareElderCare.description",
      },
      {
        slug: "mental-health-counselling",
        icon: Brain,
        titleKey: "wellnessCare.subcategories.mentalHealthCounselling.title",
        descriptionKey: "wellnessCare.subcategories.mentalHealthCounselling.description",
      },
    ],
  },
  "mobility-transport": {
    slug: "mobility-transport",
    icon: Car,
    titleKey: "mobilityTransport.title",
    descriptionKey: "mobilityTransport.description",
    subcategories: [
      {
        slug: "car-rental-sharing",
        icon: KeyRound,
        titleKey: "mobilityTransport.subcategories.carRentalSharing.title",
        descriptionKey: "mobilityTransport.subcategories.carRentalSharing.description",
      },
      {
        slug: "taxi-private-hire",
        icon: CarTaxiFront,
        titleKey: "mobilityTransport.subcategories.taxiPrivateHire.title",
        descriptionKey: "mobilityTransport.subcategories.taxiPrivateHire.description",
      },
      {
        slug: "bike-scooter-rental",
        icon: Bike,
        titleKey: "mobilityTransport.subcategories.bikeScooterRental.title",
        descriptionKey: "mobilityTransport.subcategories.bikeScooterRental.description",
      },
      {
        slug: "auto-repair-servicing",
        icon: Replace,
        titleKey: "mobilityTransport.subcategories.autoRepairServicing.title",
        descriptionKey: "mobilityTransport.subcategories.autoRepairServicing.description",
      },
      {
        slug: "moving-relocation-services",
        icon: Move,
        titleKey: "mobilityTransport.subcategories.movingRelocationServices.title",
        descriptionKey: "mobilityTransport.subcategories.movingRelocationServices.description",
      },
      {
        slug: "public-transport-shuttle",
        icon: Bus,
        titleKey: "mobilityTransport.subcategories.publicTransportShuttle.title",
        descriptionKey: "mobilityTransport.subcategories.publicTransportShuttle.description",
      },
    ],
  },
  "youth-services": {
    slug: "youth-services",
    icon: Users,
    titleKey: "youthServices.title",
    descriptionKey: "youthServices.description",
    subcategories: [
      {
        slug: "after-school-activities-clubs",
        icon: Users,
        titleKey: "youthServices.subcategories.afterSchoolActivitiesClubs.title",
        descriptionKey: "youthServices.subcategories.afterSchoolActivitiesClubs.description",
      },
      {
        slug: "youth-sports-recreation",
        icon: Trophy,
        titleKey: "youthServices.subcategories.youthSportsRecreation.title",
        descriptionKey: "youthServices.subcategories.youthSportsRecreation.description",
      },
      {
        slug: "tutors-learning-centres",
        icon: GraduationCap,
        titleKey: "youthServices.subcategories.tutorsLearningCentres.title",
        descriptionKey: "youthServices.subcategories.tutorsLearningCentres.description",
      },
      {
        slug: "childcare-playgroups",
        icon: Baby,
        titleKey: "youthServices.subcategories.childcarePlaygroups.title",
        descriptionKey: "youthServices.subcategories.childcarePlaygroups.description",
      },
      {
        slug: "youth-counselling-support",
        icon: Brain,
        titleKey: "youthServices.subcategories.youthCounsellingSupport.title",
        descriptionKey: "youthServices.subcategories.youthCounsellingSupport.description",
      },
      {
        slug: "kids-parties-events",
        icon: PartyPopper,
        titleKey: "youthServices.subcategories.kidsPartiesEvents.title",
        descriptionKey: "youthServices.subcategories.kidsPartiesEvents.description",
      },
    ],
  },
  "other-services": {
    slug: "other-services",
    icon: MoreHorizontal,
    titleKey: "otherServices.title",
    descriptionKey: "otherServices.description",
    subcategories: [
      {
        slug: "event-planning-catering",
        icon: PartyPopper,
        titleKey: "otherServices.subcategories.eventPlanningCatering.title",
        descriptionKey: "otherServices.subcategories.eventPlanningCatering.description",
      },
      {
        slug: "photography-videography",
        icon: Camera,
        titleKey: "otherServices.subcategories.photographyVideography.title",
        descriptionKey: "otherServices.subcategories.photographyVideography.description",
      },
      {
        slug: "pet-services-grooming",
        icon: Dog,
        titleKey: "otherServices.subcategories.petServicesGrooming.title",
        descriptionKey: "otherServices.subcategories.petServicesGrooming.description",
      },
      {
        slug: "travel-tourism-services",
        icon: Plane,
        titleKey: "otherServices.subcategories.travelTourismServices.title",
        descriptionKey: "otherServices.subcategories.travelTourismServices.description",
      },
      {
        slug: "nonprofit-community-organisations",
        icon: HandHeart,
        titleKey: "otherServices.subcategories.nonprofitCommunityOrganisations.title",
        descriptionKey: "otherServices.subcategories.nonprofitCommunityOrganisations.description",
      },
      {
        slug: "miscellaneous-general-services",
        icon: Layers,
        titleKey: "otherServices.subcategories.miscellaneousGeneralServices.title",
        descriptionKey: "otherServices.subcategories.miscellaneousGeneralServices.description",
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
