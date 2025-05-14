import { useNavigate } from "react-router-dom";
import Button from "./Button";
const ButtonBack = () => {
    const navigate = useNavigate()
    return (
        <Button variant={'back'} onClick={(e) => {
            e.preventDefault();
            navigate(-1)
        }}>&larr; Geri</Button>
    )
}

export default ButtonBack

