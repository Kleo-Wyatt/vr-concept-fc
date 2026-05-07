import { Table as AntTable } from 'antd';
import type { TableProps as AntTableProps } from 'antd';

import styles from './Table.module.css';import clsx from 'clsx';


export type TableProps<T extends object> = Omit<
  AntTableProps<T>,
  'dataSource'
> & {
  data: T[];
  className?: string;
};

export function Table<T extends object>({
  columns,
  data,
  rowKey = 'id',
  className = '',
  pagination = { pageSize: 8 },
  ...props
}: TableProps<T>) {
  const tableClassName = clsx(
    styles.table,
    className,
  );

  return (
    <AntTable<T>
      className={tableClassName}
      columns={columns}
      dataSource={data}
      rowKey={rowKey}
      pagination={pagination}
      {...props}
    />
  );
}
