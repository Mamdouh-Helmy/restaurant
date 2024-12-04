import { UtensilsCrossed, ChefHat, Soup } from 'lucide-react';

export function Utensils() {
  return (
    <div className="cooking-container">
      <div className="cooking-icon">
        <UtensilsCrossed size={48} strokeWidth={1.5} />
      </div>
    </div>
  );
}

export function Chef() {
  return (
    <div className="cooking-container">
      <div className="cooking-icon">
        <ChefHat size={48} strokeWidth={1.5} />
      </div>
    </div>
  );
}

export function Bowl() {
  return (
    <div className="cooking-container">
      <div className="cooking-icon">
        <Soup size={48} strokeWidth={1.5} />
      </div>
    </div>
  );
}