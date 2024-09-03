import * as XLSX from "xlsx-js-style";
import { ExportSheet } from "@/shared/types/export-excel.type";

export class ExportExcel {
    exportSheet(exportData: ExportSheet[], fileName?: string) {
        const cellColor = {
            fill: { fgColor: { rgb: "3dc2ff" } },
        };

        const headerColor = {
            font: { sz: 13, color: { rgb: "00000" }, bold: true },
        };

        const cellBorder = {
            border: {
                top: { style: "thin", color: { rgb: "00000" } },
                right: { style: "thin", color: { rgb: "00000" } },
                bottom: { style: "thin", color: { rgb: "00000" } },
                left: { style: "thin", color: { rgb: "00000" } },
            },
        };

        try {
            const workBook = XLSX.utils.book_new();

            // Export jsons to different excel sheet
            exportData.forEach((table) => {
                const { data, sheetName, calcName, calcCol, calcResult } = table;
                const workSheet = XLSX.utils.json_to_sheet(data);

                // Get the col and row range
                const range = XLSX.utils.decode_range(workSheet["!ref"] ?? "");
                const rowCount = range.e.r;
                const columnCount = range.e.c;

                // Format cells
                for (let row = 0; row <= rowCount; row++) {
                    for (let col = 0; col <= columnCount; col++) {
                        const cellRef = XLSX.utils.encode_cell({ r: row, c: col });

                        if (workSheet[cellRef]) {
                            const cellValue = workSheet[cellRef].v;

                            // Format every cell with border
                            workSheet[cellRef].s = {
                                ...cellBorder,
                            };

                            // Check if cell contains newline and enable wrap text
                            if (typeof cellValue === 'string' && cellValue.includes('\n')) {
                                workSheet[cellRef].s = {
                                    ...workSheet[cellRef].s,
                                    alignment: { wrapText: true }, // Enable wrap text for cells with newlines
                                };
                            }

                            if (col === 0) {
                                // Format first column
                                workSheet[cellRef].s = {
                                    ...workSheet[cellRef].s,
                                    alignment: { horizontal: "center" },
                                };
                            }
                            if (row === 0) {
                                // Format first row
                                workSheet[cellRef].s = {
                                    ...workSheet[cellRef].s,
                                    ...cellColor,
                                    ...headerColor,
                                    alignment: { horizontal: "center" },
                                };
                            }
                        }
                    }
                }

                const dataKeys = Object.keys(data[0]);

                const workSheetColumns: any[] = [];
                for (let i = 0; i < dataKeys.length; i++) {
                    workSheetColumns.push({ wch: dataKeys[i].length + 7 });
                }

                workSheet["!cols"] = workSheetColumns;

                if (calcName && calcCol && calcResult) {
                    try {
                        XLSX.utils.sheet_add_aoa(workSheet, [[`${calcName + calcResult}`]], {
                            origin: calcCol,
                        });
                    } catch (error) {
                        console.log("Error Calculation: ", error);
                    }
                }

                XLSX.utils.book_append_sheet(
                    workBook,
                    workSheet,
                    sheetName || "default_sheet"
                );
            });

            // Generate File
            XLSX.writeFile(workBook, `${fileName || "default-book"}.xlsx`);
        } catch (error) {
            console.log("Error ExportSheet: ", error);
        }
    }
}
