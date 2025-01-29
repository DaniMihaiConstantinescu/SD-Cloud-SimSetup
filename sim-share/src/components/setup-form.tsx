"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Setup } from "@/common/types"

interface SetupFormProps {
    carOptions: { value: string; label: string }[]
    trackOptions: { value: string; label: string }[]
    setupTypeOptions: { value: string; label: string }[]
    onSubmit: (setup: Setup) => void
}


export default function SetupForm({ carOptions, trackOptions, setupTypeOptions, onSubmit }: SetupFormProps) {
    const [setup, setSetup] = useState<Setup>({
        tirePressures: {},
        aero: {},
        camber: {},
        toe: {},
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
            <div className="overflow-y-scroll no-scrollbar max-h-3/4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
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
                            <Slider
                                id={`tirePressure-${tire}`}
                                min={20}
                                max={40}
                                step={0.5}
                                value={[setup.tirePressures?.[tire as keyof typeof setup.tirePressures] || 20]}
                                onValueChange={([value]) => handleNestedChange("tirePressures", tire, value)}
                            />
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Aero</h3>
                    {["frontWing", "rearWing"].map((wing) => (
                        <div key={wing} className="space-y-2">
                            <Label htmlFor={`aero-${wing}`}>{wing === "frontWing" ? "Front" : "Rear"} Wing</Label>
                            <Slider
                                id={`aero-${wing}`}
                                min={0}
                                max={100}
                                step={1}
                                value={[setup.aero?.[wing as keyof typeof setup.aero] || 0]}
                                onValueChange={([value]) => handleNestedChange("aero", wing, value)}
                            />
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Differential</h3>
                    <div className="space-y-2">
                        <Label htmlFor="brakeBias">Brake Bias</Label>
                        <Slider
                            id="brakeBias"
                            min={50}
                            max={70}
                            step={0.1}
                            value={[setup.brakeBias || 50]}
                            onValueChange={([value]) => handleChange("brakeBias", value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="diffPower">Diff Power</Label>
                        <Slider
                            id="diffPower"
                            min={0}
                            max={100}
                            step={1}
                            value={[setup.diffPower || 0]}
                            onValueChange={([value]) => handleChange("diffPower", value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="diffCoast">Diff Coast</Label>
                        <Slider
                            id="diffCoast"
                            min={0}
                            max={100}
                            step={1}
                            value={[setup.diffCoast || 0]}
                            onValueChange={([value]) => handleChange("diffCoast", value)}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Camber</h3>
                    {["fl", "fr", "rl", "rr"].map((wheel) => (
                        <div key={`camber-${wheel}`} className="space-y-2">
                            <Label htmlFor={`camber-${wheel}`}>{wheel.toUpperCase()} Camber</Label>
                            <Slider
                                id={`camber-${wheel}`}
                                min={-5}
                                max={0}
                                step={0.5}
                                value={[setup.camber?.[wheel as keyof typeof setup.camber] || -2.5]}
                                onValueChange={([value]) => handleNestedChange("camber", wheel, value)}
                            />
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Toe</h3>
                    {["fl", "fr", "rl", "rr"].map((wheel) => (
                        <div key={`toe-${wheel}`} className="space-y-2">
                            <Label htmlFor={`toe-${wheel}`}>{wheel.toUpperCase()} Toe</Label>
                            <Slider
                                id={`toe-${wheel}`}
                                min={-0.5}
                                max={0.5}
                                step={0.01}
                                value={[setup.toe?.[wheel as keyof typeof setup.toe] || 0]}
                                onValueChange={([value]) => handleNestedChange("toe", wheel, value)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <Button type="submit" className="w-full">
                Save Setup
            </Button>
        </form>
    )
}

