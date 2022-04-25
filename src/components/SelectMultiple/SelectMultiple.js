import * as React from 'react';
import PropTypes from 'prop-types';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '../../assets/images/searchIcon.svg';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import AssignedPeople from '../MeetingScreen/AssignedPeople';
import PeopleCircle from '../MeetingScreen/PeopleCircle';
import Box from '@mui/material/Box';
import { getRandomColors } from '../../utils/index';
import { useDispatch } from 'react-redux';
import { showSelectedPeople } from '../../store/actions/showSelectedPeople';



const Root = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
    };
  font-size: 14px;
`,
);

const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
  
`;

const InputWrapper = styled('div')(
  ({ theme }) => `
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  
  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`,
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  console.log(other, "other")
  return (
    <div {...other} >
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};



const Listbox = styled('ul')(
  ({ theme }) => `
  margin: 2px 0 0;
  padding: 0;
  list-style: none;
  border-radius: 4px;
  height:190px;
  //max-height: 190px;
  //overflow-y: scroll;
  & li {
    //padding: 0 0 16px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    //background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    //font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`,
);

export default function SelectMultiple({ title }) {

  const dispatch = useDispatch();
  const people = [
    { title: 'sakshi.dhawan643@gmail.com', name: 'Sakshi Dhawan' },
    { title: 'arora.kanik@gmail.com', name: 'Kanik Arora' },
    { title: 'shm.mathur@gmail.com', name: 'Shubham Mathur' },
    { title: 'avikothari84@gmail.com', name: 'Avi Kothari' },
    { title: 'gautamawasthi11@gmail.com', name: 'Gautam Awasthi' },
    { title: 'shm.mathur@gmail.com11', name: 'Shubham Mathur' },
    { title: 'avikothari84@gmail.com12', name: 'Avi Kothari' },
    { title: 'gautamawasthi11@gmail.com13', name: 'Gautam Awasthi' },
  ];

  const [optionList, setOptionList] = React.useState(people);
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    //defaultValue: [optionList[1]],
    multiple: true,
    options: optionList || [],
    elevation: 0,
    open: 'open',
    filterSelectedOptions: true,
    renderOption: (props, option, { selected }) => (
      <li {...props} option={option} />

    ),
    getOptionLabel: (option) => option.title,
  });

  const useStyles = makeStyles(theme => ({
    title: {
      fontWeight: "600",
      fontSize: "12px",
      color: "#5B6987",
      opacity: "0.6",
      marginBottom: '14px'
    },

    searchBox: {
      borderBottom: "1px solid #fff",
      border: "none !important",
      outline: "none !important",
      width: "196.8px !important",
      height: "48px !important",
      background: "#F5F7F9 !important",
      borderRadius: "4px",

      '&::placeholder': {
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "24px",
        color: "#5B6987",
        opacity: "0.6"
      },
      '&::-webkit-input-placeholder': {
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "24px",
        color: "#5B6987",
        opacity: "0.6"
      },
      '&::-ms-input-placeholder': {
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "24px",
        color: "#5B6987",
        opacity: "0.6"
      }
    },
    search: {
      background: "#F5F7F9",
      display: 'flex',
      alignItems: "center",
      justifyContent: "center",
      marginBottom: '24px',
      height: '48px'
    },
    searchIcon: {
      padding: '21px 18px 14.29px 16px'
    },
    peopleId: {
      marginLeft: '12px',
      width: "200px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis"

    },
    showPeople: {
      paddingBottom: '10px'
    },
    hrLine: {
      border: '1px solid #D0D6E2',
      margin: '0px 0 17px 0',
      paddingRight: '0 !important'
      //position: 'absolute'
    }
  }))
  const getInitials = (nameString) => {
    const string = nameString.split(' ').slice(0, 2).join('+')
    const matches = string.match(/\b(\w)/g);
    const initials = matches.join('');
    return initials.toUpperCase();
  }

  const classes = useStyles();

  React.useEffect(() => {
    console.log("Selected People are :", value);
    dispatch(showSelectedPeople(value));
  }, [value]);

  return (
    <Root>
      <Box {...getRootProps()} >
        <Box>
          <Label {...getInputLabelProps()} className={classes.title}>{title}</Label>
          <InputWrapper ref={setAnchorEl}>
            {value.map((option, index) => (
              <AssignedPeople personName={option.title} name={getInitials(option.name)} {...getTagProps({ index })} />
            ))}
          </InputWrapper>
        </Box>
        <Box className={classes.hrLine}></Box>
        <Box className={classes.search}>
          <Box className={classes.searchIcon}>
            <img src={SearchIcon} alt="search" />
          </Box>
          <Box>
            <input className={classes.searchBox} {...getInputProps()} placeholder='Search for teammates' />
          </Box>
        </Box>


      </Box>

      {
        groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (

              <li {...getOptionProps({ option, index })} className={classes.showPeople} key={index}>
                <PeopleCircle classDefined='ellipses' colorCode={getRandomColors()} name={getInitials(option.name)} width='30px' height='30px' />
                <Box className={classes.peopleId} title={option.title}>{option.title}</Box>
                {/* <CheckIcon fontSize="small" /> */}
              </li>
            ))}
          </Listbox>
        ) : null
      }
    </Root >
  );
}



