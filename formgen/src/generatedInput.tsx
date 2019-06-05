import * as React from 'react';
import * as styledComponents from 'styled-components';

import { InputType } from 'Editor';

const Label = styledComponents.default.div`
  font-family: sans-serif;
  font-size: 0.75rem;
  font-weight: bold;
`;

const Input = styledComponents.default.input`
  display: inline-block;
  width: 100%;
  padding: 4px;
  margin: 8px 0;
  border: solid 1px #aaa;
  border-radius: 2px;
`;

const Textarea = styledComponents.default.textarea`
  display: inline-block;
  width: 100%;
  padding: 4px;
  margin: 8px 0;
  border: solid 1px #aaa;
  border-radius: 2px;
`;

const Select = styledComponents.default.select`
  display: inline-block;
  width: 100%;
  padding: 4px;
  margin: 8px 0;
  border: solid 1px #aaa;
  border-radius: 2px;
`;

export function generatedInput(inputType: InputType, state: any, onChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void): JSX.Element {
  let inputComponent = null;

  switch (inputType.type) {
    case 'text': {
      inputComponent = <Input name={inputType.name} type="text" value={state[inputType.name]} onChange={onChange} />;
      break;
    }
    case 'textarea': {
      inputComponent =  <Textarea name={inputType.name} value={state[inputType.name]} onChange={onChange} />;
      break;
    }
    case 'select': {
      inputComponent =  (
        <Select onChange={onChange}>
          {inputType.options.map((option) => <option key={String(option.value)} value={state[inputType.name]}>{option.text}</option>)}
        </Select>
      );
      break;
    }
  }
  return (
    <div key={inputType.name}>
      <div>
        <Label>{inputType.label}</Label>
      </div>
      {inputComponent}
    </div>
  );
}
