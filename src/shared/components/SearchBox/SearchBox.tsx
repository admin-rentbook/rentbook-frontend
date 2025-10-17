import { Search01Icon } from 'hugeicons-react';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';

type SearchBoxProps = {
  placeholder: string;
  inputValue: string;
  setInputValue: (value: string) => void;
  name: string;
  debounceValue?: number;
};
export const SearchBox = (props: SearchBoxProps) => {
  const { debounceValue = 500 } = props;
  const [localValue, setLocalValue] = useState(props.inputValue);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      props.setInputValue(value);
    }, props.debounceValue),
    [debounceValue, props.setInputValue]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLocalValue(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    setLocalValue(props.inputValue);
  }, [props.inputValue]);
  return (
    <InputGroup className="bg-primary-foreground border-none rounded-xl ">
      <InputGroupInput
        placeholder={props.placeholder}
        value={localValue}
        name={props.name}
        onChange={(e) => handleChange(e)}
        className='placeholder:text-black-400 bg-primary-foreground rounded-xl'
      />
      <InputGroupAddon>
        <Search01Icon className="size-4 text-black-400" />
      </InputGroupAddon>
    </InputGroup>
  );
};
