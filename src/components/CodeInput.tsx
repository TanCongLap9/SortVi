import { useEffect } from 'react';
import { FormLabel } from 'react-bootstrap';
import { OptionActionType } from '../types/option';
import data from '../data.json';
import { CodeInputProps } from '../types/props';
import AceEditor from 'react-ace';
import { useSearchParams } from 'react-router-dom';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-clouds';

const CodeInput = ({ options: [options, setOptions] }: CodeInputProps) => {
  const [search] = useSearchParams();

  useEffect(() => {
    if (!search.has('algo')) return;
    for (const sort of data.sorts) {
      if (search.get('algo') === sort.name) {
        setOptions({
          type: OptionActionType.CODE,
          payload: sort.code.join('\n'),
        });
      }
    }
  }, [search]);

  return (
    <>
      <FormLabel htmlFor="code" className="h4">
        Algorithm code
      </FormLabel>

      <AceEditor
        className="h-100 border border-muted rounded"
        width="100%"
        fontSize="16px"
        mode="javascript"
        wrapEnabled={false}
        value={options[OptionActionType.CODE]}
        onChange={(value) =>
          setOptions({
            type: OptionActionType.CODE,
            payload: value,
          })
        }
      />
    </>
  );
};

export default CodeInput;
