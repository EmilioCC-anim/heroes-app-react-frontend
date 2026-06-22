import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { SearchControls } from "./ui/SearchControls"
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"
import { useSearchParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action"
import { HeroGrid } from "@/heroes/components/HeroGrid"


export const SearchPage = () => {

    const [searchParams] = useSearchParams()

    const name = searchParams.get('name') ?? undefined
    // const team = searchParams.get('team') ?? ""
    // const category = searchParams.get('category') ?? ""
    // const universe = searchParams.get('universe') ?? ""
    // const status = searchParams.get('status') ?? ""
    const strength = searchParams.get('strength') ?? undefined

    const { data: searchData } = useQuery({
        queryKey: ['search', { name, strength }],
        queryFn: () => searchHeroesAction({ name, strength }),
        staleTime: 1000 * 60 * 5 // 5 minutos
    })

    return (
        <>
            {/* Header */}
            <CustomJumbotron
                title="Superhero Search"
                description="Discover, explore, and manage your favorite superheroes and villains"
            />
            <CustomBreadcrumbs currentPage="Search"

            // breadcrumbs={
            //     [
            //         { lable: 'Home1', to: "/" },
            //         { lable: 'Home2', to: "/" },
            //         { lable: 'Home3', to: "/" }
            //     ]
            // }

            />

            {/* Stats Dashboard */}
            <HeroStats />

            {/*Filter and search*/}
            <SearchControls />
            <HeroGrid heroes={searchData ?? []} />

        </>
    )
}


export default SearchPage
