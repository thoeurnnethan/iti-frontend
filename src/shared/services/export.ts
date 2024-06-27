import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx-js-style';
// import '../../../public/fonts/NotoSansKhmer-VariableFont_wdth,wght-normal.js'
export const exportExcel = (exportData: any) => {
    const newList = [] as any[];
    const headerList = exportData.columns.map((data: { title: any; }) => data.title);
    const keyList = exportData.columns.map((data: { key: any; }) => data.key);
    exportData.body.forEach((data: { [x: string]: any; }) => {
        const newObject = {} as any;
        keyList.forEach((key: string | number) => {
            newObject[key] = data[key] ? data[key] : "";
        });
        newList.push(newObject);
    });

    const workBook = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws, [headerList]);
    XLSX.utils.sheet_add_json(ws, newList, {
        origin: 'A2',
        skipHeader: true,
    });

    //Get the col and row range
    const range = XLSX.utils.decode_range(ws["!ref"] ?? "");
    const rowCount = range.e.r;
    const columnCount = range.e.c;
    const fontName = "Khmer OS"

    const headerColor = {
        font: { name: fontName, sz: 11, color: { rgb: "000000" }, bold: false },
        fill: { fgColor: { rgb: "8DB4E2" } },
    };

    const cellBorder = {
        border: {
            top: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
        },
    };
    //Format Style Cell
    for (let row = 0; row <= rowCount; row++) {
        for (let col = 0; col <= columnCount; col++) {
            const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
            // Format every cell`
            if (row === 0) {
                // Format first row
                ws[cellRef].s = {
                    ...cellBorder,
                    ...headerColor,
                    alignment: { horizontal: "center" },
                };
            } else {
                const align = exportData.columns[col].excelAlign ? exportData.columns[col].excelAlign : "center"
                ws[cellRef].s = {
                    font: {
                        name: fontName,
                        sz: 11
                    },
                    ...cellBorder,
                    alignment: { horizontal: align },
                };
            }
        }
    }
    // Format Width Cell
    const workSheetColumns: any[] = [];
    for (let i = 0; i < headerList.length; i++) {
        const textLength = exportData.columns[i].excelWidth || Object.keys(headerList[i]).length
        workSheetColumns.push({ wch: textLength + 7 });
    }
    ws["!cols"] = workSheetColumns;

    XLSX.utils.book_append_sheet(workBook, ws, exportData.sheetName);
    XLSX.writeFile(workBook, `${exportData.fileName || 'default-book'}.xlsx`);
};

export const exportPDF = ({ format = 'a4', title = '', setUnderLineTitle = false, headerList, list, footerText = '', fileName, orientation = 'p', fontSizeTable = 10 }) => {
    let doc = new jsPDF({orientation: 'p',unit : 'cm',format : format});
    if (orientation === 'l') {
        doc = new jsPDF({orientation: 'l',unit : 'cm',format : format});
    }

    console.log('doc.getFontList()', doc.getFontList());

    // font khmer is not working with jsPDF UTF-8

    // const font = "NotoSansKhmer-VariableFont_wdth,wght"
    const font = ""
    doc.setFont(font, 'normal')
    // text is placed using x, y coordinates
    doc.setFontSize(16).text(title, 0.5, 1.0);
    // create a line under heading
    if (setUnderLineTitle) {
        doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
    }

    autoTable(doc, {
        columns: headerList,
        body: list,
        startY: 1.2,
        styles: {
            overflow: 'linebreak',
            fontSize: fontSizeTable,
            font: font,
            fontStyle: 'normal'
        },
    });

    if (footerText) {
        doc.setFontSize(11)
            .setTextColor(0, 0, 255)
            .text(footerText, 0.5, doc.internal.pageSize.height - 0.5);
    }

    doc.save(`${fileName}.pdf`);
};
