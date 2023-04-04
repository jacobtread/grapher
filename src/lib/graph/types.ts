
interface GraphType {
    name: string;
    inputs: GraphInput[];
    settings: Record<string, Setting>;
}

interface GraphInput {
    name: string;
    optional: boolean;
}

const enum SettingType {
    TOGGLE = 0,
    SLIDER = 1,
    SELECT = 2,
}

interface SettingBase<T, V> {
    type: T,
    name: string;
    defaultValue: V;
    children?: Setting[]
}

type SettingToggle = SettingBase<SettingType.TOGGLE, boolean>;
type SettingSlider = {
    min: number,
    max: number,
    step: number
} & SettingBase<SettingType.SLIDER, number>;
type SettingSelect = {
    values: string[];
} & SettingBase<SettingType.SELECT, string>;
type Setting = SettingToggle | SettingSlider | SettingSelect;

const enum BoxPlotType {
    NONE = "No Box Plot",
    NORMAL = "Normal",
    HIGH = "High",
    NO_WHISKER = "No Whisker",
    NO_OUTLIER = "No Outlier"
}


export const GRAPH_TYPES: GraphType[] = [
    {
        name: "Dot Plot",
        inputs: [
            { name: "Numerical 1", optional: false },
            { name: "Category 1", optional: false },
            { name: "Category 2", optional: false },
        ],
        settings: {
            "point-size": {
                type: SettingType.SLIDER,
                name: "Point Size",
                defaultValue: 7,
                min: 3,
                max: 19,
                step: 1
            },
            "point-opacity": {
                type: SettingType.SLIDER,
                name: "Point Transparency",
                defaultValue: 50,
                min: 0,
                max: 100,
                step: 10,
            },
            "summaries": {
                type: SettingType.TOGGLE,
                name: "Summaries",
                defaultValue: false,
            },
            "box-plots": {
                type: SettingType.SELECT,
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
                type: SettingType.TOGGLE,
                name: "Hide Points",
                defaultValue: false,
            },
            "shape-outline": {
                type: SettingType.TOGGLE,
                name: "Shape Outline",
                defaultValue: false,
            },
            "violin-graph": {
                type: SettingType.TOGGLE,
                name: "Violin Graphs",
                defaultValue: false,
            },
            "bee-swarm": {
                type: SettingType.TOGGLE,
                name: "Bee Swarm",
                defaultValue: false,
            },
            "strip-graph": {
                type: SettingType.TOGGLE,
                name: "Strip Graph",
                defaultValue: false,
            },

        }
    }
];