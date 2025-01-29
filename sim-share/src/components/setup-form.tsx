"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import type { Setup } from "@/common/types"
import TableLoader from "./skeletons/table-loader"

interface SetupFormProps {
    carOptions: { value: string; label: string }[]
    trackOptions: { value: string; label: string }[]
    setupTypeOptions: { value: string; label: string }[]
    isLoading?: boolean
    onSubmit: (setup: Setup) => void
}

export default function SetupForm({ carOptions, trackOptions, setupTypeOptions, isLoading, onSubmit }: SetupFormProps) {
    const [setup, setSetup] = useState<Setup>({
        setupType: '',
        tirePressures: {
            fl: 30,
            fr: 30,
            rl: 28,
            rr: 28
        },
        aero: {
            frontWing: 50,
            rearWing: 50
        },
        brakeBias: 60,
        diffPower: 50,
        diffCoast: 50,
        camber: {
            fl: -3,
            fr: -3,
            rl: -2,
            rr: -2
        },
        toe: {
            fl: 0.1,
            fr: 0.1,
            rl: -0.1,
            rr: -0.1
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(setup)
    }

    const handleChange = (field: string, value: any) => {
        setSetup((prev) => ({ ...prev, [field]: value }))
    }

    const handleNestedChange = (parent: string, field: string, value: number) => {
        setSetup((prev) => ({
            ...prev,
            [parent]: { ...prev[parent as keyof Setup], [field]: value },
        }))
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {isLoading
                ? <div className="w-full flex items-center py-16 justify-center">
                    <TableLoader />
                </div>
                : <div className="max-h-3/4 overflow-y-scroll no-scrollbar space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="carCode">Car</Label>
                            <Select onValueChange={(value) => handleChange("carCode", value)}>
                                <SelectTrigger id="carCode">
                                    <SelectValue placeholder="Select car" />
                                </SelectTrigger>
                                <SelectContent>
                                    {carOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="trackCode">Track</Label>
                            <Select onValueChange={(value) => handleChange("trackCode", value)}>
                                <SelectTrigger id="trackCode">
                                    <SelectValue placeholder="Select track" />
                                </SelectTrigger>
                                <SelectContent>
                                    {trackOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="setupType">Setup Type</Label>
                            <Select onValueChange={(value) => handleChange("setupType", value)}>
                                <SelectTrigger id="setupType">
                                    <SelectValue placeholder="Select setup type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {setupTypeOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Tire Pressures</h3>
                        {["fl", "fr", "rl", "rr"].map((tire) => (
                            <div key={tire} className="space-y-2">
                                <Label htmlFor={`tirePressure-${tire}`}>{tire.toUpperCase()} Tire Pressure</Label>
                                <div className="flex items-center space-x-2">
                                    <Slider
                                        id={`tirePressure-${tire}`}
                                        min={20}
                                        max={40}
                                        step={0.5}
                                        value={[setup.tirePressures?.[tire as keyof typeof setup.tirePressures] || 20]}
                                        onValueChange={([value]) => handleNestedChange("tirePressures", tire, value)}
                                    />
                                    <span className="w-12 text-sm">
                                        {(setup.tirePressures?.[tire as keyof typeof setup.tirePressures] || 20).toFixed(1)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Aero</h3>
                        {["frontWing", "rearWing"].map((wing) => (
                            <div key={wing} className="space-y-2">
                                <Label htmlFor={`aero-${wing}`}>{wing === "frontWing" ? "Front" : "Rear"} Wing</Label>
                                <div className="flex items-center space-x-2">
                                    <Slider
                                        id={`aero-${wing}`}
                                        min={0}
                                        max={100}
                                        step={1}
                                        value={[setup.aero?.[wing as keyof typeof setup.aero] || 0]}
                                        onValueChange={([value]) => handleNestedChange("aero", wing, value)}
                                    />
                                    <span className="w-12 text-sm">{setup.aero?.[wing as keyof typeof setup.aero] || 0}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Differential</h3>
                        <div className="space-y-2">
                            <Label htmlFor="brakeBias">Brake Bias</Label>
                            <div className="flex items-center space-x-2">
                                <Slider
                                    id="brakeBias"
                                    min={50}
                                    max={70}
                                    step={0.1}
                                    value={[setup.brakeBias || 50]}
                                    onValueChange={([value]) => handleChange("brakeBias", value)}
                                />
                                <span className="w-12 text-sm">{(setup.brakeBias || 50).toFixed(1)}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="diffPower">Diff Power</Label>
                            <div className="flex items-center space-x-2">
                                <Slider
                                    id="diffPower"
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={[setup.diffPower || 0]}
                                    onValueChange={([value]) => handleChange("diffPower", value)}
                                />
                                <span className="w-12 text-sm">{setup.diffPower || 0}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="diffCoast">Diff Coast</Label>
                            <div className="flex items-center space-x-2">
                                <Slider
                                    id="diffCoast"
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={[setup.diffCoast || 0]}
                                    onValueChange={([value]) => handleChange("diffCoast", value)}
                                />
                                <span className="w-12 text-sm">{setup.diffCoast || 0}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Camber</h3>
                        {["fl", "fr", "rl", "rr"].map((wheel) => (
                            <div key={`camber-${wheel}`} className="space-y-2">
                                <Label htmlFor={`camber-${wheel}`}>{wheel.toUpperCase()} Camber</Label>
                                <div className="flex items-center space-x-2">
                                    <Slider
                                        id={`camber-${wheel}`}
                                        min={-5}
                                        max={0}
                                        step={0.1}
                                        value={[setup.camber?.[wheel as keyof typeof setup.camber] || -2.5]}
                                        onValueChange={([value]) => handleNestedChange("camber", wheel, value)}
                                    />
                                    <span className="w-12 text-sm">
                                        {(setup.camber?.[wheel as keyof typeof setup.camber] || -2.5).toFixed(1)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Toe</h3>
                        {["fl", "fr", "rl", "rr"].map((wheel) => (
                            <div key={`toe-${wheel}`} className="space-y-2">
                                <Label htmlFor={`toe-${wheel}`}>{wheel.toUpperCase()} Toe</Label>
                                <div className="flex items-center space-x-2">
                                    <Slider
                                        id={`toe-${wheel}`}
                                        min={-0.5}
                                        max={0.5}
                                        step={0.01}
                                        value={[setup.toe?.[wheel as keyof typeof setup.toe] || 0]}
                                        onValueChange={([value]) => handleNestedChange("toe", wheel, value)}
                                    />
                                    <span className="w-12 text-sm">{(setup.toe?.[wheel as keyof typeof setup.toe] || 0).toFixed(2)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
            <Button type="submit" className="w-full" disabled={isLoading}>
                Save Setup
            </Button>

        </form>
    )
}

