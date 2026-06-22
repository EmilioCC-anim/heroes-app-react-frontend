import { Link } from "react-router"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "../ui/breadcrumb"



interface Breadcrumb {
    lable: string,
    to: string,
}

interface Props {
    currentPage: string,
    breadcrumbs?: Breadcrumb[]
}

export const CustomBreadcrumbs = ({ currentPage, breadcrumbs = [] }: Props) => {

    return (
        <>
            <Breadcrumb className="my-2">
                <BreadcrumbList>

                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/">
                                Home
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    {
                        breadcrumbs.map(crumb => (
                            <div className="flex items-center" key={crumb.lable}>
                                <BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbLink asChild>
                                        <Link to={crumb.to}>
                                            {crumb.lable}
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </div>
                        ))
                    }

                    <BreadcrumbItem className="text-black">
                        <BreadcrumbLink>{currentPage}</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />


                </BreadcrumbList>
            </Breadcrumb>
        </>
    )
}
