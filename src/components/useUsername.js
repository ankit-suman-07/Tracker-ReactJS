import { useSelector } from "react-redux";

export default function useUsername() {
    const a = useSelector((state) => state.authReducer.value.username);
    console.log("a : ", a);
    return a;
}
