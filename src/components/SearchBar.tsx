
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  value: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, value }) => {
  return (
    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search by name or interests..."
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        className="pl-10 pr-10"
      />
      <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
    </div>
  );
};

export default SearchBar;
