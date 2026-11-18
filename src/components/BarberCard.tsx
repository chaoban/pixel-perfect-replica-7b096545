import { Star } from "lucide-react";

export type Barber = {
  name: string;
  shop: string;
  image: string;
  services: string[];
  rating: number;
  reviews: number;
  from: number;
};

export function BarberCard({ barber }: { barber: Barber }) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="group block overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <img
          src={barber.image}
          alt={`${barber.name}, barber at ${barber.shop}`}
          loading="lazy"
          width={500}
          height={500}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
          Popular
        </span>
      </div>
      <div className="space-y-3 p-5">
        <div>
          <h3 className="text-2xl font-semibold leading-tight">{barber.name}</h3>
          <p className="text-sm text-muted-foreground">{barber.shop}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {barber.services.map((s) => (
            <span key={s} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">
              {s}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-star text-star" />
            <span className="font-medium">{barber.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({barber.reviews})</span>
          </span>
          <span className="text-muted-foreground">
            from <span className="font-semibold text-foreground">${barber.from}</span>
          </span>
        </div>
      </div>
    </a>
  );
}
