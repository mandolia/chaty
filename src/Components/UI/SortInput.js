import React from 'react';
import Select, { components } from 'react-select'
import { SelectContainer } from './style';
import Polygon from '../../Illustration/Polygon.svg'

const SortInput = (props) => {


    const customStyles = {
        control: (base, state) => ({
            ...base,
            width: state.selectProps.width,
            height: state.selectProps.height,
            background: 'transparent',
            paddingLeft: '2px',
            // match with the menu
            borderRadius: state.isFocused ? 5 : 5,
            // Overwrittes the different states of border
            borderColor: state.isFocused ? "#47525D" : "#47525D",
            borderColor: state.isSelected ? "#47525D" : "#47525D",
            // Removes weird border around container
            boxShadow: 'none',

            "&:hover": {
                // Overwrittes the different states of border
                border: state.isFocused ? ' 1px solid #53A8CB' : ' 1px solid  #47525D',
                outline: state.isFocused ? 'none !important ' : 'auto'
            },


        }),
        menu: base => ({
            ...base,
            // override border radius to match the box
            borderRadius: 0,
            // kill the gap
            marginTop: 0
        }),
        menuList: base => ({
            ...base,
            // kill the white space on first and last option
            padding: 0,
            textAlign: "left"

        }),
        indicatorSeparator: (styles) => ({ display: 'none' }),
        placeholder: () => ({ color: '#47525D', fontWeight: 400, fontSize: '14px' })
    }


    const DropdownIndicator = (
        props: ElementConfig<typeof components.DropdownIndicator>
    ) => {
        return (
            <components.DropdownIndicator {...props}>
                <img src={Polygon} />
            </components.DropdownIndicator>
        );
    };

    return (
        <SelectContainer>
            <Select
                components={{ DropdownIndicator }}
                width={props.width}
                height={props.height}
                styles={customStyles}
                options={props.options}
                isMulti={false}
                onChange={props.onChange}
                value={props.value}
                isSearchable={true}
                placeholder="Sort by"
                {...props}
            />
        </SelectContainer>

    )
}

export default SortInput