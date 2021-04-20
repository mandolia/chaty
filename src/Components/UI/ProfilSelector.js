import React from 'react';
import Select, { components } from 'react-select'
import { SelectContainer } from './style'
import Polygon from '../../Illustration/Polygon.svg'

const ProfilSelector = (props) => {


    const customStyles = {
        control: (base, state) => ({
            ...base,
            width: state.selectProps.width,
            height: state.selectProps.height,
            background: 'transparent',
            borderColor: state.isFocused ? "#47525D" : "#47525D",
            borderColor: state.isSelected ? "#47525D" : "#47525D",
            border: state.selectProps.border,
            borderBottom: state.selectProps.borderBottom,
            borderRadius: 0,
            "&:hover": {
                borderColor: state.isFocused ? "#47525D" : "#47525D",
            },
            fontFamily: "Helvetica",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "22px",
            lineHeight: "25px",
            letterSpacing: "1.29412px",
            color: "#4A4A4A"
        }),
        menu: base => ({
            ...base,
            borderRadius: 0,
            marginTop: 0
        }),
        menuList: base => ({
            ...base,
            padding: 0
        }),
        indicatorSeparator: () => ({ display: 'none' }),
        placeholder: () => ({
            fontFamily: "Helvetica",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "22px",
            lineHeight: "25px",
            letterSpacing: "1.29412px",
            color: "#4A4A4A"
        })
    }

    const DropdownIndicator = (
        props: ElementConfig<typeof components.DropdownIndicator>
    ) => {
        return (
            <components.DropdownIndicator {...props}>
                <img style={{ width: "16px", height: "10px" }} alt="Polygon" src={Polygon} />
            </components.DropdownIndicator>
        );
    };

    return <SelectContainer>
        <p id="label">{props.label}</p>
        <Select
            components={{ DropdownIndicator }}
            border={props.border}
            borderBottom={props.borderBottom}
            width={props.width}
            height={props.height}
            styles={customStyles}
            options={props.options}
            isMulti={false}
            onChange={props.onChange}
            isSearchable={true}
            placeholder={props.placeholder}
            {...props}
        />
    </SelectContainer>;
}

export default ProfilSelector;