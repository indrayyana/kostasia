import { SquarePen, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CellAction = () => {
  return (
    <div className="font-bold">
      <Button className="text-yellow-600" variant={'link'}>
        <SquarePen /> Edit
      </Button>
      <Button className="text-red-600" variant={'link'}>
        <Trash2 /> Hapus
      </Button>
    </div>
  );
};

