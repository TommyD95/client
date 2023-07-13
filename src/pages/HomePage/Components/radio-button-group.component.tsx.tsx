import { FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface IProps {
    options: any[];
    onChange: (event: any) => void;
    selectedValue: string;
}

const RadioButtonGroup = (props: IProps) => {

    const { onChange, options, selectedValue } = props;

    return (
        <FormControl component="fieldset">
            <RadioGroup onChange={onChange} value={selectedValue}>
                {options.map((option, index) => (
                    <FormControlLabel key={index} value={option.value} control={<Radio />} label={option.label} />
                ))}
            </RadioGroup>
        </FormControl>
    )
}

export default RadioButtonGroup;