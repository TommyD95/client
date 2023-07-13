import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

interface IProps {
    items: string[];
    checked: string[];
    onChange: (items: string[]) => void;
}
const CheckboxButton = (props: IProps) => {

    const { checked, items, onChange } = props;

    const [checkedItems, setCheckedItems] = useState(checked || []);

    const handleChecked = (value: string) => {
        const currentIndex = checkedItems.findIndex(item => item === value);
        let newChecked: string[] = [];
        if (currentIndex === - 1) newChecked = [...checkedItems, value];
        else newChecked = checkedItems.filter(item => item !== value);
        setCheckedItems(newChecked);
        onChange(newChecked);
    }

    return (
        <FormGroup>
            {items.map((item, index) => (
                <FormControlLabel
                    checked={checkedItems.indexOf(item) !== -1}
                    key={index}
                    control={<Checkbox />}
                    label={item}
                    onClick={() => handleChecked(item)}
                />
            ))}
        </FormGroup>
    )
}

export default CheckboxButton;