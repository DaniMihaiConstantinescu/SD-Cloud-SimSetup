interface TyreInfoProps {
    label: string;
    value?: number;
}

export default function TyreInfo({ label, value }: TyreInfoProps) {
    return (
        <div className="flex flex-col items-center">
            <h6 className="text-base text-neutral-800">{label}</h6>
            <div className="flex w-fit p-8 items-center justify-center rounded-xl bg-neutral-300">
                {value}
            </div>
        </div>
    )
}
