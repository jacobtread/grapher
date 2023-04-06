import type { Row } from "$lib/data";

interface NumericParsedColumn {
    // The minimum value in the columns
    min: number;
    // The maximum value in the columns
    max: number;
    // The column values
    values: number[];
    // Values that could not be parsed
    invalidValues: InvalidValue[];
}

interface NamedGroup {
    /// Names of the group values
    name: string;
    /// Indexes of the group values
    indexes: number[];
}

interface CategoryGroup {
    // Group based on a specific category
    category: string;
    // The values that fall into this group
    values: number[];
}


// Structure for a value that could not be parsed as numeric
export interface InvalidValue {
    // The index in the column for the invalid value
    index: number;
    // The invalid value
    value: string;
}


export function getGroups(column: string[]) {



    try {
        // Integer column check
        parseInt(column[0]);



    } catch (_) {

    }

    console.log();
}

function parseNumericColumn(column: string[]) {

}

interface NumericGroupings {
    column: NumericParsedColumn;
    groups: NamedGroup[];
}

function getNumericGroups(column: NumericParsedColumn, maxGroups: number): NumericGroupings {

    const groups: NamedGroup[] = [];
    const { min, max, values } = column;

    if (values.length < maxGroups) {
        for (let i = 0; i < values.length; i++) {
            const value = values[i];
            groups.push({
                name: `${value}`,
                indexes: [i]
            })
        }
        return {
            column,
            groups
        };
    }

    const groupSize = (max - min) / 4;
    const firstGroupSize = floatp(min + groupSize, 2);
    const secondGroupSize = floatp(firstGroupSize + groupSize, 2);
    const thirdGroupSize = floatp(secondGroupSize + groupSize, 2);


    const groupsObj: Record<string, number[]> = {};


    for (let i = 0; i < values.length; i++) {
        const value = values[i];
        let group: string;
        if (value < firstGroupSize) group = `a: < ${firstGroupSize}`;
        else if (value < secondGroupSize) group = `b: ${firstGroupSize} - ${secondGroupSize}`;
        else if (value < thirdGroupSize) group = `c: ${secondGroupSize} - ${thirdGroupSize}`;
        else group = `d: > ${thirdGroupSize}`

        if (groupsObj[group] === undefined) {
            groupsObj[group].push(i);
        } else {
            groupsObj[group] = [i];
        }
    }

    for (const group in groupsObj) {
        const indexes = groupsObj[group];
        groups.push({
            name: group,
            indexes
        })
    }

    return {
        column,
        groups
    }
}


export function floatp(value: number, precision = 2): number {
    return parseFloat(value.toFixed(precision));
}

export function intf(value: number): number {
    return parseInt(value.toFixed(0));
}