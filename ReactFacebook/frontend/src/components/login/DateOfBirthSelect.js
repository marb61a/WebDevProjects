import { useMediaQuery } from "react-responsive";

export default function DateOfBirthSelect({
    bDay,
    bMonth,
    bYear,
    days,
    months,
    years,
    handleRegisterChange,
    dateError
}) {
    const view1 = useMediaQuery({
        query: "(min-width: 539px)"
    });
    const view2 = useMediaQuery({
        query: "(min-width: 850px)"
    });
    const view3 = useMediaQuery({
        query: "(min-width: 1170px)"
    });

    return(
        <div
            className="reg_grid"
            style={{ marginBottom: `${dateError && !view3 ? "90px" : "0"}` }}
        >

        </div>
    )
}