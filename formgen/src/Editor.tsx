import * as React from 'react';
import * as styledComponents from 'styled-components';

interface Props {
}

interface State {
}

const Wrapper = styledComponents.default.div`
  color: blue;
`;

type input = {
  label: string;
  name: string;
};

type textInput = input & {
  type: 'text';
  initialValue: string;
};

type checkboxInput = input & {
  type: 'checkbox';
  initialValue: boolean;
};

type textarea = input & {
  type: 'textarea';
  initialValue: string;
};

type option = {
  value: string;
  text: string;
};

type optionFunction = () => option[];

type select = input & {
  type: 'select';
  options: option[] | optionFunction;
};

type inputType = textInput | checkboxInput | textarea | select;

const editorLayout: inputType[][] = [
  [
    {
      label: 'Title',
      name: 'title',
      type: 'text',
      initialValue: 'initial title',
    },
    {
      label: 'Body',
      name: 'body',
      type: 'textarea',
      initialValue: 'sample body',
    },
  ]
];

function generatedForm(inputType: inputType): JSX.Element {
  let inputComponent = null;

  switch (inputType.type) {
    case 'text': {
      inputComponent = <input name={inputType.name} type="text" value={inputType.initialValue} />;
      break;
    }
    case 'textarea': {
      inputComponent =  <textarea name={inputType.name} value={inputType.initialValue} />;
      break;
    }
  }
  return (
    <div key={inputType.name}>
      <div>
        <span>{inputType.label}</span>
      </div>
      {inputComponent}
    </div>
  );
}

export class Editor extends React.Component<Props, State> {
  public render(): JSX.Element {
    return (
      <>{
        editorLayout.map((column, index) => {
          return <div key={`column-${index}`}>{column.map((inputType: inputType) => generatedForm(inputType))}</div>;
        })
      }</>
    );
  }
}
