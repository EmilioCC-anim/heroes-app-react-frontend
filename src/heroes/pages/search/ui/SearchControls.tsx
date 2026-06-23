import { useRef } from "react"
import { useSearchParams } from "react-router"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"


export const SearchControls = () => {

    const inputRef = useRef<HTMLInputElement>(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const activeAccordion = searchParams.get('active-accordion') ?? ''
    const selectedStrenght = Number(searchParams.get('strength') ?? "")
    const selectedUniverse = searchParams.get('universe') ?? ""
    const selectedCategory = searchParams.get('category') ?? ""
    const selectedStatus = searchParams.get('status') ?? ""



    const setQueryParams = (name: string, value: string) => {
        if (name === "strength" && value === "0") {
            setSearchParams((prev) => {
                prev.set(name, "")
                return prev
            })
            return
        }

        setSearchParams((prev) => {
            prev.set(name, value)
            return prev
        })
    }

    const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const value = inputRef.current?.value ?? ''
            setQueryParams('name', value)
        }
    }

    const resetValues = () => {
        setSearchParams((prev) => {
            prev.delete("strength")
            prev.delete("universe")
            prev.delete("category")
            prev.delete("status")
            return prev
        })
    }
    return (
        <>
            <div className="flex flex-col lg:flex-row gap-4 mb-2">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input placeholder="Search by name" className="pl-12 h-12 text-lg bg-white"
                        ref={inputRef}
                        onKeyDown={handleKeydown}
                        defaultValue={searchParams.get('name') ?? ''}
                    />
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                    <Button
                        variant={activeAccordion === "advanced-filters" ? "default" : "outline"}
                        className="h-12 "
                        onClick={() => {
                            if (activeAccordion === "advanced-filters") {
                                setQueryParams("active-accordion", "")
                                return
                            } else {
                                setQueryParams("active-accordion", "advanced-filters")
                                return
                            }
                        }}>
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </Button>
                </div>
            </div>

            {/* Advanced Filters */}
            <Accordion type="single" collapsible defaultValue="item-1" value={activeAccordion}>
                <AccordionItem value="advanced-filters">
                    {/* <AccordionTrigger>Advanced Filters</AccordionTrigger> */}
                    <AccordionContent>

                        <div className="bg-white rounded-lg p-5 mb-8 shadow-sm border">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Advanced Filters</h3>
                                <Button onClick={resetValues} variant="ghost">Clear filters</Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                                {/* Universe */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Universe</label>
                                    <NativeSelect value={selectedUniverse} onChange={value => setQueryParams("universe", value.target.value)} className="w-full rounded-md text-sm">
                                        <NativeSelectOption value="">Universe</NativeSelectOption>
                                        <NativeSelectOption value="dc">DC</NativeSelectOption>
                                        <NativeSelectOption value="marvel">Marvel</NativeSelectOption>
                                    </NativeSelect>
                                </div>
                                {/* Category */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Category</label>
                                    <NativeSelect value={selectedCategory} onChange={value => setQueryParams("category", value.target.value)} className="w-full rounded-md text-sm">
                                        <NativeSelectOption value="">All categories</NativeSelectOption>
                                        <NativeSelectOption value="hero">Hero</NativeSelectOption>
                                        <NativeSelectOption value="villain">Villain</NativeSelectOption>
                                    </NativeSelect>
                                </div>
                                {/* Category */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Status</label>
                                    <NativeSelect value={selectedStatus} onChange={value => setQueryParams("status", value.target.value)} className="w-full rounded-md text-sm">
                                        <NativeSelectOption value="">All statuses</NativeSelectOption>
                                        <NativeSelectOption value="active">Active</NativeSelectOption>
                                        <NativeSelectOption value="deceased">Deceased</NativeSelectOption>
                                    </NativeSelect>
                                </div>

                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-medium">Minimum Strength: {selectedStrenght}/10</label>
                                <Slider value={[selectedStrenght]} max={10} step={1}
                                    onValueChange={value => setQueryParams("strength", value[0].toString())}
                                />
                            </div>

                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </>
    )
}
