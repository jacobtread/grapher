import type { Row } from "$lib/data";
import * as DotPlot from "./dotplot";


// Type used to determine the type of a setting
export const enum SettingType {
    TOGGLE = 0,
    SLIDER = 1,
    SELECT = 2,
}

interface GraphInput {
    name: string;
    optional: boolean;
}

interface SettingBase<V> {
    name: string;
    defaultValue: V;
    children?: Setting;
}

type ToggleSetting = SettingBase<boolean>;

type SliderSetting = {
    min: number;
    max: number;
    step: number;
} & SettingBase<number>;

type SelectSetting = {
    values: string[];
} & SettingBase<string>;


export type Setting = ToggleSetting | SliderSetting | SelectSetting;


export interface SettingsCollection {
    [key: string]: Setting
}

export type DerivedSettings<S extends SettingsCollection> = {
    [key in keyof S]: S[key]["defaultValue"];
}

export function defaultSettings<V extends SettingsCollection>(value: V): DerivedSettings<V> {
    const out: DerivedSettings<V> = {} as DerivedSettings<V>;
    for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
            const element = value[key];
            out[key] = element.defaultValue;
        }
    }
    return out;
}

export interface GraphType<S extends SettingsCollection, C> {
    name: string;
    inputs: GraphInput[];
    settings: S;
    compute(input: Row[], settings: DerivedSettings<S>): C;
    render(data: C, settings: DerivedSettings<S>, ctx: CanvasRenderingContext2D, canvasData: CanvasData): void;
}

//  @typescript-eslint/no-explicit-any
export const GRAPHS: GraphType<any, any>[] = [
    DotPlot
];

export interface CanvasData {
    width: number;
    height: number;
}