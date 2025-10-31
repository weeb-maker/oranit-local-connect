import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CategoryTileProps {
  slug: string;
  title: string;
  icon: LucideIcon;
  count?: number;
}

export const CategoryTile = ({ slug, title, icon: Icon, count }: CategoryTileProps) => {
  const { t } = useTranslation(['common']);
  const { lang } = useParams<{ lang: string }>();

  return (
    <Link to={`/${lang}/category/${slug}`}>
      <Card className="group hover-lift cursor-pointer h-full">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-base">
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            {count !== undefined && (
              <p className="text-sm text-muted-foreground">
                {count} {t("common:labels.businesses")}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
