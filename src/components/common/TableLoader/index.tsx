import { TableCell, TableRow } from '@/components/ui/table';

interface Props {
  colSpan: number;
}

const TableLoader = ({ colSpan }: Props) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-24 text-center">
        <div className="flex h-50 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TableLoader;

