import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, CheckCircle2 } from "lucide-react";

interface BusinessCardProps {
  id: string;
  name: string;
  category: string;
  description: string;
  logo?: string;
  rating?: number;
  verified?: boolean;
  location?: string;
}

export const BusinessCard = ({
  id,
  name,
  category,
  description,
  logo,
  rating,
  verified,
  location,
}: BusinessCardProps) => {
  const { lang } = useParams<{ lang: string }>();

  return (
    <Card className="group hover-lift h-full">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            {logo && (
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <img src={logo} alt={name} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <CardTitle className="text-lg truncate">{name}</CardTitle>
                {verified && (
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                )}
              </div>
              <Badge variant="secondary" className="text-xs">
                {category}
              </Badge>
            </div>
          </div>
        </div>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          {location && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{location}</span>
            </div>
          )}
          {rating && (
            <div className="flex items-center gap-1 text-primary">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-medium">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <Link to={`/${lang}/business/${id}`}>
          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-base">
            View Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
