import { useMediaQuery } from "react-responsive";

export default function GenderSelect({ handleRegisterChange, genderError}){
    const view1 = useMediaQuery({
        query: "(min-width: 539px)",
    });
    const view2 = useMediaQuery({
        query: "(min-width: 850px)",
    });
    const view3 = useMediaQuery({
        query: "(min-width: 1170px)",
    }); 

    return(
        <div
            className="reg_grid"
            style={{ marginBottom: `${genderError && !view3 ? "70px" : "0"}`}}
        >
            <label htmlFor="male"></label>
                Male
                <input 
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    onChange={handleRegisterChange}
                />
            <label/>
        </div>
    )
}