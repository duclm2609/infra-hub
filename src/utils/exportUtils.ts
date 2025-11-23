import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export type ExportFormat = 'xlsx' | 'csv';

export interface ExportColumn {
  key: string;
  label: string;
}

export const exportToExcel = (
  data: any[],
  columns: ExportColumn[],
  filename: string,
  format: ExportFormat = 'xlsx'
) => {
  // Filter data based on selected columns
  const filteredData = data.map(item => {
    const row: any = {};
    columns.forEach(col => {
      // Handle nested properties if needed, but for now simple access
      row[col.label] = item[col.key] ?? '';
    });
    return row;
  });

  const worksheet = XLSX.utils.json_to_sheet(filteredData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Services');

  if (format === 'csv') {
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, `${filename}.csv`);
  } else {
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `${filename}.xlsx`);
  }
};

