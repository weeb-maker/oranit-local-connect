import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useCategories } from "@/hooks/useCategories";

interface FilterBarProps {
  onSearch?: (query: string) => void;
  onCategoryChange?: (category: string) => void;
  onSortChange?: (sort: string) => void;
  showFilters?: boolean;
}

export const FilterBar = ({
  onSearch,
  onCategoryChange,
  onSortChange,
  showFilters = true,
}: FilterBarProps) => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || "en";
  
  // Fetch categories from database
  const { data: categories = [], isLoading: categoriesLoading } = useCategories(currentLang);

  return (
    <div className="bg-card border rounded-lg p-4 space-y-4 shadow-lg">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground ltr:left-3 rtl:right-3 search-icon-left" />
          <Input
            placeholder={t("hero.searchPlaceholder")}
            className="ltr:pl-10 rtl:pr-10 search-input-padding"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
        {showFilters && (
          <>
            <Select onValueChange={onCategoryChange}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder={t("search.filterByCategory")} />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">{t("search.allCategories")}</SelectItem>
                {categoriesLoading ? (
                  <SelectItem value="loading" disabled>
                    {t("common.loading", "Loading...")}
                  </SelectItem>
                ) : (
                  categories.map((category) => (
                    <SelectItem key={category.id} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <Select onValueChange={onSortChange}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder={t("search.sortBy")} />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="relevant">{t("search.mostRelevant")}</SelectItem>
                <SelectItem value="rating">{t("search.highestRated")}</SelectItem>
                <SelectItem value="name">{t("search.alphabetical")}</SelectItem>
                <SelectItem value="nearest">{t("search.nearest")}</SelectItem>
              </SelectContent>
            </Select>
          </>
        )}
        <Button variant="outline" size="icon" className="flex-shrink-0">
          <SlidersHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};