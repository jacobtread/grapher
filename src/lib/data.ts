import { parse } from '@vanillaes/csv'
import { writable, type Writable } from "svelte/store";


export type Row = string[];


export const columnNames: Writable<string[]> = writable([]);
export const rows: Writable<Row[]> = writable([]);

type CSVData = string[][];

/**
 * Loads the csv data from the provided CSV contents
 * 
 * @param csv The CSV data
 */
function loadData(csv: string) {
    const data: CSVData = parse(csv);
    if (data.length < 1) {
        return;
    }

    // Split the data from the headings
    const [names, ...other] = data;

    // Validate the rows are all of the correct length
    validateRows(names, other);

    // Update the stored state
    columnNames.set(names);
    rows.set(other);
}

/**
 * Validates that the provided rows all match the same
 * length as the provided column headings
 * 
 * @param columns The column headings
 * @param rows    The rows 
 * @returns       Whether the lengths match
 */
function validateRows(columns: string[], rows: Row[]): boolean {
    const columnCount: number = columns.length;
    for (let i = 0; i < rows.length; i++) {
        const row: Row = rows[i];
        if (row.length != columnCount) {
            console.error(`Row ${i + 1} length doesn't match the expected number of columns (got: ${row.length}, expected: ${columnCount})`)
            return false;
        }
    }
    return false;
}

/**
 * Fetches and loads the csv data from the provided URL
 * 
 * @param url the url to load from
 */
async function fetchLoadData(url: string) {
    const response = await fetch(url);
    const data = await response.text();
    loadData(data);
}

fetchLoadData("/datasets/Babies.csv")
    .then()
    .catch();