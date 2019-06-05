import * as React from 'react';
import * as styledComponents from 'styled-components';

import { generatedInput } from 'generatedInput';

interface Props {
}

interface State {
}

export type BaseInput = {
  label: string;
  name: string;
};

export type TextInput = BaseInput & {
  type: 'text';
  initialValue: string;
};

export type CheckboxInput = BaseInput & {
  type: 'checkbox';
  initialValue: boolean;
};

export type Textarea = BaseInput & {
  type: 'textarea';
  initialValue: string;
};

export type Option = {
  value: string | number;
  text: string;
};

export type Select = BaseInput & {
  type: 'select';
  options: Option[];
};

export type InputType = TextInput | CheckboxInput | Textarea | Select;

export type Column = {
  size: number;
  inputs: InputType[];
};

const editorColumns: Column[] = [
  {
    size: 2,
    inputs: [
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
    ],
  }, {
    size: 1,
    inputs: [
      {
        label: 'Option',
        name: 'option',
        type: 'select',
        options: [
          {
            value: 1,
            text: 'OK',
          },
          {
            value: 0,
            text: 'NG',
          },
        ],
      },
    ],
  }
];

const Form = styledComponents.default.form`
  display: flex;
  padding: 0;
  margin: 0;
`;

const Column = styledComponents.default.div`
  flex: ${(props: { column: Column }) => props.column.size};
  padding: 12px;
  margin: 0;
`;

function columnsToState(columns: Column[]): any {
  const state: any = {};
  columns.forEach((column: Column) => {
    column.inputs.forEach((inputType: InputType) => {
      switch (inputType.type) {
        case 'select': {
          state[inputType.name] = inputType.options[0].value;
          break;
        }
        default: {
          state[inputType.name] = inputType.initialValue;
          break;
        }
      }
    });
  });
  return state;
}

export class Editor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = columnsToState(editorColumns);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public render(): JSX.Element {
    return (
      <Form onSubmit={this.onSubmit}>{
        editorColumns.map((column: Column, index) => {
          return (
            <Column column={column} key={`column-${index}`}>
              {column.inputs.map((inputType: InputType) => generatedInput(inputType, this.state, this.onChange))}
            </Column>
          );
        })
      }</Form>
    );
  }

  private onChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    this.setState({ [name]: value });
  }

  private onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(this.state);
  }
}
