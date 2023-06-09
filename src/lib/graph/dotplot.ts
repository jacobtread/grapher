import type { Row } from "$lib/data";
import type { CanvasData, DerivedSettings } from "./graph";

const enum BoxPlotType {
    NONE = "No Box Plot",
    NORMAL = "Normal",
    HIGH = "High",
    NO_WHISKER = "No Whisker",
    NO_OUTLIER = "No Outlier"
}


export const name = "Dot Plot";
export const inputs = [
    { name: "Numerical 1", optional: false },
    { name: "Category 1", optional: false },
    { name: "Category 2", optional: false },
];
export const settings = {
    "point-size": {
        name: "Point Size",
        defaultValue: 7,
        min: 3,
        max: 19,
        step: 1
    },
    "point-opacity": {
        name: "Point Transparency",
        defaultValue: 50,
        min: 0,
        max: 100,
        step: 10,
    },
    "summaries": {
        name: "Summaries",
        defaultValue: false,
    },
    "box-plots": {
        name: "Box Plots Type",
        defaultValue: BoxPlotType.NONE,
        values: [
            BoxPlotType.NONE,
            BoxPlotType.NORMAL,
            BoxPlotType.HIGH,
            BoxPlotType.NO_OUTLIER,
            BoxPlotType.NO_WHISKER
        ]
    },
    "hide-points": {
        name: "Hide Points",
        defaultValue: false,
    },
    "shape-outline": {
        name: "Shape Outline",
        defaultValue: false,
    },
    "violin-graph": {
        name: "Violin Graphs",
        defaultValue: false,
    },
    "bee-swarm": {
        name: "Bee Swarm",
        defaultValue: false,
    },
    "strip-graph": {
        name: "Strip Graph",
        defaultValue: false,
    },
}


type Settings = DerivedSettings<typeof settings>;

interface ComputeData {
    a: number;
}

export function compute(input: Row[], settings: Settings): ComputeData {
    console.log(input);
    console.log(settings);
    console.log("Computed");

    const start = "a".charCodeAt(0);
    for (let i = 0; i < 26; i++) {
        const char = String.fromCharCode(start + i);
        console.log(char);
    }

    return { a: 123 };
}


export function render(data: ComputeData, settings: Settings, ctx: CanvasRenderingContext2D, canvasData: CanvasData) {
    console.log("Rendered");
    ctx.fillStyle = "12px #000000";
    ctx.fillText("Hello world", data.a, 25);
} 