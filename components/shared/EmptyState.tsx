import { Search, Filter, Inbox } from 'lucide-react';

interface EmptyStateProps {
  type?: 'search' | 'filter' | 'general';
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({
  type = 'general',
  message,
  action
}: EmptyStateProps) {
  const icons = {
    search: Search,
    filter: Filter,
    general: Inbox
  };

  const Icon = icons[type];

  const defaultMessages = {
    search: 'No results found for your search',
    filter: 'No items match your filters',
    general: 'No items to display'
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="rounded-full bg-muted p-4 mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>

      <p className="text-muted-foreground text-center mb-4">
        {message || defaultMessages[type]}
      </p>

      {action && (
        <button
          onClick={action.onClick}
          className="text-primary hover:underline text-sm"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}