export interface SelectOption {
    value: string;
    label: string;
}

export interface Setup {
    _id?: string;
    carCode?: {
        _id?: string;
        name?: string;
    };
    tirePressures?: {
        fl?: number;
        fr?: number;
        rl?: number;
        rr?: number;
    };
    aero?: {
        frontWing?: number;
        rearWing?: number;
    };
    brakeBias?: number;
    diffPower?: number;
    diffCoast?: number;
    camber?: {
        fl?: number;
        fr?: number;
        rl?: number;
        rr?: number;
    };
    toe?: {
        fl?: number;
        fr?: number;
        rl?: number;
        rr?: number;
    };
    setupType?: string;
}