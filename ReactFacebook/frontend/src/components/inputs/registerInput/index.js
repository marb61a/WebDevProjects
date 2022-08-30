import { useField, ErrorMessage } from "formik";
import { useMediaQuery } from "react-responsive";

import "./style.css";

export default function RegisterInput({ placeholder, bottom, ...props }){
    const [field, meta] = useField(props);
    const view1 = useMediaQuery({
        query: "(min-width: 539px)",
    });
    const view2 = useMediaQuery({
        query: "(min-width: 850px)",
    });
    const view3 = useMediaQuery({
        query: "(min-width: 1170px)",
    });
}